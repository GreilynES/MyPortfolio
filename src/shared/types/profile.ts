import type { SocialLink } from "./social";

export interface Profile {
  fullName: string;
  headline: string;
  location?: string;
  summary?: string;
  socials: SocialLink[];
  
  firstName?: string;
  roles?: string[];
  tagline?: string;
  stats?: ProfileStat[];
}

export interface ProfileStat {
  value: string;
  label: string;
}