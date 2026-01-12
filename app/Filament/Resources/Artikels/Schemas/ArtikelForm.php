<?php

namespace App\Filament\Resources\Artikels\Schemas;

use Filament\Actions\Action;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Radio;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Components\Wizard;
use Filament\Schemas\Components\Wizard\Step;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Str;

class ArtikelForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Wizard::make([
                    Step::make('Pilih Kategori')
                        ->description('Pilih kategori yang sesuai untuk artikel Anda.')
                        ->icon('heroicon-o-tag')
                        ->completedIcon('heroicon-o-check-circle')
                        ->schema([
                            Select::make('categories')
                                ->relationship('categories', 'category_name')
                                ->preload()
                                ->required()
                                ->label('Kategori Artikel'),
                        ]),
                    Step::make('Detail Artikel')
                        ->description('Isi detail lengkap dari artikel atau berita.')
                        ->icon('heroicon-o-document-text')
                        ->completedIcon('heroicon-o-check-circle')
                        ->schema([
                            Hidden::make('users_id')
                                ->default(auth()->id())
                                ->required(),
                            TextInput::make('title')
                                ->required()
                                ->live(onBlur: true)
                                ->afterStateUpdated(function ($get, $set, ?string $state) {
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
                                ->live()
                                ->afterStateUpdated(fn (Set $set) => $set('featured_image_upload', null)),

                            FileUpload::make('featured_image_upload')
                                ->id('featured_image_upload_field')
                                ->image()
                                ->label('Gambar Unggulan')
                                ->disk('public')
                                ->directory('images/artikels')
                                ->maxSize(2048) // Max 2MB
                                ->visible(fn (Get $get) => $get('image_source') === 'upload'),

                            TextInput::make('featured_image_url')
                                ->label('Link Gambar Eksternal')
                                ->placeholder('https://images.unsplash.com/...')
                                ->url()
                                ->visible(fn (Get $get) => $get('image_source') === 'url')
                                ->required(fn (Get $get) => $get('image_source') === 'url'),
                        ]),
                ])
                ->submitAction(
                    Action::make('submit')
                        ->label('Simpan Artikel')
                        ->extraAttributes(['type' => 'submit'])
                )
                ->columnSpanFull(),
            ]);
    }
}