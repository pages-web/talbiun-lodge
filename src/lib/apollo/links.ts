import { ApolloLink, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getErxesHeaders, resolveErxesGraphqlUrl } from "@/lib/erxes/config";

const httpLink = new HttpLink({
  uri: resolveErxesGraphqlUrl(),
  headers: {
    ...getErxesHeaders(),
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