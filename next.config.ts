import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    // Uploads served by Payload's local storage.
    localPatterns: [{ pathname: "/api/media/file/**", search: "" }],
  },
};

export default withPayload(nextConfig);
