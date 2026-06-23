import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Gamepad2,
  Github,
  Globe2,
  GraduationCap,
  Mail,
  MapPin,
  Sparkles,
  Terminal,
  Trophy,
  type LucideIcon,
} from "lucide-react";

const AVATAR = "https://avatars.githubusercontent.com/u/138950084?v=4";

type NavItem = {
  id: string;
  label: string;
};

type Project = {
  name: string;
  description: string;
  href: string;
  language: string;
  tags: string[];
  icon: LucideIcon;
  accent: string;
  featured?: boolean;
  local?: boolean;
};

type ContactLink = {
  label: string;
  detail: string;
  href: string;
  icon: LucideIcon;
};

const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "Sobre mi" },
  { id: "projects", label: "Proyectos" },
  { id: "interests", label: "Intereses" },
  { id: "contact", label: "Contacto" },
];

const PROJECTS: Project[] = [
  {
    name: "Horario",
    description:
      "Horario universitario publicado en GitHub Pages, con datos desde CSV y una interfaz enfocada en consulta rapida.",
    href: "/Horario/",
    language: "HTML - CSS - JavaScript - CSV",
    tags: ["Local", "CSV", "GitHub Pages"],
    icon: CalendarDays,
    accent: "#facc15",
    featured: true,
    local: true,
  },
  {
    name: "Pong",
    description:
      "Remake del clasico Pong en canvas, con controles simples y fisica de juego directa desde el navegador.",
    href: "/pong/",
    language: "Canvas - JavaScript",
    tags: ["Local", "Game Dev", "Canvas"],
    icon: Gamepad2,
    accent: "#22d3ee",
    featured: true,
    local: true,
  },
  {
    name: "CRUD Oracle",
    description:
      "Aplicacion full-stack con Oracle XE 21c, React y Node.js para practicar validaciones y persistencia real.",
    href: "https://github.com/Gustavo-Harnisch/CRUD-oracle",
    language: "PLSQL - React - Node.js",
    tags: ["Full-stack", "Oracle", "React"],
    icon: Database,
    accent: "#fb7185",
    featured: true,
  },
  {
    name: "Portfolio Hub",
    description:
      "Repositorio principal que organiza el portafolio y publica proyectos estaticos desde GitHub Pages.",
    href: "https://github.com/Gustavo-Harnisch/Gustavo-Harnisch.github.io",
    language: "TypeScript - Vite",
    tags: ["Portfolio", "Web", "Pages"],
    icon: Globe2,
    accent: "#a78bfa",
  },
  {
    name: "SQL Class",
    description:
      "Ejercicios, scripts y practicas de bases de datos para reforzar consultas, modelos y fundamentos SQL.",
    href: "https://github.com/Gustavo-Harnisch/sql_class",
    language: "SQL",
    tags: ["SQL", "DB", "Practica"],
    icon: Code2,
    accent: "#34d399",
  },
  {
    name: "Arduino ESP32",
    description:
      "Exploracion de embebidos e IoT alrededor del core de Arduino para ESP32 y herramientas de bajo nivel.",
    href: "https://github.com/Gustavo-Harnisch/arduino-esp32",
    language: "C++",
    tags: ["Embedded", "IoT", "C++"],
    icon: Cpu,
    accent: "#f97316",
  },
];

const STACK = [
  "React",
  "Node.js",
  "TypeScript",
  "Oracle",
  "SQL",
  "C++",
  "Python",
  "Linux",
  "Git",
  "Bash",
];

const INTERESTS = [
  "Algoritmos",
  "Machine Learning",
  "Inteligencia Artificial",
  "Bases de datos",
  "Algebra lineal",
  "Sistemas embebidos",
  "ICPC",
  "GitHub Pages",
];

const CONTACT_LINKS: ContactLink[] = [
  {
    label: "GitHub",
    detail: "@Gustavo-Harnisch",
    href: "https://github.com/Gustavo-Harnisch",
    icon: Github,
  },
  {
    label: "GitHub Pages",
    detail: "gustavo-harnisch.github.io",
    href: "https://gustavo-harnisch.github.io/",
    icon: Globe2,
  },
  {
    label: "Email",
    detail: "Escribeme directo",
    href: "mailto:hello@example.com",
    icon: Mail,
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Header({ activeSection }: { activeSection: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0d14]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <a href="#top" className="flex items-center gap-3 font-mono text-sm font-semibold text-white">
          <span className="status-dot" aria-hidden="true" />
          <span>gustavo.dev</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Navegacion principal">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-sm font-medium transition-colors ${
                activeSection === item.id ? "text-white" : "text-[#8a96aa] hover:text-white"
              }`}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="https://github.com/Gustavo-Harnisch"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-[#e6edf6] transition hover:border-[#7dd3fc] hover:bg-[#7dd3fc]/10 hover:text-[#7dd3fc]"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
        </a>
      </div>
    </header>
  );
}

function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 font-mono text-xs font-medium text-[#7dd3fc]">{kicker}</p>
      <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
      {description && <p className="mt-3 max-w-2xl text-[#8a96aa]">{description}</p>}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;
  const external = project.href.startsWith("http");

  return (
    <Reveal delay={index * 0.06}>
      <a
        href={project.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="project-card-modern group block h-full p-6"
        style={{ "--project-accent": project.accent } as CSSProperties}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-[color:var(--project-accent)]">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-semibold text-white">{project.name}</h3>
              <p className="font-mono text-xs text-[#8a96aa]">{project.language}</p>
            </div>
          </div>
          <ExternalLink className="mt-1 h-4 w-4 flex-shrink-0 text-[#5a6679] transition group-hover:text-[color:var(--project-accent)]" />
        </div>

        <p className="mb-6 text-sm leading-6 text-[#8a96aa]">{project.description}</p>

        <div className="mt-auto flex flex-wrap gap-2">
          {project.featured && (
            <span className="rounded-full border border-[color:var(--project-accent)]/40 bg-white/5 px-3 py-1 font-mono text-xs text-[color:var(--project-accent)]">
              Destacado
            </span>
          )}
          {project.local && (
            <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 font-mono text-xs text-emerald-300">
              En Pages
            </span>
          )}
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-[#8a96aa]">
              {tag}
            </span>
          ))}
        </div>
      </a>
    </Reveal>
  );
}

function TerminalPreview() {
  return (
    <div className="glass-panel overflow-hidden">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-auto font-mono text-xs text-[#8a96aa]">~/gustavo</span>
      </div>
      <pre className="m-0 whitespace-pre-wrap p-5 font-mono text-sm leading-7 text-[#e6edf6]">
        <span className="text-[#7dd3fc]">$</span> whoami{"\n"}
        <span className="text-[#8a96aa]">gustavo - dev - CL</span>
        {"\n"}
        <span className="text-[#7dd3fc]">$</span> open /Horario/{"\n"}
        <span className="text-[#8a96aa]">agenda universitaria lista</span>
        {"\n"}
        <span className="text-[#7dd3fc]">$</span> play /pong/{"\n"}
        <span className="text-[#8a96aa]">canvas, paletas y pelota</span>
        {"\n"}
        <span className="text-[#7dd3fc]">$</span> echo "let's build something" <span className="terminal-cursor">|</span>
      </pre>
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ["top", ...NAV_ITEMS.map((item) => item.id)];

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i]);
        if (element && window.scrollY >= element.offsetTop - 160) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="portfolio-page min-h-screen overflow-x-hidden bg-[#0a0d14] text-[#e6edf6]">
      <div className="portfolio-grid-bg fixed inset-0 -z-10" aria-hidden="true" />
      <Header activeSection={activeSection} />

      <main id="top" className="mx-auto max-w-6xl px-5 md:px-8">
        <section className="grid min-h-[calc(100vh-73px)] items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-medium text-emerald-300">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Disponible para proyectos y aprendizaje
            </span>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Hola, soy <span className="gradient-text">Gustavo Harnisch</span>.
              <br />
              Construyo software que <span className="soft-underline">simplemente funciona</span>.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#8a96aa]">
              Estudiante de Ingenieria Civil Informatica en la UCM, con interes en desarrollo full-stack,
              bases de datos, algoritmos, aprendizaje automatico y sistemas que se pueden probar en el navegador.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7dd3fc] to-[#a78bfa] px-5 py-3 text-sm font-semibold text-[#0a0d14] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-18px_#7dd3fc]"
              >
                Ver proyectos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#7dd3fc] hover:bg-white/[0.06]"
              >
                Contactarme
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div>
                <strong className="block text-2xl font-bold text-white">{PROJECTS.length}</strong>
                <span className="text-sm text-[#8a96aa]">Proyectos</span>
              </div>
              <div>
                <strong className="block text-2xl font-bold text-white">4°</strong>
                <span className="text-sm text-[#8a96aa]">Año UCM</span>
              </div>
              <div>
                <strong className="block text-2xl font-bold text-white">CL</strong>
                <span className="text-sm text-[#8a96aa]">Chile</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto w-full max-w-sm lg:max-w-md"
          >
            <div className="relative">
              <div className="avatar-ring-soft absolute left-1/2 top-0 h-44 w-44 -translate-x-1/2 rounded-full" aria-hidden="true" />
              <img
                src={AVATAR}
                alt="Gustavo Harnisch"
                className="relative z-10 mx-auto mb-6 h-40 w-40 rounded-full border border-white/20 bg-[#0e131c] object-cover shadow-2xl"
              />
              <TerminalPreview />
            </div>
          </motion.div>
        </section>

        <section id="about" className="scroll-mt-24 py-16 md:py-20">
          <Reveal>
            <SectionHeading kicker="01 - Sobre mi" title="Un poco sobre quien soy" />
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <Reveal>
              <article className="glass-panel p-7 md:p-9">
                <p className="border-l-2 border-[#7dd3fc] pl-5 text-xl font-medium leading-8 text-white">
                  "HELLO - probably I'm thinking about eating a Chilean hot dog."
                </p>
                <p className="mt-6 leading-8 text-[#8a96aa]">
                  Me gusta resolver problemas reales, integrar sistemas y aprender herramientas nuevas. En esta version
                  del portafolio deje el foco en lo importante: quien soy, que estoy construyendo y acceso directo a los
                  proyectos que ya viven en GitHub Pages.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {STACK.map((item) => (
                    <span key={item} className="skill-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <div className="glass-panel flex items-center gap-4 p-5">
                  <GraduationCap className="h-6 w-6 text-[#7dd3fc]" aria-hidden="true" />
                  <div>
                    <strong className="block text-white">UCM</strong>
                    <span className="text-sm text-[#8a96aa]">Ing. Civil Informatica</span>
                  </div>
                </div>
                <div className="glass-panel flex items-center gap-4 p-5">
                  <MapPin className="h-6 w-6 text-[#34d399]" aria-hidden="true" />
                  <div>
                    <strong className="block text-white">Talca</strong>
                    <span className="text-sm text-[#8a96aa]">Chile</span>
                  </div>
                </div>
                <div className="glass-panel flex items-center gap-4 p-5">
                  <Trophy className="h-6 w-6 text-[#facc15]" aria-hidden="true" />
                  <div>
                    <strong className="block text-white">ICPC</strong>
                    <span className="text-sm text-[#8a96aa]">Competencia algoritmica</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 py-16 md:py-20">
          <Reveal>
            <SectionHeading
              kicker="02 - Proyectos"
              title="Cosas que he construido"
              description="Las primeras tarjetas son los proyectos que querias conservar en esta nueva configuracion de GitHub Pages."
            />
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        </section>

        <section id="interests" className="scroll-mt-24 py-16 md:py-20">
          <Reveal>
            <SectionHeading
              kicker="03 - Intereses"
              title="Donde estoy poniendo energia"
              description="Una mezcla entre fundamentos academicos, software aplicado y experimentos que vale la pena tener cerca."
            />
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {INTERESTS.map((interest, index) => (
              <Reveal key={interest} delay={index * 0.04}>
                <div className="interest-tile flex min-h-24 items-center justify-between gap-4 p-5">
                  <span className="font-medium text-white">{interest}</span>
                  <Terminal className="h-4 w-4 flex-shrink-0 text-[#7dd3fc]" aria-hidden="true" />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 py-16 md:py-20">
          <Reveal>
            <SectionHeading
              kicker="04 - Contacto"
              title="Las mejores formas de encontrarme"
              description="GitHub queda como centro del portafolio, y la pagina mantiene accesos directos a lo publicado."
            />
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {CONTACT_LINKS.map((link, index) => {
              const Icon = link.icon;
              const external = link.href.startsWith("http");

              return (
                <Reveal key={link.label} delay={index * 0.06}>
                  <a
                    href={link.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="contact-card group flex h-full items-center gap-4 p-5"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-[#7dd3fc]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <strong className="block text-sm text-white">{link.label}</strong>
                      <span className="block truncate text-sm text-[#8a96aa]">{link.detail}</span>
                    </span>
                    <ExternalLink className="ml-auto h-4 w-4 flex-shrink-0 text-[#5a6679] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#7dd3fc]" />
                  </a>
                </Reveal>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-white/10 px-5 py-8 text-sm text-[#8a96aa] md:flex-row md:items-center md:justify-between md:px-8">
        <span>© {new Date().getFullYear()} Gustavo Harnisch</span>
        <span>Hecho con React, Vite y GitHub Pages.</span>
      </footer>
    </div>
  );
}
