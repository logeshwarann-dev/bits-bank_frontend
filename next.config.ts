import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // ✅ This enables standalone output for minimal Docker builds
  output: 'standalone',
}

export default nextConfig
