import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { cookies } from "next/headers";
import { getErxesHeaders, resolveErxesGraphqlUrl } from "@/lib/erxes/config";

export async function getServerApolloClient() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return new ApolloClient({
    link: new HttpLink({
      uri: resolveErxesGraphqlUrl(),
      headers: {
        ...getErxesHeaders(),
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      fetchOptions: { cache: "no-store" },
    }),
    cache: new InMemoryCache(),
  });
}
