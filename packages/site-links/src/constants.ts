/**
 * Canonical Better Data URLs — docs footer, marketing footer, and OSS product sites.
 * Vendored in this repo for standalone Vercel deploys (keep in sync with betterdata.co/packages/site-links).
 */
export const BETTER_DATA_ECOSYSTEM = {
  marketingSite: 'https://betterdata.co',
  /** @deprecated Prefer `marketingSite`. `www` redirects to apex at the marketing app. */
  marketingWww: 'https://betterdata.co',
  support: 'https://betterdata.co/support',
  privacy: 'https://betterdata.co/privacy',
  terms: 'https://betterdata.co/terms',
  cookies: 'https://betterdata.co/cookies',
  githubOrg: 'https://github.com/betterdataco',
  linkedInCompany: 'https://www.linkedin.com/company/better-data-inc/',
  xTwitter: 'https://x.com/betterdatainc',
  docsSiteOrigin: 'https://docs.betterdata.co',
  docsHelpCenter: 'https://docs.betterdata.co/help',
  /** Primary documentation browse entry (matches docs app “Documentation”). */
  docsBrowse: 'https://docs.betterdata.co/docs',
  trustCenter: 'https://betterdata.co/trust',
  trustSecurity: 'https://betterdata.co/trust/security',
  trustOpenSourceDisclosures: 'https://betterdata.co/trust/open-source',
} as const;

export type BetterDataSocialLinkId = 'x' | 'linkedin' | 'github' | 'website';

export type BetterDataSocialLink = {
  readonly id: BetterDataSocialLinkId;
  readonly label: string;
  readonly href: string;
};

/** Same order and labels as docs.betterdata.co footer icon row. */
export const BETTER_DATA_FOOTER_SOCIAL_LINKS: readonly BetterDataSocialLink[] = [
  { id: 'x', label: 'Better Data on X (Twitter)', href: BETTER_DATA_ECOSYSTEM.xTwitter },
  { id: 'linkedin', label: 'Better Data on LinkedIn', href: BETTER_DATA_ECOSYSTEM.linkedInCompany },
  { id: 'github', label: 'Better Data on GitHub', href: BETTER_DATA_ECOSYSTEM.githubOrg },
  { id: 'website', label: 'Better Data website', href: BETTER_DATA_ECOSYSTEM.marketingSite },
];

/** Primary support CTA (docs footer). */
export const BETTER_DATA_SUPPORT_FOOTER = {
  label: 'Need help? Contact Better Data Support →',
  href: BETTER_DATA_ECOSYSTEM.support,
} as const;

/** Secondary text row under docs.betterdata.co footer (absolute URLs for OSS / marketing reuse). */
export const BETTER_DATA_DOCS_FOOTER_SECONDARY_LINKS = [
  { label: 'Help Center', href: BETTER_DATA_ECOSYSTEM.docsHelpCenter },
  { label: 'Documentation', href: BETTER_DATA_ECOSYSTEM.docsBrowse },
  { label: 'Privacy', href: BETTER_DATA_ECOSYSTEM.privacy },
  { label: 'GitHub', href: BETTER_DATA_ECOSYSTEM.githubOrg },
] as const;

/** Trust + legal strip used across OSS product footers (matches loopengine.io / commercegateway.io pattern). */
export const BETTER_DATA_LEGAL_FOOTER_LINKS = [
  { label: 'Security', href: BETTER_DATA_ECOSYSTEM.trustSecurity },
  { label: 'Privacy Policy', href: BETTER_DATA_ECOSYSTEM.privacy },
  { label: 'Terms of Service', href: BETTER_DATA_ECOSYSTEM.terms },
  { label: 'Cookie Notice', href: BETTER_DATA_ECOSYSTEM.cookies },
  { label: 'Open Source disclosures', href: BETTER_DATA_ECOSYSTEM.trustOpenSourceDisclosures },
] as const;
