import { useState } from "react";
import SectionLayout from "../../../../shared/components/layout/SectionLayout";
import { profile } from "../../data/profile";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

/* ── Schema Zod ──────────────────────────────────────────────── */
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio.")
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(80, "El nombre no puede superar 80 caracteres."),
  email: z
    .string()
    .trim()
    .min(1, "El email es obligatorio.")
    .email("Ingresa un correo válido."),
  message: z
    .string()
    .trim()
    .min(1, "El mensaje es obligatorio.")
    .min(10, "El mensaje debe tener al menos 10 caracteres.")
    .max(800, "El mensaje no puede superar 800 caracteres."),
});

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

/* ── Bloque mini LEGO ─────────────────────────────────────────── */
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
          <span
            className="h-[11px] w-[11px] rounded-full"
            style={{
              background: color,
              boxShadow:
                "inset 0 -2px 2px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          />
          <span
            className="h-[11px] w-[11px] rounded-full"
            style={{
              background: color,
              boxShadow:
                "inset 0 -2px 2px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          />
        </div>
      </div>
      <div className="h-[4px] w-[42px] rounded-b-[8px]" style={{ background: "rgba(0,0,0,0.28)" }} />
    </div>
  );
}

/* ── Card de contacto individual ──────────────────────────────── */
function ContactItem({
  href,
  label,
  value,
  accent,
  icon,
  external = false,
}: {
  href: string;
  label: string;
  value: string;
  accent: string;
  icon: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group relative overflow-hidden rounded-2xl p-4 transition-all duration-200 hover:-translate-y-[2px] no-underline"
      style={{
        background: "linear-gradient(180deg, var(--bg-elevated), rgba(255,255,255,0.02))",
        border: "1px solid var(--border)",
        boxShadow: "0 4px 0 rgba(0,0,0,0.12)",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
        aria-hidden="true"
      />

      <div className="flex items-center gap-4">
        <div
          className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-white transition-transform duration-200 group-hover:scale-[1.04]"
          style={{
            background: accent,
            boxShadow: "0 4px 0 rgba(0,0,0,0.22)",
          }}
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p
            className="font-mono text-[0.68rem] uppercase tracking-[0.08em]"
            style={{ color: "var(--text-muted)" }}
          >
            {label}
          </p>
          <p
            className="mt-1 font-serif text-[1rem] leading-snug break-words"
            style={{ color: "var(--text-primary)", fontWeight: 600 }}
          >
            {value}
          </p>
        </div>
      </div>
    </a>
  );
}

/* ── Utilidad ─────────────────────────────────────────────────── */
function getFieldError(meta: {
  isTouched?: boolean;
  errors?: unknown[];
}) {
  if (!meta.isTouched || !meta.errors?.length) return null;
  const first = meta.errors[0];
  return typeof first === "string" ? first : "Campo inválido.";
}

/* ── Componente principal ─────────────────────────────────────── */
export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const emailSocial = profile.socials.find((s) => s.platform === "email");
  const githubSocial = profile.socials.find((s) => s.platform === "github");
  const linkedinSocial = profile.socials.find((s) => s.platform === "linkedin");

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    validators: {
      onSubmit: ({ value }) => {
        const result = contactSchema.safeParse(value);
        if (result.success) return undefined;

        const fieldErrors = result.error.flatten().fieldErrors;
        return {
          fields: {
            name: fieldErrors.name?.[0],
            email: fieldErrors.email?.[0],
            message: fieldErrors.message?.[0],
          },
        };
      },
    },
    onSubmit: async ({ value }) => {
      try {
        setStatus("sending");

        const subject = encodeURIComponent(
          `Mensaje desde el portafolio de ${value.name}`
        );

        const body = encodeURIComponent(
    `Nombre: ${value.name}
    Email: ${value.email}

    Mensaje:
    ${value.message}`
        );

        const mailtoLink = `mailto:greilynesquivel@gmail.com?subject=${subject}&body=${body}`;

        window.location.href = mailtoLink;

        form.reset();
        setStatus("sent");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    },
  });

  return (
    <SectionLayout id="contact">
      <div className="mb-12">
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
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        {/* Formulario */}
        <div
          className="relative overflow-hidden rounded-[24px]"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 4px 0 rgba(0,0,0,0.15)",
          }}
        >
          <div className="h-[3px] w-full" style={{ background: "#e8a838" }} />

          <div
            className="flex items-center justify-between gap-4 px-6 pb-4 pt-5"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <div className="flex items-center gap-3">
              <h3 className="font-serif font-bold text-[1.12rem]" style={{ color: "var(--text-primary)" }}>
                Enviar mensaje
              </h3>
            </div>

            <MiniBrick color="#444444" />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="p-6 flex flex-col gap-5"
            noValidate
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) => {
                    const result = contactSchema.shape.name.safeParse(value);
                    return result.success ? undefined : result.error.issues[0]?.message;
                  },
                  onBlur: ({ value }) => {
                    const result = contactSchema.shape.name.safeParse(value);
                    return result.success ? undefined : result.error.issues[0]?.message;
                  },
                }}
              >
                {(field) => {
                  const error = getFieldError(field.state.meta);

                  return (
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor={field.name}
                        className="font-mono text-[0.7rem] tracking-[0.08em] uppercase"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Nombre
                      </label>

                      <input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        className="w-full rounded px-4 py-3 font-mono text-[0.875rem] outline-none transition-all duration-200"
                        style={{
                          background: "var(--bg-elevated)",
                          border: `1px solid ${error ? "#c94b37" : "var(--border)"}`,
                          color: "var(--text-primary)",
                          boxShadow: error ? "0 0 0 2px rgba(201,75,55,0.12)" : "none",
                        }}
                        placeholder="Tu nombre"
                        aria-invalid={!!error}
                        aria-describedby={error ? `${field.name}-error` : undefined}
                      />

                      {error && (
                        <p
                          id={`${field.name}-error`}
                          className="text-[0.78rem]"
                          style={{ color: "#c94b37" }}
                        >
                          {error}
                        </p>
                      )}
                    </div>
                  );
                }}
              </form.Field>

              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    const result = contactSchema.shape.email.safeParse(value);
                    return result.success ? undefined : result.error.issues[0]?.message;
                  },
                  onBlur: ({ value }) => {
                    const result = contactSchema.shape.email.safeParse(value);
                    return result.success ? undefined : result.error.issues[0]?.message;
                  },
                }}
              >
                {(field) => {
                  const error = getFieldError(field.state.meta);

                  return (
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor={field.name}
                        className="font-mono text-[0.7rem] tracking-[0.08em] uppercase"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Email
                      </label>

                      <input
                        type="email"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        className="w-full rounded px-4 py-3 font-mono text-[0.875rem] outline-none transition-all duration-200"
                        style={{
                          background: "var(--bg-elevated)",
                          border: `1px solid ${error ? "#c94b37" : "var(--border)"}`,
                          color: "var(--text-primary)",
                          boxShadow: error ? "0 0 0 2px rgba(201,75,55,0.12)" : "none",
                        }}
                        placeholder="tu@email.com"
                        aria-invalid={!!error}
                        aria-describedby={error ? `${field.name}-error` : undefined}
                      />

                      {error && (
                        <p
                          id={`${field.name}-error`}
                          className="text-[0.78rem]"
                          style={{ color: "#c94b37" }}
                        >
                          {error}
                        </p>
                      )}
                    </div>
                  );
                }}
              </form.Field>
            </div>

            <form.Field
              name="message"
              validators={{
                onChange: ({ value }) => {
                  const result = contactSchema.shape.message.safeParse(value);
                  return result.success ? undefined : result.error.issues[0]?.message;
                },
                onBlur: ({ value }) => {
                  const result = contactSchema.shape.message.safeParse(value);
                  return result.success ? undefined : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => {
                const error = getFieldError(field.state.meta);

                return (
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor={field.name}
                      className="font-mono text-[0.7rem] tracking-[0.08em] uppercase"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Mensaje
                    </label>

                    <textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      rows={5}
                      className="w-full resize-none rounded px-4 py-3 font-mono text-[0.875rem] outline-none transition-all duration-200"
                      style={{
                        background: "var(--bg-elevated)",
                        border: `1px solid ${error ? "#c94b37" : "var(--border)"}`,
                        color: "var(--text-primary)",
                        boxShadow: error ? "0 0 0 2px rgba(201,75,55,0.12)" : "none",
                      }}
                      placeholder="Cuéntame un poco sobre tu idea o mensaje..."
                      aria-invalid={!!error}
                      aria-describedby={error ? `${field.name}-error` : undefined}
                    />

                    {error && (
                      <p
                        id={`${field.name}-error`}
                        className="text-[0.78rem]"
                        style={{ color: "#c94b37" }}
                      >
                        {error}
                      </p>
                    )}
                  </div>
                );
              }}
            </form.Field>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting] as const}
              >
                {([canSubmit, isSubmitting]) => (
                  <button
                    type="submit"
                    disabled={!canSubmit || isSubmitting || status === "sending"}
                    className="inline-flex items-center justify-center gap-2 rounded px-6 py-3 font-mono text-[0.85rem] font-bold uppercase tracking-[0.04em] text-[#1a1200] transition-all duration-150 hover:-translate-y-[2px] active:translate-y-[2px] disabled:opacity-60"
                    style={{ background: "#e8a838", boxShadow: "0 4px 0 #8a5e00" }}
                  >
                    {status === "sending" || isSubmitting ? (
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
                )}
              </form.Subscribe>

              {status === "sent" && (
                <p className="font-mono text-[0.8rem]" style={{ color: "#27ae60" }}>
                  Mensaje enviado correctamente.
                </p>
              )}

              {status === "error" && (
                <p className="font-mono text-[0.8rem]" style={{ color: "#c94b37" }}>
                  No se pudo enviar el mensaje.
                </p>
              )}
            </div>
          </form>

          <div className="h-[3px]" style={{ background: "rgba(0,0,0,0.12)" }} />
        </div>

        {/* Información de contacto */}
        <div className="flex flex-col gap-6">
          <div
            className="relative overflow-hidden rounded-[24px]"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              boxShadow: "0 4px 0 rgba(0,0,0,0.15)",
            }}
          >
            <div className="h-[3px] w-full" style={{ background: "#e8a838" }} />

            <div
              className="flex items-center justify-between gap-4 px-6 pb-4 pt-5"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div>
                <h3 className="font-serif font-bold text-[1.15rem]" style={{ color: "var(--text-primary)" }}>
                  También puedes encontrarme en
                </h3>
                <p
                  className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.08em]"
                  style={{ color: "var(--text-subtle)" }}
                >
                  Canales directos
                </p>
              </div>

              <MiniBrick color="#444444" />
            </div>

            <div className="p-6 flex flex-col gap-4">
              {emailSocial && (
                <ContactItem
                  href={emailSocial.href}
                  label="Email"
                  value={emailSocial.href.replace("mailto:", "")}
                  accent="#c94b3788"
                  icon={<IconMail />}
                />
              )}

              {githubSocial && (
                <ContactItem
                  href={githubSocial.href}
                  label="GitHub"
                  value={githubSocial.href.replace("https://github.com/", "@")}
                  accent="#2a2116"
                  icon={<IconGithub />}
                  external
                />
              )}

              {linkedinSocial && (
                <ContactItem
                  href={linkedinSocial.href}
                  label="LinkedIn"
                  value={profile.fullName}
                  accent="#297fb985"
                  icon={<IconLinkedin />}
                  external
                />
              )}
            </div>

            <div className="h-[3px]" style={{ background: "rgba(0,0,0,0.12)" }} />
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}