import SectionLayout from "../../../../shared/components/layout/SectionLayout";
import { projects } from "../../data/projects";

/* ── Colores LEGO por proyecto (uno por tarjeta) ─────────────── */
const BRICK_COLORS = ["#a93226", "#2980b9", "#d4ac0d", "#27ae60", "#8e44ad"];

/* ── Ícono GitHub ─────────────────────────────────────────────── */
function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

/* ── Ícono Link externo ───────────────────────────────────────── */
function IconExternal() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/* ── Stud LEGO del color del proyecto ────────────────────────── */
function ColorStud({ color }: { color: string }) {
  return (
    <span
      className="inline-block w-3 h-3 rounded-full flex-shrink-0"
      style={{
        background: color,
        boxShadow: `inset 0 -1px 3px rgba(0,0,0,0.35), 0 0 6px ${color}60`,
      }}
      aria-hidden="true"
    />
  );
}

/* ── Tarjeta de proyecto ──────────────────────────────────────── */
function ProjectCard({
  title,
  shortDescription,
  technologies,
  links,
  accentColor,
}: {
  title: string;
  shortDescription: string;
  technologies: string[];
  links: { label: string; href: string }[];
  accentColor: string;
}) {
  const githubLink = links.find((l) => l.label === "GitHub");
  const liveLink   = links.find((l) => l.label !== "GitHub");

  return (
    <div
      className="relative flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-[4px]"
      style={{
        background: "var(--bg-surface)",
        border: `1px solid var(--border)`,
        boxShadow: "0 4px 0 rgba(0,0,0,0.2)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          `0 8px 0 rgba(0,0,0,0.2), 0 16px 40px ${accentColor}20`;
        (e.currentTarget as HTMLDivElement).style.borderColor = `${accentColor}60`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 0 rgba(0,0,0,0.2)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
      }}
    >
      {/* Borde superior de color LEGO */}
      <div className="h-[3px] w-full flex-shrink-0" style={{ background: accentColor }} />

      {/* Studs en la parte superior */}
      <div className="flex gap-[5px] px-4 pt-3 pb-0" aria-hidden="true">
        {[...Array(3)].map((_, i) => (
          <span key={i} className="w-[10px] h-[10px] rounded-full"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              boxShadow: "inset 0 -1px 3px rgba(0,0,0,0.3)",
            }} />
        ))}
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-5 pt-3 gap-3">

        {/* Header: título + links */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <ColorStud color={accentColor} />
            <h3 className="font-serif font-bold text-[1.05rem] leading-tight truncate"
              style={{ color: "var(--text-primary)" }}>
              {title}
            </h3>
          </div>

          {/* Botones de link */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {githubLink && githubLink.href !== "PON_AQUI_EL_LINK" && (
              <a href={githubLink.href} target="_blank" rel="noopener noreferrer"
                aria-label={`Ver código de ${title} en GitHub`}
                className="flex items-center justify-center w-7 h-7 rounded transition-all duration-150 hover:-translate-y-[2px]"
                style={{
                  color: "var(--text-muted)",
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = accentColor; (e.currentTarget as HTMLElement).style.borderColor = accentColor; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
              >
                <IconGithub />
              </a>
            )}
            {liveLink && (
              <a href={liveLink.href} target="_blank" rel="noopener noreferrer"
                aria-label={`Ver demo de ${title}`}
                className="flex items-center justify-center w-7 h-7 rounded transition-all duration-150 hover:-translate-y-[2px]"
                style={{
                  color: "var(--text-muted)",
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = accentColor; (e.currentTarget as HTMLElement).style.borderColor = accentColor; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
              >
                <IconExternal />
              </a>
            )}
          </div>
        </div>

        {/* Descripción */}
        <p className="text-[0.875rem] leading-relaxed flex-1"
          style={{ color: "var(--text-muted)" }}>
          {shortDescription}
        </p>

        {/* Tecnologías como badges de ladrillos */}
        <div className="flex flex-wrap gap-2 mt-auto pt-2"
          style={{ borderTop: "1px solid var(--border)" }}>
          {technologies.map((tech) => (
            <span key={tech}
              className="font-mono text-[0.68rem] tracking-[0.04em] px-2 py-[3px] rounded"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
              }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Sombra inferior estilo ladrillo */}
      <div className="h-[3px]" style={{ background: "rgba(0,0,0,0.15)" }} />
    </div>
  );
}

/* ── Componente principal ─────────────────────────────────────── */
export default function PortfolioSection() {
  return (
    <SectionLayout id="portfolio">

      {/* Encabezado */}
      <div className="mb-12">
        <p className="font-mono text-[0.75rem] tracking-[0.1em] uppercase text-[#e8a838] mb-2"
          aria-hidden="true">
          // 05. showcase
        </p>
        <div className="flex items-end gap-4">
          <h2 className="font-serif font-bold leading-none"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text-primary)" }}>
            Mis construcciones
            <span className="text-[#e8a838]"> destacadas</span>
          </h2>
        </div>
        <p className="mt-3 font-mono text-[0.82rem] max-w-[460px] leading-relaxed"
          style={{ color: "var(--text-muted)" }}>
          Proyectos reales construidos con propósito. Cada uno, un ladrillo más en mi camino.
        </p>
      </div>

      {/* Grid de tarjetas */}
      {projects.length === 0 ? (
        <p className="font-mono text-[0.85rem]" style={{ color: "var(--text-muted)" }}>
          (Sin proyectos todavía)
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              title={p.title}
              shortDescription={p.shortDescription}
              technologies={p.technologies ?? []}
              links={p.links ?? []}
              accentColor={BRICK_COLORS[i % BRICK_COLORS.length]}
            />
          ))}
        </div>
      )}

    </SectionLayout>
  );
}