function FooterStuds() {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <span className="h-[10px] w-[10px] rounded-full bg-[#e8a838] shadow-[0_0_10px_rgba(232,168,56,0.35)]" />
      <span className="h-[10px] w-[10px] rounded-full bg-[#e8a838] shadow-[0_0_10px_rgba(232,168,56,0.35)]" />
      <span className="h-[10px] w-[10px] rounded-full bg-[#e8a838] shadow-[0_0_10px_rgba(232,168,56,0.35)]" />
      <span className="h-[10px] w-[10px] rounded-full bg-[#e8a838] shadow-[0_0_10px_rgba(232,168,56,0.35)]" />
      <span className="h-[10px] w-[10px] rounded-full bg-[#e8a838] shadow-[0_0_10px_rgba(232,168,56,0.35)]" />
    </div>
  );
}


export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-10">
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, #27ae60 0%, #2980b9 45%, #c0392b 100%)",
        }}
        aria-hidden="true"
      />

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 py-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-4">
            
            <p
              className="text-[0.95rem] leading-none"
              style={{ color: "var(--text-muted)" }}
            >
              <span className="opacity-80">Portafolio de Greilyn Esquivel Salazar</span>

            </p>
          </div>

          <FooterStuds />

          <p
            className="font-mono text-[0.8rem] uppercase tracking-[0.08em]"
            style={{ color: "var(--text-subtle)" }}
          >
            {year} · Construido pieza por pieza
          </p>
        </div>
      </div>
    </footer>
  );
}