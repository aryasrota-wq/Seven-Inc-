SEVEN INC — dibuat dari template Arsha (BootstrapMade)
======================================================
Template   : Arsha — https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
Lisensi    : https://bootstrapmade.com/license/  (link kredit "Designed by BootstrapMade" di footer HARUS tetap ada)

YANG DIUBAH DARI TEMPLATE
  index.html          : isi teks, logo, gambar, link, peta, sosmed -> Seven Inc (struktur & class Arsha dipertahankan)
  404.html            : header/footer & teks disesuaikan
  assets/css/main.css : variabel warna di :root & .light-background / .dark-background diganti (tema hitam-merah);
                        blok "Kustomisasi Seven Inc" di bagian paling bawah
  assets/js/main.js   : blok "Kustomisasi Seven Inc" di bagian paling bawah (link WhatsApp, form, hitung angka)
  assets/img/         : logo, model, tekstur layanan, ilustrasi produk
  Dihapus             : blog.html, blog-details.html, portfolio-details.html, service-details.html, starter-page.html,
                        folder assets/scss, serta gambar stok template yang tidak dipakai

PENGATURAN CEPAT  (assets/js/main.js, bagian paling bawah)
  WA_NUMBER      -> nomor WhatsApp (format 62xxxxxxxxxx)
  INSTAGRAM_URL  -> link Instagram

FOTO ASLI UNTUK KARTU LAYANAN
  Ganti gambar latar kartu di assets/img/services/ (konveksi.jpg, dropship.jpg, web.jpg, paket.jpg, titipsini.jpg, pengelasan.jpg)
  atau ubah url(...) pada class .svc-konveksi, .svc-dropship, dst di main.css.

CATATAN FORMULIR
  Formulir kontak dikirim lewat WhatsApp (JavaScript), bukan PHP, karena GitHub Pages tidak menjalankan PHP.
  Folder forms/ bawaan template dibiarkan, tetapi tidak dipakai.

HOSTING GITHUB PAGES
  git init ; git add . ; git commit -m "first commit" ; git branch -M main
  git remote add origin https://github.com/USERNAME/NAMA-REPO.git ; git push -u origin main
  Settings > Pages > Branch: main / (root) > Save.
  Setelah itu ganti USERNAME & NAMA-REPO di index.html (meta og:), robots.txt, dan sitemap.xml.
