/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ApolloClient,
  ApolloLink,
  FetchResult,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { ApolloProvider as ApolloProviderContainer } from "@apollo/client/react";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { Observable } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

const httpLink: any = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_ERXES_API_URL}`,
  credentials: "include",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${process.env.NEXT_PUBLIC_ERXES_WSS_URL}/gateway/graphql`,
  }),
);

const isRefreshRequest = (operation: any) => {
  return operation.operationName === "clientPortalRefreshToken";
};

const returnTokenDependingOnOperation = (operation: any) => {
  if (isRefreshRequest(operation)) {
    return sessionStorage.getItem("refreshToken") || "";
  }
  return sessionStorage.getItem("token") || "";
};

const authLink = setContext((_, { headers }): any => {
  if (typeof window !== "undefined") {
    const token = returnTokenDependingOnOperation(_);
    return {
      headers: {
        ...headers,
        "x-app-token": process.env.NEXT_PUBLIC_ERXES_APP_TOKEN,
        "client-auth-token": localStorage.getItem("appToken") || "",
        "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_ERXES_API_URL}/gateway/graphql`,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  }
});

const splitLink =
  typeof window !== "undefined" && wsLink != null
    ? split(
        ({ query }) => {
          const def = getMainDefinition(query);
          return (
            def.kind === "OperationDefinition" &&
            def.operation === "subscription"
          );
        },
        wsLink,
        httpLink,
      )
    : httpLink;

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (
        err.message === "token expired" ||
        err?.extensions?.code === "SUBREQUEST_HTTP_ERROR"
      ) {
        const observable = new Observable<FetchResult<Record<string, any>>>(
          (observer) => {
            (async () => {
              try {
                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                };
                forward(operation).subscribe(subscriber);
              } catch (err) {
                observer.error(err);
              }
            })();
          },
        );
        return observable;
      }
    }
  }
});

const client = new ApolloClient({
  devtools: { enabled: typeof window !== "undefined" },
  ssrMode: typeof window !== "undefined",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          clientPortalCurrentUser: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          cpGetTickets: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  link: ApolloLink.from([errorLink, authLink, splitLink]),
});

export { client };
export const ApolloProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ApolloProviderContainer client={client}>
      {children}
    </ApolloProviderContainer>
  );
};