import { SECTION_IDS } from "../../shared/lib/sectionIds";

const navItems = [
  { label: "Inicio", href: `#${SECTION_IDS.hero}` },
  { label: "Educación", href: `#${SECTION_IDS.education}` },
  { label: "Experiencia", href: `#${SECTION_IDS.experience}` },
  { label: "Habilidades", href: `#${SECTION_IDS.skills}` },
  { label: "Idiomas", href: `#${SECTION_IDS.languages}` },
  { label: "Portafolio", href: `#${SECTION_IDS.portfolio}` },
  { label: "Contacto", href: `#${SECTION_IDS.contact}` },
] as const;

export default function Navbar() {
  return (
    <header className="w-full border-b">
      <nav
        className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4"
        aria-label="Navegación principal"
      >
        <span className="font-semibold">Mi Portafolio</span>

        <ul className="flex gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}