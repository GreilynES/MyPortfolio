export type SocialPlatform =
  | "github"
  | "linkedin"
  | "email"
  | "portfolio"
  | "other";

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  label: string; // texto visible
  href: string;  // url o mailto:
}