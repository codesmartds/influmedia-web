import Image from "next/image";
import logo from "@/public/images/brand/logo.png";
import logoWhite from "@/public/images/brand/logo-white.png";

export type LogoVariant = "color" | "white";

const sources = { color: logo, white: logoWhite };

// Influmedia logo. `className` sets the width; height follows the image.
export function BrandLogo({
  variant = "color",
  className,
  priority,
  sizes = "(max-width: 768px) 40vw, 15vw",
}: {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={sources[variant]}
      alt="Influmedia"
      priority={priority}
      sizes={sizes}
      className={`h-auto ${className ?? ""}`}
    />
  );
}
