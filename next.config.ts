import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // The site was a slide deck before becoming a landing site; old slide
  // routes point to the section that now holds their content.
  async redirects() {
    const to = (source: string, destination: string) => ({ source, destination, permanent: true });
    return [
      to("/deck", "/"),
      to("/quienes-somos", "/nosotros#quienes-somos"),
      to("/historia", "/nosotros#historia"),
      to("/talentos", "/nosotros#talentos"),
      to("/que-hacemos", "/influencer-marketing#servicios"),
      to("/enfoque", "/influencer-marketing#por-que"),
      to("/por-que-influmedia", "/influencer-marketing#diferenciadores"),
      to("/impacto", "/influencer-marketing#resultados"),
      to("/clientes", "/influencer-marketing#resultados"),
      to("/sistema", "/influencer-marketing#sistema"),
      to("/sistema/:path*", "/influencer-marketing#sistema"),
      to("/trabajo", "/galeria"),
    ];
  },
  images: {
    // Uploads served by Payload's local storage.
    localPatterns: [{ pathname: "/api/media/file/**", search: "" }],
  },
};

export default withPayload(nextConfig);
