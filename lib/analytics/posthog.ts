const DEFAULT_POSTHOG_HOST = "https://us.i.posthog.com";

function utmFromSearchParams(sp: URLSearchParams | null | undefined) {
  if (!sp) {
    return {
      utm_source: undefined as string | undefined,
      utm_medium: undefined as string | undefined,
      utm_campaign: undefined as string | undefined,
      utm_term: undefined as string | undefined,
      utm_content: undefined as string | undefined,
    };
  }
  return {
    utm_source: sp.get("utm_source") ?? undefined,
    utm_medium: sp.get("utm_medium") ?? undefined,
    utm_campaign: sp.get("utm_campaign") ?? undefined,
    utm_term: sp.get("utm_term") ?? undefined,
    utm_content: sp.get("utm_content") ?? undefined,
  };
}

export function inferPageType(pathname: string): string {
  const p = pathname || "/";
  if (p === "/") return "home";
  if (p.startsWith("/docs")) return "docs";
  if (
    p.startsWith("/use-cases") ||
    p.startsWith("/partners") ||
    p.startsWith("/catalog") ||
    p.startsWith("/registry")
  ) {
    return "marketing";
  }
  return "other";
}

/** Shared funnel dimensions across Better Data OSS marketing sites */
export function buildCommonAnalyticsProperties(
  overrides: Record<string, unknown> = {},
  route?: { pathname: string; searchParams: URLSearchParams | null },
): Record<string, unknown> {
  const siteDomain =
    process.env.NEXT_PUBLIC_SITE_DOMAIN ??
    (typeof window !== "undefined" ? window.location.hostname : undefined);
  const product = process.env.NEXT_PUBLIC_PRODUCT;

  let path: string | undefined;
  let pathnameForType = route?.pathname;
  let utms = utmFromSearchParams(undefined);

  if (route) {
    const qs = route.searchParams?.toString();
    path = `${route.pathname}${qs ? `?${qs}` : ""}`;
    pathnameForType = route.pathname;
    utms = utmFromSearchParams(route.searchParams);
  } else if (typeof window !== "undefined") {
    path = `${window.location.pathname}${window.location.search}`;
    pathnameForType = window.location.pathname;
    utms = utmFromSearchParams(new URLSearchParams(window.location.search));
  }

  const pageType =
    (overrides.page_type as string | undefined) ?? inferPageType(pathnameForType ?? "/");

  return {
    site_id: siteDomain,
    product,
    domain: siteDomain,
    path,
    page_type: pageType,
    referrer:
      typeof document !== "undefined" ? document.referrer || undefined : undefined,
    ...utms,
    ...overrides,
  };
}

export function posthogApiHost(): string {
  return process.env.NEXT_PUBLIC_POSTHOG_HOST ?? DEFAULT_POSTHOG_HOST;
}
