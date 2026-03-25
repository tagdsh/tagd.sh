import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section">
      <div className="content-grid">
        <h1>Page not found</h1>
        <p>This route does not exist in the current private deploy.</p>
        <Link href="/" className="btn btn-primary">
          Return home
        </Link>
      </div>
    </main>
  );
}
