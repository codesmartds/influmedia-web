import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // Self-contained server bundle for the Cloud Run container.
  output: "standalone",
  // The site was a slide deck before becoming a landing site; old slide
  // routes point to the section that now holds their content.
  async redirects() {
    const to = (source: string, destination: string) => ({ source, destination, permanent: true });
    return [
      to("/deck", "/"),
      to("/quienes-somos", "/nosotros"),
      to("/historia", "/nosotros#historia"),
      to("/talentos", "/nosotros#talentos"),
      to("/que-hacemos", "/influencer-marketing#servicios"),
      to("/enfoque", "/influencer-marketing#enfoque"),
      to("/por-que-influmedia", "/influencer-marketing#porque"),
      to("/impacto", "/influencer-marketing#casos"),
      to("/clientes", "/influencer-marketing#casos"),
      to("/sistema", "/influencer-marketing#proceso"),
      to("/sistema/:path*", "/influencer-marketing#proceso"),
      to("/trabajo", "/galeria"),
    ];
  },
  images: {
    localPatterns: [{ pathname: "/api/media/file/**", search: "" }],
    remotePatterns: [{ protocol: "https", hostname: "storage.googleapis.com", pathname: "/influmedia-web-media/**" }],
  },
};

export default withPayload(nextConfig);
