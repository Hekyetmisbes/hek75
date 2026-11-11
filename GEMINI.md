# GEMINI.md

## Proje Hakkında
Bu proje, Harun Emrecan Karabağ'ın kişisel portfolyo web sitesidir (HEK75 Arcade OS). Astro 5, Vanilla JavaScript ve Vanilla CSS kullanılarak statik (SSG - Static Site Generation) olarak üretilmektedir.

## Teknoloji Yığını
- **Framework:** Astro 5
- **Build Tool:** Astro / Vite (dahili)
- **Styling:** Vanilla CSS (`src/styles/arcade.css`) — Retro CRT / Arcade teması
- **Client Scripts:** Vanilla JavaScript (`public/scripts/` — `terminal.js`, `sound.js`, `search-index.js`)
- **Deployment:** GitHub Pages

## Mimari Yapı ve Kurallar
- **Routing:** Astro sayfa tabanlı routing (`src/pages/`). Statik pitch deck girişleri `public/projects/thefinalloop` ve `public/projects/theunlitdoor` altındadır.
- **Dil Politikası:** Açıklamalar Türkçe, teknik terimler (API adları, değişkenler, sınıf isimleri) İngilizce olmalıdır.
- **Astro Konfigürasyonu:** Yönlendirmeler ve build ayarları `astro.config.mjs` üzerinden yönetilir (`build.inlineStylesheets: 'always'` ile render-blocking CSS önlenir).
- **SEO & Doğrulama:** Build sürecinde deterministic sitemap (`scripts/generate-sitemap.mjs`), SEO validation (`scripts/validate-seo.mjs`) ve security validation (`scripts/validate-security.mjs`) otomatik çalışır.

## Kodlama Standartları
- Performans, Core Web Vitals ve sıfır render-blocking prensibi önceliklidir.
- Retro arcade / CRT scanlines ve CRT vignette görsel kimliği korunmalıdır.
- Gereksiz harici framework veya dependency eklenmemelidir.
- Statik dosyalar (PDF, robots.txt, assetler vb.) `public/` klasöründe tutulmalıdır.
- Ağır görseller WebP alternatifleri ve optimize PNG olarak sunulmalıdır.

## Oyun Geliştirme Notları
- Proje içerisinde yer alan oyun pitch'leri ve dokümanları, oyunun ruhunu ve kullanıcı deneyimini (retention, flow vb.) koruyacak şekilde düzenlenmelidir.
- Unity ve Unreal Engine ile ilgili teknik detaylarda engine-specific en iyi pratikler (Addressables, URP, Blueprint/C++ ayrımı) gözetilmelidir.
