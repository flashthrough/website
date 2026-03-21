import { useState, useEffect } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #050508;
    --surface: #0d0d14;
    --border: rgba(255,255,255,0.07);
    --text: #f0f0f5;
    --muted: #6b6b80;
    --accent: #e8ff47;
    --accent-dim: rgba(232,255,71,0.12);
    --blue: #4f8ef7;
  }

  html, body { scroll-behavior: smooth; background: #050508 !important; color: #f0f0f5; font-family: 'DM Sans', sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; }


  .grain { background: #050508 !important; min-height: 100vh; color: #f0f0f5; }

  .grain::after {
    content: '';
    position: fixed;
    inset: -200%;
    width: 400%;
    height: 400%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.022;
    pointer-events: none;
    z-index: 9999;
    animation: grain 0.5s steps(2) infinite;
  }

  @keyframes grain {
    0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)} 20%{transform:translate(3%,2%)}
    30%{transform:translate(-1%,3%)} 40%{transform:translate(2%,-1%)} 50%{transform:translate(-3%,1%)}
    60%{transform:translate(1%,-2%)} 70%{transform:translate(-2%,2%)} 80%{transform:translate(3%,-3%)} 90%{transform:translate(-1%,1%)}
  }

  @keyframes float {
    0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)}
  }

  @keyframes pulse-ring {
    0%{transform:scale(0.8);opacity:0.8} 100%{transform:scale(2.2);opacity:0}
  }

  .syne { font-family: 'Syne', sans-serif; }

  .hero-glow {
    position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none;
  }

  .cta-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: var(--accent); color: #0a0a0a;
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.875rem;
    letter-spacing: 0.02em; padding: 13px 28px; border-radius: 6px;
    border: none; cursor: pointer; transition: all 0.2s ease; text-decoration: none;
  }
  .cta-btn:hover { background: #f0ff6a; transform: translateY(-1px); box-shadow: 0 8px 32px rgba(232,255,71,0.25); }

  .cta-btn-ghost {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: transparent; color: var(--text);
    font-family: 'Syne', sans-serif; font-weight: 600; font-size: 0.875rem;
    letter-spacing: 0.02em; padding: 13px 28px; border-radius: 6px;
    border: 1px solid var(--border); cursor: pointer; transition: all 0.2s ease; text-decoration: none;
  }
  .cta-btn-ghost:hover { border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.04); }

  .card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
    transition: border-color 0.3s ease, transform 0.3s ease;
  }
  .card:hover { border-color: rgba(255,255,255,0.14); transform: translateY(-2px); }

  .tag {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: 'Syne', sans-serif; font-size: 0.7rem; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent);
    background: var(--accent-dim); padding: 5px 12px; border-radius: 100px;
    border: 1px solid rgba(232,255,71,0.2);
  }

  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    transition: background 0.3s ease, border-color 0.3s ease;
  }

  .speed-bar {
    height: 2px; border-radius: 2px;
    background: linear-gradient(90deg, var(--accent), var(--blue));
  }

  .gradient-text {
    background: linear-gradient(135deg, #f0f0f5 0%, #8888a0 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .accent-text {
    background: linear-gradient(135deg, var(--accent) 0%, #b8ff00 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  /* ==== MOBILE FIRST (default styles) ==== */

  .nav-inner {
    max-width: 1200px; margin: 0 auto; padding: 0 1.25rem;
    height: 60px; display: flex; align-items: center; justify-content: space-between;
  }
  .nav-links { display: none; }

  .hero-section { padding: 96px 1.25rem 4rem; min-height: 100svh; display: flex; align-items: center; position: relative; overflow: hidden; }
  .hero-grid { display: flex; flex-direction: column; gap: 2.5rem; width: 100%; }
  .hero-visual { display: flex; justify-content: center; order: -1; }
  .orb-wrap { width: 180px; height: 180px; position: relative; }
  .hero-headline { font-size: clamp(2rem, 8vw, 4.2rem); font-family: 'Syne', sans-serif; font-weight: 800; line-height: 1.08; letter-spacing: -0.03em; margin-bottom: 1.25rem; }
  .hero-cta-row { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; }
  .hero-stats { display: flex; flex-wrap: wrap; gap: 1.25rem; padding-top: 1.5rem; border-top: 1px solid var(--border); }

  .section-pad { padding: 4rem 1.25rem; }
  .section-surface { padding: 4rem 1.25rem; background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .section-inner { max-width: 1200px; margin: 0 auto; }
  .section-inner-sm { max-width: 1100px; margin: 0 auto; }

  .section-heading { font-family: 'Syne', sans-serif; font-weight: 800; letter-spacing: -0.03em; font-size: clamp(1.8rem, 5vw, 2.8rem); line-height: 1.12; }

  /* Shift timeline - mobile: left spine */
  .shift-wrap { position: relative; padding: 1rem 0; }
  .shift-spine { position: absolute; left: 10px; top: 0; bottom: 0; width: 1px; background: var(--border); }
  .shift-row { display: flex; margin-bottom: 1.5rem; position: relative; }
  .shift-dot { position: absolute; left: 6px; top: 50%; width: 10px; height: 10px; border-radius: 50%; transform: translateY(-50%); z-index: 2; }
  .shift-card { margin-left: 2rem; width: 100%; max-width: 100%; }

  /* VS grid - mobile: column */
  .vs-grid { display: flex; flex-direction: column; gap: 0; }
  .vs-col { padding: 1.5rem; border-radius: 12px; }
  .vs-sep { display: flex; align-items: center; gap: 1rem; padding: 0.5rem 0; }
  .vs-sep-line { flex: 1; height: 1px; background: var(--border); }

  /* Steps - mobile: 1 col */
  .steps-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
  .step-label { font-family:'Syne',sans-serif; font-size:0.65rem; font-weight:800; letter-spacing:0.15em; color:var(--muted); margin-bottom: 0.4rem; }

  /* Builds - mobile: stacked */
  .builds-outer { display: flex; flex-direction: column; gap: 2rem; }
  .builds-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.875rem; }

  /* Proof - mobile: 1 col */
  .proof-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }

  /* Footer - mobile: stacked */
  .footer-inner { display: flex; flex-direction: column; gap: 1rem; max-width: 1200px; margin: 0 auto; padding: 2rem 1.25rem; }

  /* ==== TABLET (600px+) ==== */
  @media (min-width: 600px) {
    .hero-cta-row { flex-direction: row; align-items: center; }
    .proof-grid { grid-template-columns: 1fr 1fr; }
    .orb-wrap { width: 220px; height: 220px; }
    .section-pad { padding: 5rem 1.5rem; }
    .section-surface { padding: 5rem 1.5rem; }
    .hero-section { padding: 110px 1.5rem 5rem; }
  }

  /* ==== DESKTOP (900px+) ==== */
  @media (min-width: 900px) {
    .nav-inner { height: 64px; padding: 0 2rem; }
    .nav-links { display: flex; align-items: center; gap: 2.5rem; }

    .hero-section { padding: 130px 2rem 6rem; }
    .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
    .hero-visual { order: 0; }
    .orb-wrap { width: 280px; height: 280px; }

    .shift-spine { left: 50%; transform: translateX(-50%); }
    .shift-dot { left: 50%; transform: translate(-50%, -50%) !important; }
    .shift-row { justify-content: flex-start; }
    .shift-row.right { justify-content: flex-end; }
    .shift-card { margin-left: 0; max-width: 420px; }
    .shift-row.left .shift-card { margin-right: calc(50% + 2rem); }
    .shift-row.right .shift-card { margin-left: calc(50% + 2rem); }

    .vs-grid { flex-direction: row; align-items: stretch; }
    .vs-col { flex: 1; }
    .vs-sep { flex-direction: column; min-width: 48px; padding: 0; }
    .vs-sep-line { flex: 1; width: 1px; height: auto; }

    .steps-grid { grid-template-columns: repeat(4, 1fr); }

    .builds-outer { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }

    .proof-grid { grid-template-columns: repeat(3, 1fr); }

    .footer-inner { flex-direction: row; align-items: center; justify-content: space-between; padding: 2.5rem 2rem; }

    .section-pad { padding: 6rem 2rem; }
    .section-surface { padding: 6rem 2rem; }
  }
`;

function SpeedOrb() {
  return (
    <div className="orb-wrap">
      {[1, 2, 3].map(i => (
        <div key={i} style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: "1px solid rgba(232,255,71,0.15)",
          animation: `pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) ${i * 0.6}s infinite`,
        }} />
      ))}
      <div style={{
        position: "absolute", inset: "20%", borderRadius: "50%",
        background: "radial-gradient(circle at 40% 35%, rgba(232,255,71,0.22) 0%, rgba(79,142,247,0.1) 50%, transparent 70%)",
        border: "1px solid rgba(232,255,71,0.25)",
        animation: "float 4s ease-in-out infinite",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <path d="M8 38L22 10L36 28L42 18" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="42" cy="18" r="3" fill="var(--accent)"/>
        </svg>
      </div>
      {[0, 90, 180, 270].map((deg, i) => (
        <div key={i} style={{
          position: "absolute", top: "50%", left: "50%",
          width: 6, height: 6, borderRadius: "50%",
          background: i === 0 ? "var(--accent)" : "rgba(255,255,255,0.2)",
          transform: `rotate(${deg}deg) translateX(80px) translateY(-50%)`,
        }} />
      ))}
    </div>
  );
}

function Nav({ scrolled }) {
  return (
    <nav style={{
      background: scrolled ? "rgba(5,5,8,0.88)" : "transparent",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
    }}>
      <div className="nav-inner">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 12L7 4L11 9L14 5" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="syne" style={{ fontWeight: 700, fontSize: "0.95rem", letterSpacing: "-0.01em" }}>flashthrough</span>
        </div>
        <div className="nav-links">
          {["Services", "Process", "Work", "About"].map(l => (
            <a key={l} href="#" style={{ color: "var(--muted)", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "var(--text)"}
              onMouseLeave={e => e.target.style.color = "var(--muted)"}
            >{l}</a>
          ))}
        </div>
        <a href="#contact" className="cta-btn" style={{ padding: "9px 18px", fontSize: "0.8rem", flexShrink: 0 }}>Start a project</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-glow" style={{ width: "min(600px,100vw)", height: "min(600px,100vw)", top: "10%", right: "-10%", background: "radial-gradient(circle, rgba(232,255,71,0.06) 0%, transparent 70%)" }}/>
      <div className="hero-glow" style={{ width: "min(500px,80vw)", height: "min(500px,80vw)", top: "60%", left: "-10%", background: "radial-gradient(circle, rgba(79,142,247,0.07) 0%, transparent 70%)" }}/>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "80px 80px", maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%,black 0%,transparent 100%)" }}/>
      <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="hero-grid">
          <div>
            <div style={{ marginBottom: "1.25rem" }}>
              <span className="tag">AI-Native Services</span>
            </div>
            <h1 className="hero-headline">
              The world moved from{" "}
              <span style={{ color: "var(--muted)", textDecoration: "line-through", textDecorationColor: "rgba(232,255,71,0.5)" }}>ships</span>{" "}
              to <span className="accent-text">planes.</span>
              <br />Software already has.
            </h1>
            <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 440 }}>
              The shift already happened. We build with the teams and tools of the new era.
            </p>
            <div className="hero-cta-row">
              <a href="#contact" className="cta-btn">Start a project</a>
              <a href="#process" className="cta-btn-ghost">See how it works</a>
            </div>
            <div className="hero-stats">
              {[["10x", "faster delivery"], ["~3", "person teams"], ["weeks", "not quarters"]].map(([val, label]) => (
                <div key={label}>
                  <div className="syne" style={{ fontSize: "1.2rem", fontWeight: 800 }}>{val}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <SpeedOrb />
          </div>
        </div>
      </div>
    </section>
  );
}

function TheShift() {
  return (
    <section className="section-pad" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="section-inner">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="tag" style={{ marginBottom: "1rem", display: "inline-flex" }}>The Shift</span>
          <h2 className="section-heading">
            Software development had its <span className="gradient-text">paradigm shift.</span>
          </h2>
          <p style={{ color: "var(--muted)", marginTop: "1rem", fontSize: "0.95rem", maxWidth: 520, margin: "1rem auto 0" }}>
            The transition already happened. Most companies just have not caught up yet. The teams that did are shipping faster, spending less, and winning.
          </p>
        </div>
        <div className="shift-wrap">
          <div className="shift-spine" />
          {[
            { era: "Then", icon: "An anchor", title: "Large teams, slow cycles", body: "Dozens of engineers, quarter-long sprints, waterfall planning, bloated overhead.", side: "left", accent: false },
            { era: "Now", icon: "Lightning", title: "Small teams, AI velocity", body: "3 to 5 person squads with AI augmentation, shipping real product in weeks.", side: "right", accent: true },
          ].map(({ era, icon, title, body, side, accent }) => (
            <div key={era} className={`shift-row ${side}`}>
              <div className={`card shift-card`} style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <span className="syne" style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: accent ? "var(--accent)" : "var(--muted)" }}>{era}</span>
                </div>
                <div className="syne" style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.5rem" }}>{title}</div>
                <p style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.65 }}>{body}</p>
              </div>
              <div className="shift-dot" style={{ background: accent ? "var(--accent)" : "var(--muted)" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShipsVsPlanes() {
  const ships = [
    { label: "Team size", val: "20 to 80 engineers", w: 20 },
    { label: "Delivery cycle", val: "2 to 4 quarters", w: 15 },
    { label: "Iteration speed", val: "Weeks per change", w: 20 },
    { label: "Cost", val: "Millions per year", w: 15 },
    { label: "AI leverage", val: "Minimal", w: 10 },
  ];
  const planes = [
    { label: "Team size", val: "3 to 6 people", w: 80 },
    { label: "Delivery cycle", val: "2 to 8 weeks", w: 90 },
    { label: "Iteration speed", val: "Days per change", w: 85 },
    { label: "Cost", val: "Fraction of old model", w: 88 },
    { label: "AI leverage", val: "Core to everything", w: 95 },
  ];

  return (
    <section className="section-surface">
      <div className="section-inner-sm">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 className="section-heading">Ships vs. Planes</h2>
          <p style={{ color: "var(--muted)", marginTop: "0.75rem", fontSize: "0.9rem" }}>The same destination. A completely different way to get there.</p>
        </div>
        <div className="vs-grid">
          <div className="vs-col" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div>
                <div className="syne" style={{ fontWeight: 800, fontSize: "1rem", color: "var(--muted)" }}>Ships</div>
                <div style={{ fontSize: "0.72rem", color: "var(--muted)", opacity: 0.6 }}>How it used to work</div>
              </div>
            </div>
            {ships.map(({ label, val, w }) => (
              <div key={label} style={{ marginBottom: "1rem" }}>
                <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginBottom: "0.25rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</div>
                <div style={{ fontSize: "0.875rem", color: "#6b6b80", marginBottom: 5 }}>{val}</div>
                <div style={{ height: 2, background: "rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${w}%`, background: "rgba(255,255,255,0.12)", borderRadius: 2 }}/>
                </div>
              </div>
            ))}
          </div>

          <div className="vs-sep">
            <div className="vs-sep-line" />
            <span className="syne" style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--muted)", letterSpacing: "0.1em", flexShrink: 0 }}>VS</span>
            <div className="vs-sep-line" />
          </div>

          <div className="vs-col" style={{ background: "rgba(232,255,71,0.04)", border: "1px solid rgba(232,255,71,0.15)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div>
                <div className="syne" style={{ fontWeight: 800, fontSize: "1rem", color: "var(--accent)" }}>Planes</div>
                <div style={{ fontSize: "0.72rem", color: "var(--muted)", opacity: 0.6 }}>The Flashthrough model</div>
              </div>
            </div>
            {planes.map(({ label, val, w }) => (
              <div key={label} style={{ marginBottom: "1rem" }}>
                <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginBottom: "0.25rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</div>
                <div style={{ fontSize: "0.875rem", color: "var(--text)", marginBottom: 5 }}>{val}</div>
                <div style={{ height: 2, borderRadius: 2, overflow: "hidden" }}>
                  <div className="speed-bar" style={{ width: `${w}%`, height: "100%" }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "01", title: "Define", body: "We scope your product in a focused session. Clear outcome, clear timeline, no ambiguity." },
    { n: "02", title: "AI builds", body: "Our AI-augmented team generates architecture, code, and components at machine speed." },
    { n: "03", title: "Humans refine", body: "Senior engineers and product thinkers shape quality, edge cases, and user experience." },
    { n: "04", title: "Ship", body: "You go live. Real product, real users. In weeks, not quarters." },
  ];

  return (
    <section id="process" className="section-pad" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="section-inner">
        <div style={{ marginBottom: "2.5rem" }}>
          <span className="tag" style={{ marginBottom: "1rem", display: "inline-flex" }}>How it works</span>
          <h2 className="section-heading">Four steps.<br />From idea to live product.</h2>
        </div>
        <div className="steps-grid">
          {steps.map(({ n, title, body }) => (
            <div key={n} className="card" style={{ padding: "1.75rem", position: "relative", overflow: "hidden" }}>
              <div className="syne" style={{ position: "absolute", top: "1rem", right: "1.25rem", fontSize: "2.5rem", fontWeight: 900, color: "rgba(255,255,255,0.04)", lineHeight: 1 }}>{n}</div>
              <div className="step-label">Step {n}</div>
              <div className="syne" style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.6rem" }}>{title}</div>
              <p style={{ color: "var(--muted)", fontSize: "0.83rem", lineHeight: 1.7 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatWeBuild() {
  const items = [
    { title: "AI Products", body: "LLM-powered apps, copilots, agents, and intelligent workflows." },
    { title: "Internal Tools", body: "Ops dashboards, admin systems, and automation interfaces." },
    { title: "Automation Systems", body: "End-to-end pipelines that replace manual processes with AI." },
    { title: "Full-Stack Apps", body: "Consumer and B2B products from zero to production-ready." },
  ];

  return (
    <section className="section-pad" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="section-inner">
        <div className="builds-outer">
          <div>
            <span className="tag" style={{ marginBottom: "1rem", display: "inline-flex" }}>Services</span>
            <h2 className="section-heading" style={{ marginBottom: "1rem" }}>What we build</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: "0.95rem", maxWidth: 360 }}>
              From AI-powered SaaS to internal tooling, we build software that compounds. Every product we ship is designed to make the next one faster.
            </p>
          </div>
          <div className="builds-grid">
            {items.map(({ title, body }) => (
              <div key={title} className="card" style={{ padding: "1.25rem" }}>
                <div className="syne" style={{ fontWeight: 700, fontSize: "0.875rem", marginBottom: "0.4rem" }}>{title}</div>
                <p style={{ color: "var(--muted)", fontSize: "0.78rem", lineHeight: 1.65 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Proof() {
  const quotes = [
    { quote: "We went from idea to first users in 6 weeks. That would have taken us 2 to 3 quarters before.", name: "Founder, B2B SaaS", initials: "JM" },
    { quote: "The AI-native approach is not a gimmick. The output quality is indistinguishable from a full eng team.", name: "CTO, Fintech Startup", initials: "SR" },
    { quote: "Built in weeks, not quarters. We saw production code by week two.", name: "Head of Product, Series A", initials: "AK" },
  ];

  return (
    <section className="section-surface">
      <div className="section-inner">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="tag" style={{ marginBottom: "1rem", display: "inline-flex" }}>Proof</span>
          <h2 className="section-heading">Built in weeks, not quarters.</h2>
        </div>
        <div className="proof-grid">
          {quotes.map(({ quote, name, initials }) => (
            <div key={name} className="card" style={{ padding: "1.75rem" }}>
              <div style={{ fontSize: "1.4rem", color: "var(--accent)", marginBottom: "0.875rem", fontFamily: "Georgia, serif" }}>"</div>
              <p style={{ color: "var(--text)", fontSize: "0.875rem", lineHeight: 1.75, marginBottom: "1.25rem" }}>{quote}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--accent-dim)", border: "1px solid rgba(232,255,71,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="syne" style={{ fontSize: "0.65rem", fontWeight: 800, color: "var(--accent)" }}>{initials}</span>
                </div>
                <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="contact" className="section-pad" style={{ position: "relative", overflow: "hidden" }}>
      <div className="hero-glow" style={{ width: "min(700px,130vw)", height: "min(700px,130vw)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(232,255,71,0.06) 0%, transparent 60%)" }}/>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <span className="tag" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>Ready to fly</span>
        <h2 className="section-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "1.25rem" }}>
          Ships are gone.
          <br /><span className="accent-text">Are you flying yet?</span>
        </h2>
        <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.75, maxWidth: 480, margin: "0 auto 2rem" }}>
          The era of slow, bloated software teams is over. The companies that already made the shift are pulling ahead. We help you get there.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", justifyContent: "center" }}>
          <a href="mailto:hello@flashthrough.ai" className="cta-btn" style={{ fontSize: "0.95rem", padding: "14px 32px" }}>Work with us</a>
          <a href="#process" className="cta-btn-ghost" style={{ fontSize: "0.95rem", padding: "14px 32px" }}>Learn the process</a>
        </div>
        <p style={{ color: "var(--muted)", fontSize: "0.75rem", marginTop: "1.25rem", opacity: 0.6 }}>Typically respond within 24 hours</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      <div className="footer-inner">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 22, height: 22, borderRadius: 5, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M3 12L7 4L11 9L14 5" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="syne" style={{ fontWeight: 700, fontSize: "0.85rem" }}>flashthrough.ai</span>
        </div>
        <span style={{ color: "var(--muted)", fontSize: "0.78rem" }}>2025 Flashthrough. AI-native software.</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Twitter", "LinkedIn"].map(l => (
            <a key={l} href="#" style={{ color: "var(--muted)", fontSize: "0.8rem", textDecoration: "none" }}
              onMouseEnter={e => e.target.style.color = "var(--text)"}
              onMouseLeave={e => e.target.style.color = "var(--muted)"}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 30);
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{style}</style>
      <div className="grain" style={{ background: "#050508", minHeight: "100vh", color: "#f0f0f5" }}>
        <div style={{ position: "fixed", top: 60, left: 0, right: 0, height: 2, zIndex: 99 }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,var(--accent),var(--blue))", transition: "width 0.1s linear" }}/>
        </div>
        <Nav scrolled={scrolled} />
        <main>
          <Hero />
          <TheShift />
          <ShipsVsPlanes />
          <Process />
          <WhatWeBuild />
          <Proof />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
