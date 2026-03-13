import { createClient } from "@sanity/client";

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "tagd-blog";

export const isSanityConfigured = Boolean(sanityProjectId && sanityDataset);

export function getSanityClient() {
  if (!isSanityConfigured) {
    return null;
  }

  return createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: "2024-01-01",
    useCdn: true,
  });
}
