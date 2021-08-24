import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getSession } from 'next-auth/client'

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
})

type PreviousContext = {
  headers: Record<string, string>
}

const authLink = setContext(async (_, { headers }: PreviousContext) => {
  const session = await getSession()
  const accessToken = session?.accessToken as string | undefined

  return {
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  }
})

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined = undefined
export const getApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  if (!apolloClient) {
    apolloClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    })
  }
  return apolloClient
}
