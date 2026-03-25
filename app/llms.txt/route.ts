export const runtime = "nodejs";

const body = `# Signal Tags (tagd.sh)

Signal Tags is an open schema and verification protocol for physical
product authentication. A Signal Tag is a scannable identifier that
resolves to a verifiable, tamper-evident record of product identity,
provenance, and compliance state.

## Packages

- @signal-tags/schema — tag schema definitions and Zod validation
- @signal-tags/verify — verification client
- @signal-tags/generate — tag ID generation and QR encoding
- @signal-tags/sdk — main developer SDK

## Use cases

Pharmaceutical serialization (DSCSA), medical device traceability (UDI),
luxury goods anti-counterfeit, food & beverage traceability, construction
materials compliance.

## Links

- Docs: https://tagd.sh/docs
- GitHub: https://github.com/tagdsh/tagd
- npm: https://www.npmjs.com/org/signal-tags
- Created by: Better Data (https://betterdata.co)
- Loop Engine integration: https://loopengine.io
- Commerce Chain integration: https://commercechain.io
`;

export async function GET() {
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
}
