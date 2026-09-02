(() => {
  let audioCtx = null;
  let soundEnabled = localStorage.getItem("hek75-sound") !== "off";

  function ensureAudio() {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) audioCtx = new Ctx();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function beep(frequency = 440, duration = 0.05, type = "square", volume = 0.018) {
    if (!soundEnabled) return;
    ensureAudio();
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      gain.gain.setValueAtTime(volume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (err) {
      console.warn("Sound playback error:", err);
    }
  }

  function hoverSound() {
    beep(640, 0.025, "square", 0.012);
  }

  function clickSound() {
    beep(380, 0.045, "triangle", 0.022);
    setTimeout(() => beep(620, 0.05, "triangle", 0.016), 35);
  }

  function logoSound() {
    beep(520, 0.035, "sine", 0.014);
    setTimeout(() => beep(760, 0.05, "sine", 0.012), 35);
  }

  window.hek75Sound = {
    beep,
    hoverSound,
    clickSound,
    logoSound,
    get enabled() {
      return soundEnabled;
    },
    set enabled(value) {
      soundEnabled = !!value;
      localStorage.setItem("hek75-sound", soundEnabled ? "on" : "off");
    }
  };

  document.addEventListener("pointerdown", ensureAudio, { once: true });
  document.addEventListener("keydown", ensureAudio, { once: true });

  function initSoundEvents() {
    document.querySelectorAll("a, button, .game-tile, .hero-logo-swap").forEach(el => {
      // Avoid attaching duplicate handlers
      if (el.dataset.soundAttached) return;
      el.dataset.soundAttached = "true";
      el.addEventListener("mouseenter", hoverSound);
      el.addEventListener("click", clickSound);
    });

    const logo = document.querySelector(".hero-logo-swap");
    if (logo && !logo.dataset.logoSoundAttached) {
      logo.dataset.logoSoundAttached = "true";
      logo.addEventListener("mouseenter", logoSound);
    }

    document.querySelectorAll(".sound-toggle").forEach(toggle => {
      const sync = () => {
        toggle.textContent = soundEnabled ? "SOUND: ON" : "SOUND: OFF";
      };
      sync();
      if (!toggle.dataset.toggleAttached) {
        toggle.dataset.toggleAttached = "true";
        toggle.addEventListener("click", e => {
          e.preventDefault();
          soundEnabled = !soundEnabled;
          localStorage.setItem("hek75-sound", soundEnabled ? "on" : "off");
          if (soundEnabled) {
            ensureAudio();
            clickSound();
          }
          document.querySelectorAll(".sound-toggle").forEach(t => {
            t.textContent = soundEnabled ? "SOUND: ON" : "SOUND: OFF";
          });
        });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSoundEvents);
  } else {
    initSoundEvents();
  }

  document.addEventListener("astro:page-load", initSoundEvents);
})();
