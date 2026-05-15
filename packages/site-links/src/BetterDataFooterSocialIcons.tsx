import { Github, Globe, Linkedin, Twitter } from 'lucide-react';
import { BETTER_DATA_FOOTER_SOCIAL_LINKS } from './constants';

const ICONS = {
  x: Twitter,
  linkedin: Linkedin,
  github: Github,
  website: Globe,
} as const;

export type BetterDataFooterSocialIconsProps = {
  /** Applied to the wrapping `<nav>`. */
  navClassName?: string;
  /** Applied to each icon link `<a>`. */
  linkClassName: string;
  iconClassName?: string;
};

export function BetterDataFooterSocialIcons({
  navClassName = 'flex flex-wrap items-center gap-1 sm:gap-2 md:justify-end',
  linkClassName,
  iconClassName = 'h-5 w-5',
}: BetterDataFooterSocialIconsProps) {
  return (
    <nav aria-label="Better Data on the web" className={navClassName}>
      {BETTER_DATA_FOOTER_SOCIAL_LINKS.map((link) => {
        const Icon = ICONS[link.id];
        return (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            title={link.label}
            className={linkClassName}
          >
            <Icon className={iconClassName} aria-hidden />
          </a>
        );
      })}
    </nav>
  );
}
