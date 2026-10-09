/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // Static HTML export — works perfectly on Cloudflare Pages
  trailingSlash: true,       // Cloudflare Pages prefers /about/ over /about
  images: {
    unoptimized: true,       // Static export can't use server-side image optimization.
                             // Cloudflare's global CDN (~300 PoPs) delivers the images fast.
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' }
    ]
  }
};

export default nextConfig;
