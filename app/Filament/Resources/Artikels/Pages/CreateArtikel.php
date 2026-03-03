<?php

namespace App\Filament\Resources\Artikels\Pages;

use App\Filament\Resources\Artikels\ArtikelResource;
use App\Models\ArtikelImage;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Radio;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Pages\CreateRecord;
use Filament\Resources\Pages\CreateRecord\Concerns\HasWizard;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Components\Wizard;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CreateArtikel extends CreateRecord
{
    use HasWizard;

    protected static string $resource = ArtikelResource::class;

    protected function getFormActions(): array
    {
        return [];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function getSteps(): array
    {
        return [
            Wizard\Step::make('Pilih Kategori')
                ->description('Pilih kategori yang sesuai untuk artikel Anda.')
                ->icon('heroicon-o-tag')
                ->schema([
                    Select::make('categories')
                        ->relationship('categories', 'category_name')
                        ->preload()
                        ->required()
                        ->label('Kategori Artikel'),
                ]),
            Wizard\Step::make('Detail Artikel')
                ->description('Isi detail lengkap dari artikel atau berita.')
                ->icon('heroicon-o-document-text')
                ->schema([
                    Hidden::make('users_id')
                        ->default(auth()->id())
                        ->required(),
                    TextInput::make('title')
                        ->required()
                        ->live(onBlur: true)
                        ->afterStateUpdated(function (Get $get, Set $set, ?string $state) {
                            if (blank($get('slug'))) {
                                $set('slug', Str::slug($state));
                            }
                        })
                        ->maxLength(255),
                    Hidden::make('slug')
                        ->required()
                        ->unique(ignoreRecord: true),
                    RichEditor::make('content')
                        ->columnSpanFull(),
                    Select::make('status')
                        ->options([
                            'draft' => 'Draft',
                            'published' => 'Published',
                            'archived' => 'Archived',
                        ])
                        ->default('draft')
                        ->required(),
                    DateTimePicker::make('published_at'),

                    // Image Source Selection
                    Radio::make('image_source')
                        ->label('Sumber Gambar')
                        ->options([
                            'upload' => 'Upload Gambar (Lokal)',
                            'url' => 'URL Eksternal (Unsplash/Lainnya)',
                        ])
                        ->default('upload')
                        ->live() // Use live() for reactivity in Filament v3
                        ->afterStateUpdated(fn (Set $set) => $set('featured_image_upload', null)),

                    FileUpload::make('featured_image_upload')
                        ->id('featured_image_upload_field')
                        ->image()
                        ->label('Gambar Unggulan')
                        ->disk('public')
                        ->directory('images/artikels')
                        ->maxSize(2048)
                        ->visible(fn (Get $get) => $get('image_source') === 'upload'),

                    TextInput::make('featured_image_url')
                        ->label('Link Gambar Eksternal')
                        ->placeholder('https://images.unsplash.com/...')
                        ->url()
                        ->visible(fn (Get $get) => $get('image_source') === 'url')
                        ->required(fn (Get $get) => $get('image_source') === 'url'),
                ]),
        ];
    }

    protected function handleRecordCreation(array $data): Model
    {
        $imagePath = null;
        $source = $data['image_source'] ?? 'upload';

        if ($source === 'upload') {
            if (isset($data['featured_image_upload'])) {
                $imagePath = is_array($data['featured_image_upload']) ? ($data['featured_image_upload'][0] ?? null) : $data['featured_image_upload'];
            }
        } else {
            $imagePath = $data['featured_image_url'] ?? null;
        }

        // Clean up temp fields
        unset($data['featured_image_upload']);
        unset($data['featured_image_url']);
        unset($data['image_source']);

        return DB::transaction(function () use ($data, $imagePath) {
            $artikel = static::getModel()::create($data);

            if ($imagePath) {
                $artikelImage = ArtikelImage::create([
                    'artikel_id' => $artikel->id,
                    'image_url' => $imagePath,
                ]);

                $artikel->featured_image_id = $artikelImage->id;
                $artikel->save();
            }

            return $artikel;
        });
    }
}
