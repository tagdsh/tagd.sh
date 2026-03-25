import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "tagd.sh — Signal Tags";
  const description =
    searchParams.get("description") ??
    "Open schema and verification protocol for physical product authentication.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0F172A",
          color: "#E2E8F0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          fontFamily: "DM Sans, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", color: "#D97706" }}>
          <div
            style={{
              width: 40,
              height: 40,
              border: "3px solid #D97706",
              borderRadius: 8,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -6,
                left: -6,
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#0F172A",
                border: "2px solid #D97706",
              }}
            />
          </div>
          <div style={{ fontSize: 30, fontWeight: 700 }}>tagd.sh</div>
        </div>
        <div>
          <div style={{ fontSize: 64, lineHeight: 1.1, marginBottom: 18 }}>{title}</div>
          <div style={{ fontSize: 30, lineHeight: 1.3, color: "#94A3B8", maxWidth: 960 }}>
            {description}
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#F59E0B" }}>Signal Tags · Created by Better Data</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
