export function resolveErxesGraphqlUrl(value?: string): string {
  const raw = value || process.env.NEXT_PUBLIC_GRAPHQL_URL || process.env.NEXT_PUBLIC_ERXES_API_URL || process.env.NEXT_PUBLIC_ERXES_ENDPOINT || "/graphql";

  if (!raw) return "/graphql";
  if (raw.includes("/graphql")) return raw;

  const trimmed = raw.replace(/\/$/, "");
  return `${trimmed}/graphql`;
}

export function resolveErxesMediaUrl(value?: string | null): string {
  if (!value) return "";
  if (value.startsWith("http")) return value;

  const endpoint = process.env.NEXT_PUBLIC_ERXES_ENDPOINT || process.env.NEXT_PUBLIC_ERXES_API_URL || "";
  const normalized = endpoint.replace(/\/gateway\/graphql$/, "").replace(/\/graphql$/, "");

  if (normalized) {
    return `${normalized}/read-file?key=${value}`;
  }

  return value;
}

export function getErxesHeaders() {
  return {
    "x-app-token": process.env.NEXT_PUBLIC_ERXES_APP_TOKEN ?? process.env.ERXES_APP_TOKEN ?? "",
    "client-portal-id": process.env.NEXT_PUBLIC_ERXES_CLIENT_PORTAL_ID ?? "",
  };
}
