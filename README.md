# CMS Dashboard UCA

Project website & dashboard CMS kampus UCA. Pake Laravel + Filament + React (Inertia).

## Cara Jalanin Project

1. **Install Dependencies**
   ```bash
   composer install
   npm install
   ```

2. **Setup Env**
   Copy `.env.example` jadi `.env`, terus sesuaikan config database-nya.
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Database & Storage**
   Jalanin migrate sama seeder biar ada data awalnya (user admin, prodi, dll). Terus link storage buat gambar.
   ```bash
   php artisan migrate:fresh --seed
   php artisan storage:link
   ```

4. **Run Server**
   Perlu jalanin 2 terminal ya:
   
   *Terminal 1 (Laravel):*
   ```bash
   php artisan serve
   ```
   
   *Terminal 2 (Vite):*
   ```bash
   npm run dev
   ```

## Info Login Admin
URL: `/admin`
* User: `superadmin`
* Pass: `password`
