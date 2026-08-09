import Link from "next/link";

export default function LocalizedNotFound() {
  return (
    <section className="home-closing">
      <div className="home-closing__content">
        <p className="home-kicker">404</p>
        <h1>Page not found</h1>
        <p>The page you requested is unavailable.</p>
        <Link className="home-button home-button--primary" href="/en">
          Return to the Mistfall Hunter wiki
        </Link>
      </div>
    </section>
  );
}
