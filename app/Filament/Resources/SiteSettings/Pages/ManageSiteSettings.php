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

        // // Handle JSON fields
        foreach ($settings as $key => $val) {
            if (is_string($val) && (str_ends_with($key, '_misi') || $key === 'faqs')) {
                $settings[$key] = json_decode($val, true) ?? [];
            }
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
                                TextInput::make('registration_url')->label('Registration Link (PMB)')->url()->nullable(),
                            ]),
                        Tab::make('Social Media')
                            ->schema([
                                TextInput::make('facebook_url')->url()->nullable(),
                                TextInput::make('instagram_url')->url()->nullable(),
                                TextInput::make('twitter_url')->url()->nullable(),
                                TextInput::make('youtube_url')->url()->nullable(),
                            ]),
                        Tab::make('Contact')
                            ->schema([
                                TextInput::make('telepon')->label('Telephone')->nullable(),
                                TextInput::make('whatsapp_number')->label('WhatsApp Number (e.g. 628...)')->numeric()->nullable(),
                                TextInput::make('email')->label('Email')->email()->nullable(),
                                Textarea::make('alamat')->label('Address')->rows(3)->nullable(),
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
                                        TextInput::make('facts_count_mahasiswa')->numeric()->nullable(),
                                        TextInput::make('facts_label_mahasiswa')->nullable(),
                                        TextInput::make('facts_count_dosen')->numeric()->nullable(),
                                        TextInput::make('facts_label_dosen')->nullable(),
                                        TextInput::make('facts_count_prodi')->numeric()->nullable(),
                                        TextInput::make('facts_label_prodi')->nullable(),
                                        TextInput::make('facts_count_alumni')->numeric()->nullable(),
                                        TextInput::make('facts_label_alumni')->nullable(),
                                    ])->columns(2),
                            ]),

                        Tab::make('FAQs')
                            ->schema([
                                Repeater::make('faqs')
                                    ->schema([
                                        TextInput::make('question')->required(),
                                        Textarea::make('answer')->required(),
                                    ])
                            ]),
                        Tab::make('Structure')
                            ->schema(fn () => $this->getStructureFields()),
                         Tab::make('Faculties')
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
                    FileUpload::make("faculty_{$faculty->slug}_image")
                        ->label('Faculty Photo')
                        ->image()
                        ->disk('public')
                        ->directory('settings')
                        ->visibility('public'),
                    Textarea::make("faculty_{$faculty->slug}_description")->label('Description')->rows(3),
                    Textarea::make("faculty_{$faculty->slug}_vision")->label('Vision')->rows(3),
                    Textarea::make("faculty_{$faculty->slug}_mission")->label('Mission')->rows(3),
                    Textarea::make("faculty_{$faculty->slug}_cooperation")->label('Cooperation')->rows(3),
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
                    Textarea::make("prodi_{$prodi->slug}_visi")->label('Visi')->rows(3),
                    Repeater::make("prodi_{$prodi->slug}_misi")
                        ->label('Misi')
                        ->schema([
                            TextInput::make('text')->required()->label('Misi Point')
                        ]),
                ])->collapsible()->collapsed();
        }
        return $fields;
    }

    protected function getStructureFields(): array
    {
        $fields = [];
        for ($i = 1; $i <= 3; $i++) {
            $fields[] = Section::make("Vice Rector $i")
                ->schema([
                    TextInput::make("vice_rector_{$i}_name")->label('Name')->nullable(),
                    FileUpload::make("vice_rector_{$i}_image")
                        ->label('Photo')
                        ->image()
                        ->disk('public')
                        ->directory('settings')
                        ->visibility('public'),
                    Textarea::make("vice_rector_{$i}_expertise")->label('Expertise (Bidang Keahlian)')->rows(2)->nullable(),
                    Textarea::make("vice_rector_{$i}_education")->label('Education (Pendidikan)')->rows(2)->nullable(),
                ])->collapsible()->collapsed();
        }
        return $fields;
    }

    public function submit(): void
    {
        $data = $this->form->getState();
        
        // Handle JSON fields
        if (isset($data['faqs'])) {
            $data['faqs'] = json_encode($data['faqs']);
        }
        
        foreach ($data as $key => $value) {
            if (is_array($value) && str_ends_with($key, '_misi')) {
                $data[$key] = json_encode(array_values($value));
            }
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
            Action::make('save')
                ->label('Save Changes')
                ->action('submit')
                ->color('primary'),
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
