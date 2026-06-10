import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_ERXES_ENDPOINT: "https://talbiuncamp.next.erxes.io/gateway/graphql",
    NEXT_PUBLIC_ERXES_APP_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRQb3J0YWxJZCI6ImFkZFZ4czUxUXlYdTlVSXNRc1FwRyIsImlhdCI6MTc4MTA3NzQyNX0.bvy5PqyIEorxfIIriXuoBjydHsN2GbtCjxsG_qvcbl4",
    NEXT_PUBLIC_ERXES_CMS_ID: "6a291a72aaeac693c821dd6c",
    ERXES_APP_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRQb3J0YWxJZCI6ImFkZFZ4czUxUXlYdTlVSXNRc1FwRyIsImlhdCI6MTc4MTA3NzQyNX0.bvy5PqyIEorxfIIriXuoBjydHsN2GbtCjxsG_qvcbl4",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
