(() => {
  let lastResults = [];

  function norm(s) {
    return (s || "").toLocaleLowerCase("en-US").trim();
  }

  function searchSite(query) {
    const q = norm(query);
    if (!q) return [];
    const tokens = q.split(/\s+/).filter(Boolean);

    const index = (typeof window !== "undefined" && window.SITE_INDEX) || (typeof SITE_INDEX !== "undefined" && SITE_INDEX) || [];

    return index.map(item => {
      const hay = norm([
        item.title,
        item.type,
        item.description,
        ...(item.keywords || [])
      ].join(" "));
      let score = 0;
      if (norm(item.title) === q) score += 20;
      if (norm(item.title).includes(q)) score += 10;
      tokens.forEach(t => {
        if (norm(item.title).includes(t)) score += 5;
        if (hay.includes(t)) score += 2;
      });
      return { item, score };
    }).filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(x => x.item);
  }

  function createTerminal() {
    if (document.getElementById("hekTerminalOverlay")) return;

    const dock = document.createElement("button");
    dock.className = "terminal-dock";
    dock.type = "button";
    dock.innerHTML = "&gt;_ TERMINAL";
    dock.setAttribute("aria-label", "Open HEK75 terminal");

    const overlay = document.createElement("div");
    overlay.id = "hekTerminalOverlay";
    overlay.className = "terminal-overlay";
    overlay.innerHTML = `
      <section class="terminal" role="dialog" aria-label="HEK75 command terminal">
        <header class="terminal-head">
          <div class="terminal-head-left">
            <span class="term-led"></span>
            <span class="terminal-title">HEK75 SEARCH CONSOLE // LOCAL INDEX</span>
          </div>
          <button class="term-close" type="button" aria-label="Close terminal">×</button>
        </header>

        <div class="terminal-output" id="termOutput">
          <p class="term-line system">HEK75 Search Console v3.0 initialized.</p>
          <p class="term-line ok">Type <b>help</b> for commands or search the portfolio directly.</p>
          <p class="term-line system">Try: <b>products</b>, <b>litecast</b>, <b>search unreal</b>, <b>search rust</b>.</p>
        </div>

        <form class="terminal-input-row" id="termForm">
          <span class="term-prompt">visitor@hek75:~$</span>
          <input id="termInput" class="term-input" autocomplete="off" spellcheck="false" placeholder="type command or search query...">
        </form>

        <footer class="terminal-ad">
          <span>SEARCH CORE // OFFLINE-STYLE LOCAL INDEX</span>
          <a href="/products/litecast/">POWERED BY LITECAST™ // &lt;50ms MINDSET</a>
        </footer>
      </section>
    `;

    document.body.appendChild(dock);
    document.body.appendChild(overlay);

    const input = overlay.querySelector("#termInput");
    const form = overlay.querySelector("#termForm");
    const close = overlay.querySelector(".term-close");

    const open = () => {
      overlay.classList.add("open");
      setTimeout(() => input.focus(), 20);
      window.hek75Sound?.beep?.(510, 0.04, "square", 0.014);
    };

    const hide = () => {
      overlay.classList.remove("open");
      window.hek75Sound?.beep?.(280, 0.04, "square", 0.012);
    };

    dock.addEventListener("click", open);
    close.addEventListener("click", hide);
    overlay.addEventListener("click", e => {
      if (e.target === overlay) hide();
    });

    window.addEventListener("keydown", e => {
      if (e.key === "Escape" && overlay.classList.contains("open")) {
        hide();
        return;
      }
      if ((e.key === "`" || (e.ctrlKey && e.key.toLowerCase() === "k")) && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        open();
      }
    });

    form.addEventListener("submit", e => {
      e.preventDefault();
      const raw = input.value.trim();
      if (!raw) return;
      input.value = "";
      execute(raw);
    });

    window.HEKTerminal = { open, close: hide, search: searchSite };
  }

  function output(html, kind = "") {
    const out = document.getElementById("termOutput");
    if (!out) return;
    const div = document.createElement("div");
    div.className = `term-line ${kind}`;
    div.innerHTML = html;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
  }

  function renderResults(q, results) {
    lastResults = results;
    if (!results.length) {
      output(`No local results for <b>${escapeHtml(q)}</b>. Try <b>help</b>.`, "warn");
      return;
    }
    output(`${results.length} result(s) for <b>${escapeHtml(q)}</b>:`);
    const out = document.getElementById("termOutput");
    results.forEach((item, i) => {
      const a = document.createElement("a");
      a.className = "term-search-result";
      a.href = item.url;
      a.innerHTML = `[${i + 1}] ${escapeHtml(item.title)} <small>${escapeHtml(item.type.toUpperCase())} // ${escapeHtml(item.description)}</small>`;
      out.appendChild(a);
    });
    output(`Use <b>open 1</b> ... <b>open ${results.length}</b> or click a result.`, "system");
  }

  function execute(raw) {
    const cmd = norm(raw);
    output(`<span class="term-prompt">visitor@hek75:~$</span> ${escapeHtml(raw)}`, "ok");
    window.hek75Sound?.beep?.(420, 0.035, "square", 0.012);

    const routes = {
      "home": "/",
      "main": "/",
      "games": "/projects/",
      "projects": "/projects/",
      "library": "/projects/",
      "player": "/player/",
      "cv": "/player/",
      "about": "/player/",
      "skills": "/player/",
      "resume": "/assets/Resume.pdf",
      "products": "/products/",
      "product": "/products/",
      "litecast": "/products/litecast/",
      "contact": "/contact/",
      "multiplayer": "/contact/"
    };

    if (routes[cmd]) {
      output(`Navigating to ${escapeHtml(cmd)}...`, "system");
      setTimeout(() => location.href = routes[cmd], 180);
      return;
    }

    if (cmd === "help") {
      output(`
        <b>Navigation</b><br>
        home · games · player · cv · products · litecast · multiplayer · contact<br><br>
        <b>Search</b><br>
        search &lt;query&gt; &nbsp;— example: search unreal<br>
        Or type any phrase directly: psychological puzzle<br>
        open &lt;n&gt; &nbsp;— open a result from the last search<br><br>
        <b>System</b><br>
        sound on · sound off · clear · whereami
      `);
      return;
    }

    if (cmd === "clear") {
      const out = document.getElementById("termOutput");
      if (out) out.innerHTML = "";
      return;
    }

    if (cmd === "whereami") {
      output(`Current route: <b>${escapeHtml(location.pathname || "/")}</b>`, "system");
      return;
    }

    if (cmd === "sound on") {
      if (window.hek75Sound) window.hek75Sound.enabled = true;
      document.querySelectorAll(".sound-toggle").forEach(t => t.textContent = "SOUND: ON");
      output("Arcade UI sound enabled.", "ok");
      return;
    }

    if (cmd === "sound off") {
      if (window.hek75Sound) window.hek75Sound.enabled = false;
      document.querySelectorAll(".sound-toggle").forEach(t => t.textContent = "SOUND: OFF");
      output("Arcade UI sound disabled.", "system");
      return;
    }

    const openMatch = cmd.match(/^open\s+(\d+)$/);
    if (openMatch) {
      const n = Number(openMatch[1]) - 1;
      if (lastResults[n]) {
        location.href = lastResults[n].url;
      } else {
        output("Result index not found. Run a search first.", "error");
      }
      return;
    }

    const q = cmd.startsWith("search ") ? raw.slice(7).trim() : raw;
    renderResults(q, searchSite(q));
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[c]));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createTerminal);
  } else {
    createTerminal();
  }

  document.addEventListener("astro:page-load", createTerminal);
})();
