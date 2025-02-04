import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/:path*",
        destination: "http://localhost:5000/:path*",
      },
    ]
  }
}

export default nextConfig;
