# Panduan Setup Database Supabase GDGoC UNM

Panduan langkah demi langkah untuk menginisialisasi basis data Supabase (PostgreSQL) untuk website GDGoC UNM.

---

## Langkah 1: Buat Proyek Baru di Supabase
1. Buka [Supabase Dashboard](https://supabase.com/dashboard) dan login.
2. Klik tombol **New Project**.
3. Masukkan nama proyek: `gdgoc-unm` (atau sesuai keinginan).
4. Buat password database yang aman dan pilih region terdekat (misal: `Singapore (ap-southeast-1)`).
5. Tunggu sekitar 1-2 menit hingga status database menjadi *Active*.

---

## Langkah 2: Jalankan Skrip SQL di Supabase SQL Editor
Di dashboard proyek Supabase Anda:
1. Buka menu **SQL Editor** pada sidebar kiri.
2. Klik **New query**.
3. Buka file [`database/schema.sql`](./schema.sql), salin seluruh isinya, tempel ke editor, lalu klik **Run**.
   - Ini akan membuat tabel `core_team`, `learning_paths`, `learning_path_modules`, index, dan kebijakan keamanan **Row Level Security (RLS)**.
4. Buka kembali **New query**, salin isi file [`database/seed_learning_paths.sql`](./seed_learning_paths.sql), tempel, lalu klik **Run**.
   - Ini akan mengisi data 7 Learning Path lengkap beserta silabus minggu 1–5.
5. Buka kembali **New query**, salin isi file [`database/seed_core_team.sql`](./seed_core_team.sql), tempel, lalu klik **Run**.
   - Ini akan mengisi data seluruh 29 anggota Core Team.

---

## Langkah 3: Buat Storage Bucket untuk Foto Tim (Opsional)
Jika ingin mengupload foto pengurus langsung ke Supabase Storage:
1. Buka menu **Storage** pada sidebar kiri.
2. Klik **New bucket**.
3. Beri nama: `team-avatars`.
4. Centang pilihan **Public bucket** (agar foto bisa diakses oleh browser pengunjung).
5. Klik **Save**.

---

## Langkah 4: Ambil API Kredensial untuk Frontend
1. Buka menu **Project Settings** (ikon gear di pojok kiri bawah) > **API**.
2. Salin nilai dari dua baris berikut:
   - **Project URL**: contoh `https://abcdefghijklm.supabase.co`
   - **Project API Keys (anon / public)**: token panjang (dimulai dengan `ey...`)
3. Buka file [`js/supabase-client.js`](../js/supabase-client.js) pada codebase dan masukkan kredensial tersebut:
   ```javascript
   const SUPABASE_CONFIG = {
       url: 'https://abcdefghijklm.supabase.co',
       anonKey: 'eyJh...'
   };
   ```

---

## Cara Melakukan CRUD Data Melalui Supabase Studio
- Buka menu **Table Editor** di sidebar kiri.
- Pilih tabel **`core_team`**: Anda dapat menambah anggota baru (+ Insert row), mengubah nama, role, foto, atau menonaktifkan pengurus (`is_active = false`).
- Pilih tabel **`learning_paths`**: Anda dapat mengubah deskripsi, link grup WhatsApp, atau Tech Lead yang bertanggung jawab.
- Pilih tabel **`learning_path_modules`**: Anda dapat mengubah judul silabus mingguan atau tugas capstone.
- Perubahan akan langsung tercermin secara *real-time* di website!
