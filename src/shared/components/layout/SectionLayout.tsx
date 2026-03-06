interface SectionLayoutProps {
  id?: string;
  children: React.ReactNode;
  fullWidth?: boolean; // ← solo el Hero lo usa, el resto sigue igual
}

export default function SectionLayout({ id, children, fullWidth }: SectionLayoutProps) {
  if (fullWidth) {
    return (
      <section id={id} className="w-full">
        {children}
      </section>
    );
  }

  return (
    <section id={id} className="min-h-screen flex items-center px-6 py-16 border border-gray">
      <div className="max-w-6xl mx-auto w-full">
        {children}
      </div>
    </section>
  );
}