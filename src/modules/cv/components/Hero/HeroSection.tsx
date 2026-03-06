
import { useEffect, useRef, useState } from "react";
import SectionLayout from "../../../../shared/components/layout/SectionLayout";
import { SECTION_IDS } from "../../../../shared/lib/sectionIds";
import { profile } from "../../data/profile";
import legoAvatar from "../../../../assets/lego-avatar.png";

/* ─── Hook typewriter ─────────────────────────────────────────── */
function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 40, pauseMs = 1800): string {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx,   setWordIdx]   = useState(0);
  const [charIdx,   setCharIdx]   = useState(0);
  const [deleting,  setDeleting]  = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const current = words[wordIdx];
    const t = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) setTimeout(() => setDeleting(true), pauseMs);
        else setCharIdx((c) => c + 1);
      } else {
        setDisplayed(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) { setDeleting(false); setWordIdx((w) => (w + 1) % words.length); setCharIdx(0); }
        else setCharIdx((c) => c - 1);
      }
    }, deleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
}

/* ─── Stud LEGO ──────────────────────────────────────────────── */
function Stud({ small = false }: { small?: boolean }) {
  return (
    <span
      className={`${small ? "w-[11px] h-[11px]" : "w-[16px] h-[16px]"} rounded-full flex-shrink-0`}
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border)",
        boxShadow: "var(--stud-shadow)",
      }}
      aria-hidden="true"
    />
  );
}

/* ─── Ladrillo flotante ───────────────────────────────────────── */
function LegoBrick({ color, studs = 2, animation, delay = "0s", position }: {
  color: string; studs?: number; animation: string; delay?: string; position: string;
}) {
  return (
    <div
      className={`absolute z-20 hidden sm:block ${position}`}
      style={{ animation: `${animation} 4s ease-in-out ${delay} infinite` }}
      aria-hidden="true"
    >
      <div className="flex gap-[5px] px-[7px] pt-[5px] pb-[7px] rounded-t"
        style={{ background: color, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.15), inset 0 -2px 0 rgba(0,0,0,0.3)" }}>
        {Array.from({ length: studs }).map((_, i) => (
          <span key={i} className="w-[13px] h-[13px] rounded-full relative"
            style={{ background: color, top: "-7px", filter: "brightness(1.12)",
              boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)" }} />
        ))}
      </div>
      <div className="h-[4px] rounded-b" style={{ background: "rgba(0,0,0,0.4)" }} />
    </div>
  );
}

/* ─── Íconos sociales ─────────────────────────────────────────── */
function SocialIcon({ platform }: { platform: string }) {
  if (platform === "github") return (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
  if (platform === "linkedin") return (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
  return (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="2,4 12,13 22,4" />
    </svg>
  );
}

/* ─── Caja LEGO con el avatar ─────────────────────────────────── */
function LegoAvatarBox() {
  return (
    <div className="relative w-[220px] sm:w-[260px] flex-shrink-0 group">
      <div className="relative rounded-xl overflow-hidden border-2"
        style={{
          background: "var(--lego-box-bg)",
          borderColor: "var(--border)",
          boxShadow: "var(--lego-box-shadow)",
        }}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between px-[14px] py-[10px] border-b-2 border-[#b7950b]"
          style={{ background: "linear-gradient(135deg, #1a1200, #2a1f00)" }}>
          <span className="font-serif text-[0.82rem] font-black tracking-[0.12em] px-[10px] py-[3px] rounded text-[#1a1200] bg-[#e8a838]"
            style={{ boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.3)" }} aria-hidden="true">
            LEGO
          </span>
          <span className="font-mono text-[0.66rem] tracking-[0.1em] uppercase text-[#d4ac0d]">
            Developer Series
          </span>
        </div>

        {/* Ventana */}
        <div className="relative p-4" style={{ background: "var(--lego-window-bg)" }}>
          <div className="flex justify-center items-end min-h-[230px]">
            <img src={legoAvatar} alt="Figura LEGO de Greilyn Esquivel"
              className="w-full max-w-[200px] h-auto object-contain select-none transition-transform duration-[400ms] ease-out group-hover:-translate-y-[6px] group-hover:scale-[1.02]"
              style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))" }}
              draggable={false} />
          </div>
          <div className="absolute bottom-2 right-[10px] flex gap-[4px]" aria-hidden="true">
            <Stud small /><Stud small /><Stud small />
          </div>
        </div>

        {/* Pie */}
        <div className="flex items-center justify-between px-[14px] py-2 border-t"
          style={{ background: "var(--lego-footer-bg)", borderColor: "var(--border)" }}>
          <span className="font-mono text-[0.68rem] tracking-[0.05em] uppercase"
            style={{ color: "var(--text-muted)" }}>
            Full-Stack Dev
          </span>
          <span className="font-mono text-[0.66rem] font-bold px-2 py-[2px] rounded text-[#1a1200] bg-[#e8a838]">
            21+
          </span>
        </div>
      </div>

      {/* Ladrillos flotantes — colores fijos LEGO, no cambian con el modo */}
      <LegoBrick color="#a93226" studs={2} animation="hero-float-tl" delay="0s"   position="-top-3 -left-5" />
      <LegoBrick color="#d4ac0d" studs={1} animation="hero-float-tr" delay="1s"   position="top-5 -right-5" />
      <LegoBrick color="#27ae60" studs={2} animation="hero-float-bl" delay="2s"   position="bottom-14 -left-6" />
      <LegoBrick color="#2980b9" studs={1} animation="hero-float-br" delay="0.5s" position="bottom-5 -right-4" />
    </div>
  );
}

/* ─── Componente principal ────────────────────────────────────── */
export default function HeroSection() {
  const roles       = profile.roles ?? [profile.headline];
  const currentRole = useTypewriter(roles);
  const studsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!studsRef.current) return;
      const x = (e.clientX / window.innerWidth  - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      studsRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const firstName = profile.firstName ?? profile.fullName.split(" ")[0];
  const lastName  = profile.fullName.replace(firstName, "").trim();

  return (
    <SectionLayout id={SECTION_IDS.hero} fullWidth>
      <div
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16"
        style={{ background: "var(--bg-hero)" }}
      >
        {/* Fondo: patrón de studs */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div ref={studsRef} className="hero-studs-bg absolute -inset-10"
            style={{
              backgroundImage: `
                radial-gradient(circle, var(--stud-dot-1) 1.5px, transparent 1.5px),
                radial-gradient(circle, var(--stud-dot-2) 1px,   transparent 1px)
              `,
              backgroundSize: "30px 30px, 15px 15px",
              backgroundPosition: "0 0, 7.5px 7.5px",
            }} />
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 50%, transparent 25%, var(--hero-overlay-1) 100%),
              linear-gradient(to bottom, var(--hero-overlay-2) 0%, transparent 18%, transparent 82%, var(--hero-overlay-3) 100%)
            `,
          }} />
        </div>

        {/* Layout: texto | avatar */}
        <div
          className="relative z-10 w-full max-w-[1100px] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16"
          style={{ animation: "hero-fade-up 0.7s ease both" }}
        >
          {/* Columna de texto */}
          <div className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left flex-1 min-w-0">

            {/* Badge */}
            <p className="inline-flex items-center gap-2 font-mono text-[0.8rem] tracking-[0.05em] text-[#e8a838]">
              <span className="w-2 h-2 rounded-full bg-[#e8a838] flex-shrink-0"
                style={{ boxShadow: "0 0 8px #e8a838", animation: "hero-pulse-dot 2s ease-in-out infinite" }}
                aria-hidden="true" />
              // LEGO Developer Series
            </p>

            {/* Nombre */}
            <h1 className="flex flex-col leading-none gap-[0.08em]">
              <span className="font-mono text-base font-normal tracking-[0.05em] mb-1"
                style={{ color: "var(--text-muted)" }}>
                Hola, soy
              </span>
              <span className="font-serif font-bold tracking-tight"
                style={{ fontSize: "clamp(3rem, 6.5vw, 5.5rem)", color: "var(--text-primary)" }}>
                {firstName}
              </span>
              <span className="font-serif font-normal text-[#e8a838] tracking-tight"
                style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.8rem)" }}>
                {lastName}
              </span>
            </h1>

            {/* Typewriter */}
            <p className="flex items-center gap-1 font-mono"
              style={{ fontSize: "clamp(0.95rem, 2vw, 1.25rem)", color: "var(--text-muted)" }}
              aria-live="polite" aria-label={`Rol: ${currentRole}`}>
              <span className="text-[#2980b9] opacity-80" aria-hidden="true">&lt;</span>
              <span className="min-w-[2ch]" style={{ color: "var(--text-primary)" }}>{currentRole}</span>
              <span className="inline-block w-[2px] h-[1.1em] bg-[#e8a838] rounded-sm align-middle"
                style={{ animation: "hero-blink 0.9s step-end infinite" }} aria-hidden="true" />
              <span className="text-[#2980b9] opacity-80" aria-hidden="true">/&gt;</span>
            </p>

            {/* Tagline */}
            {profile.tagline && (
              <p className="font-serif italic border-l-[3px] border-[#e8a838] pl-4 max-w-[460px] leading-[1.7] text-[1rem] text-left"
                style={{ color: "var(--text-muted)" }}>
                {profile.tagline}
              </p>
            )}

            {/* Stats en ladrillos */}
            {profile.stats && profile.stats.length > 0 && (
              <ul className="flex flex-wrap gap-4 justify-center lg:justify-start list-none p-0 m-0">
                {profile.stats.map((stat) => (
                  <li key={stat.label}
                    className="relative rounded min-w-[108px] transition-all duration-200 hover:-translate-y-[3px]"
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,168,56,0.14)")}
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}>
                    <div className="absolute -top-[10px] left-2 flex gap-[5px]" aria-hidden="true">
                      <Stud /><Stud />
                    </div>
                    <div className="flex flex-col items-center gap-[0.2rem] px-4 pt-[1.2rem] pb-[0.9rem]">
                      <span className="font-serif font-bold text-[1.75rem] leading-none text-[#e8a838]">
                        {stat.value}
                      </span>
                      <span className="font-mono text-[0.68rem] text-center uppercase tracking-[0.04em]"
                        style={{ color: "var(--text-muted)" }}>
                        {stat.label}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a href={`#${SECTION_IDS.portfolio}`}
                className="inline-flex items-center gap-2 px-[1.6rem] py-[0.8rem] font-mono text-[0.88rem] font-bold tracking-[0.04em] uppercase rounded text-[#1a1200] bg-[#e8a838] no-underline transition-all duration-150 hover:-translate-y-[2px] active:translate-y-[3px] group/btn"
                style={{ boxShadow: "0 5px 0 #8a5e00" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 7px 0 #8a5e00, 0 0 30px rgba(232,168,56,0.22)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 5px 0 #8a5e00")}
                onMouseDown={(e)  => (e.currentTarget.style.boxShadow = "0 2px 0 #8a5e00")}
                onMouseUp={(e)    => (e.currentTarget.style.boxShadow = "0 7px 0 #8a5e00")}>
                Ver Proyectos
                <svg className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
                </svg>
              </a>
              <a href={`#${SECTION_IDS.contact}`}
                className="inline-flex items-center px-[1.6rem] py-[0.8rem] font-mono text-[0.88rem] font-bold tracking-[0.04em] uppercase rounded text-[#e8a838] bg-transparent border-2 border-[#e8a838] no-underline transition-all duration-150 hover:-translate-y-[2px] active:translate-y-[2px]"
                style={{ boxShadow: "0 4px 0 #8a5e00" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 0 #8a5e00"; e.currentTarget.style.background = "rgba(232,168,56,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 0 #8a5e00"; e.currentTarget.style.background = "transparent"; }}
                onMouseDown={(e)  => (e.currentTarget.style.boxShadow = "0 2px 0 #8a5e00")}
                onMouseUp={(e)    => (e.currentTarget.style.boxShadow = "0 6px 0 #8a5e00")}>
                Contacto
              </a>
            </div>

            {/* Socials */}
            <ul className="flex gap-3 list-none p-0 m-0 justify-center lg:justify-start">
              {profile.socials.map((s) => (
                <li key={s.id}>
                  <a href={s.href}
                    target={s.platform === "email" ? undefined : "_blank"}
                    rel={s.platform === "email" ? undefined : "noopener noreferrer"}
                    aria-label={s.label} title={s.label}
                    className="w-10 h-10 flex items-center justify-center rounded no-underline transition-all duration-200 hover:-translate-y-[2px] hover:text-[#e8a838] hover:border-[#e8a838]"
                    style={{
                      background: "var(--social-bg)",
                      border: "1px solid var(--border)",
                      color: "var(--text-muted)",
                      boxShadow: "var(--social-shadow)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(232,168,56,0.12)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "var(--social-bg)")}>
                    <SocialIcon platform={s.platform} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Avatar */}
          <div className="flex-shrink-0">
            <LegoAvatarBox />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-[0.4rem]"
          aria-hidden="true">
          <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase"
            style={{ color: "var(--text-subtle)" }}>
            Scroll
          </span>
          <div className="w-[2px] h-10 rounded overflow-hidden"
            style={{ background: "var(--scroll-track)" }}>
            <div className="w-full h-[40%] bg-[#e8a838] rounded"
              style={{ animation: "hero-scroll-fill 1.8s ease-in-out infinite" }} />
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}