
import { useEffect, useState } from "react";
import { SECTION_IDS } from "../../shared/lib/sectionIds";

const NAV_ITEMS = [
  { label: "Inicio",      href: `#${SECTION_IDS.hero}` },
  { label: "Educación",   href: `#${SECTION_IDS.education}` },
  { label: "Experiencia", href: `#${SECTION_IDS.experience}` },
  { label: "Habilidades", href: `#${SECTION_IDS.skills}` },
  { label: "Idiomas",     href: `#${SECTION_IDS.languages}` },
  { label: "Portafolio",  href: `#${SECTION_IDS.portfolio}` },
  { label: "Contacto",    href: `#${SECTION_IDS.contact}` },
] as const;

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1"  x2="12" y2="3"  /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5" aria-hidden="true">
      {open
        ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
        : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
      }
    </svg>
  );
}

export default function Navbar() {
  const [dark,       setDark]       = useState(true);  // oscuro por defecto
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeHref, setActiveHref] = useState(`#${SECTION_IDS.hero}`);
  const [scrolled,   setScrolled]   = useState(false);

  /* Inicializa: oscuro por defecto salvo que el usuario haya guardado "light" */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved ? saved === "dark" : true; // default oscuro
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_ITEMS.map((i) => i.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveHref(`#${id}`); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(var(--bg-hero-rgb, 13,17,23), 0.9)" : "var(--bg-base)",
        borderBottom: `1px solid var(--border)`,
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.2)" : "none",
      }}
    >
      <nav className="max-w-[1100px] mx-auto flex items-center justify-between px-6 h-[60px]"
        aria-label="Navegación principal">

        {/* Logo */}
        <a href={`#${SECTION_IDS.hero}`} className="flex items-center gap-2 no-underline group" aria-label="Ir al inicio">
          <span
            className="w-7 h-7 flex items-center justify-center rounded font-serif text-[0.6rem] font-black tracking-[0.1em] text-[#1a1200] bg-[#e8a838] flex-shrink-0 transition-transform duration-150 group-hover:-translate-y-[2px]"
            style={{ boxShadow: "0 3px 0 #8a5e00" }} aria-hidden="true">
            GES
          </span>
          <span className="font-serif font-bold text-[1.05rem] tracking-tight"
            style={{ color: "var(--text-primary)" }}>
            Greilyn.
          </span>
        </a>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-6 list-none p-0 m-0">
          {NAV_ITEMS.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <li key={item.href}>
                <a href={item.href}
                  className="font-mono text-[0.75rem] tracking-[0.06em] uppercase no-underline transition-colors duration-200 pb-[2px]"
                  style={{
                    color: isActive ? "#e8a838" : "var(--text-muted)",
                    borderBottom: isActive ? "2px solid #e8a838" : "2px solid transparent",
                  }}
                  onMouseEnter={(e) => { if (!isActive) { (e.target as HTMLElement).style.color = "#e8a838"; (e.target as HTMLElement).style.borderBottomColor = "#e8a838"; }}}
                  onMouseLeave={(e) => { if (!isActive) { (e.target as HTMLElement).style.color = "var(--text-muted)"; (e.target as HTMLElement).style.borderBottomColor = "transparent"; }}}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Controles */}
        <div className="flex items-center gap-3">

          {/* Toggle dark/light */}
          <button onClick={toggleTheme}
            aria-label={dark ? "Activar modo claro" : "Activar modo oscuro"}
            className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-[0.7rem] tracking-[0.05em] uppercase rounded border transition-all duration-200 hover:-translate-y-[1px] hover:text-[#e8a838] hover:border-[#e8a838]"
            style={{
              color: "var(--text-muted)",
              background: "var(--bg-elevated)",
              borderColor: "var(--border)",
              boxShadow: "0 2px 0 rgba(0,0,0,0.15)",
            }}>
            {dark ? <SunIcon /> : <MoonIcon />}
            <span className="hidden sm:inline">{dark ? "Claro" : "Oscuro"}</span>
          </button>

          {/* Hamburguesa móvil */}
          <button onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded border transition-all duration-200 hover:text-[#e8a838] hover:border-[#e8a838]"
            style={{
              color: "var(--text-muted)",
              background: "var(--bg-elevated)",
              borderColor: "var(--border)",
            }}>
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
        style={{ background: "var(--bg-base)", borderTop: `1px solid var(--border)` }}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col list-none p-0 m-0 px-6 py-4 gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <li key={item.href}>
                <a href={item.href} onClick={() => setMenuOpen(false)}
                  className="block font-mono text-[0.8rem] tracking-[0.06em] uppercase no-underline py-2 px-3 rounded transition-all duration-150"
                  style={{
                    color: isActive ? "#e8a838" : "var(--text-muted)",
                    background: isActive ? "rgba(232,168,56,0.1)" : "transparent",
                    borderLeft: isActive ? "2px solid #e8a838" : "2px solid transparent",
                  }}>
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}