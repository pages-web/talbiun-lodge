import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_ERXES_ENDPOINT: "https://astar.next.erxes.io/gateway/graphql",
    NEXT_PUBLIC_ERXES_APP_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRQb3J0YWxJZCI6ImpVSEtBa3E0SDZPM1doamxORlZLUyIsImlhdCI6MTc4MTQzOTM2OX0.mhArHbS4zL9TudHSoZDOMVgJmZZvFgSPdWyBrHVBVeM",
    NEXT_PUBLIC_ERXES_CMS_ID: "6a2e9cd7a3d3c9e8bc433ec1",
    ERXES_APP_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRQb3J0YWxJZCI6ImpVSEtBa3E0SDZPM1doamxORlZLUyIsImlhdCI6MTc4MTQzOTM2OX0.mhArHbS4zL9TudHSoZDOMVgJmZZvFgSPdWyBrHVBVeM",
  },
};

export default withNextIntl(nextConfig);