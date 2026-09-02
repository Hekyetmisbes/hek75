(() => {
  let audioCtx = (typeof window !== "undefined" && window.__hek75AudioCtx) || null;
  let userInteracted = (typeof window !== "undefined" && Boolean(window.__hek75UserInteracted)) || false;
  let soundEnabled = localStorage.getItem("hek75-sound") !== "off";

  function hasUserActivation() {
    if (userInteracted) return true;
    if (typeof navigator !== "undefined" && navigator.userActivation?.hasBeenActive) {
      userInteracted = true;
      if (typeof window !== "undefined") window.__hek75UserInteracted = true;
      return true;
    }
    return false;
  }

  function ensureAudio() {
    if (!soundEnabled) return;
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) {
        audioCtx = new Ctx();
        if (typeof window !== "undefined") window.__hek75AudioCtx = audioCtx;
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
  }

  function unlockOnGesture() {
    userInteracted = true;
    if (typeof window !== "undefined") window.__hek75UserInteracted = true;
    ensureAudio();
  }

  // Listen to user gestures to safely unlock AudioContext
  const GESTURE_EVENTS = ["pointerdown", "keydown", "touchstart", "click"];
  GESTURE_EVENTS.forEach(evt => {
    document.addEventListener(evt, unlockOnGesture, { capture: true, passive: true });
  });

  function beep(frequency = 440, duration = 0.05, type = "square", volume = 0.018) {
    if (!soundEnabled) return;
    // Do not attempt to play or resume if the user has not yet interacted with the page,
    // avoiding Chrome Autoplay policy warnings.
    if (!hasUserActivation()) return;

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
    // A click is always a user gesture
    unlockOnGesture();
    beep(380, 0.045, "triangle", 0.022);
    setTimeout(() => beep(620, 0.05, "triangle", 0.016), 35);
  }

  function logoSound() {
    beep(520, 0.035, "sine", 0.014);
    setTimeout(() => beep(760, 0.05, "sine", 0.012), 35);
  }

  function syncToggles() {
    document.querySelectorAll(".sound-toggle").forEach(t => {
      t.textContent = soundEnabled ? "SOUND: ON" : "SOUND: OFF";
    });
  }

  window.hek75Sound = {
    beep,
    hoverSound,
    clickSound,
    logoSound,
    unlock: unlockOnGesture,
    get enabled() {
      return soundEnabled;
    },
    set enabled(value) {
      soundEnabled = !!value;
      localStorage.setItem("hek75-sound", soundEnabled ? "on" : "off");
      syncToggles();
    }
  };

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
      toggle.textContent = soundEnabled ? "SOUND: ON" : "SOUND: OFF";
      if (!toggle.dataset.toggleAttached) {
        toggle.dataset.toggleAttached = "true";
        toggle.addEventListener("click", e => {
          e.preventDefault();
          soundEnabled = !soundEnabled;
          localStorage.setItem("hek75-sound", soundEnabled ? "on" : "off");
          if (soundEnabled) {
            unlockOnGesture();
            clickSound();
          }
          syncToggles();
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
