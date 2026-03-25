import type { ReactNode } from "react";
import type { MDXComponents as MDXComponentMap } from "mdx/types";
import { CodeBlock } from "@/components/docs/CodeBlock";

type BadgeProps = { children: ReactNode };

function Badge({ children, className }: BadgeProps & { className: string }) {
  return <span className={`doc-badge ${className}`}>{children}</span>;
}

export function VerifiedBadge() {
  return <Badge className="doc-badge-verified">✓ Verified</Badge>;
}

export function SelfHostBadge() {
  return <Badge className="doc-badge-self">Self-hostable</Badge>;
}

export function HostedBadge() {
  return <Badge className="doc-badge-hosted">Better Data Hosted</Badge>;
}

export function IndustryTag({ children }: BadgeProps) {
  return <Badge className="doc-badge-industry">{children}</Badge>;
}

export function SchemaField({
  name,
  type,
  required,
  description,
}: {
  name: string;
  type: string;
  required: string;
  description: string;
}) {
  return (
    <tr>
      <td><code>{name}</code></td>
      <td><code>{type}</code></td>
      <td>{required}</td>
      <td>{description}</td>
    </tr>
  );
}

export const MDXComponents: MDXComponentMap = {
  pre: (props) => <CodeBlock {...props} />,
  VerifiedBadge,
  SelfHostBadge,
  HostedBadge,
  IndustryTag,
  SchemaField,
};
