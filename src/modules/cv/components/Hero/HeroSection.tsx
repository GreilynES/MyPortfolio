import { useEffect, useRef, useState } from "react";
import SectionLayout from "../../../../shared/components/layout/SectionLayout";
import { SECTION_IDS } from "../../../../shared/lib/sectionIds";
import { profile } from "../../data/profile";
import legoAvatar from "../../../../assets/lego-avatar.png";

/* ─── Keyframes que Tailwind no puede generar ─────────────────
   Solo animaciones custom: blink, float de ladrillos,
   scroll indicator y fade-up de entrada.
──────────────────────────────────────────────────────────────── */
const KEYFRAMES = `
  @keyframes hero-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes hero-pulse-dot {
    0%, 100% { opacity: 1;    transform: scale(1);    }
    50%       { opacity: 0.55; transform: scale(0.8);  }
  }
  @keyframes hero-fade-up {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes hero-float-tl {
    0%, 100% { transform: translateY(0px)  rotate(-15deg); }
    50%       { transform: translateY(-8px) rotate(-12deg); }
  }
  @keyframes hero-float-tr {
    0%, 100% { transform: translateY(0px)  rotate(12deg); }
    50%       { transform: translateY(-8px) rotate(15deg); }
  }
  @keyframes hero-float-bl {
    0%, 100% { transform: translateY(0px)  rotate(8deg);  }
    50%       { transform: translateY(-8px) rotate(11deg); }
  }
  @keyframes hero-float-br {
    0%, 100% { transform: translateY(0px)  rotate(-10deg); }
    50%       { transform: translateY(-8px) rotate(-7deg);  }
  }
  @keyframes hero-scroll-fill {
    0%   { transform: translateY(-100%); opacity: 1; }
    80%  { transform: translateY(300%);  opacity: 1; }
    81%  { opacity: 0; }
    82%  { transform: translateY(-100%); }
    83%  { opacity: 1; }
    100% { transform: translateY(-100%); opacity: 1; }
  }
  /* Parallax: el patrón de studs sigue el mouse */
  .hero-studs-bg {
    transition: transform 0.12s ease-out;
  }
`;

/* ─── Hook: efecto typewriter ─────────────────────────────────
   Escribe y borra en bucle los roles del perfil.
──────────────────────────────────────────────────────────────── */
function useTypewriter(
  words: string[],
  typingSpeed  = 80,
  deletingSpeed = 40,
  pauseMs       = 1800
): string {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx,   setWordIdx]   = useState(0);
  const [charIdx,   setCharIdx]   = useState(0);
  const [deleting,  setDeleting]  = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const current = words[wordIdx];
    const delay   = deleting ? deletingSpeed : typingSpeed;

    const t = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pauseMs);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setDisplayed(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx((w) => (w + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, delay);

    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
}

/* ─── Subcomponente: Stud LEGO ────────────────────────────────
   El "botón" circular que tienen todas las piezas LEGO encima.
──────────────────────────────────────────────────────────────── */
function Stud({ small = false }: { small?: boolean }) {
  const size = small ? "w-[11px] h-[11px]" : "w-[16px] h-[16px]";
  return (
    <span
      className={`${size} rounded-full bg-[#21262d] border border-white/8 flex-shrink-0`}
      style={{ boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.04)" }}
      aria-hidden="true"
    />
  );
}

/* ─── Subcomponente: Ladrillo LEGO flotante ───────────────────
   Los ladrillos decorativos que orbitan la caja del avatar.
──────────────────────────────────────────────────────────────── */
function LegoBrick({
  color,
  studs     = 2,
  animation,
  delay     = "0s",
  position,
}: {
  color:     string;
  studs?:    number;
  animation: string;   // nombre del @keyframe hero-float-*
  delay?:    string;
  position:  string;   // clases Tailwind de posición absolute
}) {
  return (
    <div
      className={`absolute z-20 hidden sm:block ${position}`}
      style={{ animation: `${animation} 4s ease-in-out ${delay} infinite` }}
      aria-hidden="true"
    >
      {/* Cuerpo del ladrillo */}
      <div
        className="flex gap-[5px] px-[7px] pt-[5px] pb-[7px] rounded-t"
        style={{
          background: color,
          boxShadow: "inset 0 2px 0 rgba(255,255,255,0.15), inset 0 -2px 0 rgba(0,0,0,0.3)",
        }}
      >
        {Array.from({ length: studs }).map((_, i) => (
          <span
            key={i}
            className="w-[13px] h-[13px] rounded-full relative"
            style={{
              background: color,
              top: "-7px",
              filter: "brightness(1.12)",
              boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
      {/* Sombra inferior del ladrillo */}
      <div className="h-[4px] rounded-b" style={{ background: "rgba(0,0,0,0.4)" }} />
    </div>
  );
}

/* ─── Subcomponente: Ícono SVG por platform ───────────────────
   Usa el campo "platform" que ya tienes en tus socials.
──────────────────────────────────────────────────────────────── */
function SocialIcon({ platform }: { platform: string }) {
  if (platform === "github") {
    return (
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    );
  }
  if (platform === "linkedin") {
    return (
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  return (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  );
}

/* ─── Subcomponente: Caja LEGO con el avatar ──────────────────
   El packaging estilo LEGO que contiene la foto.
──────────────────────────────────────────────────────────────── */
function LegoAvatarBox() {
  return (
    <div className="relative w-[260px] sm:w-[260px] w-[220px] flex-shrink-0 group">

      {/* ── Caja principal ── */}
      <div
        className="relative rounded-xl overflow-hidden border-2 border-white/8"
        style={{
          background: "linear-gradient(145deg, #1c1f24, #13161a)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Cabecera: logo LEGO + nombre de serie */}
        <div
          className="flex items-center justify-between px-[14px] py-[10px] border-b-2 border-[#b7950b]"
          style={{ background: "linear-gradient(135deg, #1a1200, #2a1f00)" }}
        >
          <span
            className="font-serif text-[0.82rem] font-black tracking-[0.12em] px-[10px] py-[3px] rounded text-[#1a1200] bg-[#e8a838]"
            style={{ boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.3)" }}
            aria-hidden="true"
          >
            LEGO
          </span>
          <span className="font-mono text-[0.66rem] tracking-[0.1em] uppercase text-[#d4ac0d]">
            Developer Series
          </span>
        </div>

        {/* Ventana con la figura */}
        <div
          className="relative p-4"
          style={{ background: "radial-gradient(ellipse at center, #1e2028 0%, #13161a 100%)" }}
        >
          <div className="flex justify-center items-end min-h-[230px]">
            <img
              src={legoAvatar}
              alt="Figura LEGO de Greilyn Esquivel"
              className="w-full max-w-[200px] h-auto object-contain select-none transition-transform duration-[400ms] ease-out group-hover:-translate-y-[6px] group-hover:scale-[1.02]"
              style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.7))" }}
              draggable={false}
            />
          </div>

          {/* Studs decorativos dentro de la ventana */}
          <div className="absolute bottom-2 right-[10px] flex gap-[4px]" aria-hidden="true">
            <Stud small /><Stud small /><Stud small />
          </div>
        </div>

        {/* Pie de caja */}
        <div className="flex items-center justify-between px-[14px] py-2 bg-[#21262d] border-t border-white/8">
          <span className="font-mono text-[0.68rem] tracking-[0.05em] uppercase text-[#8b949e]">
            Full-Stack Dev
          </span>
          <span
            className="font-mono text-[0.66rem] font-bold px-2 py-[2px] rounded text-[#1a1200] bg-[#e8a838]"
          >
            21+
          </span>
        </div>
      </div>

      {/* ── Ladrillos flotantes en las 4 esquinas ── */}
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

  // Ref para el efecto parallax del fondo con el mouse
  const wrapperRef = useRef<HTMLDivElement>(null);
  const studsRef   = useRef<HTMLDivElement>(null);

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
    /*
     * SectionLayout no se modifica.
     * Todo vive dentro del div hero-wrapper.
     */
    <SectionLayout id={SECTION_IDS.hero} fullWidth>

      {/* Keyframes custom inyectados una sola vez */}
      <style>{KEYFRAMES}</style>

      <div
        ref={wrapperRef}
        className="relative min-h-screen flex flex-col items-center justify-center bg-[#0d1117] overflow-hidden px-6 pt-24 pb-16"
      >
        {/* ── Fondo: patrón de studs LEGO ── */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Patrón de puntos */}
          <div
            ref={studsRef}
            className="hero-studs-bg absolute -inset-10"
            style={{
              backgroundImage: `
                radial-gradient(circle, rgba(255,255,255,0.06) 1.5px, transparent 1.5px),
                radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)
              `,
              backgroundSize: "30px 30px, 15px 15px",
              backgroundPosition: "0 0, 7.5px 7.5px",
            }}
          />
          {/* Gradiente de profundidad encima del patrón */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 50% 50%, transparent 25%, rgba(13,17,23,0.65) 100%),
                linear-gradient(to bottom, rgba(13,17,23,0.8) 0%, transparent 18%, transparent 82%, rgba(13,17,23,0.9) 100%)
              `,
            }}
          />
        </div>

        {/* ── Layout principal: texto | avatar ── */}
        <div
          className="relative z-10 w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-12 lg:gap-16"
          style={{ animation: "hero-fade-up 0.7s ease both" }}
        >
          {/* ── Columna izquierda: texto ── */}
          <div className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left">

            {/* Badge: "// LEGO Developer Series" */}
            <p className="inline-flex items-center gap-2 font-mono text-[0.8rem] tracking-[0.05em] text-[#e8a838]">
              <span
                className="w-2 h-2 rounded-full bg-[#e8a838] flex-shrink-0"
                style={{
                  boxShadow: "0 0 8px #e8a838",
                  animation: "hero-pulse-dot 2s ease-in-out infinite",
                }}
                aria-hidden="true"
              />
              // LEGO Developer Series
            </p>

            {/* Nombre */}
            <h1 className="flex flex-col leading-none gap-[0.08em]">
              <span className="font-mono text-base font-normal tracking-[0.05em] text-[#8b949e] mb-1">
                Hola, soy
              </span>
              <span className="font-serif font-bold text-[#e8e8e8] tracking-tight"
                style={{ fontSize: "clamp(3rem, 6.5vw, 5.5rem)" }}>
                {firstName}
              </span>
              <span className="font-serif font-normal text-[#e8a838] tracking-tight"
                style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.8rem)" }}>
                {lastName}
              </span>
            </h1>

            {/* Rol con typewriter */}
            <p
              className="flex items-center gap-1 font-mono text-[#8b949e]"
              style={{ fontSize: "clamp(0.95rem, 2vw, 1.25rem)" }}
              aria-live="polite"
              aria-label={`Rol: ${currentRole}`}
            >
              <span className="text-[#2980b9] opacity-80" aria-hidden="true">&lt;</span>
              <span className="text-[#e8e8e8] min-w-[2ch]">{currentRole}</span>
              {/* Cursor parpadeante */}
              <span
                className="inline-block w-[2px] h-[1.1em] bg-[#e8a838] rounded-sm align-middle"
                style={{ animation: "hero-blink 0.9s step-end infinite" }}
                aria-hidden="true"
              />
              <span className="text-[#2980b9] opacity-80" aria-hidden="true">/&gt;</span>
            </p>

            {/* Tagline */}
            {profile.tagline && (
              <p className="font-serif italic text-[#8b949e] border-l-[3px] border-[#e8a838] pl-4 max-w-[460px] leading-[1.7] text-[1rem] text-left">
                {profile.tagline}
              </p>
            )}

            {/* Estadísticas en ladrillos LEGO */}
            {profile.stats && profile.stats.length > 0 && (
              <ul className="flex flex-wrap gap-4 justify-center lg:justify-start list-none p-0 m-0">
                {profile.stats.map((stat) => (
                  <li
                    key={stat.label}
                    className="relative bg-[#21262d] border border-white/8 rounded min-w-[108px] transition-all duration-200 hover:-translate-y-[3px]"
                    style={{ boxShadow: "0 0 0 0 transparent" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,168,56,0.14)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow = "0 0 0 0 transparent")
                    }
                  >
                    {/* Studs encima del ladrillo */}
                    <div className="absolute -top-[10px] left-2 flex gap-[5px]" aria-hidden="true">
                      <Stud /><Stud />
                    </div>
                    {/* Contenido del ladrillo */}
                    <div className="flex flex-col items-center gap-[0.2rem] px-4 pt-[1.2rem] pb-[0.9rem]">
                      <span className="font-serif font-bold text-[1.75rem] leading-none text-[#e8a838]">
                        {stat.value}
                      </span>
                      <span className="font-mono text-[0.68rem] text-[#8b949e] text-center uppercase tracking-[0.04em]">
                        {stat.label}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Botones CTA */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {/* Primario: ladrillo amarillo LEGO */}
              <a
                href={`#${SECTION_IDS.portfolio}`}
                className="inline-flex items-center gap-2 px-[1.6rem] py-[0.8rem] font-mono text-[0.88rem] font-bold tracking-[0.04em] uppercase rounded text-[#1a1200] bg-[#e8a838] no-underline transition-all duration-150 active:translate-y-[3px] hover:-translate-y-[2px] group/btn"
                style={{
                  boxShadow: "0 5px 0 #8a5e00, 0 0 40px rgba(232,168,56,0.1)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = "0 7px 0 #8a5e00, 0 0 30px rgba(232,168,56,0.22)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = "0 5px 0 #8a5e00, 0 0 40px rgba(232,168,56,0.1)")
                }
                onMouseDown={(e) =>
                  (e.currentTarget.style.boxShadow = "0 2px 0 #8a5e00")
                }
                onMouseUp={(e) =>
                  (e.currentTarget.style.boxShadow = "0 7px 0 #8a5e00, 0 0 30px rgba(232,168,56,0.22)")
                }
              >
                Ver Proyectos
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12,5 19,12 12,19" />
                </svg>
              </a>

              {/* Secundario: borde amarillo */}
              <a
                href={`#${SECTION_IDS.contact}`}
                className="inline-flex items-center px-[1.6rem] py-[0.8rem] font-mono text-[0.88rem] font-bold tracking-[0.04em] uppercase rounded text-[#e8a838] bg-transparent border-2 border-[#e8a838] no-underline transition-all duration-150 hover:-translate-y-[2px] active:translate-y-[2px]"
                style={{ boxShadow: "0 4px 0 #8a5e00" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 6px 0 #8a5e00";
                  e.currentTarget.style.background = "rgba(232,168,56,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 0 #8a5e00";
                  e.currentTarget.style.background = "transparent";
                }}
                onMouseDown={(e) =>
                  (e.currentTarget.style.boxShadow = "0 2px 0 #8a5e00")
                }
                onMouseUp={(e) =>
                  (e.currentTarget.style.boxShadow = "0 6px 0 #8a5e00")
                }
              >
                Contacto
              </a>
            </div>

            {/* Redes sociales — usa profile.socials igual que siempre */}
            <ul className="flex gap-3 list-none p-0 m-0 justify-center lg:justify-start">
              {profile.socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target={s.platform === "email" ? undefined : "_blank"}
                    rel={s.platform === "email" ? undefined : "noopener noreferrer"}
                    aria-label={s.label}
                    title={s.label}
                    className="w-10 h-10 flex items-center justify-center rounded bg-[#21262d] border border-white/8 text-[#8b949e] no-underline transition-all duration-200 hover:-translate-y-[2px] hover:text-[#e8a838] hover:border-[#e8a838]"
                    style={{ boxShadow: "0 3px 0 rgba(0,0,0,0.4)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "rgba(232,168,56,0.12)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#21262d")
                    }
                  >
                    <SocialIcon platform={s.platform} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Columna derecha: avatar LEGO ── */}
          <LegoAvatarBox />
        </div>

        {/* ── Indicador de scroll ── */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-[0.4rem]"
          aria-hidden="true"
        >
          <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[#484f58]">
            Scroll
          </span>
          <div className="w-[2px] h-10 bg-[#484f58] rounded overflow-hidden">
            <div
              className="w-full h-[40%] bg-[#e8a838] rounded"
              style={{ animation: "hero-scroll-fill 1.8s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>

    </SectionLayout>
  );
}