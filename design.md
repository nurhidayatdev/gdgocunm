# GDGoC UNM — Design System & Project Context Specification

Dokumen ini adalah **panduan desain resmi (Design System & Architectural Context)** untuk seluruh ekosistem website **Google Developer Groups on Campus (GDGoC) Universitas Negeri Makassar (UNM)**.

Dokumen ini disusun berdasarkan implementasi nyata pada [`index.html`](file:///d:/Coding/gdgocunm/index.html), [`css/style.css`](file:///d:/Coding/gdgocunm/css/style.css), dan [`css/animations.css`](file:///d:/Coding/gdgocunm/css/animations.css). Seluruh halaman baru (seperti halaman photobooth, certificate verification, event showcase, project gallery, dsb.) **wajib** mengikuti pedoman, token desain, dan struktur komponen yang ada di sini untuk menjaga konsistensi visual dan pengalaman pengguna.

---

## 1. Brand Identity & Design Philosophy

### 1.1 Identitas Organisasi
- **Nama Komunitas**: Google Developer Groups on Campus (GDGoC) Universitas Negeri Makassar
- **Singkatan**: GDGoC UNM
- **Motto / Core Pillars**: `Learn • Build • Grow` (Belajar • Bangun • Berkembang)
- **Local Identity**: Menara Pinisi UNM (siluet arsitektur khas kampus yang disematkan secara elegan di ambient hero).

### 1.2 Filosofi Desain: "Dark Developer UI" (Google AI Studio Aesthetic)
Desain GDGoC UNM memadukan estetika *modern developer tool* seperti **Google AI Studio** dan **Google Cloud Console**, dengan elemen *frosted glassmorphism* dan 4 aksen warna resmi Google (*Google Quad-Color*):
1. **Dark & Focused**: Background gelap bertingkat (`#171B21`, `#111319`, `#161822`) yang nyaman di mata pengembang dan menonjolkan konten utama.
2. **Subtle Tech Textures**: Overlay grid geometris halus (`48px x 48px`) dengan radial mask dan ambient light gradients lembut (blur 80–100px).
3. **Google Quad-Color Accents**: Sentuhan warna Google (Biru, Merah, Kuning, Hijau) digunakan secara presisi sebagai aksen batas (border gradients), dot indikator, badge status, dan hover glow.
4. **Pill & Frosted Glass Surfaces**: Komponen floating navigation, tombol, badge, dan modal memanfaatkan `backdrop-filter: blur()`, rounded pills, dan gradien metalik gelap (`linear-gradient(55deg, #222222, #404040)`).

---

## 2. Design Tokens & CSS Variables

Seluruh variabel CSS didefinisikan pada root [`css/style.css`](file:///d:/Coding/gdgocunm/css/style.css#L6-L62):

```css
:root {
    /* Google Brand Colors */
    --google-blue: #4285f4;
    --google-red: #ea4335;
    --google-yellow: #fbbc04;
    --google-green: #34a853;

    /* Accent Bright Variants (Untuk teks atau badge di atas background gelap) */
    --blue-light: #8ab4f8;
    --red-light: #f28b82;
    --yellow-light: #fdd663;
    --green-light: #81c995;

    /* Ambient Glows */
    --blue-glow: rgba(66, 133, 244, 0.22);
    --red-glow: rgba(234, 67, 53, 0.22);
    --yellow-glow: rgba(251, 188, 4, 0.22);
    --green-glow: rgba(52, 168, 83, 0.22);

    /* Dark Theme Surface Palette */
    --bg-primary: #171B21;        /* Background dasar halaman */
    --bg-secondary: #111319;      /* Background kontras lebih gelap */
    --bg-tertiary: #161822;       /* Background section selang-seling */
    --bg-card: rgba(20, 23, 32, 0.78); /* Card standar transparan */
    --bg-card-hover: rgba(26, 30, 42, 0.92);
    --bg-glass: rgba(14, 16, 24, 0.82); /* Floating navigation & modal */

    /* Borders & Lines */
    --border-subtle: rgba(255, 255, 255, 0.08);
    --border-card: #232734;
    --border-card-hover: rgba(66, 133, 244, 0.45);
    --border-focus: #4285f4;

    /* Typography */
    --text-primary: #f5f7fc;      /* Judul dan teks utama */
    --text-secondary: #9aa0a6;    /* Deskripsi dan paragraf */
    --text-muted: #6b7280;        /* Label metadata, timestamp */
    --text-code: #bdc1c6;

    /* Font Families */
    --font-sans: "Google Sans", sans-serif;
    --font-mono: "Google Sans", sans-serif; /* Fallback konsisten */

    /* Border Radii */
    --radius-sm: 8px;
    --radius-md: 14px;
    --radius-lg: 20px;
    --radius-pill: 9999px;

    /* Elevation Shadows */
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.4);
    --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.55);
    --shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.7);

    /* Transition Timings */
    --transition-fast: 0.18s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-normal: 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-smooth: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 3. Global Ambient & Background Layers

Setiap halaman di proyek ini **wajib** menggunakan lapisan background global berikut agar tidak terasa datar (*flat*):

### 3.1 Struktur HTML Background Layer
Letakkan tepat setelah tag pembuka `<body>`:
```html
<body id="top">
    <!-- Tech Grid Lines Overlay -->
    <div class="tech-grid-overlay" aria-hidden="true"></div>

    <!-- Konten Halaman Dimulai Di Sini -->
</body>
```

### 3.2 Spesifikasi CSS Lapis Background
- **Body Background**:
  ```css
  body {
      background: linear-gradient(180deg, #181818 0%, #171b21 100%) no-repeat fixed;
      background-color: #171b21;
      color: var(--text-primary);
      font-family: var(--font-sans);
  }
  ```
- **`.tech-grid-overlay`**: Grid geometris berukuran `48px x 48px` dengan garis transparan `rgba(255, 255, 255, 0.02)` dan radial mask untuk efek vignette modern.

### 3.3 Container Layout
Gunakan class `.container` untuk membatasi lebar konten:
```css
.container {
    width: 100%;
    max-width: 1220px;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;
    z-index: 1;
}
```

---

## 4. Typography Hierarchy & Text Styles

| Level | Elemen / Class | Font Size (Desktop) | Weight | Letter Spacing | Warna | Keterangan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | `.hero-title` | `3.5rem` (56px) | 800 | `-0.03em` | `#ffffff` | Judul utama halaman landing |
| **Section Title** | `.section-title` | `2.4rem` (38px) | 700 | `-0.02em` | `var(--text-primary)` | Judul tiap bagian/seksi |
| **Card Header** | `h3` / `.card-title` | `1.3rem - 1.5rem` | 700 | `-0.01em` | `#ffffff` | Judul dalam card |
| **Subtitle** | `.section-subtitle` | `1.05rem` (17px) | 400 | Normal | `var(--text-secondary)` | Penjelas di bawah section title |
| **Body Paragraph**| `p` / `.body-text` | `0.94rem - 1.0rem` | 400 | Normal | `var(--text-secondary)` | Line height: 1.6 - 1.65 |
| **Tag / Pill Label**| `.section-tag`, `.badge-pill` | `0.78rem - 0.82rem`| 600 | `+0.04em` | Beragam (Google Aksen)| Uppercase/Cap status pill |
| **Caption / Meta** | `.stat-sub`, `.team-major` | `0.76rem - 0.78rem`| 500 | Normal | `var(--text-muted)` | Keterangan tambahan |

### 4.1 Kebersihan Header & Aturan Badge

> [!WARNING]
> **KEBERSIHAN HEADER CARD & PANEL (DILARANG MENAMBAH BADGE ARTIFISIAL)**:
> Jangan menambahkan badge/tag artifisial (seperti `STUDIO CONFIG` atau label buatan serupa) di atas judul panel atau card yang membuat tampilan padat dan kotor.
> Header panel, form, atau kartu interaktif harus bersih, minimalis, dan langsung berfokus pada judul (`h1`/`h2`/`h3`) serta deskripsi pengantar secara profesional tanpa badge berlebihan.

> [!CAUTION]
> **DILARANG MENGGUNAKAN EMOJI (STRICT NO-EMOJI POLICY)**:
> Seluruh elemen antarmuka, teks tombol, opsi dropdown select, label, badge, modal, dan notifikasi toast **DILARANG KERAS** menggunakan karakter emoji (seperti 📸, ☀️, 🎞️, 📼, ⚡, 💾, 🚀, dll.).
> Gunakan ikon SVG garis bersih (*clean stroke SVG*) yang terukur dan profesional, atau gunakan teks teknis/deskriptif yang lugas.

### 4.2 Section Header Standard Template (Landing Pages Only)
Hanya untuk seksi utama pada halaman landing umum (bukan untuk panel/card internal):
```html
<div class="section-header">
    <span class="section-tag">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <!-- Icon SVG -->
        </svg>
        NAMA SEKSI
    </span>
    <h2 class="section-title">Judul Seksi yang Kuat & Menarik</h2>
    <p class="section-subtitle">
        Deskripsi pengantar singkat mengenai apa yang ada pada seksi ini secara jelas dan informatif.
    </p>
</div>
```

---

## 5. UI Component Library (HTML & CSS Blueprints)

### 5.1 Floating Frosted Pill Navbar (`.site-header`)
Navbar khas GDGoC UNM melayang di bagian atas halaman dengan rounded pill, frosted glass blur, dan bingkai gradien 4 warna Google:

```html
<header class="site-header" id="navbar">
    <div class="container">
        <nav class="nav-inner" aria-label="Main Navigation">
            <!-- Brand Logo -->
            <a href="index.html" class="nav-brand">
                <div class="nav-logo-icon">
                    <img src="assets/images/logo-gdgoc.png" alt="GDGoC Logo" width="36" height="24">
                </div>
                <div class="nav-brand-text">
                    <span class="nav-brand-title">
                        GDG <span class="campus-tag">on Campus</span>
                    </span>
                    <span class="nav-brand-sub">Universitas Negeri Makassar</span>
                </div>
            </a>

            <!-- Desktop Links -->
            <ul class="nav-links">
                <li><a href="#about" class="nav-link active">Tentang</a></li>
                <li><a href="#activities" class="nav-link">Kegiatan</a></li>
                <li><a href="#learning-paths" class="nav-link">Learning Paths</a></li>
                <li><a href="#team" class="nav-link">Core Team</a></li>
                <li><a href="#faq" class="nav-link">FAQ</a></li>
            </ul>

            <!-- Actions & Mobile Toggle -->
            <div class="nav-actions">
                <a href="#join" class="btn-primary nav-cta">
                    <span>Gabung Sekarang</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
                <button class="mobile-toggle" id="mobileNavToggle" aria-label="Buka Menu">
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </button>
            </div>
        </nav>
    </div>
</header>

<!-- Mobile Navigation Drawer & Backdrop -->
<div class="mobile-nav-backdrop" id="mobileNavBackdrop"></div>
<div class="mobile-nav-drawer" id="mobileNavDrawer">
    <div class="mobile-nav-menu-list">
        <a href="#about" class="nav-link">Tentang</a>
        <a href="#activities" class="nav-link">Kegiatan</a>
        <a href="#learning-paths" class="nav-link">Learning Paths</a>
        <a href="#team" class="nav-link">Core Team</a>
        <a href="#faq" class="nav-link">FAQ</a>
    </div>
    <div class="mobile-drawer-cta-box">
        <a href="#join" class="btn-primary">Gabung GDGoC UNM</a>
    </div>
</div>
```

**Kunci CSS Navbar**:
- `background: linear-gradient(55deg, #222222 0%, #222222 68%, #404040 100%) padding-box, linear-gradient(90deg, #ea4335 0%, #fbbc04 34%, #34a853 67%, #4285f4 100%) border-box;`
- `border: 1.82px solid transparent;`
- `backdrop-filter: blur(20px);`
- `border-radius: var(--radius-pill);`

---

### 5.2 Button System

> [!IMPORTANT]
> **ATURAN MUTLAK SISTEM TOMBOL (HANYA DUA TIPE BACKGROUND)**:
> Di seluruh ekosistem website GDGoC UNM, seluruh tombol **HANYA MEMILIKI DUA (2) TIPE GAYA BACKGROUND**:
> 1. **Style Putih (`.btn-primary`)**: Background gradien putih metalik (`linear-gradient(180deg, #ffffff 0%, #a4a4a4 100%)`) dengan teks hitam `#111111` dan border `1px solid rgba(255, 255, 255, 0.5 - 0.6)`. Digunakan untuk seluruh **Aksi Utama / CTA Primer** (misal: "Gabung Sekarang", "Continue to Camera", "Download HD Photo", "Auto-Sequence").
> 2. **Style Hitam (`.btn-secondary`)**: Background gradien kapsul gelap (`linear-gradient(55deg, #222222 0%, #222222 68%, #404040 100%)`) dengan teks terang `#f5f7fc` dan border `1.5px solid rgba(255, 255, 255, 0.12)` yang memunculkan bingkai gradien 4 warna Google saat di-hover. Digunakan untuk seluruh **Aksi Alternatif / Sekunder** (misal: "Pelajari Lebih Lanjut", "Change Settings", "Reset", "Retake Photos").
>
> **DILARANG KERAS**:
> - Membuat tombol dengan background berwarna solid (seperti tombol berlatar biru `#4285f4`, hijau `#34a853`, merah `#ea4335`, atau warna lainnya).
> - Seluruh aksen warna Google (biru, merah, kuning, hijau) HANYA boleh hadir sebagai aksen garis (border gradient), indikator dot, atau bayangan hover glow, **BUKAN** sebagai warna background tombol!

#### 1. Primary Button — Style Putih (`.btn-primary`)
Digunakan untuk aksi utama (CTA terpenting, Submit, Gabung, Konfirmasi, Download HD). Tampilan gradien putih metalik dengan teks gelap yang sangat kontras:
```html
<a href="#" class="btn-primary">
    <span>Aksi Utama</span>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
</a>
```
- **Styling**:
  ```css
  .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 22px;
      border-radius: var(--radius-pill);
      font-size: 0.92rem;
      font-weight: 700;
      background: linear-gradient(180deg, #ffffff 0%, #a4a4a4 100%);
      color: #111111;
      border: 1px solid rgba(255, 255, 255, 0.6);
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
      transition: all var(--transition-normal);
  }
  .btn-primary:hover {
      background: linear-gradient(180deg, #ffffff 0%, #b8b8b8 100%);
      color: #000000;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2), 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  ```

#### 2. Secondary Button — Style Hitam (`.btn-secondary`)
Digunakan untuk aksi alternatif (Eksplorasi, Pelajari Lebih Lanjut, Batal, Pengaturan). Tampilan kapsul gelap dengan hover yang memunculkan bingkai 4 warna Google:
```html
<a href="#" class="btn-secondary">
    <span>Pelajari Lebih Lanjut</span>
</a>
```
- **Styling**:
  ```css
  .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 18px;
      border-radius: var(--radius-pill);
      font-size: 0.86rem;
      font-weight: 500;
      border: 1.5px solid rgba(255, 255, 255, 0.12);
      background: linear-gradient(55deg, #222222 0%, #222222 68%, #404040 100%);
      color: var(--text-primary);
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
      transition: all var(--transition-normal);
  }
  .btn-secondary:hover {
      border: 1.5px solid transparent;
      background:
          linear-gradient(55deg, #2a2a2a 0%, #2a2a2a 68%, #484848 100%) padding-box,
          linear-gradient(90deg, #ea4335 0%, #fbbc04 34%, #34a853 67%, #4285f4 100%) border-box;
      color: #ffffff;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45), 0 0 16px rgba(66, 133, 244, 0.25);
  }
  ```

#### 3. Circular Action / Social Button (`.social-icon-btn` & `.tracks-carousel-arrow`)
Mengikuti style hitam atau putih bulat:
```html
<button class="tracks-carousel-arrow" aria-label="Next">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
</button>
```

---

### 5.3 Badges, Tags, & Status Pills

#### 1. Google 4-Color Dots
```html
<div class="mini-logo-dots">
    <span class="dot-blue"></span>
    <span class="dot-red"></span>
    <span class="dot-yellow"></span>
    <span class="dot-green"></span>
</div>
```

#### 2. Category / Activity Badges
```html
<span class="activity-badge badge-blue">Workshop</span>
<span class="activity-badge badge-red">Competition</span>
<span class="activity-badge badge-green">Study Group</span>
<span class="activity-badge badge-yellow">Showcase</span>
```

#### 3. Tech Tag Pill (Monochrome Chip)
```html
<div class="activity-tags">
    <span class="tag-pill">Flutter</span>
    <span class="tag-pill">Firebase</span>
    <span class="tag-pill">Google Cloud</span>
</div>
```

#### 4. Motto Slogan Pill
```html
<div class="slogan-highlight-pill">
    <span class="l-word">Learn</span> • 
    <span class="b-word">Build</span> • 
    <span class="g-word">Grow</span>
</div>
```

---

### 5.4 Card Surfaces & Styles

#### Pola Card Standar (Dark Metallic Glass)
Semua card di ekosistem ini menggunakan gradien sudut 55 derajat khas:
```html
<div class="card-metallic">
    <!-- Card Content -->
</div>
```
```css
.card-metallic {
    background: linear-gradient(55deg, #222222 0%, #222222 68%, #404040 100%);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: var(--radius-lg);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    transition: all var(--transition-normal);
}

.card-metallic:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.25);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
}
```

#### 3 Pilar Card (Belajar, Bangun, Berkembang)
Setiap pilar memiliki ikon kotak dengan latar belakang warna Google:
- **Biru (Belajar)**: `.pillar-icon-box.blue` (`background: rgba(66, 133, 244, 0.15); color: #8ab4f8;`)
- **Hijau (Bangun)**: `.pillar-icon-box.green` (`background: rgba(52, 168, 83, 0.15); color: #81c995;`)
- **Kuning (Berkembang)**: `.pillar-icon-box.yellow` (`background: rgba(251, 188, 4, 0.15); color: #fdd663;`)

#### Photostrip Frame & Gradient Stroke Slot Pattern
Untuk modul visual/photostrip, permukaan frame mengadopsi dark metallic glass dengan garis aksen Google dan stroke gradien pada slot foto:
- **Frame Background**: `linear-gradient(55deg, #222222 0%, #222222 68%, #404040 100%)` dengan 3px top Google quad-color accent line.
- **Photo Slot Gradient Stroke**:
  ```css
  .photo-slot-gradient {
      padding: 1.5px;
      border-radius: 7px;
      background: linear-gradient(135deg, #ea4335 0%, #fbbc04 34%, #34a853 67%, #4285f4 100%);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.55);
      box-sizing: border-box;
  }
  .photo-slot-gradient img {
      width: 100%;
      height: 100%;
      border-radius: 5.5px;
      display: block;
      object-fit: cover;
  }
  ```

---

### 5.5 Learning Path Carousel (1-Row Horizontal Slider)
Pola carousel responsif 1 baris dengan kontrol panah kiri/kanan dan kartu interaktif:
- **Desktop besar**: Menampilkan 4 kartu per viewport (`flex: 0 0 calc((100% - 60px) / 4);`).
- **Tablet**: Menampilkan 2–3 kartu per viewport.
- **Mobile**: Menampilkan 1 kartu lebar penuh (`flex: 0 0 85%;`) dengan swipe / touch gesture.

---

### 5.6 Accordion (FAQ Pattern)
Komponen FAQ yang bersih dengan panah SVG yang berputar mulus saat dibuka:
```html
<div class="faq-list">
    <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
            <span>Apakah saya harus mahasiswa jurusan IT untuk bergabung?</span>
            <svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        </button>
        <div class="faq-answer">
            <p>Tidak! GDGoC UNM terbuka untuk seluruh mahasiswa aktif UNM dari fakultas dan jurusan apa pun yang tertarik pada teknologi.</p>
        </div>
    </div>
</div>
```
---

### 5.8 Footer Ekosistem (`.site-footer`)
Footer universal yang wajib disematkan di semua halaman:
```html
<footer class="site-footer">
    <div class="container">
        <div class="footer-top">
            <div class="footer-brand">
                <div class="footer-brand-header">
                    <img src="assets/images/gdgoc-logo.webp" alt="GDGoC Logo" class="footer-logo-full">
                </div>
                <p>Komunitas pengembang mahasiswa berbasis di Universitas Negeri Makassar yang didukung oleh Google Developers.</p>
                <a href="https://gdg.community.dev/gdg-on-campus-universitas-negeri-makassar-makassar-indonesia/" target="_blank" rel="noopener" class="footer-community-link">
                    <span class="community-dot"></span>
                    <span>GDG Community Platform</span>
                </a>
            </div>
            
            <div class="footer-nav-wrapper">
                <div class="footer-col">
                    <h4>Navigasi</h4>
                    <ul class="footer-links">
                        <li><a href="#about">Tentang Kami</a></li>
                        <li><a href="#activities">Kegiatan</a></li>
                        <li><a href="#learning-paths">Learning Paths</a></li>
                        <li><a href="#team">Core Team</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Program</h4>
                    <ul class="footer-links">
                        <li><a href="#">Solution Challenge</a></li>
                        <li><a href="#">Tech Workshop</a></li>
                        <li><a href="#">Study Jams</a></li>
                        <li><a href="photobooth.html">Photobooth Studio</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Media Sosial</h4>
                    <div class="footer-social-icons">
                        <!-- Instagram, LinkedIn, GitHub, YouTube SVG Links -->
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; 2024 - 2026 GDGoC Universitas Negeri Makassar. All rights reserved.</p>
            <p class="footer-disclaimer">Google Developer Groups on Campus is an independent group; the activities and the opinions expressed here should in no way be linked to Google, the corporation.</p>
        </div>
    </div>
</footer>
```

---

## 6. Iconography & Media Asset Rules

### 6.1 Direktori Aset Resmi
- **Logo Utama**: `assets/images/gdgoc-logo.webp` (Logo teks lengkap + brackets)
- **Logo Simbol**: `assets/images/logo-gdgoc.png` (Simbol kurung kurawal 4 warna)
- **Local Backdrop**: `assets/images/pinisi-tower.png` (Siluet Menara Pinisi transparan)
- **Tim Core**: `assets/images/team/lead.webp`, dll.

### 6.2 Icon Guidelines
- Gunakan **SVG inline** dengan atribut:
  `stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"`
- Ukuran standar ikon tombol: `14px` x `14px` atau `16px` x `16px`.
- Ukuran standar ikon kartu/navigasi: `20px` x `20px` atau `24px` x `24px`.
- Hindari pemakaian font icon eksternal yang lambat dimuat (mis. FontAwesome CDN berat); prioritaskan SVG bersih agar halaman instan dirender.

---

## 7. Responsive Breakpoint Standards

Sistem breakpoint GDGoC UNM:

| Breakpoint | Target Layar | Perilaku Layout |
| :--- | :--- | :--- |
| **`> 1200px`** | Desktop Besar | Container maksimal `1220px`, 4 kolom track card, 2 kolom seimbang hero & about. |
| **`992px - 1199px`** | Desktop Sedang / Laptop | Carousel menampilkan 3 kartu per row, navigasi desktop tetap utuh. |
| **`768px - 991px`** | Tablet Landscape/Portrait | Hero beralih menjadi vertikal tersusun, grid 2 kolom, navbar berubah ke hamburger toggle. |
| **`< 768px`** | Smartphone Standar | Navigasi berpindah penuh ke `.mobile-nav-drawer` dengan backdrop blur. Grid beralih ke 1 kolom. Padding container mengecil ke `16px`. Tombol hero menjadi stack vertikal atau full-width. |
| **`< 480px`** | Smartphone Kecil | Font clamp otomatis menyesuaikan (`clamp(1.8rem, 7vw, 2.4rem)`). Carousel swipe touch diaktifkan penuh. |

---

## 8. Panduan Implementasi Halaman Baru (Checklist)

Saat Anda atau agen AI membuat halaman baru di repositori ini (misal `events.html`, `verify.html`, `photobooth.html`), pastikan:

1. [ ] **Head Tag Lengkap**: Mengimpor font `'Google Sans'` atau Inter, favicon resmi GDGoC, meta viewport, dan link ke `css/style.css` serta `css/animations.css`.
2. [ ] **Background Overlay**: Memasang `.tech-grid-overlay` di awal tag `<body>`.
3. [ ] **Header Konsisten**: Menggunakan `.site-header` dengan floating frosted pill dan link navigasi yang sesuai.
4. [ ] **Palet Warna**: Selalu gunakan variabel CSS `--google-blue`, `--bg-primary`, `--bg-card`, `--border-card` dan jangan gunakan *hardcoded hex* acak di luar design system.
5. [ ] **Buttons & Actions (Aturan 2 Tipe)**: HANYA gunakan Style Putih (`.btn-primary`) untuk aksi utama dan Style Hitam (`.btn-secondary`) untuk aksi sekunder. DILARANG membuat tombol dengan background berwarna solid (biru, hijau, dsb).
6. [ ] **No Emojis & Clean Headers**: DILARANG keras menggunakan karakter emoji pada teks UI/tombol/modal, serta hindari badge artifisial yang menumpuk di atas judul panel.
7. [ ] **Footer Lengkap**: Memasang `.site-footer` dengan disclaimer resmi Google Developer Group di baris bawah.
8. [ ] **Mobile Responsiveness**: Uji tampilan pada viewport mobile (`< 480px`) agar tidak terjadi *horizontal overflow* dan menu drawer berfungsi lancar.

---

*Dokumen ini diperbarui secara berkala sebagai panduan resmi pengembangan website GDGoC UNM.*
