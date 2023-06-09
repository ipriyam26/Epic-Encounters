/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  webpack(next_config) {
    next_config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    return next_config;
  },
  images: {
    domains: ['img.icons8.com','books.google.com'],
  },
  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  // webpack(config){}

};
export default config;
