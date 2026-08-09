type GuideCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  index: number;
  id?: string;
  external?: boolean;
};

export function GuideCard({
  eyebrow,
  title,
  description,
  linkLabel,
  href,
  index,
  id,
  external = false,
}: GuideCardProps) {
  return (
    <article className="home-guide-card" id={id}>
      <a
        className="home-guide-card__link"
        href={href}
        rel={external ? "noreferrer" : undefined}
        target={external ? "_blank" : undefined}
      >
        <span className="home-guide-card__number" aria-hidden="true">
          {String(index).padStart(2, "0")}
        </span>
        <span className="home-kicker">{eyebrow}</span>
        <h3>{title}</h3>
        <p>{description}</p>
        <span className="home-guide-card__action">
          {linkLabel}
          <span aria-hidden="true">↗</span>
        </span>
      </a>
    </article>
  );
}
