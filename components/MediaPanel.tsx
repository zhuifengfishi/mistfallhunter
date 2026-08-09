import Image from "next/image";

type MediaPanelProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes: string;
};

export function MediaPanel({
  src,
  alt,
  className = "",
  priority = false,
  sizes,
}: MediaPanelProps) {
  return (
    <figure className={`home-media ${className}`.trim()}>
      <Image
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        src={src}
      />
      <span className="home-media__wash" aria-hidden="true" />
      <span className="home-media__frame" aria-hidden="true" />
    </figure>
  );
}
