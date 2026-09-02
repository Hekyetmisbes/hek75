const SITE_INDEX = [
  {
    title: "Home / HEK75 Arcade",
    type: "page",
    url: "/",
    description: "Main arcade hub and navigation.",
    keywords: ["home", "hek75", "harun", "game developer", "portfolio", "arcade", "terminal"]
  },
  {
    title: "Game Library",
    type: "page",
    url: "/projects/",
    description: "All game projects and case studies.",
    keywords: ["games", "game library", "projects", "unity", "unreal", "portfolio"]
  },
  {
    title: "Player Record / CV",
    type: "page",
    url: "/player/",
    description: "Education, experience, skills, certificates and languages.",
    keywords: ["player", "cv", "resume", "education", "erciyes", "hacettepe", "skills", "certificate", "experience", "about"]
  },
  {
    title: "Products",
    type: "page",
    url: "/products/",
    description: "Native desktop software and developer tools.",
    keywords: ["products", "software", "desktop", "rust", "tools", "litecast"]
  },
  {
    title: "LiteCast",
    type: "product",
    url: "/products/litecast/",
    description: "Native Windows launcher and developer toolkit built with Rust and Win32/DWM.",
    keywords: ["litecast", "rust", "windows", "launcher", "win32", "dwm", "search", "productivity", "developer tools", "25 mb", "50ms"]
  },
  {
    title: "LiteCast v1.0.1 Changelog",
    type: "product",
    url: "/products/litecast/changelog/",
    description: "LiteCast v1.0.1 release notes — Security, Authenticode, indexing cleanup and in-app toast banner.",
    keywords: ["changelog", "release notes", "v1.0.1", "litecast", "update", "security", "authenticode", "toast"]
  },
  {
    title: "The Final Loop",
    type: "game",
    url: "/projects/the-final-loop/",
    description: "Psychological puzzle vertical slice in Unreal Engine 5.",
    keywords: ["final loop", "unreal", "ue5", "blueprint", "puzzle", "psychological", "loop", "c++"]
  },
  {
    title: "The Unlit Door",
    type: "game",
    url: "/projects/the-unlit-door/",
    description: "Psychological narrative puzzle design centered on light, shadow and memory.",
    keywords: ["unlit door", "unity", "light", "shadow", "memory", "narrative", "puzzle", "mobile"]
  },
  {
    title: "Fog Bridge",
    type: "game",
    url: "/projects/fog-bridge/",
    description: "Atmospheric narrative puzzle made in Unity for a 72-hour game jam.",
    keywords: ["fog bridge", "unity", "game jam", "puzzle", "narrative", "atmospheric", "jam"]
  },
  {
    title: "Delivery Driver",
    type: "game",
    url: "/projects/delivery-driver/",
    description: "Physics-based Unity courier and driving simulation.",
    keywords: ["delivery driver", "unity", "driving", "physics", "simulation", "courier"]
  },
  {
    title: "The Platform",
    type: "game",
    url: "/projects/the-platform/",
    description: "2D cyberpunk platformer built with Unity.",
    keywords: ["platform", "unity 2d", "cyberpunk", "platformer", "stars"]
  },
  {
    title: "Flag Quiz Game",
    type: "game",
    url: "/projects/flag-quiz-game/",
    description: "Educational geography quiz for mobile.",
    keywords: ["flag quiz", "unity", "mobile", "firebase", "geography", "quiz"]
  },
  {
    title: "Movidle",
    type: "game",
    url: "/projects/movidle-game/",
    description: "Cinema guessing and deduction puzzle game.",
    keywords: ["movidle", "movie", "cinema", "wordle", "unity", "puzzle", "imdb"]
  },
  {
    title: "Multiplayer / Contact / Comms",
    type: "page",
    url: "/contact/",
    description: "Multiplayer co-op & contact channels: Email, LinkedIn, GitHub, Instagram.",
    keywords: ["multiplayer", "contact", "coop", "email", "linkedin", "github", "instagram", "message", "comms"]
  }
];

if (typeof window !== "undefined") {
  window.SITE_INDEX = SITE_INDEX;
}
