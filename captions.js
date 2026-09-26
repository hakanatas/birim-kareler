/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 5. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 3.6, end: 9.6, tr: 'Bu dikdörtgenin içi ne kadar büyük?', en: 'How big is the inside of this rectangle?',
      note: 'Çevre, şeklin etrafıydı. Şimdi içine bakalım: bu dikdörtgenin içi ne kadar büyük? Buna alan diyoruz.' },
    { scene: 2, start: 10.6, end: 15.8, tr: 'Dairelerle ölçersek boşluk kalır', en: 'Measure with circles: gaps are left',
      note: 'Alanı ölçmek için bir birim seçmeliyiz. Dairelerle kaplamayı deneyelim: aralarında boşluklar kalıyor.' },
    { scene: 2, start: 16.2, end: 19.8, tr: 'Kareler boşluk bırakmadan kaplar', en: 'Squares cover with no gaps',
      note: 'Karelerle kaplarsak hiç boşluk kalmıyor. Bu yüzden alanı karelerle ölçeriz.' },
    { scene: 2, start: 20.4, end: 23.8, tr: 'Kenarı 1 cm olan kare: 1 cm², birim kare', en: 'A square with 1 cm sides: 1 cm², a unit square',
      note: 'Kenarları 1 santimetre olan kareye birim kare denir. Alanı 1 santimetrekaredir, 1 cm² diye yazılır.' },
    { scene: 3, start: 24.6, end: 31.6, tr: 'Dikdörtgeni birim karelerle kaplayıp sayalım', en: 'Cover the rectangle with unit squares and count',
      note: 'Dikdörtgeni birim karelerle kaplayalım ve sayalım: 1, 2, 3 … 15.' },
    { scene: 3, start: 32.0, end: 37.6, tr: '15 birim kare: alanı 15 cm²', en: '15 unit squares: the area is 15 cm²',
      note: 'Dikdörtgeni 15 birim kare kapladı. Alanı 15 santimetrekaredir: A(ABCD) = 15 cm².' },
    { scene: 4, start: 39.6, end: 42.8, tr: 'Büyük dikdörtgende tek tek saymak uzun sürer', en: 'Counting one by one takes long in a big rectangle',
      note: 'Daha büyük bir dikdörtgende kareleri tek tek saymak çok uzun sürer. Toplam birim kare sayısına nasıl daha hızlı ulaşabiliriz?' },
    { scene: 4, start: 43.2, end: 48.6, tr: 'Bir sırada 9 kare, 6 sıra var', en: '9 squares in a row, 6 rows',
      note: 'Kareleri sıra sıra yerleştirelim. Bir sırada 9 kare var ve 6 sıra var.' },
    { scene: 4, start: 49.2, end: 55.6, tr: '9 × 6 = 54 birim kare', en: '9 × 6 = 54 unit squares',
      note: '6 sıranın her birinde 9 kare var: 9 çarpı 6, 54 birim kare. Alanı 54 santimetrekare.' },
    { scene: 5, start: 56.6, end: 62.6, tr: 'Kenar uzunlukları = bir sıradaki kare ve sıra sayısı', en: 'Side lengths = squares in a row and number of rows',
      note: '7 santimetrelik kenara 7 kare, 4 santimetrelik kenara 4 sıra sığıyor. 7 çarpı 4, 28 santimetrekare.' },
    { scene: 5, start: 63.0, end: 69.6, tr: 'Dikdörtgenin alanı: iki ardışık kenarın çarpımı', en: 'Area of a rectangle: the product of two adjacent sides',
      note: 'Buradan şu sonuca varıyoruz: dikdörtgenin alanı, iki ardışık kenar uzunluğunun çarpımıdır. Uzun kenar çarpı kısa kenar.' },
    { scene: 6, start: 70.6, end: 76.4, tr: 'Büyük yerler için birim kare: 1 m²', en: 'For big places the unit square is 1 m²',
      note: 'Sınıf, bahçe gibi büyük yerleri ölçerken kenarı 1 metre olan kareleri kullanırız: 1 metrekare, 1 m².' },
    { scene: 6, start: 76.8, end: 83.6, tr: 'Sınıfın tabanı: 5 × 4 = 20 m²', en: 'The classroom floor: 5 × 4 = 20 m²',
      note: 'Sınıfımızın tabanı 5 metreye 4 metre olsun. Alanı 5 çarpı 4, 20 metrekare.' },
    { scene: 7, start: 84.6, end: 90.6, tr: 'Alan = birim kare sayısı = uzun kenar × kısa kenar', en: 'Area = number of unit squares = long side × short side',
      note: 'Unutma: alan birim karelerle ölçülür. Dikdörtgende birim kare sayısı, iki ardışık kenarın çarpımına eşittir.' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
