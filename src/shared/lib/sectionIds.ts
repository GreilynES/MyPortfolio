export const SECTION_IDS = {
  hero: "hero",
  education: "education",
  experience: "experience",
  skills: "skills",
  languages: "languages",
  portfolio: "portfolio",
  contact: "contact",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];