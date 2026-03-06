export type LanguageLevel =
  | "basic"
  | "intermediate"
  | "advanced"
  | "native";

export interface LanguageItem {
  id: string;
  name: string; // "Español", "Inglés"
  level: LanguageLevel;
  notes?: string; // ej: "Intermedio (sin certificación)"
}