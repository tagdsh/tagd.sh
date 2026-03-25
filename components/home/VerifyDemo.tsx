"use client";

import { useMemo, useState } from "react";

type DemoStatus = "authentic" | "tampered" | "expired" | "recalled" | "unknown";

const mapStatus: Record<string, DemoStatus> = {
  A: "authentic",
  T: "tampered",
  E: "expired",
  R: "recalled",
};

export function VerifyDemo() {
  const [tagId, setTagId] = useState("st_demo_A");

  const status = useMemo<DemoStatus>(() => {
    const suffix = tagId.trim().toUpperCase().split("_").pop() ?? "";
    return mapStatus[suffix] ?? "unknown";
  }, [tagId]);

  return (
    <section className="section">
      <div className="content-grid">
        <h2>Verify demo</h2>
        <p className="section-subtitle">Interactive local demo: change the suffix to A, T, E, or R.</p>
        <div className="panel">
          <label htmlFor="verify-tag-input">Tag ID</label>
          <input
            id="verify-tag-input"
            value={tagId}
            onChange={(event) => setTagId(event.target.value)}
            placeholder="st_demo_A"
          />
          <p>
            Result status: <strong>{status}</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
