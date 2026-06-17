/**
 * NEOBRUTALIST CODE LAB — Home Page (Mejorado)
 * Gustavo Harnisch Portfolio
 *
 * Design: Dark navy (#0a0e1a) + Cyan electric (#00d4ff) + Violet (#7c3aed)
 * Fonts: Syne (display) + JetBrains Mono (technical)
 * Layout: Sidebar nav + main content, asymmetric
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ─── Asset URLs ───────────────────────────────────────────────────────────────
const AVATAR = "https://avatars.githubusercontent.com/u/138950084?v=4";
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663765016861/Qc9SkAovmdDdxbFUoCGYKs/hero-bg-TioiuV4CZRkU49A6Amq4ai.webp";

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    name: "Horario",
    url: "/Horario/",
    desc: "Horario universitario con datos en tiempo real, búsqueda avanzada y sincronización de calendario.",
    icon: "📅",
    color: "#f1e05a",
    tags: ["HTML", "CSS", "JavaScript", "CSV"],
  },
  {
    name: "Pong",
    url: "/pong/",
    desc: "Juego clásico Pong remasterizado con canvas, física realista y controles responsivos.",
    icon: "🎮",
    color: "#61dafb",
    tags: ["Canvas", "JavaScript", "Game Dev"],
  },
];

const INTERESTS = [
  { label: "Machine Learning", icon: "🧠", color: "#7c3aed" },
  { label: "Inteligencia Artificial", icon: "🤖", color: "#00d4ff" },
  { label: "Diseño de Algoritmos", icon: "⚡", color: "#00d4ff" },
  { label: "Álgebra Lineal", icon: "∑", color: "#7c3aed" },
  { label: "Ecuaciones Diferenciales", icon: "∂", color: "#00d4ff" },
  { label: "Probabilidad y Estadística", icon: "📊", color: "#7c3aed" },
];

const STACK = [
  { name: "Python", color: "#3572A5" },
  { name: "C", color: "#555555" },
  { name: "C++", color: "#f34b7d" },
  { name: "Linux", color: "#89e051" },
  { name: "Bash", color: "#89e051" },
  { name: "React", color: "#61dafb" },
  { name: "Node.js", color: "#3c873a" },
  { name: "Oracle DB", color: "#e38c00" },
];

const NAV_ITEMS = [
  { id: "hero", label: "inicio", icon: "~" },
  { id: "projects", label: "proyectos", icon: ">" },
  { id: "about", label: "sobre_mi", icon: "$" },
  { id: "interests", label: "intereses", icon: "#" },
  { id: "icpc", label: "icpc", icon: "!" },
  { id: "contact", label: "contacto", icon: "@" },
];

// ─── Typewriter Hook ──────────────────────────────────────────────────────────
function useTypewriter(text: string, speed = 60, delay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return { displayed, done };
}

// ─── Section Reveal ───────────────────────────────────────────────────────────
function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Code Rain Background ─────────────────────────────────────────────────────
function CodeRain() {
  const snippets = [
    "def dijkstra(graph, start):",
    "import numpy as np",
    "∂u/∂t = α∇²u",
    "for i in range(n):",
    "A·x = b",
    "O(n log n)",
    "class Graph:",
    "#include <vector>",
    "git commit -m",
    "f(x) = Σ aₙxⁿ",
    "while pq:",
    "return result",
    "λ = eigenvalue",
    "∫f(x)dx",
    "bool visited[N]",
    "pip install torch",
    "ollama run qwen",
    "$ sudo apt install",
    "SELECT * FROM",
    "const [state, set]",
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {snippets.map((s, i) => (
        <div
          key={i}
          className="absolute code-line"
          style={{
            left: `${(i * 5.1) % 100}%`,
            top: `${(i * 7.3) % 100}%`,
            transform: `rotate(${(i % 3 === 0 ? -2 : i % 3 === 1 ? 1 : -1)}deg)`,
            opacity: 0.04 + (i % 4) * 0.01,
            fontSize: `${0.6 + (i % 3) * 0.1}rem`,
          }}
        >
          {s}
        </div>
      ))}
    </div>
  );
}

// ─── Sidebar Navigation ───────────────────────────────────────────────────────
function Sidebar({ active }: { active: string }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-16 md:w-56 z-40 flex flex-col border-r border-[#1e293b] bg-[#0a0e1a]/95 backdrop-blur-sm">
      {/* Logo */}
      <div className="flex items-center justify-center md:justify-start gap-3 px-3 md:px-5 py-6 border-b border-[#1e293b]">
        <div className="relative flex-shrink-0">
          <img src={AVATAR} alt="Gustavo Harnisch" className="w-8 h-8 rounded-full border border-[#00d4ff]/30" />
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00d4ff] border border-[#0a0e1a]" />
        </div>
        <div className="hidden md:block">
          <div className="font-mono-brand text-xs text-[#00d4ff] font-bold">&lt;GH/&gt;</div>
          <div className="font-mono-brand text-[10px] text-[#64748b]">Gustavo Harnisch</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1 p-2 md:p-3 mt-4">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`flex items-center gap-3 px-2 md:px-3 py-2.5 rounded text-left transition-all duration-200 group ${
              active === item.id
                ? "bg-[#00d4ff]/10 text-[#00d4ff]"
                : "text-[#64748b] hover:text-[#e2e8f0] hover:bg-[#1e293b]/50"
            }`}
          >
            <span className="font-mono-brand text-sm w-4 text-center flex-shrink-0">{item.icon}</span>
            <span className="hidden md:block font-mono-brand text-xs">{item.label}</span>
            {active === item.id && (
              <span className="hidden md:block ml-auto w-1 h-1 rounded-full bg-[#00d4ff]" />
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[#1e293b]">
        <a
          href="https://github.com/Gustavo-Harnisch"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center md:justify-start gap-2 text-[#64748b] hover:text-[#00d4ff] transition-colors"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="hidden md:block font-mono-brand text-xs">GitHub</span>
        </a>
      </div>
    </aside>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  // Typewriter for hero
  const line1 = useTypewriter("> Gustavo Harnisch", 55, 300);
  const line2 = useTypewriter("Civil Computer Engineering", 45, 1400);
  const line3 = useTypewriter("UCM · Talca, Chile", 50, 2600);

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((n) => n.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-[#e2e8f0]">
      <CodeRain />
      <Sidebar active={activeSection} />

      {/* Main content offset for sidebar */}
      <main className="ml-16 md:ml-56">

        {/* ── HERO ────────────────────────────────────────────────────── */}
        <section
          id="hero"
          className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        >
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src={HERO_BG}
              alt=""
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e1a] via-[#0a0e1a]/80 to-[#0a0e1a]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-transparent" />
          </div>

          {/* Scan line effect */}
          <div
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent z-10 pointer-events-none"
            style={{ animation: "scan 8s linear infinite", top: 0 }}
          />

          <div className="relative z-10 px-8 md:px-16 py-24 max-w-4xl">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex items-center gap-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#00d4ff] pulse-glow" />
              <span className="font-mono-brand text-xs text-[#00d4ff] tracking-widest uppercase">
                Working hard · 4° año · UCM
              </span>
            </motion.div>

            {/* Typewriter lines */}
            <div className="mb-6">
              <h1 className="font-mono-brand text-3xl md:text-5xl lg:text-6xl font-bold text-[#00d4ff] glow-cyan-text mb-2">
                {line1.displayed}
                {!line1.done && <span className="cursor-blink">|</span>}
              </h1>
              <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-[#e2e8f0] mb-2">
                {line2.displayed}
                {line1.done && !line2.done && <span className="cursor-blink text-[#00d4ff]">|</span>}
              </h2>
              <p className="font-mono-brand text-lg md:text-xl text-[#64748b]">
                {line3.displayed}
                {line2.done && !line3.done && <span className="cursor-blink text-[#64748b]">|</span>}
              </p>
            </div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: line3.done ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className="text-[#94a3b8] text-base md:text-lg max-w-2xl leading-relaxed mb-10 font-display"
            >
              Estudiante de Ingeniería Civil Informática con foco en algoritmos, aprendizaje automático
              y matemáticas aplicadas. Me interesa entender los sistemas desde sus fundamentos —
              tanto a nivel teórico como en su implementación práctica.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: line3.done ? 1 : 0, y: line3.done ? 0 : 16 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-6 py-3 bg-[#00d4ff] text-[#0a0e1a] font-mono-brand font-bold text-sm rounded hover:bg-[#00d4ff]/90 transition-all duration-200 active:scale-95"
              >
                explorar proyectos →
              </button>
              <a
                href="https://github.com/Gustavo-Harnisch"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-[#1e293b] text-[#e2e8f0] font-mono-brand text-sm rounded hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all duration-200 active:scale-95"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="font-mono-brand text-xs text-[#64748b]">scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-px h-8 bg-gradient-to-b from-[#00d4ff]/40 to-transparent"
            />
          </motion.div>
        </section>

        {/* ── PROJECTS ────────────────────────────────────────────────── */}
        <section id="projects" className="py-24 px-8 md:px-16 border-t border-[#1e293b]">
          <RevealSection>
            <div className="flex items-center gap-3 mb-12">
              <span className="font-mono-brand text-[#00d4ff] text-sm">&gt;</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold">Proyectos</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-[#1e293b] to-transparent ml-4" />
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {PROJECTS.map((project, i) => (
              <RevealSection key={project.name} delay={i * 0.15}>
                <a
                  href={project.url}
                  className="group block relative h-full"
                >
                  {/* Card */}
                  <div className="relative h-full border border-[#1e293b] rounded-lg p-8 bg-[#111827]/50 card-hover overflow-hidden">
                    {/* Gradient accent */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at top right, ${project.color}15, transparent)`,
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon + Title */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="text-4xl mb-3">{project.icon}</div>
                          <h3 className="font-display text-2xl font-bold text-[#e2e8f0] group-hover:text-[#00d4ff] transition-colors">
                            {project.name}
                          </h3>
                        </div>
                        <svg className="w-5 h-5 text-[#64748b] group-hover:text-[#00d4ff] transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>

                      {/* Description */}
                      <p className="text-[#94a3b8] text-sm leading-relaxed mb-6 font-display">
                        {project.desc}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="tech-badge text-xs"
                            style={{
                              borderColor: `${project.color}40`,
                              color: project.color,
                              background: `${project.color}08`,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Bottom accent line */}
                      <div
                        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                        style={{ background: project.color }}
                      />
                    </div>
                  </div>
                </a>
              </RevealSection>
            ))}
          </div>
        </section>

        {/* ── ABOUT ───────────────────────────────────────────────────── */}
        <section id="about" className="py-24 px-8 md:px-16 border-t border-[#1e293b]">
          <RevealSection>
            <div className="flex items-center gap-3 mb-12">
              <span className="font-mono-brand text-[#00d4ff] text-sm">$</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold">Sobre mí</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-[#1e293b] to-transparent ml-4" />
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-12 items-start max-w-4xl">
            <RevealSection delay={0.1}>
              <div className="space-y-6">
                <div className="border border-[#1e293b] rounded-lg p-6 bg-[#111827]/50 card-hover">
                  <div className="font-mono-brand text-xs text-[#64748b] mb-3">// perfil.json</div>
                  <pre className="font-mono-brand text-sm text-[#e2e8f0] leading-relaxed overflow-x-auto">
{`{
  "nombre": "Gustavo Harnisch",
  "rol": "Civil Computer Engineering",
  "universidad": "UCM",
  "ciudad": "Talca, Chile",
  "año": "4° año",
  "enfoque": [
    "Algoritmos",
    "Machine Learning",
    "Matemáticas Aplicadas"
  ],
  "estado": "Working hard 🌱"
}`}
                  </pre>
                </div>
              </div>
            </RevealSection>

            <RevealSection delay={0.2}>
              <div className="space-y-6">
                {/* Stack */}
                <div className="border border-[#1e293b] rounded-lg p-6 bg-[#111827]/50 card-hover">
                  <div className="font-mono-brand text-xs text-[#64748b] mb-4">// stack.sh</div>
                  <div className="flex flex-wrap gap-2">
                    {STACK.map((tech) => (
                      <span
                        key={tech.name}
                        className="tech-badge"
                        style={{ borderColor: `${tech.color}40`, color: tech.color, background: `${tech.color}08` }}
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-[#1e293b] rounded-lg p-5 bg-[#111827]/50 text-center card-hover">
                    <div className="font-mono-brand text-3xl font-bold text-[#00d4ff] glow-cyan-text">4x</div>
                    <div className="font-mono-brand text-xs text-[#64748b] mt-1">ICPC</div>
                  </div>
                  <div className="border border-[#1e293b] rounded-lg p-5 bg-[#111827]/50 text-center card-hover">
                    <div className="font-mono-brand text-3xl font-bold text-[#7c3aed]">∞</div>
                    <div className="font-mono-brand text-xs text-[#64748b] mt-1">curiosidad</div>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* ── INTERESTS ───────────────────────────────────────────────── */}
        <section id="interests" className="py-24 px-8 md:px-16 border-t border-[#1e293b]">
          <RevealSection>
            <div className="flex items-center gap-3 mb-12">
              <span className="font-mono-brand text-[#7c3aed] text-sm">#</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold">Áreas de Interés</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-[#1e293b] to-transparent ml-4" />
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
            {INTERESTS.map((item, i) => (
              <RevealSection key={item.label} delay={i * 0.08}>
                <div
                  className="border border-[#1e293b] rounded-lg p-6 bg-[#111827]/70 card-hover group cursor-default"
                  style={{ borderColor: `${item.color}20` }}
                >
                  <div
                    className="text-3xl mb-3 font-mono-brand"
                    style={{ color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div className="font-display font-semibold text-[#e2e8f0] group-hover:text-white transition-colors">
                    {item.label}
                  </div>
                  <div
                    className="mt-2 h-px w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: `linear-gradient(to right, ${item.color}60, transparent)` }}
                  />
                </div>
              </RevealSection>
            ))}
          </div>
        </section>

        {/* ── ICPC ────────────────────────────────────────────────────── */}
        <section id="icpc" className="py-24 px-8 md:px-16 border-t border-[#1e293b]">
          <RevealSection>
            <div className="flex items-center gap-3 mb-12">
              <span className="font-mono-brand text-[#00d4ff] text-sm">!</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold">Competencia Algorítmica</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-[#1e293b] to-transparent ml-4" />
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl">
            <RevealSection delay={0.1}>
              <div className="space-y-6">
                <div className="border border-[#00d4ff]/20 rounded-lg p-6 bg-[#111827]/80 glow-cyan">
                  <table className="w-full font-mono-brand text-sm">
                    <tbody>
                      <tr className="border-b border-[#1e293b]">
                        <td className="py-3 text-[#64748b]">Competición</td>
                        <td className="py-3 text-[#00d4ff] font-bold text-right">ICPC</td>
                      </tr>
                      <tr className="border-b border-[#1e293b]">
                        <td className="py-3 text-[#64748b]">Participaciones</td>
                        <td className="py-3 text-[#e2e8f0] text-right">4 veces</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-[#64748b]">Representando</td>
                        <td className="py-3 text-[#e2e8f0] text-right">UCM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <blockquote className="border-l-2 border-[#00d4ff] pl-4">
                  <p className="font-display text-[#94a3b8] italic text-sm leading-relaxed">
                    "No compito para ganar medallas — todavía. El objetivo es claro: llegar al podio
                    representando a la UCM. Cada contest es un paso hacia eso."
                  </p>
                </blockquote>
              </div>
            </RevealSection>

            <RevealSection delay={0.2}>
              <div className="border border-[#1e293b] rounded-lg p-6 bg-[#111827]/70 card-hover">
                <div className="font-mono-brand text-xs text-[#64748b] mb-4">// icpc_mindset.py</div>
                <pre className="font-mono-brand text-xs text-[#e2e8f0] leading-relaxed overflow-x-auto">
{`class ICPCCompetitor:
    def __init__(self):
        self.university = "UCM"
        self.participations = 4
        self.goal = "podio"
    
    def compete(self, contest):
        strategy = self.analyze(contest)
        solution = self.implement(strategy)
        return self.submit(solution)
    
    def analyze(self, problem):
        return optimal_approach(problem)
    
    # En progreso...
    def reach_podio(self):
        while not self.at_podio():
            self.practice()
            self.learn()
            self.compete()`}
                </pre>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* ── CONTACT ─────────────────────────────────────────────────── */}
        <section id="contact" className="py-24 px-8 md:px-16 border-t border-[#1e293b]">
          <RevealSection>
            <div className="flex items-center gap-3 mb-12">
              <span className="font-mono-brand text-[#7c3aed] text-sm">@</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold">Contacto</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-[#1e293b] to-transparent ml-4" />
            </div>
          </RevealSection>

          <div className="max-w-2xl">
            <RevealSection delay={0.1}>
              <div className="border border-[#1e293b] rounded-lg p-8 bg-[#111827]/50 card-hover">
                <div className="font-mono-brand text-xs text-[#64748b] mb-6">$ cat contact.md</div>

                <div className="space-y-4">
                  <a
                    href="https://github.com/Gustavo-Harnisch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded border border-[#1e293b] hover:border-[#00d4ff]/30 hover:bg-[#00d4ff]/5 transition-all group"
                  >
                    <svg className="w-5 h-5 text-[#64748b] group-hover:text-[#00d4ff] transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    <div>
                      <div className="font-mono-brand text-sm text-[#e2e8f0] group-hover:text-[#00d4ff] transition-colors">
                        github.com/Gustavo-Harnisch
                      </div>
                      <div className="font-mono-brand text-xs text-[#64748b]">GitHub Profile</div>
                    </div>
                    <svg className="w-4 h-4 text-[#64748b] group-hover:text-[#00d4ff] ml-auto transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                <div className="mt-8 pt-6 border-t border-[#1e293b]">
                  <p className="font-mono-brand text-xs text-[#64748b]">
                    <span className="text-[#00d4ff]">HELLO</span> I'm probably thinking about eating a Chilean hot dog.
                  </p>
                </div>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────────── */}
        <footer className="py-8 px-8 md:px-16 border-t border-[#1e293b]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-mono-brand text-xs text-[#64748b]">
                Gustavo Harnisch · UCM · Talca, Chile
              </span>
            </div>
            <div className="font-mono-brand text-xs text-[#64748b]">
              <span className="text-[#00d4ff]">4°</span> año · Ing. Civil Informática
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
