import { ApolloLink, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? "/graphql",
  headers: {
    "x-app-token": process.env.NEXT_PUBLIC_ERXES_APP_TOKEN ?? "",
    "client-portal-id": process.env.NEXT_PUBLIC_ERXES_CLIENT_PORTAL_ID ?? "",
  },
});

const authLink = setContext((_, { headers }) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});

export const link = ApolloLink.from([authLink, httpLink]);