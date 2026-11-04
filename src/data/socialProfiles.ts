export type SocialProfile = {
  name: 'LinkedIn' | 'Instagram' | 'GitHub';
  url: string;
};

const configuredProfiles: Array<SocialProfile | null> = [
  process.env.NEXT_PUBLIC_LINKEDIN_URL ? { name: 'LinkedIn', url: process.env.NEXT_PUBLIC_LINKEDIN_URL } : null,
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ? { name: 'Instagram', url: process.env.NEXT_PUBLIC_INSTAGRAM_URL } : null,
  process.env.NEXT_PUBLIC_GITHUB_URL ? { name: 'GitHub', url: process.env.NEXT_PUBLIC_GITHUB_URL } : null,
];

/** Ignore blank, malformed, or generic network homepages; only publish real profiles. */
export const SOCIAL_PROFILES: SocialProfile[] = configuredProfiles.filter(
  (profile): profile is SocialProfile => {
    if (!profile) return false;
    try {
      const url = new URL(profile.url);
      return url.protocol === 'https:' && url.pathname.replace(/\/+$/, '').length > 0;
    } catch {
      return false;
    }
  },
);
