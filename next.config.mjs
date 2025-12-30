const nextConfig = {
  reactCompiler: false,
  experimental: {
    turbo: {
      rules: {
        "*.svg": ["@svgr/webpack"],
      },
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
