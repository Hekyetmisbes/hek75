# GEMINI.md

## Proje Hakkında
Bu proje, Harun Emrecan Karabağ'ın kişisel portfolyo web sitesidir. Vite, React ve Tailwind CSS kullanılarak geliştirilmiş çok sayfalı (Multi-Page Application) bir yapıdır.

## Teknoloji Yığını
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (Vanilla CSS tercih edilir)
- **Deployment:** GitHub Pages

## Mimari Yapı ve Kurallar
- **Multi-Page Setup:** Proje, ana sayfa haricinde `projects/thefinalloop`, `projects/theunlitdoor` ve `projects/easter-egg` gibi bağımsız giriş noktalarına (entry points) sahiptir.
- **Dil Politikası:** Açıklamalar Türkçe, teknik terimler (API adları, değişkenler, sınıf isimleri) İngilizce olmalıdır.
- **Vite Konfigürasyonu:** Yeni sayfalar eklendiğinde `vite.config.js` içerisindeki `rollupOptions.input` güncellenmelidir.

## Kodlama Standartları
- Performans odaklı, temiz ve sürdürülebilir kod yazımı önceliklidir.
- Gereksiz asset tekrarlarından kaçınılmalıdır.
- React bileşenleri `src/components` altında organize edilmelidir.
- Statik dosyalar (PDF, robots.txt vb.) `public/` klasöründe tutulmalıdır.

## Oyun Geliştirme Notları
- Proje içerisinde yer alan oyun pitch'leri ve dokümanları, oyunun ruhunu ve kullanıcı deneyimini (retention, flow vb.) koruyacak şekilde düzenlenmelidir.
- Unity ve Unreal Engine ile ilgili teknik detaylarda engine-specific en iyi pratikler (Addressables, URP, Blueprint/C++ ayrımı) gözetilmelidir.
