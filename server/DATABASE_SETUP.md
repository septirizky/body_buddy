# Database Setup Guide

## Cara Membuat Tabel di Database

Project ini menggunakan **Sequelize ORM** dengan **PostgreSQL**. Berikut adalah cara-cara untuk membuat tabel berdasarkan models yang sudah ada:

## Prerequisites

1. **PostgreSQL** harus sudah terinstall dan berjalan
2. Database `body_buddy` sudah dibuat
3. File `.env` sudah dikonfigurasi dengan benar

## Metode 1: Menggunakan Sequelize Sync (Recommended)

### Untuk Development (Aman - Tidak menghapus data)
```bash
npm run sync-db
```

Perintah ini akan:
- ✅ Membuat tabel baru jika belum ada
- ✅ Menambah kolom baru jika ada perubahan model
- ✅ Mempertahankan data yang sudah ada
- ❌ Tidak menghapus kolom yang sudah tidak digunakan

### Untuk Development (Force - Menghapus semua data)
```bash
npm run sync-db-force
```

⚠️ **PERINGATAN**: Perintah ini akan:
- ❌ Menghapus semua tabel yang ada
- ❌ Menghapus semua data
- ✅ Membuat ulang semua tabel sesuai model terbaru

## Metode 2: Manual SQL (Untuk Production)

Untuk production, disarankan menggunakan migration files atau menjalankan SQL secara manual.

### Contoh SQL untuk membuat tabel User:
```sql
CREATE TABLE "user" (
  "id" UUID NOT NULL PRIMARY KEY,
  "birthday" VARCHAR(255),
  "gender" VARCHAR(255),
  "weight" NUMERIC,
  "weight_unit" VARCHAR(255),
  "picture" VARCHAR(255)
);
```

## Daftar Tabel yang Akan Dibuat

Ketika menjalankan sync, tabel-tabel berikut akan dibuat:

### User Tables
- `user` - Data pengguna
- `user_settings` - Pengaturan pengguna
- `user_progress` - Progress pengguna
- `user_schedule` - Jadwal pengguna
- `user_achievement` - Achievement pengguna
- `user_accumulated_stats` - Statistik akumulatif pengguna

### Exercise Tables
- `exercise` - Data latihan
- `exercise_goal` - Goal untuk latihan
- `exercise_muscle_group` - Relasi latihan dengan muscle group
- `exercise_type` - Tipe latihan

### Routine Tables
- `routine` - Data rutinitas
- `routine_exercise` - Relasi rutinitas dengan latihan
- `routine_goal` - Goal untuk rutinitas
- `routine_history` - Riwayat rutinitas

### Program Tables
- `program` - Data program
- `program_routine` - Relasi program dengan rutinitas

### Local/Reference Tables
- `local_goal` - Data goal
- `local_intensity` - Data intensitas
- `local_achievement` - Data achievement
- `local_muscle_group` - Data muscle group
- `local_type` - Data tipe

## Troubleshooting

### Error: Database tidak bisa connect
1. Pastikan PostgreSQL berjalan
2. Cek konfigurasi di file `.env`
3. Pastikan database `body_buddy` sudah dibuat

### Error: Permission denied
1. Pastikan user PostgreSQL memiliki permission untuk membuat tabel
2. Cek username dan password di `DATABASE_URL`

### Error: Column already exists
1. Gunakan `npm run sync-db-force` untuk reset database (akan menghapus data)
2. Atau edit model untuk menyesuaikan dengan struktur tabel yang ada

## Best Practices

1. **Development**: Gunakan `npm run sync-db` untuk update schema
2. **Production**: Gunakan migration files atau SQL manual
3. **Backup**: Selalu backup database sebelum menjalankan sync-db-force
4. **Testing**: Test di database development dulu sebelum production

## Next Steps

Setelah tabel dibuat, Anda bisa:
1. Menjalankan server dengan `npm run dev`
2. Mengisi data awal melalui API endpoints
3. Menggunakan file `utils/generateDemoData.js` untuk data demo
