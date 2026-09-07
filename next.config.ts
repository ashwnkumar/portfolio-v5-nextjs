import type { NextConfig } from "next";

// Derived from the Supabase URL so the allowlist stays correct if the project
// ref ever changes. Falls back to the known host if the env var is not loaded
// at config-evaluation time.
const supabaseHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!).hostname;
  } catch {
    return "jjtdueacespkyypqdeww.supabase.co";
  }
})();

const nextConfig: NextConfig = {
  // Opts into "use cache" / cacheLife / cacheTag, and Partial Prerendering.
  // Data reads are cached and tagged in lib/data.ts; the per-session studio
  // shuffle stays dynamic inside its own Suspense boundary.
  cacheComponents: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: supabaseHost,
        pathname: "/storage/v1/object/public/portfolio/**",
      },
    ],
  },
};

export default nextConfig;
