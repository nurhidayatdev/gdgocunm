# GDGoC UNM - Sistem Verifikasi Sertifikat
Frontend Static Web + Google Sheets Integration (Bebas Apps Script)

## Cara Kerja
Portal verifikasi ini sekarang berjalan langsung di hosting website GDGoC UNM (misal: `https://gdgocunm.netlify.app/certificate-verification/`).
Data sertifikat ditarik langsung dari Google Spreadsheet menggunakan Google Visualization (GViz) API secara instan di sisi browser (client-side), sehingga **tidak lagi memerlukan Google Apps Script**.

## Struktur File
- `Index.html`  - Halaman portal verifikasi sertifikat (Frontend).
- `README.md`   - Panduan konfigurasi.

## Konfigurasi Google Spreadsheet
1. Buka spreadsheet database sertifikat Anda:
   `https://docs.google.com/spreadsheets/d/1wxe4WThXlGSj2iocQ4NPnqmZRcJvYl3sMDLJLwQRTM8/edit`
2. Pastikan nama sheet (tab) adalah: **`Database_Sertifikat`**
3. Klik tombol **Share (Bagikan)** di pojok kanan atas:
   - Akses umum: Ubah menjadi **"Siapa saja yang memiliki link"** (Anyone with the link).
   - Peran: **Pelihat (Viewer)**.
4. Selesai! Website sudah bisa membaca data sertifikat secara real-time.

## Struktur Kolom Spreadsheet (Tab: Database_Sertifikat)
- **Kolom A**: `ID_Sertifikat` (Contoh: `GDG-UNM/X/26/MBR001`)
- **Kolom B**: `Nama_Penerima` (Nama lengkap penerima)
- **Kolom C**: `Peran` (`PARTICIPANT` | `SPEAKER` | `MODERATOR` | `CORE TEAM`)
- **Kolom D**: `Nama_Event` (Nama kegiatan)
- **Kolom E**: `Tanggal_Terbit` (Contoh: `October 2026`)
- **Kolom F**: `Status` (`VALID` atau `REVOKED`)

## URL Auto-Verify (Untuk QR Code Sertifikat)
Untuk membuat QR Code di sertifikat yang langsung memverifikasi otomatis:
```
https://s.id/gdgocunm-verify?id=GDG-UNM/X/26/MBR001&auto=true
```
atau URL hosting langsung:
```
https://gdgocunm.netlify.app/certificate-verification/?id=GDG-UNM/X/26/MBR001&auto=true
```

### 💡 Catatan Penyesuaian di Web Verifikasi (Frontend):
Untuk fitur Auto-Verifikasi, pastikan kode JavaScript di Web App (`s.id/gdgocunm-verify`) mendeteksi query `auto=true` saat halaman dimuat:

```javascript
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const certId = urlParams.get('id');
  const isAuto = urlParams.get('auto');

  if (certId && isAuto === 'true') {
    // Panggil fungsi verifikasi kamu secara otomatis di sini
    verifyCertificate(certId);
  }
});
```

(c) 2026/2027 GDGoC UNM - Google Developer Groups on Campus • Universitas Negeri Makassar

