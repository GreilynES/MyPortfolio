import SectionLayout from "../../../../shared/components/layout/SectionLayout";
import { projects } from "../../data/projects";

/* ── Colores LEGO por proyecto ───────────────────────────────── */
const BRICK_COLORS = ["#e8a838", "#2980b9", "#27ae60"];

/* ── Ícono GitHub ─────────────────────────────────────────────── */
function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

/* ── Ícono link externo ───────────────────────────────────────── */
function IconExternal() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/* ── Stud LEGO ────────────────────────────────────────────────── */
function BrickStud({ color }: { color: string }) {
  return (
    <span
      className="h-[11px] w-[11px] rounded-full"
      style={{
        background: color,
        boxShadow:
          "inset 0 -2px 2px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
      }}
      aria-hidden="true"
    />
  );
}

/* ── Pieza LEGO decorativa arriba de cada card ───────────────── */
function MiniBrick({ color }: { color: string }) {
  return (
    <div className="flex items-end gap-[3px]" aria-hidden="true">
      <div
        className="rounded-t-[8px] px-[7px] pb-[6px] pt-[5px]"
        style={{
          background: color,
          boxShadow:
            "inset 0 2px 0 rgba(255,255,255,0.15), inset 0 -2px 0 rgba(0,0,0,0.22)",
        }}
      >
        <div className="flex gap-[5px]">
          <BrickStud color={color} />
          <BrickStud color={color} />
        </div>
      </div>
      <div className="h-[4px] w-[44px] rounded-b-[8px]" style={{ background: "rgba(0,0,0,0.28)" }} />
    </div>
  );
}

/* ── Tarjeta de proyecto ──────────────────────────────────────── */
function ProjectCard({
  title,
  shortDescription,
  technologies,
  links,
  image,
  accentColor,
}: {
  title: string;
  shortDescription: string;
  technologies: string[];
  links: { label: string; href: string }[];
  image?: string;
  accentColor: string;
}) {
  const primaryLink = links[0];
  const extraLinks = links.slice(1);

  return (
    <a
      href={primaryLink?.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col overflow-hidden rounded-[26px] no-underline transition-all duration-300 hover:-translate-y-[4px]"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))",
        border: "1px solid var(--border)",
        boxShadow: "var(--card-shadow)",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ background: `linear-gradient(to right, ${accentColor}, transparent)` }}
        aria-hidden="true"
      />

      {/* Cabecera superior */}
      <div className="flex items-center justify-between gap-4 px-5 pb-0 pt-4 sm:px-6">
        <MiniBrick color={accentColor} />

        <div className="flex items-center gap-2">
          {primaryLink && (
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-[4px] font-mono text-[0.62rem] uppercase tracking-[0.08em]"
              style={{
                background: `${accentColor}18`,
                border: `1px solid ${accentColor}38`,
                color: accentColor,
              }}
            >
              {primaryLink.label.toLowerCase().includes("web") ? <IconExternal /> : <IconGithub />}
              Abrir
            </span>
          )}
        </div>
      </div>

      {/* Imagen */}
      {image && (
        <div className="px-5 pb-0 pt-4 sm:px-6">
          <div
            className="overflow-hidden rounded-[20px]"
            style={{
              border: "1px solid var(--border)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.14)",
              background: "var(--bg-elevated)",
            }}
          >
            <img
              src={image}
              alt={title}
              className="h-[210px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </div>
      )}

      {/* Contenido */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className="font-serif text-[1.35rem] leading-tight"
              style={{ color: "var(--text-primary)", fontWeight: 700 }}
            >
              {title}
            </h3>
          </div>
        </div>

        <p
          className="mt-4 text-[0.95rem] leading-7"
          style={{ color: "var(--text-muted)" }}
        >
          {shortDescription}
        </p>

        <div
          className="mt-5 pt-4"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <p
            className="mb-3 font-mono text-[0.64rem] uppercase tracking-[0.12em]"
            style={{ color: "var(--text-subtle)" }}
          >
            Piezas utilizadas
          </p>

          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-[5px] font-mono text-[0.68rem]"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                  boxShadow: "0 2px 0 rgba(0,0,0,0.08)",
                }}
              >
                <span
                  className="h-[6px] w-[6px] rounded-full"
                  style={{ background: accentColor }}
                  aria-hidden="true"
                />
                {tech}
              </span>
            ))}
          </div>
        </div>

        {extraLinks.length > 0 && (
          <div
            className="mt-5 pt-4"
            style={{ borderTop: "1px solid var(--border-subtle)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <p
              className="mb-3 font-mono text-[0.64rem] uppercase tracking-[0.12em]"
              style={{ color: "var(--text-subtle)" }}
            >
              Repositorios adicionales
            </p>

            <div className="flex flex-wrap gap-2">
              {extraLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-[6px] font-mono text-[0.68rem] no-underline transition-transform duration-150 hover:-translate-y-[1px]"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                    boxShadow: "0 2px 0 rgba(0,0,0,0.08)",
                  }}
                >
                  <IconGithub />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="h-[3px]" style={{ background: "rgba(0,0,0,0.14)" }} />
    </a>
  );
}

/* ── Componente principal ─────────────────────────────────────── */
export default function PortfolioSection() {
  return (
    <SectionLayout id="portfolio">
      <div className="relative">
        {/* Fondo full width con patrón */}
        <div
          className="pointer-events-none absolute -top-16 -bottom-16 left-1/2 -translate-x-1/2 w-screen z-0"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle, var(--stud-dot-1) 1.5px, transparent 1.5px),
                radial-gradient(circle, var(--stud-dot-2) 1px, transparent 1px)
              `,
              backgroundSize: "30px 30px, 15px 15px",
              backgroundPosition: "0 0, 7.5px 7.5px",
            }}
          />
        </div>

        <div className="relative z-10">
          <div className="mb-12">
            <div className="flex items-end gap-4">
              <h2
                className="font-serif font-bold leading-none"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text-primary)" }}
              >
                Construcciones destacadas
              </h2>

              <div
                className="mb-2 h-[2px] max-w-[110px] flex-1"
                style={{ background: "linear-gradient(to right, var(--accent), transparent)" }}
                aria-hidden="true"
              />
            </div>

            <p
              className="mt-4 max-w-[620px] text-[0.95rem] leading-7"
              style={{ color: "var(--text-muted)" }}
            >
              Tres proyectos que representan mi forma de construir software
            </p>
          </div>

          {projects.length === 0 ? (
            <p className="font-mono text-[0.85rem]" style={{ color: "var(--text-muted)" }}>
              (Sin proyectos todavía)
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
              {projects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  shortDescription={project.shortDescription}
                  technologies={project.technologies ?? []}
                  links={project.links ?? []}
                  image={project.image}
                  accentColor={BRICK_COLORS[i % BRICK_COLORS.length]}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionLayout>
  );
}