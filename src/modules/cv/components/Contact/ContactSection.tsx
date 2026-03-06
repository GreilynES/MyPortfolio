import { useState } from "react";
import SectionLayout from "../../../../shared/components/layout/SectionLayout";
import { profile } from "../../data/profile";

/* ── Íconos ───────────────────────────────────────────────────── */
function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  );
}

function IconSend() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22,2 15,22 11,13 2,9" />
    </svg>
  );
}

function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function IconLinkedin() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ── Stud decorativo ──────────────────────────────────────────── */
function Stud() {
  return (
    <span
      className="w-[10px] h-[10px] rounded-full flex-shrink-0"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border)",
        boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.3)",
      }}
      aria-hidden="true"
    />
  );
}

/* ── Componente principal ─────────────────────────────────────── */
export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulación de envío
    setTimeout(() => {
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  const emailSocial = profile.socials.find((s) => s.platform === "email");
  const githubSocial = profile.socials.find((s) => s.platform === "github");
  const linkedinSocial = profile.socials.find((s) => s.platform === "linkedin");

  return (
    <SectionLayout id="contact">
      {/* Encabezado */}
      <div className="mb-12">
        <p className="font-mono text-[0.75rem] tracking-[0.1em] uppercase text-[#e8a838] mb-2" aria-hidden="true">
          // 06. connect
        </p>
        <div className="flex items-end gap-4">
          <h2
            className="font-serif font-bold leading-none"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text-primary)" }}
          >
            Contacto
          </h2>
          <div
            className="flex-1 h-[2px] mb-2 max-w-[100px]"
            style={{ background: "linear-gradient(to right, #e8a838, transparent)" }}
            aria-hidden="true"
          />
        </div>
        <p className="mt-3 font-mono text-[0.82rem] max-w-[440px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Construyamos algo juntos. Estoy disponible para proyectos freelance, colaboraciones o simplemente para charlar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario */}
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 4px 0 rgba(0,0,0,0.15)",
          }}
        >
          {/* Barra superior */}
          <div className="h-[3px] w-full" style={{ background: "#e8a838" }} />

          {/* Header con studs */}
          <div className="px-6 pt-5 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-3">
              <div className="flex gap-[4px]" aria-hidden="true">
                <Stud />
                <Stud />
                <Stud />
              </div>
              <h3 className="font-serif font-bold text-[1.1rem]" style={{ color: "var(--text-primary)" }}>
                Enviar mensaje
              </h3>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
            {/* Nombre */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-mono text-[0.7rem] tracking-[0.08em] uppercase" style={{ color: "var(--text-muted)" }}>
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded font-mono text-[0.875rem] outline-none transition-all duration-200 focus:ring-2 focus:ring-[#e8a838]"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
                placeholder="Tu nombre"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-mono text-[0.7rem] tracking-[0.08em] uppercase" style={{ color: "var(--text-muted)" }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded font-mono text-[0.875rem] outline-none transition-all duration-200 focus:ring-2 focus:ring-[#e8a838]"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
                placeholder="tu@email.com"
              />
            </div>

            {/* Mensaje */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-mono text-[0.7rem] tracking-[0.08em] uppercase" style={{ color: "var(--text-muted)" }}>
                Mensaje
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 rounded font-mono text-[0.875rem] outline-none transition-all duration-200 resize-none focus:ring-2 focus:ring-[#e8a838]"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
                placeholder="Tu mensaje..."
              />
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-[0.85rem] font-bold tracking-[0.04em] uppercase rounded text-[#1a1200] bg-[#e8a838] transition-all duration-150 hover:-translate-y-[2px] active:translate-y-[2px] disabled:opacity-60"
              style={{ boxShadow: "0 4px 0 #8a5e00" }}
            >
              {status === "sending" ? (
                "Enviando..."
              ) : status === "sent" ? (
                "Enviado"
              ) : (
                <>
                  Enviar mensaje
                  <IconSend />
                </>
              )}
            </button>

            {status === "sent" && (
              <p className="font-mono text-[0.8rem] text-[#27ae60]">Mensaje enviado correctamente.</p>
            )}
          </form>

          {/* Sombra inferior */}
          <div className="h-[3px]" style={{ background: "rgba(0,0,0,0.12)" }} />
        </div>

        {/* Información de contacto */}
        <div className="flex flex-col gap-6">
          {/* Tarjeta de info */}
          <div
            className="relative rounded-xl overflow-hidden"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              boxShadow: "0 4px 0 rgba(0,0,0,0.15)",
            }}
          >
            <div className="h-[3px] w-full" style={{ background: "#2980b9" }} />
            <div className="p-6">
              <h3 className="font-serif font-bold text-[1.1rem] mb-4" style={{ color: "var(--text-primary)" }}>
                O encuéntrame en
              </h3>

              <div className="flex flex-col gap-4">
                {emailSocial && (
                  <a
                    href={emailSocial.href}
                    className="flex items-center gap-4 p-3 rounded transition-all duration-200 hover:-translate-y-[1px] group"
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
                  >
                    <div
                      className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0 text-white group-hover:scale-105 transition-transform"
                      style={{ background: "#a93226", boxShadow: "0 3px 0 rgba(0,0,0,0.3)" }}
                    >
                      <IconMail />
                    </div>
                    <div>
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.06em]" style={{ color: "var(--text-muted)" }}>
                        Email
                      </p>
                      <p className="font-serif text-[0.95rem]" style={{ color: "var(--text-primary)" }}>
                        {emailSocial.href.replace("mailto:", "")}
                      </p>
                    </div>
                  </a>
                )}

                {githubSocial && (
                  <a
                    href={githubSocial.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded transition-all duration-200 hover:-translate-y-[1px] group"
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
                  >
                    <div
                      className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0 text-white group-hover:scale-105 transition-transform"
                      style={{ background: "#1a1200", boxShadow: "0 3px 0 rgba(0,0,0,0.3)" }}
                    >
                      <IconGithub />
                    </div>
                    <div>
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.06em]" style={{ color: "var(--text-muted)" }}>
                        GitHub
                      </p>
                      <p className="font-serif text-[0.95rem]" style={{ color: "var(--text-primary)" }}>
                        {githubSocial.href.replace("https://github.com/", "@")}
                      </p>
                    </div>
                  </a>
                )}

                {linkedinSocial && (
                  <a
                    href={linkedinSocial.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded transition-all duration-200 hover:-translate-y-[1px] group"
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
                  >
                    <div
                      className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0 text-white group-hover:scale-105 transition-transform"
                      style={{ background: "#2980b9", boxShadow: "0 3px 0 rgba(0,0,0,0.3)" }}
                    >
                      <IconLinkedin />
                    </div>
                    <div>
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.06em]" style={{ color: "var(--text-muted)" }}>
                        LinkedIn
                      </p>
                      <p className="font-serif text-[0.95rem]" style={{ color: "var(--text-primary)" }}>
                        {profile.fullName}
                      </p>
                    </div>
                  </a>
                )}
              </div>
            </div>
            <div className="h-[3px]" style={{ background: "rgba(0,0,0,0.12)" }} />
          </div>

          {/* CTA final */}
          <div
            className="relative rounded-xl overflow-hidden p-6 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(232,168,56,0.1), rgba(232,168,56,0.05))",
              border: "1px solid rgba(232,168,56,0.3)",
            }}
          >
            <p className="font-serif text-[1.1rem] mb-2" style={{ color: "var(--text-primary)" }}>
              Construyamos algo increíble
            </p>
            <p className="font-mono text-[0.8rem]" style={{ color: "var(--text-muted)" }}>
              Cada gran proyecto comienza con una conversación.
            </p>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
