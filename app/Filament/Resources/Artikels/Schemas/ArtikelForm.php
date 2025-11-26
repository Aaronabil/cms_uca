<?php

namespace App\Filament\Resources\Artikels\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Get;
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
                            FileUpload::make('featured_image_upload')
                                ->id('featured_image_upload_field')
                                ->image()
                                ->label('Gambar Unggulan')
                                ->disk('public')
                                ->directory('images/artikels')
                                ->maxSize(2048), // Max 2MB
                        ]),
                ])
                ->submitAction(new HtmlString(Blade::render(<<<BLADE
                    <x-filament::button
                        type="submit"
                        size="sm"
                    >
                        Simpan Artikel
                    </x-filament::button>
                BLADE)))
                ->columnSpanFull(),
            ]);
    }
}