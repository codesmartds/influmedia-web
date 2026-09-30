import Image from "next/image";
import logo from "@/public/images/brand/logo.png";
import logoWhite from "@/public/images/brand/logo-white.png";

// Login-screen logo. Payload switches its theme with data-theme on <html>,
// so both variants render and CSS shows the one that fits the background.
export const Logo = () => (
  <>
    <Image src={logo} alt="Influmedia" priority className="influmedia-logo influmedia-logo--light" />
    <Image src={logoWhite} alt="" aria-hidden priority className="influmedia-logo influmedia-logo--dark" />
  </>
);
