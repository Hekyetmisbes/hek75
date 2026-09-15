export interface TechnicalChallenge {
  challenge: string;
  solution: string;
}

export interface GameProject {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  number: string;
  year: string;
  engine: string;
  genre: string;
  status: string;
  image: string;
  pitch: string;
  overview: string;
  role: string;
  mechanics: string[];
  technical: string[];
  architecture: string[];
  engineHighlights: string[];
  challengesAndSolutions: TechnicalChallenge[];
  learned: string;
  relatedSlugs: string[];
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
  "the-final-loop": {
    slug: "the-final-loop",
    title: "THE FINAL LOOP",
    seoTitle: "The Final Loop – Unreal Engine 5 Vertical Slice & Puzzle Prototype | Harun Emrecan Karabağ",
    seoDescription: "An Unreal Engine 5 psychological puzzle vertical slice prototype engineered around time loops, interaction states, and modular Blueprint systems.",
    number: "001",
    year: "2026",
    engine: "Unreal Engine 5",
    genre: "Psychological Puzzle / Vertical Slice",
    status: "Gameplay Prototype",
    image: "/assets/final_loop_logo.png",
    pitch: "A psychological gameplay prototype built around repeated attempts, memory loops, interaction states and player-facing feedback inside a collapsing research facility.",
    overview: "The Final Loop is an Unreal Engine 5 vertical slice that explores recurring time-anomaly mechanics within an isolated laboratory. The project was designed to test tight environmental feedback loops, persistent room state modifications, and high-cadence player decision making under psychological tension.",
    role: "Gameplay Programming / Technical Design / Level Prototyping",
    mechanics: [
      "Time-loop iteration and memory retrieval",
      "Dynamic room state transitions across cycles",
      "Environmental puzzle triggers and multi-switch logic",
      "Diegetic audio cues reflecting spatial loop decay",
      "Replayable decision branch testing"
    ],
    technical: [
      "Unreal Engine 5.5 architecture",
      "Modular Blueprint actor components",
      "Event-driven dispatcher communication",
      "Enhanced Input System integration",
      "State preservation and reset management"
    ],
    architecture: [
      "Actor Component-based interactive object hierarchy decoupling logic from meshes",
      "Global Loop Subsystem tracking cycle iterations, elapsed time, and unlocked memory flags",
      "Event Dispatchers orchestrating room-wide audio/visual alert states without tight coupling"
    ],
    engineHighlights: [
      "Unreal Engine 5 Enhanced Input with contextual mapping contexts",
      "Lumen real-time dynamic global illumination for loop state visual shifts",
      "Level Prototyping with Geometry Script and modular kit assets",
      "Gameplay Tag-based interaction state checks"
    ],
    challengesAndSolutions: [
      {
        challenge: "Resetting level geometry and dynamic actors cleanly upon loop termination without memory leaks or hitching.",
        solution: "Implemented an IResetLoopInterface across interactive actors, resetting states and physics in a deterministic single-frame pass rather than reloading the entire level."
      },
      {
        challenge: "Providing clear psychological clues without intrusive UI overlays.",
        solution: "Utilized dynamic material instances with pulsing emissive parameters and localized 3D spatial audio triggers."
      }
    ],
    learned: "Strengthened core Unreal Engine Blueprint architecture, actor lifecycle management, and scalable vertical slice prototyping.",
    relatedSlugs: ["the-unlit-door", "fog-bridge"],
    mediaType: "youtube",
    mediaUrl: "https://www.youtube.com/embed/rsCtGzJ-vpg",
    links: {
      github: "https://github.com/Hekyetmisbes",
      presentation: "/projects/thefinalloop/"
    }
  },
  "fog-bridge": {
    slug: "fog-bridge",
    title: "FOG BRIDGE",
    seoTitle: "Fog Bridge – Unity Atmospheric Narrative Puzzle Game | Harun Emrecan Karabağ",
    seoDescription: "Developed in 72 hours for GameDev.tv Game Jam 2026. A Unity atmospheric puzzle game featuring cryptic paper-plane mechanics and volumetric bridge reconstruction.",
    number: "002",
    year: "2026",
    engine: "Unity (URP)",
    genre: "Atmospheric Narrative Puzzle",
    status: "Game Jam Build",
    image: "/assets/fog-bridge-logo.png",
    pitch: "Developed in 72 hours for GameDev.tv Game Jam 2026. Decode cryptic paper-plane messages emerging through dense fog and rebuild a bridge across the void.",
    overview: "Built under strict 72-hour constraints for GameDev.tv Game Jam 2026 under the theme 'Secrets In The Fog'. Players receive paper planes carrying fragmented instructions and environmental clues, manipulating light and spatial bridges to traverse an ethereal chasm.",
    role: "Gameplay Programming / Game Design / Level Design",
    mechanics: [
      "Paper-plane message interception and reading",
      "Volumetric bridge chunk instantiation and placement",
      "Atmospheric fog density manipulation",
      "Environmental orientation without minimaps"
    ],
    technical: [
      "Unity 6 Universal Render Pipeline (URP)",
      "Lightweight finite state machine for puzzle validation",
      "Event-driven interaction triggers",
      "Optimized 72-hour rapid asset pipeline"
    ],
    architecture: [
      "Modular MessageSystem decoupling incoming paper-plane trajectories from note UI rendering",
      "BridgeController validating spatial puzzle alignment through localized trigger colliders",
      "ScriptableObject-backed clue database facilitating rapid level tuning"
    ],
    engineHighlights: [
      "Unity URP custom volumetric fog settings and post-processing profiles",
      "Cinemachine virtual cameras with smooth framing transitions",
      "New Input System supporting both gamepad and keyboard navigation"
    ],
    challengesAndSolutions: [
      {
        challenge: "Delivering an evocative atmosphere within tight WebGL/standalone memory and performance limits in 72 hours.",
        solution: "Authored lightweight custom particle systems for fog wisps combined with URP color adjustments instead of heavy screen-space volumetric shaders."
      },
      {
        challenge: "Preventing player disorientation in low-visibility dense fog.",
        solution: "Engineered subtle audio beacons and emissive runway glyphs that guide the player toward newly placed bridge tiles."
      }
    ],
    learned: "Mastered strict scope prioritization, player affordance under constrained visibility, and shipping a zero-bug jam build.",
    relatedSlugs: ["the-final-loop", "the-unlit-door"],
    mediaType: "external",
    externalUrl: "https://www.linkedin.com/posts/harunemrecankarabag_gamedev-indiedev-unity-activity-7464784394495586304-Svgy",
    links: {
      github: "https://github.com/Hekyetmisbes",
      itch: "https://hekyetmisbes.itch.io/fog-bridge"
    }
  },
  "the-unlit-door": {
    slug: "the-unlit-door",
    title: "THE UNLIT DOOR",
    seoTitle: "The Unlit Door – Unity Mobile Psychological Narrative Puzzle Pitch | Harun Emrecan Karabağ",
    seoDescription: "A game concept and technical system design for Unity Mobile centered on memory, light-shadow interaction mechanics, and mobile performance budgets.",
    number: "003",
    year: "2026",
    engine: "Unity Mobile",
    genre: "Psychological Narrative Puzzle",
    status: "Design / Pitch",
    image: "/assets/unlit_door_logo.png",
    pitch: "A written game concept and system design centered on memory, light, shadow and psychological doors.",
    overview: "The Unlit Door is a mobile-first psychological puzzle pitch engineered for touch interaction. It challenges players to illuminate repressed corridors of memory using directional light sources while managing battery degradation, shadow distortions, and emotional doorway milestones.",
    role: "Game Design / Narrative Systems / Mechanic Specification",
    mechanics: [
      "Directional touch-based lighting angles",
      "Shadow occlusion revealing hidden inscriptions",
      "Psychological door lock states",
      "Non-linear memory fragment sequencing"
    ],
    technical: [
      "Mobile 60 FPS performance budgeting",
      "ShaderLab shadow-masking research",
      "Memory leak mitigation for mobile chipsets",
      "GDD & technical architecture documentation"
    ],
    architecture: [
      "Data-driven level progression via ScriptableObjects",
      "Decoupled light interaction manager querying 2D raycasts without per-frame allocations",
      "Addressables asset loading strategy for seamless episodic chapter downloads"
    ],
    engineHighlights: [
      "Unity Mobile URP forward rendering pipeline",
      "Touch gesture recognizer with deadzone smoothing",
      "SRP Batcher friendly modular doorway meshes"
    ],
    challengesAndSolutions: [
      {
        challenge: "Rendering dynamic 2D/3D shadow puzzles smoothly on mid-tier mobile hardware.",
        solution: "Designed pre-baked light maps paired with a single real-time directional projected shadow caster, keeping draw calls under 60."
      }
    ],
    learned: "Refined comprehensive Game Design Document (GDD) authoring, mobile hardware constraints, and retention-focused mechanics.",
    relatedSlugs: ["the-final-loop", "fog-bridge"],
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
    seoTitle: "Delivery Driver – Unity 3D Physics Simulation & Arcade Driving | Harun Emrecan Karabağ",
    seoDescription: "A physics-based courier arcade game built in Unity featuring vehicle dynamics, waypoint navigation, route optimization, and responsive controls.",
    number: "004",
    year: "2025",
    engine: "Unity 3D",
    genre: "3D Simulation & Driving",
    status: "Completed Project",
    image: "/assets/delivery-drive-logo.png",
    pitch: "A physics-based courier simulation where the player delivers packages through city traffic, searches for shortcuts and manages time pressure.",
    overview: "Delivery Driver is an arcade-style driving simulation where players navigate tight suburban corridors, balance package integrity, and race against an unforgiving mission clock.",
    role: "Gameplay Programming / Physics Tuning / Level Design",
    mechanics: [
      "Arcade vehicle steering, acceleration, and drift mechanics",
      "Package pickup, stowage, and dropoff collision zones",
      "Dynamic shortcut risk-vs-reward routing",
      "Real-time delivery timer and scoring multipliers"
    ],
    technical: [
      "Unity Rigidbody physics and WheelColliders",
      "State-driven delivery objective manager",
      "Cinemachine third-person camera damping",
      "Audio pitch modulation linked to vehicle RPM"
    ],
    architecture: [
      "VehicleController handling custom suspension rays and traction curves",
      "MissionDirector managing randomized delivery stops and checkpoint validations",
      "Event-based UI notification system for delivery confirmations and time bonuses"
    ],
    engineHighlights: [
      "Unity Physics engine with custom friction physics materials",
      "Cinemachine Follow & LookAt with velocity-based camera lead",
      "Unity New Input System supporting analog steering"
    ],
    challengesAndSolutions: [
      {
        challenge: "Preventing high-speed arcade vehicles from flipping awkwardly on curb collisions.",
        solution: "Artificially lowered the vehicle Rigidbody center of mass and applied proportional downward stabilizing forces during airborne frames."
      }
    ],
    learned: "Deepened practical knowledge of 3D physics stability, game loop pacing, and driving game camera ergonomics.",
    relatedSlugs: ["the-platform", "fog-bridge"],
    mediaType: "cover",
    links: {
      github: "https://github.com/Hekyetmisbes/delivery-driver",
      itch: "https://hekyetmisbes.itch.io/delivery-driver"
    }
  },
  "the-platform": {
    slug: "the-platform",
    title: "THE PLATFORM",
    seoTitle: "The Platform – Unity 2D Precision Platformer | Harun Emrecan Karabağ",
    seoDescription: "A precision 2D platformer engineered in Unity with coyote time, jump buffering, wall sliding, and particle-rich feedback.",
    number: "005",
    year: "2024",
    engine: "Unity 2D",
    genre: "2D Cyberpunk Platformer",
    status: "Completed Project",
    image: "/assets/platform-logo.png",
    pitch: "A fast-paced 2D platformer built with precision jump mechanics, wall slides, dynamic hazards and fluid player controls.",
    overview: "The Platform focuses on high-precision movement feel in 2D platforming. It integrates key platformer game-feel mechanics like coyote time, jump buffering, variable jump heights, and snappy wall slides to create responsive, fair gameplay.",
    role: "Gameplay Programming / Animation Controller / Level Design",
    mechanics: [
      "Variable height jumping and gravity scaling",
      "Coyote time (grace period after leaving ledges)",
      "Jump input buffering",
      "Wall slides, wall jumps, and hazard reset triggers"
    ],
    technical: [
      "Unity 2D Physics (Rigidbody2D / BoxCollider2D)",
      "State machine player controller",
      "Tilemap level architecture",
      "Particle systems for dust and landing impacts"
    ],
    architecture: [
      "Finite State Machine (FSM) separating Idle, Run, Airborne, WallSlide, and Respawn states",
      "Raycast-based ground and wall detection bypassing physics glitch edges",
      "Checkpoint and respawn manager preserving score metrics"
    ],
    engineHighlights: [
      "Unity 2D Tilemap with composite 2D colliders",
      "Animation State Machine with sub-state transitions",
      "2D Sprite lighting and post-processing bloom"
    ],
    challengesAndSolutions: [
      {
        challenge: "Standard Unity 2D physics feeling floaty and unresponsive on rapid directional reversals.",
        solution: "Overrode horizontal drag with custom velocity clamping and asymmetric gravity multipliers during jump descents."
      }
    ],
    learned: "Mastered game-feel ergonomics, responsive 2D movement equations, and robust FSM implementation.",
    relatedSlugs: ["delivery-driver", "flag-quiz-game"],
    mediaType: "cover",
    links: {
      github: "https://github.com/Hekyetmisbes/the-platform"
    }
  },
  "flag-quiz-game": {
    slug: "flag-quiz-game",
    title: "FLAG QUIZ GAME",
    seoTitle: "Flag Quiz Game – Unity Mobile Educational Trivia & Firebase | Harun Emrecan Karabağ",
    seoDescription: "A cross-platform mobile educational geography game built with Unity and Firebase Realtime Database for dynamic content synchronization.",
    number: "006",
    year: "2024",
    engine: "Unity Mobile",
    genre: "Educational Trivia",
    status: "Completed Project",
    image: "/assets/flag-quiz-logo.png",
    pitch: "A mobile geography trivia game featuring dynamic question pools, country flag identification, high scores and remote database synchronization.",
    overview: "Flag Quiz Game is a mobile trivia title that tests geographic recognition. It retrieves question sets and global statistics dynamically, validating player answers and offering progressive difficulty modes.",
    role: "Mobile Programming / Backend Integration / UI Architecture",
    mechanics: [
      "Timed multiple-choice flag deduction",
      "Streak multipliers and score leaderboards",
      "Region-based filter modes (Europe, Asia, Americas)",
      "Offline cache playback support"
    ],
    technical: [
      "Unity 2D & Canvas UI",
      "Firebase Realtime Database REST integration",
      "JSON serialization and local persistence",
      "Mobile screen orientation and DPI scaling"
    ],
    architecture: [
      "DataManager handling async question retrieval and fallback offline datasets",
      "QuizController managing timer coroutines and answer verification",
      "UIManager orchestrating responsive UI canvas elements across varied mobile aspect ratios"
    ],
    engineHighlights: [
      "Unity Canvas optimization with segregated static/dynamic canvases",
      "UnityWebRequest for network resilience",
      "PlayerPrefs encryption for offline high score security"
    ],
    challengesAndSolutions: [
      {
        challenge: "Preventing lag spikes while loading high-resolution vector and PNG flag textures.",
        solution: "Preloaded low-resolution sprite atlases by geographic continent, caching textures asynchronously."
      }
    ],
    learned: "Gained hands-on experience integrating cloud databases with Unity, managing asynchronous network requests, and mobile canvas optimization.",
    relatedSlugs: ["movidle-game", "the-unlit-door"],
    mediaType: "external",
    externalUrl: "https://www.linkedin.com/posts/harunemrecankarabag_gamedevelopment-unity-oyun-activity-7198598131725303809-WXSh",
    links: {
      github: "https://github.com/Hekyetmisbes/flag-quiz-game"
    }
  },
  "movidle-game": {
    slug: "movidle-game",
    title: "MOVIDLE",
    seoTitle: "Movidle – Unity Cinema Deduction Wordle-Style Puzzle | Harun Emrecan Karabağ",
    seoDescription: "A cinema guessing puzzle game built in Unity utilizing IMDb Top 250 datasets, metadata clue comparisons, and daily game loops.",
    number: "007",
    year: "2023",
    engine: "Unity",
    genre: "Cinema Guessing Puzzle",
    status: "Completed Project",
    image: "/assets/movidle-logo.png",
    pitch: "A movie deduction game using titles from IMDb's Top 250. Players infer the correct film through country, genre, director, year and cast clues.",
    overview: "Inspired by deduction puzzles like Wordle, Movidle challenges film enthusiasts to identify hidden cinema classics. After every guess, the game returns color-coded feedback on release year, director, country, and genre matches.",
    role: "Gameplay Programming / Data Parsing / UI Logic",
    mechanics: [
      "Five-attempt structured deduction loop",
      "Cellular color feedback (Green: Exact, Yellow: Partial, Gray: Mismatch)",
      "Fuzzy search movie title auto-completion",
      "Daily puzzle generation seed"
    ],
    technical: [
      "Unity UI (uGUI)",
      "C# Linq data filtering and comparison logic",
      "Embedded SQLite / JSON dataset of IMDb Top 250",
      "Cross-platform WebGL & Standalone compilation"
    ],
    architecture: [
      "MovieDatabase parser indexing film records with fast dictionary lookups",
      "DeductionEngine comparing target attributes against guessed film metadata",
      "GameHistoryManager recording play streaks and win rates locally"
    ],
    engineHighlights: [
      "Unity UI Canvas event triggers and input fields",
      "Dynamic grid layout groups auto-fitting various monitor resolutions",
      "Lightweight WebGL memory budget under 35 MB"
    ],
    challengesAndSolutions: [
      {
        challenge: "Instantaneous auto-complete search over hundreds of movie titles without UI frame drops.",
        solution: "Constructed a prefix trie data structure in C# that returns top 5 matched films in sub-millisecond time."
      }
    ],
    learned: "Explored data-driven puzzle mechanics, string comparison algorithms, and rapid WebGL deployment.",
    relatedSlugs: ["flag-quiz-game", "the-platform"],
    mediaType: "external",
    externalUrl: "https://www.linkedin.com/posts/harunemrecankarabag_game-gamedevelopment-unity-activity-7141805886859112448-oZPK",
    links: {
      github: "https://github.com/Hekyetmisbes/movidle"
    }
  }
};

export const GAMES_LIST = Object.values(GAMES);
