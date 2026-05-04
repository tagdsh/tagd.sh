"use client";

import type { ReactNode } from "react";
import { Suspense, useEffect, useState } from "react";
import posthog from "posthog-js";
import { PostHogProvider as RawProvider } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  buildCommonAnalyticsProperties,
  posthogApiHost,
} from "@/lib/analytics/posthog";

function PostHogPageviews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
    posthog.capture(
      "$pageview",
      buildCommonAnalyticsProperties({}, { pathname, searchParams }),
    );
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!key) return;
    const stub = posthog as unknown as { __loaded?: boolean };
    if (!stub.__loaded) {
      posthog.init(key, {
        api_host: posthogApiHost(),
        capture_pageview: false,
      });
    }
    setMounted(true);
  }, [key]);

  if (!key || !mounted) {
    return children;
  }

  return (
    <RawProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageviews />
      </Suspense>
      {children}
    </RawProvider>
  );
}
