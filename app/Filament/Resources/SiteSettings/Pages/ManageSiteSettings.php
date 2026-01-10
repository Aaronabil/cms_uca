<?php

namespace App\Filament\Resources\SiteSettings\Pages;

use App\Filament\Resources\SiteSettings\SiteSettingResource;
use App\Models\Faculty;
use App\Models\SiteSetting;
use App\Models\StudyProgram;
use Filament\Actions\Action;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use Filament\Schemas\Contracts\HasSchemas;
use Filament\Schemas\Concerns\InteractsWithSchemas;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\Page;
use Illuminate\Support\Facades\Storage;

class ManageSiteSettings extends Page implements HasSchemas
{
    use InteractsWithSchemas;

    protected static string $resource = SiteSettingResource::class;

    protected static ?string $title = 'Manage Site Settings';

    protected string $view = 'filament.resources.site-settings.pages.manage-site-settings';

    public ?array $data = [];

    public function mount(): void
    {
        $settings = SiteSetting::all()->pluck('setting_value', 'setting_key')->toArray();

        // Handle JSON fields
        if (isset($settings['faqs'])) {
            $settings['faqs'] = json_decode($settings['faqs'], true);
        }
        
        if (isset($settings['footer_settings'])) {
            $footerData = json_decode($settings['footer_settings'], true) ?? [];
            $settings['footer_telephone'] = $footerData['telephone'] ?? null;
            $settings['footer_email'] = $footerData['email'] ?? null;
            $settings['footer_address'] = $footerData['address'] ?? null;
        }

        $this->form->fill($settings);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Settings')
                    ->tabs([
                        Tab::make('General')
                            ->schema([
                                TextInput::make('site_name')
                                    ->required(),
                                Textarea::make('site_description')
                                    ->rows(3),
                                FileUpload::make('logo_url')
                                    ->label('Logo')
                                    ->image()
                                    ->disk('public')
                                    ->directory('settings')
                                    ->visibility('public'),
                            ]),
                        Tab::make('Social Media')
                            ->schema([
                                TextInput::make('facebook_url')->url(),
                                TextInput::make('instagram_url')->url(),
                                TextInput::make('twitter_url')->url(),
                                TextInput::make('youtube_url')->url(),
                            ]),
                        Tab::make('Contact')
                            ->schema([
                                TextInput::make('footer_telephone')->label('Telephone'),
                                TextInput::make('footer_email')->label('Email')->email(),
                                Textarea::make('footer_address')->label('Address')->rows(3),
                            ]),
                        Tab::make('Academic Home')
                            ->schema([
                                TextInput::make('academic_section_title'),
                                Textarea::make('academic_section_description'),
                                Section::make('Cards')
                                    ->schema([
                                        TextInput::make('academic_card_1_title'),
                                        Textarea::make('academic_card_1_content'),
                                        TextInput::make('academic_card_2_title'),
                                        Textarea::make('academic_card_2_content'),
                                        TextInput::make('academic_card_3_title'),
                                        Textarea::make('academic_card_3_content'),
                                    ])->columns(2),
                            ]),
                        Tab::make('Facts')
                            ->schema([
                                TextInput::make('facts_title'),
                                Textarea::make('facts_description'),
                                Section::make('Counts')
                                    ->schema([
                                        TextInput::make('facts_count_mahasiswa')->numeric(),
                                        TextInput::make('facts_label_mahasiswa'),
                                        TextInput::make('facts_count_dosen')->numeric(),
                                        TextInput::make('facts_label_dosen'),
                                        TextInput::make('facts_count_prodi')->numeric(),
                                        TextInput::make('facts_label_prodi'),
                                        TextInput::make('facts_count_alumni')->numeric(),
                                        TextInput::make('facts_label_alumni'),
                                    ])->columns(2),
                            ]),
                         Tab::make('Vision & Mission')
                            ->schema([
                                Textarea::make('vision')->rows(5),
                                Textarea::make('mission')->rows(5),
                            ]),
                        Tab::make('FAQs')
                            ->schema([
                                Repeater::make('faqs')
                                    ->schema([
                                        TextInput::make('question')->required(),
                                        Textarea::make('answer')->required(),
                                    ])
                            ]),
                         Tab::make('Faculties (Deans)')
                            ->schema(fn () => $this->getFacultyFields()),
                         Tab::make('Study Programs')
                            ->schema(fn () => $this->getStudyProgramFields()),
                    ])->columnSpan('full'),
            ])
            ->statePath('data');
    }

    protected function getFacultyFields(): array
    {
        $fields = [];
        foreach (Faculty::all() as $faculty) {
            $fields[] = Section::make($faculty->name)
                ->schema([
                    TextInput::make("dean_{$faculty->slug}_name")->label('Dean Name'),
                    FileUpload::make("dean_{$faculty->slug}_image")
                        ->label('Dean Photo')
                        ->image()
                        ->disk('public')
                        ->directory('settings')
                        ->visibility('public'),
                    Textarea::make("dean_{$faculty->slug}_message")->label('Dean Message'),
                ])->collapsible()->collapsed();
        }
        return $fields;
    }

    protected function getStudyProgramFields(): array
    {
        $fields = [];
        foreach (StudyProgram::all() as $prodi) {
            $fields[] = Section::make($prodi->name . ' (' . $prodi->faculty->name . ')')
                ->schema([
                    TextInput::make("kaprodi_{$prodi->slug}_name")->label('Kaprodi Name'),
                    FileUpload::make("kaprodi_{$prodi->slug}_image")
                        ->label('Kaprodi Photo')
                        ->image()
                        ->disk('public')
                        ->directory('settings')
                        ->visibility('public'),
                    Textarea::make("kaprodi_{$prodi->slug}_message")->label('Kaprodi Message'),
                ])->collapsible()->collapsed();
        }
        return $fields;
    }

    public function submit(): void
    {
        $data = $this->form->getState();

        // Handle footer_settings specially
        $footerData = [
            'telephone' => $data['footer_telephone'] ?? null,
            'email' => $data['footer_email'] ?? null,
            'address' => $data['footer_address'] ?? null,
        ];
        $data['footer_settings'] = json_encode($footerData);
        
        // Remove flattened footer keys
        unset($data['footer_telephone'], $data['footer_email'], $data['footer_address']);

        // Handle JSON fields
        if (isset($data['faqs'])) {
            $data['faqs'] = json_encode($data['faqs']);
        }

        foreach ($data as $key => $value) {
            SiteSetting::updateOrCreate(
                ['setting_key' => $key],
                ['setting_value' => $value]
            );
        }

        Notification::make()
            ->title('Settings saved successfully')
            ->success()
            ->send();
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('view_table')
                ->label('View as Table')
                ->url(ListSiteSettings::getUrl())
                ->outlined(),
        ];
    }
    
    protected function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label('Save Changes')
                ->submit('submit'),
        ];
    }
}
