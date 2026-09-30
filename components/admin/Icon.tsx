import Image from "next/image";
import icon from "@/public/images/brand/icon.png";

// Nav mark. Payload renders it inside .step-nav__home, a fixed 18×18 slot,
// so it must be exactly that size or it gets clipped.
export const Icon = () => (
  <Image src={icon} alt="Influmedia" width={18} height={18} style={{ width: 18, height: 18, borderRadius: 4 }} />
);
