(() => {
  // LiteCast Powered Quick Launcher for HEK75 Arcade OS
  let currentResults = [];
  let selectedIndex = 0;

  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[c]));
  }

  function iconFor(type) {
    const svgs = {
      game: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="4"/><path d="M6 12h4m-2-2v4m9-2h.01m3 0h.01"/></svg>`,
      product: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
      page: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
      calc: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01"/></svg>`,
      unit: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
      command: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`
    };
    return svgs[type] || svgs.page;
  }

  const fallbackIndex = [
    { title: "Ribbon Bloom", sub: "Tactile mobile arrow escape puzzle with 3D jelly physics in Unity 6", type: "game", url: "/projects/ribbon-bloom/", keywords: ["ribbon bloom", "jelly", "puzzle", "unity", "mobile"] },
    { title: "Tiny Tide Harbor", sub: "Mobile harbor logistics puzzle & port expansion tycoon in Unity 6", type: "game", url: "/projects/tiny-tide-harbor/", keywords: ["tiny tide", "harbor", "cargo sort", "puzzle", "unity"] },
    { title: "The Final Loop", sub: "Unreal Engine 5 psychological puzzle vertical slice", type: "game", url: "/projects/the-final-loop/", keywords: ["unreal", "ue5", "blueprint", "loop", "final loop"] },
    { title: "Fog Bridge", sub: "Atmospheric narrative puzzle built in 72 hours for GameDev.tv Jam", type: "game", url: "/projects/fog-bridge/", keywords: ["fog bridge", "unity", "jam"] },
    { title: "The Unlit Door", sub: "Psychological mobile narrative puzzle concept & system architecture", type: "game", url: "/projects/the-unlit-door/", keywords: ["unlit door", "unity", "mobile", "puzzle"] },
    { title: "LiteCast", sub: "Native Windows launcher & developer toolkit built with Rust + Win32/DWM", type: "product", url: "/products/litecast/", keywords: ["litecast", "rust", "windows", "launcher", "win32"] },
    { title: "CloseMeet Lite", sub: "Zero-knowledge P2P encrypted desktop video conferencing in C++20 + Qt 6", type: "product", url: "/products/closemeet-lite/", keywords: ["closemeet", "c++20", "qt 6", "p2p", "e2ee"] },
    { title: "Start Game Library", sub: "Explore all developed Unity & Unreal Engine projects", type: "page", url: "/projects/", keywords: ["games", "library", "projects"] },
    { title: "Player Record / CV", sub: "Education, experience, competencies and languages", type: "page", url: "/player/", keywords: ["player", "cv", "resume", "experience"] },
    { title: "Software Products", sub: "Native desktop software and developer utilities", type: "page", url: "/products/", keywords: ["products", "software", "rust", "tools"] },
    { title: "Multiplayer / Contact", sub: "Direct communication channels: Email, LinkedIn, GitHub", type: "page", url: "/contact/", keywords: ["contact", "email", "linkedin", "github"] },
    { title: "Load Resume.pdf", sub: "Download or view official curriculum vitae", type: "page", url: "/assets/Resume.pdf", keywords: ["resume", "pdf", "cv", "download"] }
  ];

  function safeMath(q) {
    const pct = q.match(/^\s*([\d.]+)\s*%\s*of\s*([\d.]+)\s*$/i);
    if (pct) {
      const val = (Number(pct[1]) / 100) * Number(pct[2]);
      return {
        title: `${pct[1]}% of ${pct[2]} = ${Number(val.toFixed(4)).toLocaleString()}`,
        sub: "Percentage calculation",
        type: "calc",
        insert: String(val)
      };
    }
    if (/^\s*[\d.]+\s*$/.test(q)) return null;
    if (!/^[\d\s()+\-*/.%]+$/.test(q)) return null;
    if (!/[+\-*/%]/.test(q)) return null;
    try {
      const value = Function(`"use strict";return (${q})`)();
      if (typeof value === "number" && Number.isFinite(value)) {
        return {
          title: `${q} = ${Number(value.toFixed(8))}`,
          sub: "Local calculator result",
          type: "calc",
          insert: String(value)
        };
      }
    } catch {}
    return null;
  }

  function unit(q) {
    let m = q.match(/^\s*([\d.]+)\s*km\s+to\s+mi\s*$/i);
    if (m) {
      const val = (Number(m[1]) * 0.621371).toFixed(2);
      return { title: `${m[1]} km = ${val} mi`, sub: "Length conversion", type: "unit", insert: `${val} mi` };
    }
    m = q.match(/^\s*([\d.]+)\s*mi\s+to\s+km\s*$/i);
    if (m) {
      const val = (Number(m[1]) / 0.621371).toFixed(2);
      return { title: `${m[1]} mi = ${val} km`, sub: "Length conversion", type: "unit", insert: `${val} km` };
    }
    m = q.match(/^\s*([\d.]+)\s*kg\s+to\s+lb\s*$/i);
    if (m) {
      const val = (Number(m[1]) * 2.20462).toFixed(2);
      return { title: `${m[1]} kg = ${val} lb`, sub: "Mass conversion", type: "unit", insert: `${val} lb` };
    }
    m = q.match(/^\s*([\d.]+)\s*lb\s+to\s+kg\s*$/i);
    if (m) {
      const val = (Number(m[1]) / 2.20462).toFixed(2);
      return { title: `${m[1]} lb = ${val} kg`, sub: "Mass conversion", type: "unit", insert: `${val} kg` };
    }
    m = q.match(/^\s*([\d.]+)\s*c\s+to\s+f\s*$/i);
    if (m) {
      const val = ((Number(m[1]) * 9/5) + 32).toFixed(1);
      return { title: `${m[1]} °C = ${val} °F`, sub: "Temperature conversion", type: "unit", insert: `${val} F` };
    }
    m = q.match(/^\s*([\d.]+)\s*f\s+to\s+c\s*$/i);
    if (m) {
      const val = (((Number(m[1]) - 32) * 5) / 9).toFixed(1);
      return { title: `${m[1]} °F = ${val} °C`, sub: "Temperature conversion", type: "unit", insert: `${val} C` };
    }
    return null;
  }

  function command(q) {
    if (!q.startsWith(">")) return null;
    const c = q.slice(1).trim().toLowerCase();
    const map = {
      help: "Available: > help, > sound on, > sound off, > clear, > home, > games, > cv",
      "sound on": "Arcade UI sound enabled.",
      "sound off": "Arcade UI sound disabled.",
      clear: "Input cleared.",
      home: "Navigating to Home...",
      games: "Navigating to Game Library...",
      cv: "Navigating to Player CV...",
      products: "Navigating to Products..."
    };

    if (c === "sound on" && window.hek75Sound) {
      window.hek75Sound.enabled = true;
      document.querySelectorAll(".sound-toggle").forEach(t => t.textContent = "SOUND: ON");
    }
    if (c === "sound off" && window.hek75Sound) {
      window.hek75Sound.enabled = false;
      document.querySelectorAll(".sound-toggle").forEach(t => t.textContent = "SOUND: OFF");
    }
    if (c === "home") setTimeout(() => location.href = "/", 150);
    if (c === "games") setTimeout(() => location.href = "/projects/", 150);
    if (c === "cv") setTimeout(() => location.href = "/player/", 150);
    if (c === "products") setTimeout(() => location.href = "/products/", 150);

    return {
      title: map[c] || `Unknown command: > ${c} (Try '> help')`,
      sub: "LiteCast shell utility",
      type: "command"
    };
  }

  function siteSearch(q) {
    const pool = (typeof window !== "undefined" && window.SITE_INDEX && window.SITE_INDEX.length)
      ? window.SITE_INDEX
      : fallbackIndex;

    const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!tokens.length) return [];

    return pool.map(item => {
      const hay = [
        item.title,
        item.sub || item.description || "",
        item.type || "",
        ...(item.keywords || [])
      ].join(" ").toLowerCase();

      let score = 0;
      if (item.title.toLowerCase().startsWith(q.toLowerCase())) score += 30;
      if (item.title.toLowerCase().includes(q.toLowerCase())) score += 15;

      tokens.forEach(t => {
        if (item.title.toLowerCase().includes(t)) score += 8;
        if (hay.includes(t)) score += 3;
      });

      return { item, score };
    })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(x => ({
      title: x.item.title,
      sub: x.item.sub || x.item.description || "",
      type: x.item.type || "page",
      url: x.item.url
    }));
  }

  function buildResults(q) {
    q = (q || "").trim();
    if (!q) {
      return [
        { title: "Start typing to search HEK75", sub: "Pages, games, products, calculations and conversions.", type: "page" },
        { title: "Ribbon Bloom", sub: "Tactile mobile arrow escape puzzle with 3D jelly physics (Unity 6)", type: "game", url: "/projects/ribbon-bloom/" },
        { title: "Tiny Tide Harbor", sub: "Mobile harbor logistics puzzle & port expansion tycoon (Unity 6)", type: "game", url: "/projects/tiny-tide-harbor/" },
        { title: "The Final Loop", sub: "Unreal Engine 5 psychological puzzle vertical slice", type: "game", url: "/projects/the-final-loop/" },
        { title: "LiteCast", sub: "Rust + Win32 native Windows launcher", type: "product", url: "/products/litecast/" },
        { title: "Load Resume.pdf", sub: "Download official curriculum vitae", type: "page", url: "/assets/Resume.pdf" }
      ];
    }

    const cmdRes = command(q);
    if (cmdRes) return [cmdRes];

    const mathRes = safeMath(q);
    const unitRes = unit(q);
    const siteMatches = siteSearch(q);

    const list = [];
    if (mathRes) list.push(mathRes);
    if (unitRes) list.push(unitRes);
    list.push(...siteMatches);

    return list;
  }

  function createTerminal() {
    if (document.getElementById("hekTerminalOverlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "hekTerminalOverlay";
    overlay.className = "terminal-overlay";
    overlay.innerHTML = `
      <div class="terminal-launcher-wrap">
        <div class="launcher-window" id="siteLauncherWindow" role="dialog" aria-label="LiteCast launcher">
          <div class="launcher-titlebar">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="term-led"></span>
              <span>LiteCast // simulated native launcher</span>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 9px; opacity: 0.75;">ESC to close</span>
              <span>ALT + SPACE</span>
              <button class="term-close" id="siteLauncherCloseX" type="button" aria-label="Close launcher" style="cursor: pointer; background: transparent; border: 0; color: #5f8c64; font-size: 16px; padding: 0 4px; line-height: 1;">×</button>
            </div>
          </div>

          <div class="launcher-input-row">
            <div class="launcher-mini-icon">
              <img src="/assets/litecast/icon.png" alt="LC" onerror="this.style.display='none';this.parentElement.textContent='LC'" />
            </div>
            <input id="siteLauncherInput" class="launcher-input" placeholder="App, site page, command (>), calculation, converter..." autocomplete="off" spellcheck="false" />
            <button class="launcher-settings" id="siteLauncherClear" type="button" title="Clear / Close" style="font-size: 16px;">×</button>
          </div>

          <div class="launcher-results" id="siteLauncherResults"></div>
        </div>

        <div class="quick-row">
          <span>QUICK TRY:</span>
          <button class="quick-chip" type="button" data-q="ribbon bloom">ribbon bloom</button>
          <button class="quick-chip" type="button" data-q="tiny tide">tiny tide</button>
          <button class="quick-chip" type="button" data-q="the final loop">the final loop</button>
          <button class="quick-chip" type="button" data-q="products">products</button>
          <button class="quick-chip" type="button" data-q="(45 * 12) / 3">(45*12)/3</button>
          <button class="quick-chip" type="button" data-q="100km to mi">100km to mi</button>
          <button class="quick-chip" type="button" data-q="> help">&gt; help</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const input = overlay.querySelector("#siteLauncherInput");
    const results = overlay.querySelector("#siteLauncherResults");
    const closeBtnX = overlay.querySelector("#siteLauncherCloseX");
    const clearBtn = overlay.querySelector("#siteLauncherClear");
    const quickChips = overlay.querySelectorAll(".quick-chip");

    function render() {
      currentResults = buildResults(input.value);
      selectedIndex = Math.min(selectedIndex, Math.max(0, currentResults.length - 1));

      if (!currentResults.length) {
        results.innerHTML = '<div class="launch-empty">NO RESULTS MATCHED<br><br>Try searching: "ribbon bloom", "tiny tide", "the final loop", "rust", a calculation "(45*12)/3", or a unit "100km to mi".</div>';
        return;
      }

      results.innerHTML = currentResults.map((r, i) => `
        <div class="launch-result ${i === selectedIndex ? "selected" : ""}" data-i="${i}">
          <div class="result-icon">${iconFor(r.type)}</div>
          <div style="min-width: 0;">
            <div class="result-title">${esc(r.title)}</div>
            <div class="result-sub">${esc(r.sub || "")}</div>
          </div>
          <div class="result-action">${r.url ? "OPEN ↵" : (r.insert ? "COPY ↵" : "RESULT")}</div>
        </div>
      `).join("");

      results.querySelectorAll(".launch-result").forEach(el => {
        el.addEventListener("mouseenter", () => {
          selectedIndex = Number(el.dataset.i);
          const prev = results.querySelector(".launch-result.selected");
          if (prev) prev.classList.remove("selected");
          el.classList.add("selected");
        });
        el.addEventListener("click", () => activate(Number(el.dataset.i)));
      });
    }

    function activate(i = selectedIndex) {
      const r = currentResults[i];
      if (!r) return;
      window.hek75Sound?.beep?.(680, 0.04, "triangle", 0.015);
      if (r.url) {
        location.href = r.url;
      } else if (r.insert) {
        input.value = r.insert;
        selectedIndex = 0;
        render();
      }
    }

    const open = () => {
      overlay.classList.add("open");
      selectedIndex = 0;
      render();
      setTimeout(() => {
        input.focus();
        input.select();
      }, 30);
      window.hek75Sound?.beep?.(510, 0.04, "square", 0.014);
    };

    const hide = () => {
      overlay.classList.remove("open");
      window.hek75Sound?.beep?.(280, 0.04, "square", 0.012);
    };

    closeBtnX.addEventListener("click", hide);
    clearBtn.addEventListener("click", () => {
      if (input.value) {
        input.value = "";
        selectedIndex = 0;
        render();
        input.focus();
      } else {
        hide();
      }
    });

    overlay.addEventListener("click", e => {
      if (e.target === overlay) hide();
    });

    quickChips.forEach(chip => {
      chip.addEventListener("click", () => {
        input.value = chip.dataset.q;
        selectedIndex = 0;
        render();
        input.focus();
        window.hek75Sound?.beep?.(440, 0.03, "sine", 0.01);
      });
    });

    input.addEventListener("input", () => {
      selectedIndex = 0;
      render();
    });

    input.addEventListener("keydown", e => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentResults.length) {
          selectedIndex = (selectedIndex + 1) % currentResults.length;
          render();
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentResults.length) {
          selectedIndex = (selectedIndex - 1 + currentResults.length) % currentResults.length;
          render();
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        activate(selectedIndex);
      } else if (e.key === "Escape") {
        hide();
      }
    });

    window.addEventListener("keydown", e => {
      if (e.key === "Escape" && overlay.classList.contains("open")) {
        hide();
        return;
      }
      // Alt + Space (LiteCast hotkey) or Ctrl + K or ` (backtick)
      const isAltSpace = e.altKey && (e.code === "Space" || e.key === " ");
      const isCtrlK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k";
      const isBacktick = e.key === "`" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName);

      if (isAltSpace || isCtrlK || isBacktick) {
        e.preventDefault();
        if (overlay.classList.contains("open")) {
          hide();
        } else {
          open();
        }
      }
    });

    window.HEKTerminal = { open, close: hide, search: siteSearch };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createTerminal);
  } else {
    createTerminal();
  }

  document.addEventListener("astro:page-load", createTerminal);
})();
