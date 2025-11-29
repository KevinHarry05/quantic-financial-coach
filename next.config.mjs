/** @type {import('next').NextConfig} */
import path from 'path'

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Keep the small webpack tweak (disable cache) — some users rely on this for deterministic builds
  webpack: (config, { isServer }) => {
    config.cache = false;
    return config;
  },
  // NOTE: `swcMinify` is no longer recognized by this Next version; remove it to avoid warnings.
  // Provide an empty `turbopack` config and explicitly set `root` to ensure Next finds the project root
  // (avoids the multiple lockfile warning and the Turbopack/webpack conflict notice).
  turbopack: {
    // Use path.resolve('./') — `__dirname` is not available in ESM mode in Node.
    root: path.resolve('./'),
  },
}

export default nextConfig
