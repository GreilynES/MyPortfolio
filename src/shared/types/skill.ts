export type SkillLevel = "basic" | "intermediate" | "advanced";

export interface SkillItem {
  id: string;
  name: string;        // "React", "SQL Server", etc.
  level?: SkillLevel;  // opcional
  category?: string;   // "Frontend", "Backend", "Tools"
}