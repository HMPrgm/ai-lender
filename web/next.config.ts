import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/v1/:path*",
        destination: "http://localhost:5000/v1/:path*",
      },
    ]
  }
}

export default nextConfig;
