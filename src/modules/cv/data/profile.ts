// src/modules/cv/data/profile.ts

import type { Profile } from "../../../shared/types/profile";

export const profile: Profile = {
  // ── Datos originales (sin cambios) ───────────────
  fullName: "Greilyn María Esquivel Salazar",
  headline: "Estudiante de Ingeniería en Sistemas | Desarrolladora Full Stack",
  location: "Costa Rica",
  summary:
    "Me enfoco en construir aplicaciones web con buenas prácticas, UI clara y una base sólida en backend. Me gusta trabajar en proyectos reales y aprender constantemente.",
  socials: [
    {
      id: "github",
      platform: "github",
      label: "GitHub",
      href: "https://github.com/GreilynES",   // ← quitado el espacio al final
    },
    {
      id: "email",
      platform: "email",
      label: "Email",
      href: "mailto:greilynesquivel@gmail.com", // ← agregado mailto:
    },
    {
      id: "linkedin",
      platform: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/greilyn-esquivel-salazar-825a4939a/",
    },
  ],

  // ── Campos nuevos para el Hero ───────────────────
  firstName: "Greilyn",
  roles: [
    "Full-Stack Developer",
    "Systems Engineer Student",
    "UI Enthusiast",
  ],
  tagline: "Construyendo el futuro, un bloque a la vez.",
  stats: [
    { value: "3+",  label: "Años aprendiendo" },
    { value: "4+", label: "Proyectos"         },
    { value: "10+", label: "Tecnologías"       },
  ],
};