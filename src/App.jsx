import { useEffect, useState, forwardRef, useImperativeHandle, useCallback, useRef } from "react";
import { motion, useAnimate } from "motion/react";

// --- ANIMATED ICONS ---

const InstagramIcon = forwardRef(
  ({ size = 24, color = "currentColor", strokeWidth = 2, className = "" }, ref) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(".ig-body", { scale: [1, 1.05, 1] }, { duration: 0.3, ease: "easeOut" });
      await animate(".ig-lens", { scale: [1, 1.2, 1] }, { duration: 0.25, ease: "easeOut" });
      animate(".ig-dot", { opacity: [1, 0, 1] }, { duration: 0.2, ease: "easeInOut" });
    }, [animate]);

    const stop = useCallback(() => {
      animate(".ig-body, .ig-lens, .ig-dot", { scale: 1, opacity: 1 }, { duration: 0.2, ease: "easeInOut" });
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <div ref={scope} className={`inline-flex ${className}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            className="ig-body"
            style={{ transformOrigin: "50% 50%" }}
            d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"
          />
          <motion.path
            className="ig-lens"
            style={{ transformOrigin: "50% 50%" }}
            d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"
          />
          <motion.path className="ig-dot" d="M16.5 7.5v.01" />
        </svg>
      </div>
    );
  }
);

const LinkedinIcon = forwardRef(
  ({ size = 24, color = "currentColor", strokeWidth = 2, className = "" }, ref) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(".border", { scale: [1, 1.05, 1] }, { duration: 0.4, ease: "easeInOut" });
      await animate(".lines", { pathLength: [0, 1] }, { duration: 0.5, ease: "easeOut" });
    }, [animate]);

    const stop = useCallback(() => {
      animate(".lines, .border", { pathLength: 1, scale: 1 }, { duration: 0.2 });
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <motion.path className="lines" d="M8 11v5" initial={{ pathLength: 1 }} />
        <motion.path className="lines" d="M8 8v.01" initial={{ pathLength: 1 }} />
        <motion.path className="lines" d="M12 16v-5" initial={{ pathLength: 1 }} />
        <motion.path className="lines" d="M16 16v-3a2 2 0 1 0 -4 0" initial={{ pathLength: 1 }} />
        <motion.path
          className="border"
          d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z"
          style={{ transformOrigin: "center" }}
        />
      </motion.svg>
    );
  }
);

const MailIcon = forwardRef(
  ({ size = 24, color = "currentColor", strokeWidth = 2, className = "" }, ref) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      await animate(".mail-open", { rotateX: -60, transformOrigin: "50% 0%" }, { duration: 0.5, ease: "easeInOut" });
    }, [animate]);

    const stop = useCallback(() => {
      animate(".mail-open", { rotateX: 0, transformOrigin: "50% 0%" }, { duration: 0.5, ease: "easeInOut" });
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} perspective-distant`}
      >
        <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <motion.path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
        <motion.path d="M3 7l9 6l9 -6" className="mail-open" />
      </motion.svg>
    );
  }
);

const GithubIcon = forwardRef(
  ({ size = 24, color = "currentColor", strokeWidth = 2, className = "" }, ref) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      await animate(".github-icon", { scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }, { duration: 0.5, ease: "easeInOut" });
    }, [animate]);

    const stop = useCallback(() => {
      animate(".github-icon", { scale: 1, rotate: 0 }, { duration: 0.2, ease: "easeOut" });
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`inline-flex items-center justify-center ${className}`}
        style={{ overflow: "visible" }}
      >
        <motion.g className="github-icon" style={{ transformOrigin: "center" }}>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
        </motion.g>
      </motion.svg>
    );
  }
);

const ArrowBigDownDashIcon = forwardRef(
  ({ size = 32, className = "", color = "currentColor", strokeWidth = "2", onClick }, ref) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(".arrow", { y: 3 }, { duration: 0.4, ease: "easeOut" });
      animate(".dash", { opacity: 0.4 }, { duration: 0.4 });
    }, [animate]);

    const stop = useCallback(async () => {
      animate(".arrow", { y: 0 }, { duration: 0.3, ease: "easeIn" });
      animate(".dash", { opacity: 1 }, { duration: 0.3 });
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
        onHoverStart={start}
        onHoverEnd={stop}
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        color={color}
        className={`cursor-pointer ${className}`}
        style={{ overflow: "visible" }}
      >
        <motion.path
          className="arrow"
          d="M15 10a1 1 0 0 0 1 1h2.939a1 1 0 0 1 .75 1.811l-6.835 6.836a1.207 1.207 0 0 1-1.707 0L4.31 12.81a1 1 0 0 1 .75-1.811H8a1 1 0 0 0 1-1V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1z"
        />
        <motion.path className="dash" d="M9 4h6" />
      </motion.svg>
    );
  }
);

InstagramIcon.displayName = "InstagramIcon";
LinkedinIcon.displayName = "LinkedinIcon";
MailIcon.displayName = "MailIcon";
GithubIcon.displayName = "GithubIcon";
ArrowBigDownDashIcon.displayName = "ArrowBigDownDashIcon";

const Portfolio = () => {
  const [scrolled, setScrolled] = useState(false);
  const mailRef = useRef(null);
  const linkedinRef = useRef(null);
  const instagramRef = useRef(null);
  const githubRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const enterProject = (project) => {
    window.open(project.link, "_blank", "noopener,noreferrer");
  };

  const handleProjectCardClick = (event, project) => {
    if (event.target.closest("a")) return;
    enterProject(project);
  };

  const handleProjectCardKeyDown = (event, project) => {
    if (event.target.closest("a")) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    enterProject(project);
  };

  const experiences = [
    {
      role: "Co-Founder",
      company: "Fiction Technology Studios",
      location: "Ankara, Turkey",
      date: "December 2025 - April 2026",
      desc: "Co-founded an indie studio. Led product planning, task tracking, and delivery processes. Built Kotlin-based mobile applications and managed product roadmaps.",
      tech: ["Project Management", "Kotlin", "React"]
    },
    {
      role: "Intern Software Engineer",
      company: "Erciyes University IT Dept.",
      location: "Kayseri",
      date: "July 2025 - August 2025",
      desc: "Developed a Personnel Directory system using ASP.NET Core 8 and Clean Architecture. Integrated Elasticsearch and built a role-based admin panel.",
      tech: ["ASP.NET Core", "Elasticsearch", "CQRS", "Docker"]
    },
    {
      role: "Hardware Engineering Intern",
      company: "Fotonik Teknoloji A.Ş.",
      location: "Ankara",
      date: "July 2024 - August 2024",
      desc: "Designed and improved hardware components. Conducted testing and performance analysis.",
      tech: ["Hardware Design", "Testing", "Documentation"]
    }
  ];

  const projects = [
    {
      title: "The Final Loop",
      genre: "Psychological Puzzle / Vertical Slice",
      engine: "Unreal",
      desc: "Completed Unreal Engine psychological puzzle vertical slice. Explore memory loops and solve escape-room puzzles in a dark research facility.",
      link: "/projects/thefinalloop/"
    },
    {
      title: "The Unlit Door",
      genre: "Psychological Puzzle / Pitch",
      engine: "Unity",
      desc: "A written pitch page for a psychological narrative puzzle project, detailing concept and atmosphere.",
      link: "/projects/theunlitdoor/"
    },
    {
      title: "Delivery Driver",
      genre: "3D Simulation",
      engine: "Unity",
      desc: "A Unity 3D game where you play as a courier delivering orders across the city.",
      link: "https://hekyetmisbes.itch.io/delivery-driver"
    },
    {
      title: "Fog Bridge",
      genre: "Atmospheric Narrative Puzzle",
      engine: "Unity",
      desc: "A short GameDev.tv Game Jam 2026 narrative puzzle about decoding paper plane messages and rebuilding a bridge across the fog.",
      link: "https://hekyetmisbes.itch.io/fog-bridge"
    },
    {
      title: "Movidle Game",
      genre: "Web Game / Puzzle",
      engine: "Unity",
      desc: "A movie guessing game featuring titles from the IMDb Top 250 with color-coded feedback.",
      link: "https://github.com/Hekyetmisbes/movidle"
    },
    {
      title: "Flag Quiz Game",
      genre: "Mobile Quiz / Educational",
      engine: "Unity",
      desc: "A mobile flag guessing game developed with Unity and C#, helping players improve their geography knowledge with an interactive UI.",
      link: "https://github.com/Hekyetmisbes/flag-quiz-game"
    }
  ];

  const skills = {
    engines: [
      { name: "Unity", level: 85, color: "vibrant-blue" },
      { name: "Unreal Engine", level: 60, color: "vibrant-blue" }
    ],
    languages: [
      { name: "C#", level: 85, color: "pastel-coral" },
      { name: "JavaScript/React", level: 75, color: "pastel-coral" },
      { name: "Kotlin", level: 45, color: "pastel-coral" }
    ],
    tools: [
      { name: "Git / GitHub", level: 95, color: "pastel-green" },
      { name: "ASP.NET Core", level: 80, color: "pastel-green" }
    ]
  };

  return (
    <div className="portfolio-root">
      {/* HUD Header */}
      <header className={`hud-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container hud-nav">
          <div className="hud-logo"><span style={{ color: '#ffffff' }}>HEK</span>.dev</div>
          <nav className="hud-menu">
            <a href="#hero" className="hud-link" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>Start</a>
            <a href="#stats" className="hud-link" onClick={(e) => { e.preventDefault(); scrollToSection('stats'); }}>Stats</a>
            <a href="#quests" className="hud-link" onClick={(e) => { e.preventDefault(); scrollToSection('quests'); }}>Quests</a>
            <a href="#levels" className="hud-link" onClick={(e) => { e.preventDefault(); scrollToSection('levels'); }}>Levels</a>
            <a href="#contact" className="hud-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="hero" className="hero">
          <div className="container hero-content">
            <h1>Harun Emrecan <span className="text-vibrant-blue">Karabağ</span></h1>
            <p className="hero-subtitle">
              Computer Engineer | Game Developer specializing in Unreal Engine and Unity systems.
            </p>
            <div className="hero-btns" style={{ marginBottom: '3rem' }}>
              <button className="btn btn-primary" onClick={() => scrollToSection('levels')}>View Projects</button>
              <a href="/assets/Harun-Emrecan-Karabag-CV.pdf" target="_blank" className="btn btn-outline" style={{ marginLeft: '1rem' }}>Download CV</a>
            </div>
            <div className="hero-scroll-indicator" style={{ marginTop: '2rem' }}>
              <ArrowBigDownDashIcon 
                color="var(--accent-vibrant-blue)" 
                size={42}
                strokeWidth="2.25"
                onClick={() => scrollToSection('stats')} 
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="section">
          <div className="container">
            <h2 className="panel-title">Character Stats</h2>
            <div className="grid-3">
              <div className="panel">
                <h3 className="text-vibrant-blue mb-4">Engines</h3>
                {skills.engines.map(s => (
                  <div key={s.name} className="mb-4">
                    <div className="flex-between">
                      <span className="text-sm font-bold uppercase">{s.name}</span>
                      <span className="text-vibrant-blue text-sm font-mono">{s.level}%</span>
                    </div>
                    <div className="stat-bar"><div className={`stat-fill ${s.color === 'vibrant-blue' ? '' : s.color}`} style={{ width: `${s.level}%` }}></div></div>
                  </div>
                ))}
              </div>
              <div className="panel">
                <h3 className="text-pastel-coral mb-4">Languages</h3>
                {skills.languages.map(s => (
                  <div key={s.name} className="mb-4">
                    <div className="flex-between">
                      <span className="text-sm font-bold uppercase">{s.name}</span>
                      <span className="text-pastel-coral text-sm font-mono">{s.level}%</span>
                    </div>
                    <div className="stat-bar"><div className={`stat-fill ${s.color}`} style={{ width: `${s.level}%` }}></div></div>
                  </div>
                ))}
              </div>
              <div className="panel">
                <h3 className="text-pastel-green mb-4">Tools</h3>
                {skills.tools.map(s => (
                  <div key={s.name} className="mb-4">
                    <div className="flex-between">
                      <span className="text-sm font-bold uppercase">{s.name}</span>
                      <span className="text-pastel-green text-sm font-mono">{s.level}%</span>
                    </div>
                    <div className="stat-bar"><div className={`stat-fill ${s.color}`} style={{ width: `${s.level}%` }}></div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quest Log (Experience) */}
        <section id="quests" className="section">
          <div className="container">
            <h2 className="panel-title">Quest Log</h2>
            <div className="exp-list">
              {experiences.map((exp, i) => (
                <div key={i} className="exp-item">
                  <div className="exp-date">{exp.date}</div>
                  <h3 className="text-lg font-bold">{exp.role} @ <span className="text-vibrant-blue">{exp.company}</span></h3>
                  <p className="mt-2 text-secondary">{exp.desc}</p>
                  <div className="mt-2 flex-gap">
                    {exp.tech.map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Levels (Projects) */}
        <section id="levels" className="section">
          <div className="container">
            <h2 className="panel-title">Select Level</h2>
            <div className="grid-2">
              {projects.map((p, i) => (
                <div
                  key={i}
                  className="panel project-card"
                  role="link"
                  tabIndex={0}
                  aria-label={`Enter ${p.title}`}
                  onClick={(event) => handleProjectCardClick(event, p)}
                  onKeyDown={(event) => handleProjectCardKeyDown(event, p)}
                >
                  <div className="flex-between mb-4">
                    <h3 className="text-xl font-bold">{p.title}</h3>
                    <span className="tag">{p.engine}</span>
                  </div>
                  <p className="text-secondary mb-4">{p.desc}</p>
                  <a href={p.link} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">Enter Level</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact (Footer) */}
        <footer id="contact" className="contact-footer">
          <div className="container contact-footer-inner">
            <h2 className="panel-title">End Game</h2>
            <p className="contact-copy">Ready for the next level? Let's connect.</p>
            <nav className="contact-links" aria-label="Contact links">
              <a 
                href="mailto:harunemrecankarabag@gmail.com" 
                className="icon-link-minimal" 
                aria-label="Email Me"
                onMouseEnter={() => mailRef.current?.startAnimation()}
                onMouseLeave={() => mailRef.current?.stopAnimation()}
              >
                <MailIcon ref={mailRef} size={32} />
              </a>
              <a 
                href="https://www.linkedin.com/in/harunemrecankarabag/" 
                target="_blank" 
                rel="noreferrer" 
                className="icon-link-minimal" 
                aria-label="LinkedIn Profile"
                onMouseEnter={() => linkedinRef.current?.startAnimation()}
                onMouseLeave={() => linkedinRef.current?.stopAnimation()}
              >
                <LinkedinIcon ref={linkedinRef} size={32} />
              </a>
              <a 
                href="https://www.instagram.com/hekyetmisbes/" 
                target="_blank" 
                rel="noreferrer" 
                className="icon-link-minimal" 
                aria-label="Instagram Profile"
                onMouseEnter={() => instagramRef.current?.startAnimation()}
                onMouseLeave={() => instagramRef.current?.stopAnimation()}
              >
                <InstagramIcon ref={instagramRef} size={32} />
              </a>
              <a 
                href="https://github.com/Hekyetmisbes" 
                target="_blank" 
                rel="noreferrer" 
                className="icon-link-minimal" 
                aria-label="GitHub Profile"
                onMouseEnter={() => githubRef.current?.startAnimation()}
                onMouseLeave={() => githubRef.current?.stopAnimation()}
              >
                <GithubIcon ref={githubRef} size={32} />
              </a>
            </nav>
            <p className="contact-copyright">© 2026 Harun Emrecan Karabağ. Ankara, Turkey.</p>
          </div>
        </footer>
      </main>

      <style>{`
        .flex-between { display: flex; justify-content: space-between; align-items: center; }
        .flex-gap { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .text-secondary { color: var(--text-secondary); font-size: 0.875rem; }
        .tag { 
          font-size: 0.65rem; 
          font-weight: 700; 
          text-transform: uppercase; 
          background: var(--bg-dark); 
          color: var(--text-secondary); 
          padding: 0.25rem 0.5rem; 
          border: 1px solid var(--border-color);
          border-radius: 2px;
        }
        .btn-sm { padding: 0.5rem 1rem; font-size: 0.75rem; }
      `}</style>
    </div>
  );
};

export default Portfolio;
