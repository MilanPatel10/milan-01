"use client";

import React, { useRef, useEffect, useState, MouseEvent } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  type Variants,
} from "framer-motion";
import {
  ArrowUpRight,
  Cpu,
  Globe,
  BrainCircuit,
  Layers,
  Wifi,
  Terminal,
  Sparkles,
  ChevronDown,
 
  Mail,
  Code2,
  Database,
  Zap,
} 
from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
const CYAN = "#22d3ee";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";
const OBSIDIAN = "#09090b";

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────
const slideUp: Variants = {
  hidden: { y: "105%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { type: "spring", stiffness: 60, damping: 18 },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 55, damping: 16, delay: d },
  }),
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (d = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 50, damping: 16, delay: d },
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// FONT + GLOBAL STYLES
// ─────────────────────────────────────────────────────────────────────────────
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    body {
      background: ${OBSIDIAN};
      color: #e2e8f0;
      font-family: 'JetBrains Mono', monospace;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    .display { font-family: 'Syne', sans-serif; }

    ::selection { background: rgba(99,102,241,0.35); color: #e2e8f0; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: ${OBSIDIAN}; }
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(to bottom, ${CYAN}, ${INDIGO});
      border-radius: 2px;
    }

    @keyframes meshMove {
      0%   { transform: translate(0, 0) scale(1); }
      50%  { transform: translate(4vw, -3vw) scale(1.08); }
      100% { transform: translate(0, 0) scale(1); }
    }
    @keyframes meshMove2 {
      0%   { transform: translate(0, 0) scale(1.05); }
      50%  { transform: translate(-5vw, 4vw) scale(0.93); }
      100% { transform: translate(0, 0) scale(1.05); }
    }
    @keyframes meshMove3 {
      0%   { transform: translate(0, 0); }
      50%  { transform: translate(3vw, 5vw) scale(1.1); }
      100% { transform: translate(0, 0); }
    }
    @keyframes ticker {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes pulseRing {
      0%   { transform: scale(0.85); opacity: 0.9; }
      100% { transform: scale(2.0); opacity: 0; }
    }
    @keyframes floatA {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-7px); }
    }
    @keyframes floatB {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-5px); }
    }
    @keyframes floatC {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-9px); }
    }
    @keyframes gradientShift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .gradient-text {
      background: linear-gradient(135deg, ${CYAN} 0%, ${INDIGO} 50%, ${VIOLET} 100%);
      background-size: 200% 200%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: gradientShift 5s ease infinite;
    }

    .glass {
      background: rgba(255,255,255,0.03);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,0.07);
    }

    .glass-hover {
      transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .glass-hover:hover {
      background: rgba(255,255,255,0.055);
      border-color: rgba(99,102,241,0.3);
      box-shadow: 0 0 48px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.07);
    }

    .noise-overlay {
      position: relative;
    }
    .noise-overlay::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
      background-size: 180px;
      pointer-events: none;
      border-radius: inherit;
      mix-blend-mode: overlay;
    }

    .card-glow {
      position: relative;
    }
    .card-glow::before {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(135deg,
        rgba(34,211,238,0.2),
        rgba(99,102,241,0.12),
        rgba(167,139,250,0.08)
      );
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
      z-index: 0;
    }
  `}</style>
);

// ─────────────────────────────────────────────────────────────────────────────
// BACKGROUND MESH
// ─────────────────────────────────────────────────────────────────────────────
function BackgroundMesh() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed", inset: 0, zIndex: 0,
        overflow: "hidden", pointerEvents: "none",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: OBSIDIAN }} />
      {/* Cyan orb — top left */}
      <div style={{
        position: "absolute",
        width: "70vw", height: "70vw",
        top: "-25vw", left: "-15vw",
        borderRadius: "50%",
        background: "radial-gradient(circle at center, rgba(34,211,238,0.09) 0%, transparent 65%)",
        filter: "blur(48px)",
        animation: "meshMove 20s ease-in-out infinite",
      }} />
      {/* Indigo orb — right */}
      <div style={{
        position: "absolute",
        width: "65vw", height: "65vw",
        top: "20vw", right: "-20vw",
        borderRadius: "50%",
        background: "radial-gradient(circle at center, rgba(99,102,241,0.1) 0%, transparent 65%)",
        filter: "blur(56px)",
        animation: "meshMove2 25s ease-in-out infinite",
      }} />
      {/* Violet orb — bottom */}
      <div style={{
        position: "absolute",
        width: "55vw", height: "55vw",
        bottom: "-15vw", left: "25vw",
        borderRadius: "50%",
        background: "radial-gradient(circle at center, rgba(167,139,250,0.08) 0%, transparent 65%)",
        filter: "blur(60px)",
        animation: "meshMove3 30s ease-in-out infinite",
      }} />
      {/* Scanlines */}
      <div style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.007) 2px, rgba(255,255,255,0.007) 4px)",
      }} />
      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(9,9,11,0.78) 100%)",
      }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAGNETIC BUTTON
// ─────────────────────────────────────────────────────────────────────────────
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16 });
  const springY = useSpring(y, { stiffness: 180, damping: 16 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, display: "inline-block" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GLASS CARD WITH 3D TILT
// ─────────────────────────────────────────────────────────────────────────────
function GlassCard({
  children,
  style,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const sRotateX = useSpring(rotateX, { stiffness: 120, damping: 18 });
  const sRotateY = useSpring(rotateY, { stiffness: 120, damping: 18 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    rotateX.set(-dy * 5.5);
    rotateY.set(dx * 5.5);
  };
  const reset = () => { rotateX.set(0); rotateY.set(0); };

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      style={{
        rotateX: sRotateX,
        rotateY: sRotateY,
        transformStyle: "preserve-3d",
        ...style,
      }}
      className={`glass glass-hover card-glow noise-overlay ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.05 }}
      style={{
        position: "fixed", top: 20, left: "25%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        width: "calc(100% - 40px)", maxWidth: 1100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 24px",
        background: scrolled ? "rgba(9,9,11,0.75)" : "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        border: `1px solid ${scrolled ? "rgba(99,102,241,0.22)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 14,
        boxShadow: scrolled
          ? "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.08)"
          : "0 4px 24px rgba(0,0,0,0.2)",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: -8 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: `linear-gradient(135deg, ${CYAN}, ${INDIGO})`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Terminal size={14} color="#000" strokeWidth={2.5} />
        </div>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 16, fontWeight: 700,
          color: "#f1f5f9", letterSpacing: "0.02em",
        }}>
          mp<span className="gradient-text">.</span>dev
        </span>
      </div>

      <div style={{ display: "flex", gap: 32, alignItems: "center", marginLeft: "auto", marginRight: 24 }}>
        {["Work", "Stack", "About", "Contact"].map((label) => (
          <a key={label} href={`#${label.toLowerCase()}`} style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(226,232,240,0.45)",
            textDecoration: "none", transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = CYAN)}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(226,232,240,0.45)")}
          >
            {label}
          </a>
        ))}
      </div>

      <MagneticButton>
        <a href="mailto:milanpatelb06@gmail.com" style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          padding: "8px 18px",
          background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
          color: "#fff",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11, letterSpacing: "0.1em",
          textDecoration: "none", borderRadius: 8, fontWeight: 500,
          boxShadow: `0 4px 20px rgba(99,102,241,0.35)`,
          transition: "box-shadow 0.25s ease",
        }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 6px 28px rgba(99,102,241,0.55)`)}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 4px 20px rgba(99,102,241,0.35)`)}
        >
          <Zap size={11} />
          Hire Me
        </a>
      </MagneticButton>
    </motion.nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
function HeroSection() {
  const hookLines = ["Engineering Fluid", "Web Interfaces &", "Intelligent Systems."];

  return (
    <section id="hero" style={{
      position: "relative", zIndex: 1,
      minHeight: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "0 clamp(24px, 5vw, 80px)",
      maxWidth: 1300, margin: "0 auto", width: "100%",
    }}>
      {/* Availability badge */}
      <motion.div
        variants={fadeIn} custom={0.3} initial="hidden" animate="visible"
        style={{ marginBottom: 32, display: "inline-flex", alignItems: "center", gap: 8 }}
      >
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "5px 14px",
          background: "rgba(34,211,238,0.08)",
          border: "1px solid rgba(34,211,238,0.2)",
          borderRadius: 999,
        }}>
          <span style={{
            display: "block", width: 7, height: 7, borderRadius: "50%",
            background: CYAN, boxShadow: `0 0 8px ${CYAN}`,
            animation: "pulseRing 2s ease-out infinite",
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, letterSpacing: "0.12em", color: CYAN,
          }}>
            AVAILABLE_FOR_WORK
          </span>
        </div>
      </motion.div>

      {/* Headline — staggered slide-up */}
      <div style={{ marginBottom: 28 }}>
        {hookLines.map((line, i) => (
          <div key={i} style={{ overflow: "hidden" }}>
            <motion.h1
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{ type: "spring", stiffness: 55, damping: 16, delay: 0.5 + i * 0.14 }}
              className="display"
              style={{
                fontSize: "clamp(48px, 7.5vw, 108px)",
                fontWeight: 800, lineHeight: 1.06,
                letterSpacing: "-0.03em",
                ...(i === 2 ? {
                  background: `linear-gradient(135deg, ${CYAN} 0%, ${INDIGO} 50%, ${VIOLET} 100%)`,
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradientShift 4s ease infinite",
                } : { color: "#f1f5f9" }),
              }}
            >
              {line}
            </motion.h1>
          </div>
        ))}
      </div>

      {/* Subtext */}
      <motion.p
        variants={fadeIn} custom={1.1} initial="hidden" animate="visible"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(12px, 1.2vw, 14px)",
          color: "rgba(226,232,240,0.45)",
          maxWidth: 460, lineHeight: 1.85,
          letterSpacing: "0.02em", marginBottom: 48,
        }}
      >
        Full-Stack · Machine Learning · IoT Systems Engineer.
        <br />
        Building systems that bridge hardware and software — in production.
      </motion.p>

      {/* CTAs */}
      <motion.div
        variants={fadeIn} custom={1.3} initial="hidden" animate="visible"
        style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}
      >
        <MagneticButton>
          <a href="#work" style={{
            display: "inline-flex", alignItems: "center", gap: 9,
            padding: "13px 28px",
            background: `linear-gradient(135deg, ${CYAN}, ${INDIGO})`,
            color: "#000",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12, fontWeight: 600, letterSpacing: "0.1em",
            textDecoration: "none", borderRadius: 10,
            boxShadow: `0 6px 32px rgba(34,211,238,0.3)`,
            transition: "transform 0.2s, box-shadow 0.25s",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 10px 40px rgba(34,211,238,0.45)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = `0 6px 32px rgba(34,211,238,0.3)`;
            }}
          >
            <Layers size={14} />
            View Projects
          </a>
        </MagneticButton>

        {[
          { label: "GitHub", href: "https://github.com/MilanPatel10/", icon: <GithubIcon/> },
          { label: "LinkedIn", href: "https://linkedin.com/in/milan-patel-6b8123391/", icon: <LinkedinIcon /> },
        ].map(link => (
          <MagneticButton key={link.label}>
            <a href={link.href} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "13px 22px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(226,232,240,0.65)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12, letterSpacing: "0.1em",
              textDecoration: "none", borderRadius: 10,
              transition: "all 0.25s",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `rgba(99,102,241,0.5)`;
                e.currentTarget.style.color = VIOLET;
                e.currentTarget.style.background = "rgba(99,102,241,0.06)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "rgba(226,232,240,0.65)";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              {link.icon}
              {link.label}
            </a>
          </MagneticButton>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        variants={fadeIn} custom={1.8} initial="hidden" animate={["visible"]}
        style={{
          position: "absolute", bottom: 40, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        }}
        
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
    animate={{ y: [0, 6, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    style={{
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      gap: 6,
    }}
  ></motion.div>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9, letterSpacing: "0.2em",
          color: "rgba(226,232,240,0.22)",
        }}>
          SCROLL
        </span>
        <ChevronDown size={14} color="rgba(226,232,240,0.22)" />
      </motion.div>

      {/* Floating stat chips */}
      <div style={{
        position: "absolute",
        right: "clamp(24px, 5vw, 80px)",
        top: "50%", transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", gap: 14,
      }}>
        {[
          { label: "Projects Shipped", value: "24+", icon: <Code2 size={14} color={CYAN} />, anim: "floatA 3.5s ease-in-out infinite" },
          { label: "ML Models Deployed", value: "08", icon: <BrainCircuit size={14} color={VIOLET} />, anim: "floatB 4.2s ease-in-out infinite 0.5s" },
          { label: "IoT Devices Integrated", value: "30+", icon: <Wifi size={14} color={INDIGO} />, anim: "floatC 3.8s ease-in-out infinite 1s" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 55, damping: 16, delay: 1.6 + i * 0.15 }}
            className="glass card-glow"
            style={{
              padding: "12px 18px", borderRadius: 12,
              display: "flex", alignItems: "center", gap: 12,
              minWidth: 210,
              animation: stat.anim,
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "rgba(255,255,255,0.04)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              {stat.icon}
            </div>
            <div>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 20, fontWeight: 700, color: "#f1f5f9", lineHeight: 1,
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10, color: "rgba(226,232,240,0.38)",
                letterSpacing: "0.04em", marginTop: 3,
              }}>
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BENTO GRID
// ─────────────────────────────────────────────────────────────────────────────
function BentoGrid() {
  return (
    <section id="work" style={{
      position: "relative", zIndex: 1,
      padding: "120px clamp(24px, 5vw, 80px)",
      maxWidth: 1300, margin: "0 auto", width: "100%",
    }}>
      {/* Header */}
      <motion.div
        variants={fadeIn} initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        style={{ marginBottom: 56 }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 32, height: 1, background: `linear-gradient(to right, ${CYAN}, transparent)` }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, letterSpacing: "0.2em",
            textTransform: "uppercase", color: CYAN,
          }}>
            Recent Work
          </span>
        </div>
        <h2 className="display" style={{
          fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800,
          color: "#f1f5f9", letterSpacing: "-0.025em", lineHeight: 1.1,
        }}>
          Built for Production,<br />
          <span className="gradient-text">Designed to Last.</span>
        </h2>
      </motion.div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "auto auto",
        gap: 16,
      }}>
        {/* ── Card 1: Full-Stack (Large, spans 2 rows) ── */}
        <GlassCard delay={0} style={{
          gridColumn: "1 / 2", gridRow: "1 / 3",
          borderRadius: 20, padding: 32,
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          minHeight: 500, overflow: "hidden", position: "relative",
        }}>
          <div style={{
            position: "absolute", top: -70, right: -70,
            width: 240, height: 240, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.13) 0%, transparent 70%)",
            filter: "blur(24px)", pointerEvents: "none",
          }} />

          <div>
            <div style={{
              display: "inline-flex", padding: 10, borderRadius: 12,
              background: "rgba(34,211,238,0.08)",
              border: "1px solid rgba(34,211,238,0.15)",
              marginBottom: 20,
            }}>
              <Globe size={22} color={CYAN} />
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10, letterSpacing: "0.16em",
              color: "rgba(226,232,240,0.32)", marginBottom: 9,
            }}>
              01 — FULL-STACK APPLICATIONS
            </div>
            <h3 className="display" style={{
              fontSize: 26, fontWeight: 700,
              color: "#f1f5f9", lineHeight: 1.25, marginBottom: 14,
            }}>
              MERN & Next.js Architectures
            </h3>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12, lineHeight: 1.8,
              color: "rgba(226,232,240,0.48)",
            }}>
              Scalable full-stack applications with clean state management, REST/GraphQL APIs, JWT auth flows, and SSR optimised for Core Web Vitals.
            </p>
          </div>

          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {["Next.js", "Node.js", "MongoDB", "React", "GraphQL", "TypeScript"].map(t => (
                <span key={t} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, letterSpacing: "0.07em",
                  padding: "4px 10px", borderRadius: 6,
                  background: "rgba(34,211,238,0.07)",
                  border: "1px solid rgba(34,211,238,0.16)",
                  color: CYAN,
                }}>
                  {t}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
              {[{ k: "Apps Shipped", v: "12" }, { k: "Avg. Lighthouse", v: "98" }].map(m => (
                <div key={m.k}>
                  <div className="display" style={{ fontSize: 30, fontWeight: 700, color: CYAN, lineHeight: 1 }}>{m.v}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(226,232,240,0.33)", letterSpacing: "0.1em", marginTop: 4 }}>{m.k}</div>
                </div>
              ))}
            </div>

            <a href="#" style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, letterSpacing: "0.1em",
              color: CYAN, textDecoration: "none",
              borderBottom: "1px solid rgba(34,211,238,0.3)",
              paddingBottom: 2,
            }}>
              Explore Projects <ArrowUpRight size={12} />
            </a>
          </div>
        </GlassCard>

        {/* ── Card 2: ML (Medium) ── */}
        <GlassCard delay={0.15} style={{
          gridColumn: "2 / 4", gridRow: "1 / 2",
          borderRadius: 20, padding: 28,
          display: "flex", alignItems: "center", gap: 32,
          overflow: "hidden", position: "relative",
        }}>
          <div style={{
            position: "absolute", bottom: -50, left: "30%",
            width: 200, height: 200, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.11) 0%, transparent 70%)",
            filter: "blur(24px)", pointerEvents: "none",
          }} />

          <div style={{
            flexShrink: 0,
            display: "inline-flex", padding: 14, borderRadius: 16,
            background: "rgba(167,139,250,0.08)",
            border: "1px solid rgba(167,139,250,0.18)",
          }}>
            <BrainCircuit size={28} color={VIOLET} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10, letterSpacing: "0.16em",
              color: "rgba(226,232,240,0.32)", marginBottom: 8,
            }}>
              02 — INTELLIGENT SYSTEMS
            </div>
            <h3 className="display" style={{
              fontSize: 22, fontWeight: 700,
              color: "#f1f5f9", lineHeight: 1.2, marginBottom: 10,
            }}>
              ML Diagnostic Models & Pipelines
            </h3>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, lineHeight: 1.75,
              color: "rgba(226,232,240,0.45)",
            }}>
              Python pipelines for classification, anomaly detection, and predictive diagnostics. Deployed via FastAPI with model versioning.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 14 }}>
              {["Python", "scikit-learn", "FastAPI", "TensorFlow", "Pandas"].map(t => (
                <span key={t} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9, padding: "3px 8px", borderRadius: 5,
                  background: "rgba(167,139,250,0.07)",
                  border: "1px solid rgba(167,139,250,0.15)",
                  color: VIOLET, letterSpacing: "0.07em",
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {[{ k: "Models in Prod", v: "08" }, { k: "Avg Accuracy", v: "94%" }].map(m => (
              <div key={m.k} style={{
                padding: "10px 16px", borderRadius: 10,
                background: "rgba(167,139,250,0.07)",
                border: "1px solid rgba(167,139,250,0.12)",
                textAlign: "center",
              }}>
                <div className="display" style={{ fontSize: 22, fontWeight: 700, color: VIOLET }}>{m.v}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(226,232,240,0.33)", marginTop: 3 }}>{m.k}</div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* ── Card 3: IoT (Medium) ── */}
        <GlassCard delay={0.3} style={{
          gridColumn: "2 / 4", gridRow: "2 / 3",
          borderRadius: 20, padding: 28,
          display: "flex", alignItems: "center", gap: 32,
          overflow: "hidden", position: "relative",
        }}>
          <div style={{
            position: "absolute", top: -50, right: -50,
            width: 200, height: 200, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.11) 0%, transparent 70%)",
            filter: "blur(24px)", pointerEvents: "none",
          }} />

          <div style={{
            flexShrink: 0,
            display: "inline-flex", padding: 14, borderRadius: 16,
            background: "rgba(99,102,241,0.08)",
            border: "1px solid rgba(99,102,241,0.18)",
          }}>
            <Cpu size={28} color={INDIGO} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10, letterSpacing: "0.16em",
              color: "rgba(226,232,240,0.32)", marginBottom: 8,
            }}>
              03 — CYBER-PHYSICAL SYSTEMS
            </div>
            <h3 className="display" style={{
              fontSize: 22, fontWeight: 700,
              color: "#f1f5f9", lineHeight: 1.2, marginBottom: 10,
            }}>
              IoT & Microcontroller Integration
            </h3>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, lineHeight: 1.75,
              color: "rgba(226,232,240,0.45)",
            }}>
              End-to-end IoT with ESP8266/ESP32 firmware, MQTT telemetry pipelines, and real-time Grafana dashboards for hardware monitoring.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 14 }}>
              {["ESP8266", "MQTT", "C++", "Node-RED", "InfluxDB", "Grafana"].map(t => (
                <span key={t} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9, padding: "3px 8px", borderRadius: 5,
                  background: "rgba(99,102,241,0.07)",
                  border: "1px solid rgba(99,102,241,0.15)",
                  color: INDIGO, letterSpacing: "0.07em",
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {[{ k: "Devices Online", v: "30+" }, { k: "Uptime SLA", v: "99.7%" }].map(m => (
              <div key={m.k} style={{
                padding: "10px 16px", borderRadius: 10,
                background: "rgba(99,102,241,0.07)",
                border: "1px solid rgba(99,102,241,0.12)",
                textAlign: "center",
              }}>
                <div className="display" style={{ fontSize: 22, fontWeight: 700, color: INDIGO }}>{m.v}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(226,232,240,0.33)", marginTop: 3 }}>{m.k}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TECH STACK MARQUEE
// ─────────────────────────────────────────────────────────────────────────────
const SKILLS = [
  { name: "React",          icon: <Globe size={15} /> },
  { name: "Next.js",        icon: <Layers size={15} /> },
  { name: "TypeScript",     icon: <Code2 size={15} /> },
  { name: "Node.js",        icon: <Terminal size={15} /> },
  { name: "MongoDB",        icon: <Database size={15} /> },
  { name: "Python",         icon: <BrainCircuit size={15} /> },
  { name: "TensorFlow",     icon: <Sparkles size={15} /> },
  { name: "FastAPI",        icon: <Zap size={15} /> },
  { name: "Tailwind CSS",   icon: <Layers size={15} /> },
  { name: "Framer Motion",  icon: <Sparkles size={15} /> },
  { name: "ESP8266",        icon: <Cpu size={15} /> },
  { name: "MQTT",           icon: <Wifi size={15} /> },
  { name: "PostgreSQL",     icon: <Database size={15} /> },
  { name: "Docker",         icon: <Code2 size={15} /> },
  { name: "GraphQL",        icon: <Globe size={15} /> },
  { name: "Redis",          icon: <Zap size={15} /> },
];

const CHIP_ACCENTS = [CYAN, INDIGO, VIOLET, CYAN, INDIGO, VIOLET, CYAN, INDIGO,
  VIOLET, CYAN, INDIGO, VIOLET, CYAN, INDIGO, VIOLET, CYAN];

function SkillChip({ name, icon, accent }: { name: string; icon: React.ReactNode; accent: string }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "9px 17px",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 999, flexShrink: 0,
      cursor: "default",
      transition: "border-color 0.25s, background 0.25s",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${accent}45`;
        e.currentTarget.style.background = `${accent}0b`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
      }}
    >
      <span style={{ color: accent, display: "flex", alignItems: "center" }}>{icon}</span>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12, letterSpacing: "0.06em",
        color: "rgba(226,232,240,0.58)", whiteSpace: "nowrap",
      }}>
        {name}
      </span>
    </div>
  );
}

function Marquee() {
  const doubled = [...SKILLS, ...SKILLS];

  return (
    <section id="stack" style={{
      position: "relative", zIndex: 1,
      padding: "80px 0", overflow: "hidden",
    }}>
      <motion.div
        variants={fadeIn} initial="hidden" whileInView="visible"
        viewport={{ once: true }}
        style={{
          textAlign: "center", marginBottom: 44,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 1, background: `linear-gradient(to right, transparent, ${INDIGO})` }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, letterSpacing: "0.2em",
            textTransform: "uppercase", color: INDIGO,
          }}>
            Tech Stack
          </span>
          <div style={{ width: 32, height: 1, background: `linear-gradient(to left, transparent, ${INDIGO})` }} />
        </div>
        <h2 className="display" style={{
          fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800,
          color: "#f1f5f9", letterSpacing: "-0.025em",
        }}>
          Tools of the <span className="gradient-text">Trade.</span>
        </h2>
      </motion.div>

      {/* Edge fades */}
      <div style={{
        position: "absolute", left: 0, top: 80, bottom: 0, width: 160, zIndex: 2,
        background: `linear-gradient(to right, ${OBSIDIAN}, transparent)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 80, bottom: 0, width: 160, zIndex: 2,
        background: `linear-gradient(to left, ${OBSIDIAN}, transparent)`,
        pointerEvents: "none",
      }} />

      {/* Row 1 — forward */}
      <div style={{ overflow: "hidden", marginBottom: 12 }}>
        <div style={{
          display: "flex", gap: 12,
          animation: "ticker 30s linear infinite",
          width: "max-content",
        }}>
          {doubled.map((skill, i) => (
            <SkillChip key={`r1-${i}`} name={skill.name} icon={skill.icon} accent={CHIP_ACCENTS[i % CHIP_ACCENTS.length]} />
          ))}
        </div>
      </div>

      {/* Row 2 — reverse */}
      <div style={{ overflow: "hidden" }}>
        <div style={{
          display: "flex", gap: 12,
          animation: "ticker 24s linear infinite reverse",
          width: "max-content",
        }}>
          {[...doubled].reverse().map((skill, i) => (
            <SkillChip key={`r2-${i}`} name={skill.name} icon={skill.icon} accent={CHIP_ACCENTS[(i + 6) % CHIP_ACCENTS.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT + CTA
// ─────────────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" style={{
      position: "relative", zIndex: 1,
      padding: "100px clamp(24px, 5vw, 80px)",
      maxWidth: 1300, margin: "0 auto", width: "100%",
    }}>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 40, alignItems: "center",
      }}>
        {/* Bio */}
        <motion.div
          variants={fadeIn} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 32, height: 1, background: `linear-gradient(to right, ${VIOLET}, transparent)` }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, letterSpacing: "0.2em",
              textTransform: "uppercase", color: VIOLET,
            }}>
              About
            </span>
          </div>
          <h2 className="display" style={{
            fontSize: "clamp(36px, 4.5vw, 58px)", fontWeight: 800,
            color: "#f1f5f9", letterSpacing: "-0.03em",
            lineHeight: 1.12, marginBottom: 24,
          }}>
            Milan Patel
          </h2>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13, lineHeight: 1.9,
            color: "rgba(226,232,240,0.48)",
            marginBottom: 18,
          }}>
            A systems-thinking engineer who loves bridging the gap between hardware and software — from firmware on microcontrollers to production ML inference at scale.
          </p>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13, lineHeight: 1.9,
            color: "rgba(226,232,240,0.48)",
            marginBottom: 32,
          }}>
            I build interfaces that feel inevitable, pipelines that stay reliable, and IoT systems that just work — even at 3am.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "GitHub", href: "https://github.com/MilanPatel10/", icon: <GithubIcon/> },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/milan-patel-6b8123391/", icon: <LinkedinIcon/> },
              { label: "Email", href: "mailto:milanpatelb06@gmail.com", icon: <Mail size={13} /> },
            ].map(link => (
              <MagneticButton key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "9px 16px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(226,232,240,0.5)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11, letterSpacing: "0.08em",
                  textDecoration: "none", borderRadius: 8,
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${INDIGO}55`;
                    e.currentTarget.style.color = VIOLET;
                    e.currentTarget.style.background = `rgba(99,102,241,0.06)`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(226,232,240,0.5)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  {link.icon}
                  {link.label}
                </a>
              </MagneticButton>
            ))}
          </div>
        </motion.div>

        {/* CTA card */}
        <GlassCard delay={0.2} style={{
          borderRadius: 20, padding: 40,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -70, right: -70,
            width: 220, height: 220, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
            filter: "blur(24px)", pointerEvents: "none",
          }} />
          <Sparkles size={28} color={INDIGO} style={{ marginBottom: 20 }} />
          <h3 className="display" style={{
            fontSize: 28, fontWeight: 700, color: "#f1f5f9",
            lineHeight: 1.25, marginBottom: 14,
          }}>
            Let's build something remarkable.
          </h3>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12, lineHeight: 1.85,
            color: "rgba(226,232,240,0.43)", marginBottom: 32,
          }}>
            Whether it's a complex full-stack product, an ML pipeline, or a connected IoT system — I bring systems thinking and production discipline to every engagement.
          </p>
          <MagneticButton>
            <a href="mailto:milan@example.com" id="contact" style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
              padding: "14px 32px",
              background: `linear-gradient(135deg, ${INDIGO} 0%, ${VIOLET} 100%)`,
              color: "#fff",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12, fontWeight: 600, letterSpacing: "0.1em",
              textDecoration: "none", borderRadius: 10,
              boxShadow: `0 6px 32px rgba(99,102,241,0.35)`,
              transition: "box-shadow 0.25s, transform 0.2s",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 10px 40px rgba(99,102,241,0.5)`;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = `0 6px 32px rgba(99,102,241,0.35)`;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Mail size={14} />
              Start a Conversation
              <ArrowUpRight size={14} />
            </a>
          </MagneticButton>
        </GlassCard>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      position: "relative", zIndex: 1,
      borderTop: "1px solid rgba(255,255,255,0.05)",
      padding: "28px clamp(24px, 5vw, 80px)",
      maxWidth: 1300, margin: "0 auto", width: "100%",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 12,
    }}>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11, color: "rgba(226,232,240,0.22)",
        letterSpacing: "0.05em",
      }}>
        © {new Date().getFullYear()} Milan Patel — Built with Next.js & Framer Motion
      </span>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11, color: "rgba(226,232,240,0.18)",
        letterSpacing: "0.08em",
      }}>
        FULLSTACK · ML · IOT
      </span>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE ROOT
// ─────────────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      <FontStyle />
      <BackgroundMesh />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <BentoGrid />
        <Marquee />
        <AboutSection />
        <Footer />
      </main>
    </>
  );
}
