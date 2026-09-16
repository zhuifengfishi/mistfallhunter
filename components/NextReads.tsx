type NextReadLink = {
  href: string;
  label: string;
};

type NextReadsProps = {
  title?: string;
  intro?: string;
  links: NextReadLink[];
  className?: string;
};

export function NextReads({
  title = "Next reads",
  intro = "Related Mistfall Hunter Wiki guides — keep reading on-site.",
  links,
  className = "",
}: NextReadsProps) {
  if (links.length === 0) return null;

  return (
    <section className={`next-reads ${className}`.trim()} aria-labelledby="next-reads-heading">
      <p className="home-kicker">Keep reading</p>
      <h2 id="next-reads-heading">{title}</h2>
      <p>{intro}</p>
      <div className="next-reads__links">
        {links.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
            <span aria-hidden="true">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}
