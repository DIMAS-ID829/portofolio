Proyek Website Portofolio - Dimas Kurnia S
Ini adalah website portofolio pribadi untuk Dimas Kurnia S, seorang developer dan desainer. Website ini menampilkan layanan yang ditawarkan, proyek-proyek sebelumnya, dan informasi kontak. Dibuat dengan HTML, CSS, dan JavaScript.

📜 Daftar Isi
Struktur File

Struktur HTML

Styling (CSS)

Fungsionalitas (JavaScript)

Cara Menjalankan

📁 Struktur File
Struktur file dasar untuk proyek ini kemungkinan akan terlihat seperti ini:

/portfolio-website
|
|-- index.html         // File HTML utama
|-- /css
|   |-- style.css      // Stylesheet utama
|
|-- /js
|   |-- main.js        // File JavaScript utama
|
|-- /images            // Folder untuk semua aset gambar
    |-- hero-image.png // Foto di hero section
    |-- icon-palette.png
    |-- icon-laptop.png
    |-- icon-thumbsup.png
    |-- portfolio-nike.png
    |-- portfolio-bag.png
    |-- (dan gambar lainnya)
🏛️ Struktur HTML
File index.html akan disusun secara semantik untuk membagi halaman menjadi beberapa bagian yang logis.

<header> (Navigasi):

Logo atau nama brand di kiri ("MIRAGE | STRIKETROUGH").

Sebuah <ul> (daftar) untuk link navigasi ("Blog", "Sites").

Sebuah tombol (<button>) untuk Toggle Dark/Light Mode (ikon bulan 🌙).

<main> (Konten Utama):

Section 1: Hero (<section class="hero">)

Satu div untuk konten teks:

<h1> untuk nama ("Dimas Kurnia S").

<p> untuk tagline ("Developer and designer.").

<p> untuk deskripsi singkat.

Satu div untuk Link Sosial Media (Twitter, LinkedIn, dll.) dalam bentuk daftar ikon.

Satu div untuk gambar profil (<img ...>).

Section 2: Services (<section class="services">)

<h2> untuk judul ("Services I offer").

<p> untuk paragraf pengantar.

Sebuah container (<div class="services-grid">) yang menampung tiga kartu layanan.

Setiap kartu (<div class="service-card">):
<img> atau ikon (palette, laptop, thumbs up).
<h3> untuk judul layanan (Contoh: "Beautiful Designs").
<p> untuk deskripsi layanan.
<h4> untuk sub-judul ("Design Tools I Use").
<ul> untuk daftar tools (Photoshop, Vs Code, dll.).
Section 3: Portfolio (<section class="portfolio">)
<h2> untuk judul ("Portofolio").
<p> untuk paragraf pengantar (tampaknya sama dengan di section "Services").
Sebuah container (<div class="portfolio-grid">) yang menampung item-item portofolio.
Setiap item (<div class="portfolio-item">) kemungkinan adalah link (<a>) yang berisi:
Gambar latar belakang proyek.
<h3> untuk nama proyek (Contoh: "Nike Air", "Tooth Bag", "Dropnow").
<footer> (Footer):
Garis horizontal (<hr>).
Teks hak cipta (<p>© 2025 Dimas Id. All rights reserved.</p>).
✨ Styling (CSS)
File style.css akan menangani seluruh tampilan dan nuansa website, dengan fokus pada:
Tema Gelap (Dark Mode):
Warna latar belakang utama adalah biru navy sangat gelap (misalnya #0a0f21).
Warna teks utama adalah putih atau abu-abu muda
Warna aksen (untuk tombol, link, dan beberapa judul) adalah cyan atau teal (misalnya #22d3ee).
Layout (Tata Letak):
CSS Flexbox kemungkinan besar digunakan pada <header> untuk menyejajarkan logo, link, dan tombol.
CSS Grid atau Flexbox digunakan pada section Hero untuk membagi area menjadi dua kolom (teks di kiri, gambar di kanan).
CSS Grid (misalnya grid-template-columns: repeat(3, 1fr)) digunakan untuk membuat tata letak 3 kolom yang rapi pada Services dan Portfolio.
Komponen:
Cards: Diberi border-radius untuk sudut melengkung dan padding internal.
Buttons: Memiliki background-color aksen (cyan) dan border-radius.
Tipografi: Menggunakan font sans-serif (mungkin "Nunito", seperti yang disebutkan di salah satu item portofolio). Ukuran font memiliki hierarki yang jelas (H1 besar, H2 lebih kecil, dst.).
⚡ Fungsionalitas (JavaScript)
File main.js akan menangani interaktivitas website.
Theme Toggle (Pengganti Tema):
Memberi event listener click pada tombol ikon bulan 🌙 di header.
Saat diklik, script akan menambahkan atau menghapus sebuah class (misalnya .light-mode) pada elemen <body>.
CSS akan memiliki aturan styling terpisah untuk .light-mode (misal: body.light-mode { background-color: white; color: black; }).
Preferensi tema (gelap atau terang) akan disimpan di localStorage agar pilihan pengguna tetap tersimpan saat me-refresh halaman.
(Opsional) Efek Scroll:
Kemungkinan menggunakan Intersection Observer API untuk memunculkan (fade-in) section "Services" dan "Portfolio" saat pengguna scroll ke bagian tersebut.
(Opsional) Menu Mobile:

Pada layar kecil, script ini akan menangani event click pada tombol "hamburger menu" (jika ada) untuk menampilkan atau menyembunyikan navigasi mobile.

🚀 Cara Menjalankan
Clone repositori ini (jika tersedia).

Buka file index.html di browser pilihan kamu.

Selesai! Tidak ada build step atau dependency yang diperlukan.
