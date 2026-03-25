export function HowItWorks() {
  return (
    <section className="section">
      <div className="content-grid">
        <h2>Scan. Verify. Trust.</h2>
        <div className="cards-grid three">
          <article className="card">
            <h3>1 — Issue</h3>
            <p>Generate a Signal Tag ID and encode it as QR, NFC, or barcode.</p>
            <p>Anchor records to your endpoint or Better Data&apos;s managed API.</p>
          </article>
          <article className="card">
            <h3>2 — Attach</h3>
            <p>Apply the tag to a physical product.</p>
            <p>Record identity, lot/batch, expiry, and custody events in the verification record.</p>
          </article>
          <article className="card">
            <h3>3 — Verify</h3>
            <p>Any scanner resolves the tag ID to a compliant verify endpoint.</p>
            <p>Verification returns authentic, tampered, expired, recalled, or unknown.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
