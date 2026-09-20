export interface TechnicalChallenge {
  challenge: string;
  solution: string;
}

export interface CaseStudySection {
  heading: string;
  subheading?: string;
  paragraphs: string[];
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
  language?: string;
  projectType?: string;
  teamSize?: string;
  developmentPeriod?: string;
  platform?: string;
  executiveSummary?: string;
  mechanics: string[];
  technical: string[];
  architecture: string[];
  engineHighlights: string[];
  challengesAndSolutions: TechnicalChallenge[];
  caseStudySections?: CaseStudySection[];
  learned: string;
  relatedSlugs: string[];
  mediaType: "youtube" | "linkedin" | "mp4" | "external" | "cover";
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
    seoTitle: "The Final Loop – Unreal Engine 5 Puzzle Game | HEK75",
    seoDescription: "Unreal Engine 5 psychological puzzle vertical slice engineered around time loops, modular Blueprint actor components, and deterministic state resets.",
    number: "001",
    year: "2026",
    engine: "Unreal Engine 5",
    genre: "Psychological Puzzle / Vertical Slice",
    status: "Gameplay Prototype",
    image: "/assets/final_loop_logo.png",
    language: "C++ / Blueprints",
    projectType: "Vertical Slice Prototype",
    teamSize: "Solo Developer",
    developmentPeriod: "3 Months",
    platform: "PC (Windows)",
    executiveSummary: "The Final Loop is an Unreal Engine 5 psychological puzzle vertical slice investigating time-anomaly mechanics within an isolated subterranean laboratory. The primary technical challenge was persisting player discoveries across loops without accumulating stale states or frame hitching upon reset. As solo developer responsible for gameplay programming and technical design, I engineered a World Subsystem state machine and modular Actor Components to deliver responsive, deterministic gameplay under 2.5ms loop reset budgets.",
    pitch: "A psychological gameplay prototype built around repeated attempts, memory loops, interaction states and player-facing feedback inside a collapsing research facility.",
    overview: "The Final Loop is an Unreal Engine 5 vertical slice that explores recurring time-anomaly mechanics within an isolated subterranean laboratory. The project was designed to test tight environmental feedback loops, persistent room state modifications, and high-cadence player decision making under psychological tension.",
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
      },
      {
        challenge: "Decoupling puzzle triggers from hardcoded level references for rapid vertical slice iterations.",
        solution: "Engineered a modular BaseInteractiveComponent with event dispatchers, allowing level designers to link switches to doors via Blueprint interfaces."
      }
    ],
    caseStudySections: [
      {
        heading: "1. The Time-Anomaly Architecture & State Machine",
        subheading: "Challenge → Architecture → Implementation",
        paragraphs: [
          "Designing a psychological game around time loops presents a core technical challenge: how do you persist player memory and narrative discoveries across iterations without accumulating stale game states or leaking memory? Rather than reloading the level map upon player death or timer expiration—which would cause noticeable hitching and break psychological immersion—I engineered a custom World Subsystem in Unreal Engine 5 called ULoopSubsystem.",
          "This subsystem functions as a single source of truth, maintaining a lightweight bitmask of unlocked narrative flags, elapsed cycle seconds, and environmental deterioration tiers. When the loop resets, ULoopSubsystem broadcasts an OnLoopCycleReset event. Every interactive prop and puzzle mechanism in the scene implements an IResetLoopInterface, allowing them to revert their transforms, physics velocities, and material parameters deterministically within a single tick without invoking garbage collection spikes."
        ]
      },
      {
        heading: "2. Modular Actor Components vs Monolithic Blueprints",
        subheading: "Decoupling Gameplay Logic from Visual Assets",
        paragraphs: [
          "In early prototyping, tying interaction logic directly into specific door or terminal actors resulted in duplicated Blueprint spaghetti. To establish clean engineering practices, I extracted all interactive logic into modular Actor Components: BPC_Interactable, BPC_PowerConsumer, and BPC_LoopStateObserver.",
          "Under this architecture, any static mesh in the laboratory—whether an emergency airlock, an oscilloscope terminal, or a security junction box—becomes interactive simply by attaching BPC_Interactable. When the player engages with an object, the component delegates authority through Event Dispatchers to local puzzle controllers, keeping class hierarchies shallow and enabling rapid level prototyping."
        ]
      },
      {
        heading: "3. Contextual Enhanced Input & Diegetic Feedback",
        subheading: "Player Experience & Ergonomics",
        paragraphs: [
          "To reinforce the sense of claustrophobia and tension, the prototype minimizes screen clutter by avoiding floating UI markers. Player affordances rely entirely on diegetic environmental cues: pulsing emissive strips driven by dynamic material instances (DMI), flickering emergency halogen bulbs via Lumen global illumination, and spatialized 3D audio attenuation curves.",
          "Using Unreal Engine 5's Enhanced Input System, I established layered Input Mapping Contexts (IMC). While exploring, the default IMC_Exploration handles movement and examination. When approaching complex interactive machinery, the system seamlessly pushes IMC_Terminal onto the input stack, mapping directional inputs to dials and keypads without mode-switch stutter."
        ]
      },
      {
        heading: "4. Performance Profiling & Vertical Slice Outcomes",
        subheading: "Stable 60 FPS Target on Mid-Tier Hardware",
        paragraphs: [
          "With Lumen dynamic global illumination enabled, maintaining stable 60 FPS in dense interior environments required strict draw call budgeting. I consolidated modular sci-fi corridor kits into reusable instanced static meshes, adjusted virtual shadow map caching, and ensured all loop reset routines execute under 2.5 milliseconds.",
          "The resulting vertical slice successfully demonstrates tight psychological loop pacing, responsive tactile interactions, and a rock-solid state management foundation scalable to a full-length title."
        ]
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
    seoTitle: "Fog Bridge – Unity Narrative Puzzle Game | HEK75",
    seoDescription: "Atmospheric narrative puzzle game built in 72 hours for GameDev.tv Jam using Unity URP, ScriptableObject clue data, and procedural flight paths.",
    number: "002",
    year: "2026",
    engine: "Unity (URP)",
    genre: "Atmospheric Narrative Puzzle",
    status: "Game Jam Build",
    image: "/assets/fog-bridge-logo.png",
    language: "C#",
    projectType: "Game Jam Entry (72 Hours)",
    teamSize: "Solo Developer",
    developmentPeriod: "72 Hours",
    platform: "WebGL / PC",
    executiveSummary: "Fog Bridge is an atmospheric narrative puzzle game built in 72 hours for the GameDev.tv Game Jam under the theme 'Secrets In The Fog'. The primary engineering objective was delivering rich volumetric fog and spatial bridge reconstruction within tight WebGL memory budgets and zero game-breaking bugs. As solo programmer and designer, I authored Bezier flight paths, ScriptableObject clue pipelines, and object-pooled mechanics that earned top ranking for atmospheric polish.",
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
      },
      {
        challenge: "Ensuring zero game-breaking bugs under high jam pressure without unit test suites.",
        solution: "Employed strict Finite State Machines for puzzle validation, eliminating impossible progression edge cases."
      }
    ],
    caseStudySections: [
      {
        heading: "1. 72-Hour Jam Scope Management & Design Pillars",
        subheading: "From Theme to Finished Loop in 3 Days",
        paragraphs: [
          "When GameDev.tv announced the theme 'Secrets In The Fog', the primary danger was scope creep—attempting complex open-world navigation or intricate inventory systems that cannot be polished within 72 hours. To guarantee delivery, I established three non-negotiable design pillars: 1) One core mechanical input loop (catch, read, build), 2) Zero unmotivated travel distance, and 3) High atmospheric polish via sound and lighting.",
          "Every gameplay feature had to directly serve the emotional experience of solitude and connection across a foggy void. By enforcing strict feature boundaries on Day 1, I reserved the final 24 hours entirely for playtesting, audio balance, and build validation across WebGL and Windows targets."
        ]
      },
      {
        heading: "2. The Paper-Plane Communication Pipeline",
        subheading: "Procedural Flight Paths & Decoupled Data",
        paragraphs: [
          "The narrative vehicle of the game is a series of paper airplanes that soar out of the dense fog. To make their arrival feel organic rather than scripted on a rail, I engineered a Bezier trajectory calculator in C#. Each plane calculates a smooth cubic Bezier curve toward the player's current perimeter with subtle Perlin noise perturbations applied to pitch and roll.",
          "The message content itself is backed by ScriptableObjects (MessageDataSO). Separating text content and clue identifiers from the physical plane prefab allowed narrative pacing adjustments in the Inspector without touching runtime physics code or recompiling scripts."
        ]
      },
      {
        heading: "3. State-Driven Puzzle Progression & Validation",
        subheading: "Preventing Player Disorientation in Zero-Visibility",
        paragraphs: [
          "Navigating thick fog creates a high risk of player frustration: if players cannot see landmark silhouettes, they easily assume the game is broken. To maintain clear affordances without resorting to artificial GPS arrows, I implemented an environmental feedback chain.",
          "As the player correctly solves cryptic messages and aligns bridge keystones, a centralized BridgeManager state machine transitions through distinct phases. Each completed step triggers an audible resonant chime, dampens local fog density in a localized radius, and lights up glowing floor glyphs that guide the player forward."
        ]
      },
      {
        heading: "4. Optimization & Zero-Allocation Performance",
        subheading: "Unity 6 URP Performance Budgeting",
        paragraphs: [
          "To ensure silky smooth framerates on lower-end laptops and WebGL browsers, volumetric fog was achieved using calibrated exponential height fog combined with GPU-instanced quad particles instead of full-screen compute-shader raymarching.",
          "All message objects and bridge chunks are pre-spawned in object pools at startup, ensuring zero garbage-collection allocations during gameplay frames. The project shipped with 0 critical defects and achieved top praise for atmosphere and gameplay cohesion in the jam rankings."
        ]
      }
    ],
    learned: "Mastered strict scope prioritization, player affordance under constrained visibility, and shipping a zero-bug jam build.",
    relatedSlugs: ["the-final-loop", "the-unlit-door"],
    mediaType: "linkedin",
    mediaUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7464783917389152257?compact=1",
    externalUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7464783917389152257?compact=1",
    links: {
      github: "https://github.com/Hekyetmisbes",
      itch: "https://hekyetmisbes.itch.io/fog-bridge"
    }
  },
  "the-unlit-door": {
    slug: "the-unlit-door",
    title: "THE UNLIT DOOR",
    seoTitle: "The Unlit Door – Unity Mobile Puzzle Game | HEK75",
    seoDescription: "Unity Mobile psychological puzzle game concept and system architecture focused on touch light-shadow mechanics, Addressables, and 60 FPS budgets.",
    number: "003",
    year: "2026",
    engine: "Unity Mobile",
    genre: "Psychological Narrative Puzzle",
    status: "Design / Pitch",
    image: "/assets/unlit_door_logo.png",
    language: "C# / HLSL",
    projectType: "System Design & Technical Architecture",
    teamSize: "Lead Designer / Systems Architect",
    developmentPeriod: "Concept & System Specification",
    platform: "Mobile (Android / iOS)",
    executiveSummary: "The Unlit Door is a mobile-first psychological puzzle pitch centered on touch-driven light and shadow interactions. The core technical hurdle was designing continuous dynamic shadow alignment without exceeding mobile GPU thermal and draw call limits. In this design case study, I established a 60 FPS budget with SRP Batching, ShaderLab occlusion masks, and an Addressables asset delivery pipeline for seamless episodic streaming.",
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
    caseStudySections: [
      {
        heading: "1. Mobile Touch Mechanics & Light-Shadow Interactions",
        subheading: "Designing for Tactile Mobile Ergonomics",
        paragraphs: [
          "The mechanical core of The Unlit Door revolves around using fingers to manipulate single-source flashlight cones across intricate relief carvings. Because touchscreens lack physical feedback, the system architecture introduces micro-damping and rotational momentum to the virtual light beam, giving the beam weight and tactile fidelity.",
          "When the beam casts shadows over specific doorway reliefs, a custom occlusion shader checks alignment angles against target thresholds. If matched within a 5-degree tolerance, the shadow silhouette manifests physical geometry, unlocking the psychological threshold."
        ]
      },
      {
        heading: "2. Mobile Performance Budget & Addressables Architecture",
        subheading: "60 FPS and Low Memory Footprint on Android/iOS",
        paragraphs: [
          "To satisfy battery-conscious mobile requirements, the game is strictly budgeted for 60 FPS on ARM Mali and Adreno chipsets. Draw calls are constrained below 60 per frame through aggressive SRP Batching and unified atlas materials.",
          "Furthermore, memory usage is maintained under 250 MB using Unity Addressables. Each psychological chapter is packaged as an independent Addressable AssetBundle, streamed on-demand and unloaded upon chapter transitions to prevent memory fragmentation on devices with low RAM."
        ]
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
    seoTitle: "Delivery Driver – Unity 3D Physics Game | HEK75",
    seoDescription: "Physics-based arcade courier driving simulation in Unity 3D featuring custom suspension, lateral friction tuning, and Cinemachine damping.",
    number: "004",
    year: "2025",
    engine: "Unity 3D",
    genre: "3D Simulation & Driving",
    status: "Completed Project",
    image: "/assets/delivery-drive-logo.png",
    language: "C#",
    projectType: "Gameplay Simulation",
    teamSize: "Solo Developer",
    developmentPeriod: "1 Month",
    platform: "PC (Windows)",
    executiveSummary: "Delivery Driver is a physics-driven arcade courier simulation where players balance vehicle stability and parcel integrity across suburban shortcuts. The technical problem was overcoming floaty or volatile WheelCollider behavior on abrupt steering inputs and curb impacts. Handling gameplay programming and physics tuning, I engineered programmatic lateral friction curves and a dynamically damped Cinemachine camera rig delivering tactile arcade feel.",
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
      },
      {
        challenge: "Creating readable navigation cues without cluttering the screen with mini-maps.",
        solution: "Implemented 3D world-space waypoint arrows positioned along the horizon and subtle roadside tire-mark decals marking hidden shortcuts."
      }
    ],
    caseStudySections: [
      {
        heading: "1. Arcade Vehicle Physics Tuning & Stability",
        subheading: "Balancing Simulation with Responsive Arcade Feel",
        paragraphs: [
          "Standard Unity WheelColliders often feel sluggish or excessively volatile on abrupt steering inputs. For Delivery Driver, the priority was immediate, responsive arcade feedback reminiscent of classic arcade couriers. I developed a hybrid physics controller that blends Rigidbody velocities with programmatic lateral friction curves.",
          "To combat high-speed rollover instability when mounting curbs, the vehicle's center of mass is programmatically set 0.4 units below the wheel axle plane, with a downward corrective raycast applying an air-stabilization torque whenever wheels lose ground contact."
        ]
      },
      {
        heading: "2. Camera Ergonomics & Dynamic Field of View",
        subheading: "Cinemachine Framing and Motion Sensation",
        paragraphs: [
          "A driving game lives or dies by its camera feel. Utilizing Unity Cinemachine, I engineered a third-person framing rig featuring dual transposer damping. The camera smoothly drifts opposite steering angles during power slides, giving the player visual feedback of lateral tire grip.",
          "Additionally, the camera's Field of View (FOV) dynamically interpolates from 60° to 78° based on current linear velocity, amplifying the sense of speed during frantic delivery countdowns."
        ]
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
    seoTitle: "The Platform – Unity 2D Precision Platformer | HEK75",
    seoDescription: "Precision 2D cyberpunk platformer built in Unity featuring coyote time, jump buffering, asymmetric gravity multipliers, and snappy wall slides.",
    number: "005",
    year: "2024",
    engine: "Unity 2D",
    genre: "2D Cyberpunk Platformer",
    status: "Completed Project",
    image: "/assets/platform-logo.png",
    language: "C#",
    projectType: "Precision Platformer",
    teamSize: "Solo Developer",
    developmentPeriod: "1 Month",
    platform: "PC (Windows)",
    executiveSummary: "The Platform is a precision 2D cyberpunk platformer engineered to achieve fair, responsive game feel. Standard 2D rigidbodies often cause missed ledge inputs and floaty arcs; to solve this, I designed a custom Finite State Machine with a 0.12s coyote-time grace timer, a 0.10s input buffer, and asymmetric gravity scaling (1.8x descent) ensuring tight player control.",
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
    caseStudySections: [
      {
        heading: "1. 2D Platformer Game Feel Equations",
        subheading: "Coyote Time, Input Buffering and Asymmetric Gravity",
        paragraphs: [
          "Precision platformers succeed only when failure feels 100% fair. Standard rigidbodies fail this test because jumping milliseconds after leaving a ledge causes missed inputs. I engineered a dedicated PlayerController tracking a 0.12s coyote-time grace timer and a 0.10s input buffer queue.",
          "Furthermore, gravity scaling is asymmetric: ascending jumps apply standard gravity, while descending frames multiply gravity by 1.8x, producing a snappy, controlled arc that eliminates floatiness."
        ]
      }
    ],
    learned: "Mastered game-feel ergonomics, responsive 2D movement equations, and robust FSM implementation.",
    relatedSlugs: ["delivery-driver", "flag-quiz-game"],
    mediaType: "linkedin",
    mediaUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7287040546265534464?compact=1",
    externalUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7287040546265534464?compact=1",
    links: {
      github: "https://github.com/Hekyetmisbes/the-platform"
    }
  },
  "flag-quiz-game": {
    slug: "flag-quiz-game",
    title: "FLAG QUIZ GAME",
    seoTitle: "Flag Quiz Game – Unity Mobile Trivia Game | HEK75",
    seoDescription: "Cross-platform mobile educational geography game built in Unity with Firebase Realtime Database, async caching, and responsive Canvas UI.",
    number: "006",
    year: "2024",
    engine: "Unity Mobile",
    genre: "Educational Trivia",
    status: "Completed Project",
    image: "/assets/flag-quiz-logo.png",
    language: "C#",
    projectType: "Educational Mobile Game",
    teamSize: "Solo Developer",
    developmentPeriod: "2 Months",
    platform: "Mobile (Android / iOS)",
    executiveSummary: "Flag Quiz Game is a cross-platform mobile trivia title testing geographic recognition via dynamic cloud synchronization. The technical challenge was eliminating hitching while loading vector and high-resolution flag textures during rapid quiz rounds. Responsible for mobile development and backend integration, I implemented Firebase REST communication, asynchronous sprite atlas caching, and segregated UI canvas layers.",
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
    mediaType: "linkedin",
    mediaUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7198598131725303809?compact=1",
    externalUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7198598131725303809?compact=1",
    links: {
      github: "https://github.com/Hekyetmisbes/flag-quiz-game"
    }
  },
  "movidle-game": {
    slug: "movidle-game",
    title: "MOVIDLE",
    seoTitle: "Movidle – Unity Cinema Deduction Puzzle | HEK75",
    seoDescription: "Cinema deduction puzzle game engineered in Unity utilizing IMDb Top 250 datasets, prefix trie autocomplete, and Linq metadata matching.",
    number: "007",
    year: "2023",
    engine: "Unity",
    genre: "Cinema Guessing Puzzle",
    status: "Completed Project",
    image: "/assets/movidle-logo.png",
    language: "C#",
    projectType: "Deduction Web/Desktop Game",
    teamSize: "Solo Developer",
    developmentPeriod: "3 Weeks",
    platform: "WebGL / PC",
    executiveSummary: "Movidle is a daily cinema guessing puzzle inspired by Wordle and powered by the IMDb Top 250 film archive. The primary technical requirement was instant fuzzy auto-completion across hundreds of movie records without triggering WebGL garbage collection frame spikes. As solo programmer, I implemented a prefix trie data structure in C# and Linq comparison algorithms running in sub-millisecond time.",
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
    mediaType: "linkedin",
    mediaUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7141805886859112448?compact=1",
    externalUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7141805886859112448?compact=1",
    links: {
      github: "https://github.com/Hekyetmisbes/movidle"
    }
  }
};

export const GAMES_LIST = Object.values(GAMES);
