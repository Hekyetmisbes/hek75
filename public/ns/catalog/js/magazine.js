/**
 * NOODLE BROTHERS - DİJİTAL DERGİ MOTORU (GÜNCELLENMİŞ)
 * - Fare ve Dokunmatik Sürükle-Bırak (Drag to Flip) ile sayfa çevirme
 * - Web Audio API kağıt sesi sentezi
 * - Masaüstü çift sayfa (spread) ve mobil tek sayfa desteği
 * - Instagram QR modal ve gezinme kontrolleri
 */

(function () {
  'use strict';

  const TOTAL_PAGES = 14;
  const TOTAL_SPREADS = 8;

  let currentSpread = 0; // 0..7
  let currentMobilePage = 0; // 0..13
  let isMobile = window.innerWidth <= 991;
  let isSoundMuted = false;
  let audioCtx = null;

  // DOM
  const bookContainer = document.getElementById('magazineBook');
  const slides = document.querySelectorAll('.spread-slide');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const spreadIndicator = document.getElementById('spreadIndicator');
  const progressBar = document.getElementById('progressBar');
  const pageJumpSelect = document.getElementById('pageJumpSelect');
  const btnSoundToggle = document.getElementById('btnSoundToggle');
  const btnFullscreen = document.getElementById('btnFullscreen');
  const btnThumbnails = document.getElementById('btnThumbnails');
  const btnShareQr = document.getElementById('btnShareQr');

  const modalThumbnails = document.getElementById('modalThumbnails');
  const modalQr = document.getElementById('modalQr');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn');

  /* ==========================================================================
     WEB AUDIO API - KAĞIT HIŞIRTISI
     ========================================================================== */
  function initAudioContext() {
    if (!audioCtx) {
      const AudioClass = window.AudioContext || window.webkitAudioContext;
      if (AudioClass) audioCtx = new AudioClass();
    }
  }

  function playPageTurnSound() {
    if (isSoundMuted) return;
    try {
      initAudioContext();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const duration = 0.2;
      const bufferSize = audioCtx.sampleRate * duration;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.055;
        b1 = 0.99332 * b1 + white * 0.075;
        b2 = 0.96900 * b2 + white * 0.15;
        data[i] = (b0 + b1 + b2) * 0.16;
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(320, audioCtx.currentTime + duration);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      noise.start();
      noise.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  /* ==========================================================================
     GÖRÜNÜM VE SAYFA GEÇİŞLERİ
     ========================================================================== */
  function updateView() {
    const nextIsMobile = window.innerWidth <= 991;
    if (nextIsMobile !== isMobile) {
      if (nextIsMobile) {
        currentMobilePage = currentSpread === 0 ? 0
          : currentSpread === TOTAL_SPREADS - 1 ? TOTAL_PAGES - 1
          : (currentSpread - 1) * 2 + 1;
      } else {
        currentSpread = currentMobilePage === 0 ? 0
          : currentMobilePage === TOTAL_PAGES - 1 ? TOTAL_SPREADS - 1
          : Math.floor((currentMobilePage - 1) / 2) + 1;
      }
      isMobile = nextIsMobile;
    }

    if (isMobile) {
      let targetSpreadIndex = 0;
      let side = 'left';

      if (currentMobilePage === 0) {
        targetSpreadIndex = 0;
        side = 'cover';
      } else if (currentMobilePage === TOTAL_PAGES - 1) {
        targetSpreadIndex = TOTAL_SPREADS - 1;
        side = 'back';
      } else {
        targetSpreadIndex = Math.floor((currentMobilePage - 1) / 2) + 1;
        side = (currentMobilePage - 1) % 2 === 0 ? 'left' : 'right';
      }

      slides.forEach((slide, idx) => {
        if (idx === targetSpreadIndex) {
          slide.classList.add('active');
          slide.classList.remove('show-left', 'show-right');
          if (side === 'left') slide.classList.add('show-left');
          else if (side === 'right') slide.classList.add('show-right');
        } else {
          slide.classList.remove('active', 'show-left', 'show-right');
        }
      });

      const pageNumber = currentMobilePage + 1;
      spreadIndicator.textContent = `Sayfa ${pageNumber} / ${TOTAL_PAGES}`;
      const progressPercent = (currentMobilePage / (TOTAL_PAGES - 1)) * 100;
      progressBar.style.width = `${progressPercent}%`;

      btnPrev.disabled = currentMobilePage === 0;
      btnNext.disabled = currentMobilePage === TOTAL_PAGES - 1;
      pageJumpSelect.value = currentMobilePage;
    } else {
      slides.forEach((slide, idx) => {
        if (idx === currentSpread) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      if (currentSpread === 0) {
        bookContainer.classList.add('single-cover');
        spreadIndicator.textContent = `Kapak · Sayfa 1`;
        pageJumpSelect.value = 0;
      } else if (currentSpread === TOTAL_SPREADS - 1) {
        bookContainer.classList.add('single-cover');
        spreadIndicator.textContent = `Arka Kapak · Sayfa 14`;
        pageJumpSelect.value = 13;
      } else {
        bookContainer.classList.remove('single-cover');
        const leftPageNum = (currentSpread - 1) * 2 + 2;
        const rightPageNum = leftPageNum + 1;
        spreadIndicator.textContent = `Sayfa ${leftPageNum} – ${rightPageNum} / ${TOTAL_PAGES}`;
        pageJumpSelect.value = leftPageNum - 1;
      }

      const progressPercent = (currentSpread / (TOTAL_SPREADS - 1)) * 100;
      progressBar.style.width = `${progressPercent}%`;

      btnPrev.disabled = currentSpread === 0;
      btnNext.disabled = currentSpread === TOTAL_SPREADS - 1;
    }
  }

  function goToNext() {
    updateView();
    if (isMobile) {
      if (currentMobilePage < TOTAL_PAGES - 1) {
        currentMobilePage++;
        playPageTurnSound();
        updateView();
      }
    } else {
      if (currentSpread < TOTAL_SPREADS - 1) {
        currentSpread++;
        playPageTurnSound();
        updateView();
      }
    }
  }

  function goToPrev() {
    updateView();
    if (isMobile) {
      if (currentMobilePage > 0) {
        currentMobilePage--;
        playPageTurnSound();
        updateView();
      }
    } else {
      if (currentSpread > 0) {
        currentSpread--;
        playPageTurnSound();
        updateView();
      }
    }
  }

  function goToPage(pageIndex) {
    pageIndex = Math.max(0, Math.min(TOTAL_PAGES - 1, pageIndex));
    currentMobilePage = pageIndex;

    if (pageIndex === 0) {
      currentSpread = 0;
    } else if (pageIndex === TOTAL_PAGES - 1) {
      currentSpread = TOTAL_SPREADS - 1;
    } else {
      currentSpread = Math.floor((pageIndex - 1) / 2) + 1;
    }

    playPageTurnSound();
    updateView();
  }

  /* ==========================================================================
     SAYFAYI TUTUP SÜRÜKLEYİNCE SAYFA DEĞİŞSİN (DRAG TO FLIP)
     Hem fare (desktop pointer) hem mobil dokunmatik ile akıcı çalışır.
     ========================================================================== */
  let isPointerDown = false;
  let startX = 0;
  let startY = 0;
  let diffX = 0;
  let isDragging = false;
  const DRAG_THRESHOLD = 50; // Sayfa çevrilmesi için gereken asgari kaydırma pikseli

  function onPointerDown(e) {
    // Tıklanan eleman buton, bağlantı veya select ise sürüklemeyi başlatma
    if (e.target.closest('button, a, select, input, .toc-item')) return;

    isPointerDown = true;
    startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    startY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    diffX = 0;
    isDragging = false;
  }

  function onPointerMove(e) {
    if (!isPointerDown) return;

    const curX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const curY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    diffX = curX - startX;
    const diffY = curY - startY;

    // Yatay sürükleme belirginleştiğinde drag moduna geç
    if (!isDragging && Math.abs(diffX) > 8 && Math.abs(diffX) > Math.abs(diffY)) {
      isDragging = true;
      bookContainer.classList.add('is-dragging');
    }

    if (isDragging) {
      // Görsel hafif eğim ve yer değiştirme geri bildirimi
      const damp = Math.max(-80, Math.min(80, diffX * 0.15));
      const rot = Math.max(-4, Math.min(4, diffX * 0.04));
      bookContainer.style.transform = `translateX(${damp}px) rotateY(${rot}deg)`;
    }
  }

  function onPointerUp() {
    if (!isPointerDown) return;
    isPointerDown = false;

    if (isDragging) {
      bookContainer.classList.remove('is-dragging');
      bookContainer.style.transform = '';

      if (diffX < -DRAG_THRESHOLD) {
        goToNext(); // Sola doğru çekince sonraki sayfaya geç
      } else if (diffX > DRAG_THRESHOLD) {
        goToPrev(); // Sağa doğru çekince önceki sayfaya geç
      }
      isDragging = false;
    }
  }

  // Pointer & Touch Olayları
  bookContainer.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  bookContainer.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp, { passive: true });

  /* ==========================================================================
     DİĞER KONTROLLER
     ========================================================================== */
  btnNext.addEventListener('click', goToNext);
  btnPrev.addEventListener('click', goToPrev);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
      return;
    }
    if (e.target.closest('button, a, select, input, textarea, [contenteditable]')
      || modalThumbnails.classList.contains('active')
      || modalQr.classList.contains('active')) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      goToNext();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      goToPrev();
    }
  });

  pageJumpSelect.addEventListener('change', (e) => {
    const target = parseInt(e.target.value, 10);
    goToPage(target);
  });

  document.querySelectorAll('[data-target-page]').forEach((el) => {
    el.addEventListener('click', () => {
      const p = parseInt(el.getAttribute('data-target-page'), 10);
      goToPage(p - 1);
    });
  });

  btnSoundToggle.addEventListener('click', () => {
    isSoundMuted = !isSoundMuted;
    btnSoundToggle.classList.toggle('active', !isSoundMuted);
    const text = btnSoundToggle.querySelector('.sound-state-text');
    if (text) text.textContent = isSoundMuted ? 'Ses: Kapalı' : 'Ses: Açık';
  });

  btnFullscreen.hidden = !document.fullscreenEnabled;
  btnFullscreen.addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen?.();
      } else {
        await document.exitFullscreen?.();
      }
    } catch {
      // Fullscreen can be denied by the browser or device.
    }
  });

  function openModal(modal) {
    modal.classList.add('active');
  }

  function closeAllModals() {
    modalThumbnails.classList.remove('active');
    modalQr.classList.remove('active');
  }

  btnThumbnails.addEventListener('click', () => openModal(modalThumbnails));
  btnShareQr.addEventListener('click', () => openModal(modalQr));

  modalCloseBtns.forEach((btn) => {
    btn.addEventListener('click', closeAllModals);
  });

  [modalThumbnails, modalQr].forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeAllModals();
    });
  });

  document.querySelectorAll('.thumb-item').forEach((item) => {
    item.addEventListener('click', () => {
      const targetPage = parseInt(item.getAttribute('data-page'), 10);
      goToPage(targetPage);
      closeAllModals();
    });
  });

  window.addEventListener('resize', () => {
    updateView();
  });

  // İlk Başlatma
  updateView();
})();
