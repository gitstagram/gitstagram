import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { RetryLink } from '@apollo/client/link/retry'
import { RestLink } from 'apollo-link-rest'
import { getSession } from 'next-auth/client'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.warn(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.warn(`[Network error]: ${networkError}`)
})
const retryLink = new RetryLink({
  attempts: {
    max: 3,
  },
})

const restLink = new RestLink({ uri: 'https://api.github.com' })

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
})

type PreviousContext = {
  headers: Record<string, string>
}

const getAuthorization = async (type: 'graphql' | 'rest') => {
  const session = await getSession()
  const accessToken = session?.accessToken as string | undefined

  const prefixMap = {
    graphql: 'Bearer',
    rest: 'token',
  }
  const prefix = prefixMap[type]

  return {
    Authorization: accessToken ? `${prefix} ${accessToken}` : '',
  }
}

const authLink = setContext(async (_, { headers }: PreviousContext) => {
  const authorization = await getAuthorization('graphql')

  return {
    headers: {
      ...headers,
      ...authorization,
    },
  }
})

const authRestLink = setContext(async (_, { headers }: PreviousContext) => {
  const authorization = await getAuthorization('rest')

  return {
    headers: {
      ...headers,
      ...authorization,
    },
  }
})

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    retryLink,
    authRestLink.concat(restLink),
    authLink.concat(httpLink),
  ]),
  cache: new InMemoryCache(),
})
