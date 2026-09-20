// src/data/notes.ts
// Engineering Notes & Deep-Dive Topic Architecture for HEK75

export interface EngineeringTopic {
  id: string;
  title: string;
  category: "Unity" | "Unreal Engine" | "Systems & Tools" | "Architecture";
  description: string;
  relatedProjectSlug: string;
  relatedProjectName: string;
  caseStudyAnchor?: string;
  tags: string[];
}

export const ENGINEERING_TOPICS: EngineeringTopic[] = [
  {
    id: "time-loop-state-machine",
    title: "Unreal Engine World State Reset Architecture",
    category: "Unreal Engine",
    description: "Engineering single-frame deterministic world resets and lightweight state bitmasks using custom UE5 World Subsystems without garbage collection hitches.",
    relatedProjectSlug: "the-final-loop",
    relatedProjectName: "The Final Loop",
    tags: ["Unreal Engine 5", "Subsystems", "State Machine", "C++", "Blueprints"]
  },
  {
    id: "modular-actor-components",
    title: "Designing Reusable Gameplay Components in UE5",
    category: "Unreal Engine",
    description: "Decoupling interaction logic and power distribution from monolithic actors into modular Actor Components with Event Dispatchers.",
    relatedProjectSlug: "the-final-loop",
    relatedProjectName: "The Final Loop",
    tags: ["Unreal Engine 5", "Actor Components", "Architecture", "Design Patterns"]
  },
  {
    id: "coyote-time-input-buffering",
    title: "Implementing Coyote Time and Input Buffering in Unity",
    category: "Unity",
    description: "Formulating asymmetric gravity multipliers, 0.12s coyote grace periods, and input queue buffers for fair 2D precision platformer feel.",
    relatedProjectSlug: "the-platform",
    relatedProjectName: "The Platform",
    tags: ["Unity", "Game Feel", "Physics 2D", "Input Buffering", "C#"]
  },
  {
    id: "object-pooling-zero-allocation",
    title: "Object Pooling and Allocation-Free Gameplay Systems",
    category: "Unity",
    description: "Mitigating garbage collection spikes in constrained WebGL environments using pre-allocated object pools and Bezier flight trajectory curves.",
    relatedProjectSlug: "fog-bridge",
    relatedProjectName: "Fog Bridge",
    tags: ["Unity", "Optimization", "Object Pooling", "Zero-Allocation", "WebGL"]
  },
  {
    id: "mobile-urp-optimization",
    title: "Mobile 60 FPS Performance Budgeting and Addressables",
    category: "Unity",
    description: "Constraining draw calls under 60 with SRP Batching and streaming chapter assets on demand via Unity Addressables to minimize RAM footprint.",
    relatedProjectSlug: "the-unlit-door",
    relatedProjectName: "The Unlit Door",
    tags: ["Unity Mobile", "URP", "Addressables", "Memory Budgeting", "Performance"]
  },
  {
    id: "native-windows-tools-rust",
    title: "Building Native Windows Tools with Rust and Win32",
    category: "Systems & Tools",
    description: "Summoning responsive UI under 16ms, Win32/DWM integration, sub-50ms fuzzy search querying, and avoiding Chromium runtime bloat.",
    relatedProjectSlug: "litecast",
    relatedProjectName: "LiteCast",
    tags: ["Rust", "Win32", "Desktop Tools", "Performance", "Productivity"]
  }
];
