type BreadcrumbsProps = {
  items: Array<{ label: string; href?: string }>;
  ariaLabel?: string;
};

export function Breadcrumbs({
  items,
  ariaLabel = "Breadcrumb",
}: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs" aria-label={ariaLabel}>
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.href ? <a href={item.href}>{item.label}</a> : <span>{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
