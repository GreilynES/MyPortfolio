import { profile } from "../../modules/cv/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 rounded-[24px] px-6 py-5 text-center sm:flex-row sm:text-left"
        style={{
          background: "var(--bg-glass)",
          border: "1px solid var(--border)",
          boxShadow: "var(--card-shadow)",
        }}
      >
        <div>
          <p className="font-serif text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
            {profile.fullName}
          </p>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em]" style={{ color: "var(--text-muted)" }}>
            Portfolio • {year}
          </p>
        </div>

        <p className="max-w-xl text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Hecho con React, Tailwind y una estética inspirada en LEGO 
        </p>
      </div>
    </footer>
  );
}