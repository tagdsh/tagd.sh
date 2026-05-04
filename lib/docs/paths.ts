import path from "node:path";

export const docsContentRoot = path.join(process.cwd(), "content", "docs");

const PROTECTED_SEGMENTS = new Set(["internal", "_draft", "_incoming"]);

export function isPublicDocPath(slugPath: string): boolean {
  if (!slugPath || slugPath.includes("..")) return false;
  for (const p of slugPath.split("/").filter(Boolean)) {
    if (PROTECTED_SEGMENTS.has(p)) return false;
  }
  return true;
}

export function assertPublicDocPath(slugPath: string, context: string): void {
  if (!isPublicDocPath(slugPath)) {
    throw new Error(`[docs] Refusing ${context}: protected or invalid path "${slugPath}"`);
  }
}
