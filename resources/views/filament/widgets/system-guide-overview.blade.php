<x-filament-widgets::widget>
    {{-- Welcome Banner --}}
    <x-filament::section 
        class="mb-6 border-l-8 border-primary-500 shadow-md"
        style="margin-bottom: 1.5rem; border-left-width: 8px; border-color: rgb(245 158 11);"
    >
        <div class="flex items-center gap-4">
            <div class="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
                <x-filament::icon icon="heroicon-o-home" class="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
                <h2 class="text-2xl font-bold text-gray-950 dark:text-white">Selamat Datang di Dashboard Administrator</h2>
                <p class="text-gray-500 dark:text-gray-400">
                    Pusat kontrol sistem informasi universitas. Kelola konten dan data dari sini.
                </p>
            </div>
        </div>
    </x-filament::section>

    {{-- Grid Container --}}
    <div 
        class="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6" 
        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; padding-bottom: 1.5rem;"
    >
        
        {{-- Card 1: Studio Konten --}}
        <x-filament::section 
            class="h-full hover:ring-2 hover:ring-primary-500 transition-all duration-300" 
            style="height: 100%;"
        >
            <x-slot name="heading">
                <div class="flex items-center gap-2 text-primary-600 dark:text-primary-400">
                    <x-filament::icon icon="heroicon-o-newspaper" class="h-6 w-6" />
                    <span class="text-lg font-bold">Studio Konten</span>
                </div>
            </x-slot>
            
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Publikasikan berita, artikel, dan pengumuman kampus.
            </p>

            <x-filament::button tag="a" href="/admin/artikels/create" icon="heroicon-m-plus" class="w-full justify-center" style="margin-top: 1.5rem;">
                Tulis Artikel Baru
            </x-filament::button>
        </x-filament::section>

        {{-- Card 2: Data Akademik --}}
        <x-filament::section 
            class="h-full hover:ring-2 hover:ring-success-500 transition-all duration-300"
            style="height: 100%;"
        >
            <x-slot name="heading">
                <div class="flex items-center gap-2 text-success-600 dark:text-success-400">
                    <x-filament::icon icon="heroicon-o-academic-cap" class="h-6 w-6" />
                    <span class="text-lg font-bold">Data Akademik</span>
                </div>
            </x-slot>
            
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Kelola data fakultas dan dosen pengajar.
            </p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 1.5rem;">
                <x-filament::button tag="a" href="/admin/faculties" color="success" outlined="true" icon="heroicon-m-building-library" class="justify-center">
                    Fakultas
                </x-filament::button>
                <x-filament::button tag="a" href="/admin/lecturers" color="success" outlined="true" icon="heroicon-m-users" class="justify-center">
                    Dosen
                </x-filament::button>
            </div>
        </x-filament::section>

        {{-- Card 3: Pengaturan --}}
        <x-filament::section 
            class="h-full hover:ring-2 hover:ring-warning-500 transition-all duration-300"
            style="height: 100%;"
        >
            <x-slot name="heading">
                <div class="flex items-center gap-2 text-warning-600 dark:text-warning-400">
                    <x-filament::icon icon="heroicon-o-cog-6-tooth" class="h-6 w-6" />
                    <span class="text-lg font-bold">Pengaturan</span>
                </div>
            </x-slot>
            
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Konfigurasi Visi Misi, FAQ, dan info kontak.
            </p>

            <x-filament::button tag="a" href="/admin/site-settings" color="warning" icon="heroicon-m-wrench" class="w-full justify-center" style="margin-top: 1.5rem;">
                Buka Pengaturan
            </x-filament::button>
        </x-filament::section>

    </div>
</x-filament-widgets::widget>