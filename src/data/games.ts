export interface GameProject {
  slug: string;
  title: string;
  number: string;
  year: string;
  engine: string;
  genre: string;
  status: string;
  image: string;
  pitch: string;
  role: string;
  mechanics: string[];
  technical: string[];
  learned: string;
  mediaType: "youtube" | "mp4" | "external" | "cover";
  mediaUrl?: string;
  externalUrl?: string;
  links: {
    github?: string;
    itch?: string;
    presentation?: string;
  };
}

export const GAMES: Record<string, GameProject> = {
  "fog-bridge": {
    slug: "fog-bridge",
    title: "FOG BRIDGE",
    number: "001",
    year: "2026",
    engine: "Unity",
    genre: "Atmospheric Narrative Puzzle",
    status: "Game Jam Build",
    image: "/assets/fog-bridge-logo.png",
    pitch: "Developed in 72 hours for GameDev.tv Game Jam 2026. Decode cryptic paper-plane messages emerging through dense fog and rebuild a bridge across the void.",
    role: "Gameplay Programming / Game Design / Level Design",
    mechanics: [
      "Environmental clue reading",
      "Paper-plane message system",
      "Progressive bridge reconstruction",
      "Atmosphere-driven navigation"
    ],
    technical: [
      "Unity gameplay systems",
      "Rapid 72-hour prototyping",
      "State-driven puzzle progression",
      "Level pacing and feedback"
    ],
    learned: "A compact jam project focused on scope control, readable puzzle feedback and shipping a complete atmospheric loop under a strict deadline.",
    mediaType: "external",
    externalUrl: "https://www.linkedin.com/posts/harunemrecankarabag_gamedev-indiedev-unity-activity-7464784394495586304-Svgy",
    links: {
      github: "https://github.com/Hekyetmisbes",
      itch: "https://hekyetmisbes.itch.io/fog-bridge"
    }
  },
  "the-final-loop": {
    slug: "the-final-loop",
    title: "THE FINAL LOOP",
    number: "002",
    year: "2026",
    engine: "Unreal Engine 5",
    genre: "Psychological Puzzle / Vertical Slice",
    status: "Gameplay Prototype",
    image: "/assets/final_loop_logo.png",
    pitch: "A psychological gameplay prototype built around repeated attempts, memory loops, interaction states and player-facing feedback inside a collapsing research facility.",
    role: "Gameplay Programming / Prototyping / Level Design",
    mechanics: [
      "Loop-based progression",
      "Repeated attempts",
      "Interaction-state changes",
      "Room escape puzzles",
      "Replayable decision flow"
    ],
    technical: [
      "Blueprint gameplay scripting",
      "Actor / Component structure",
      "Event-driven logic",
      "Level prototyping",
      "Debugging-oriented iteration"
    ],
    learned: "The project strengthened replayable loop design, interaction readability, state management and fast Unreal Engine prototyping.",
    mediaType: "youtube",
    mediaUrl: "https://www.youtube.com/embed/rsCtGzJ-vpg",
    links: {
      github: "https://github.com/Hekyetmisbes",
      presentation: "/projects/thefinalloop/"
    }
  },
  "the-unlit-door": {
    slug: "the-unlit-door",
    title: "THE UNLIT DOOR",
    number: "003",
    year: "2026",
    engine: "Unity Mobile",
    genre: "Psychological Narrative Puzzle",
    status: "Design / Pitch",
    image: "/assets/unlit_door_logo.png",
    pitch: "A written game concept and system design centered on memory, light, shadow and psychological doors.",
    role: "Game Design / Narrative Systems / Mechanic Design",
    mechanics: [
      "Light and shadow interactions",
      "Memory-driven puzzle structure",
      "Environmental narrative",
      "Psychological door states"
    ],
    technical: [
      "Mechanic documentation",
      "Gameplay-loop planning",
      "Narrative-system design",
      "Mobile-oriented scope planning"
    ],
    learned: "A design-focused project for translating narrative themes into rules, interactions and a feasible gameplay loop.",
    mediaType: "external",
    externalUrl: "https://drive.google.com/file/d/13bP3xqNxCXMtLxGEEpDIVqBRCYX8HxV1/view?usp=drive_link",
    links: {
      github: "https://github.com/Hekyetmisbes",
      presentation: "/projects/theunlitdoor/"
    }
  },
  "delivery-driver": {
    slug: "delivery-driver",
    title: "DELIVERY DRIVER",
    number: "004",
    year: "2025",
    engine: "Unity",
    genre: "3D Simulation & Driving",
    status: "Completed Project",
    image: "/assets/delivery-drive-logo.png",
    pitch: "A physics-based courier simulation where the player delivers packages through city traffic, searches for shortcuts and manages time pressure.",
    role: "Gameplay Programming / Systems / Level Design",
    mechanics: [
      "Vehicle movement",
      "Package pickup and delivery",
      "Time pressure",
      "Route optimization",
      "Shortcut discovery"
    ],
    technical: [
      "Unity physics",
      "Mission-state handling",
      "Driving feedback",
      "Gameplay timers"
    ],
    learned: "A systems-focused project built around making movement, timing and mission feedback feel immediately readable.",
    mediaType: "cover",
    links: {
      github: "https://github.com/Hekyetmisbes/delivery-driver",
      itch: "https://hekyetmisbes.itch.io/delivery-driver"
    }
  },
  "the-platform": {
    slug: "the-platform",
    title: "THE PLATFORM",
    number: "005",
    year: "2024",
    engine: "Unity 2D",
    genre: "2D Cyberpunk Platformer",
    status: "Completed Project",
    image: "/assets/platform-logo.png",
    pitch: "A cyberpunk 2D platformer where players complete levels as quickly as possible, collect stars and avoid hazards.",
    role: "Gameplay Programming / Level Design",
    mechanics: [
      "2D movement",
      "Star collection",
      "Hazards",
      "Level completion timing",
      "Short-session replayability"
    ],
    technical: [
      "Unity 2D",
      "C# gameplay scripts",
      "Level-flow logic",
      "Collectible systems"
    ],
    learned: "Focused on responsive controls, compact level structure and a clear score-driven replay loop.",
    mediaType: "external",
    externalUrl: "https://www.linkedin.com/posts/harunemrecankarabag_unity-platformer-game-activity-7287041023799693312-4arg",
    links: {
      github: "https://github.com/Hekyetmisbes/platform",
      itch: "https://hekyetmisbes.itch.io/platform"
    }
  },
  "flag-quiz-game": {
    slug: "flag-quiz-game",
    title: "FLAG QUIZ GAME",
    number: "006",
    year: "2024",
    engine: "Unity Mobile",
    genre: "Educational Mobile Quiz",
    status: "Completed Project",
    image: "/assets/flag-quiz-logo.png",
    pitch: "An Android geography quiz where players identify countries from flags, with remote flag data and persistent high scores.",
    role: "Gameplay Programming / Mobile Development",
    mechanics: [
      "Flag identification",
      "Score system",
      "Multiple quiz rounds",
      "Persistent high score"
    ],
    technical: [
      "Unity 2D",
      "C#",
      "Firebase data",
      "Country-code based flag loading",
      "Save / score systems"
    ],
    learned: "A practical mobile project combining gameplay logic, remote data usage and persistent player progression.",
    mediaType: "external",
    externalUrl: "https://www.linkedin.com/posts/harunemrecankarabag_gamedevelopment-unity-oyun-activity-7198598131725303809-WXSh",
    links: {
      github: "https://github.com/Hekyetmisbes/flag-quiz-game"
    }
  },
  "movidle-game": {
    slug: "movidle-game",
    title: "MOVIDLE",
    number: "007",
    year: "2023",
    engine: "Unity",
    genre: "Cinema Guessing Puzzle",
    status: "Completed Project",
    image: "/assets/movidle-logo.png",
    pitch: "A movie deduction game using titles from IMDb's Top 250. Players infer the correct film through country, genre, director, year and cast clues.",
    role: "Gameplay Programming / UI Logic",
    mechanics: [
      "Five-attempt guessing loop",
      "Color-coded feedback",
      "Movie metadata clues",
      "Deduction progression"
    ],
    technical: [
      "Unity",
      "C#",
      "Data-driven clue comparison",
      "UI state feedback"
    ],
    learned: "An early project centered on data comparison, immediate UI feedback and a simple but repeatable puzzle loop.",
    mediaType: "external",
    externalUrl: "https://www.linkedin.com/posts/harunemrecankarabag_game-gamedevelopment-unity-activity-7141805886859112448-oZPK",
    links: {
      github: "https://github.com/Hekyetmisbes/movidle"
    }
  }
};

export const GAMES_LIST = Object.values(GAMES);
