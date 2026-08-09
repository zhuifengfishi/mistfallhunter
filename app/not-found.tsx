import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        alignItems: "center",
        background: "#090a0a",
        color: "#f5f0e6",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <p>404</p>
      <h1>Page not found</h1>
      <p>The page you requested is unavailable.</p>
      <Link href="/en" style={{ color: "#d7b56d" }}>
        Return to the Mistfall Hunter wiki
      </Link>
    </main>
  );
}
