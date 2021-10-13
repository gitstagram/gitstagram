import { captureException } from 'helpers'

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
import { toast } from 'react-toastify'

import generatedIntrospection from 'graphql/generated/fragmentIntrospection'
import type { StrictTypedTypePolicies } from 'graphql/generated/apolloHelpers'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    toast.warn('Experiencing Graphql issues, try again later?')
    captureException({ graphQLErrors, msgs: ['apolloClient gql error'] })
  }
  if (networkError) {
    toast.warn('Experiencing network issues, try again later?')
    captureException({ networkError, msgs: ['apolloClient network error'] })
  }
})
const retryLink = new RetryLink({
  attempts: {
    max: 3,
  },
})

const customFetch = (input: RequestInfo, init: RequestInit | undefined) => {
  // Cached responses causes issues with contents not updating
  return fetch(input, { ...init, cache: 'no-store' })
}

const restLink = new RestLink({
  customFetch: customFetch,
  uri: 'https://api.github.com',
  responseTransformer: async (response: Response) => {
    // If response is null (404) or empty object (no response e.g. DELETE)
    const isResponse = response instanceof Response
    if (!isResponse) return response

    const json = (await response.json()) as
      | Record<string, unknown>
      | Array<unknown>
    const raw = JSON.stringify(json)
    // Append entire response into `raw` key.
    // Array returns placed under `collection` key
    if (json.constructor.name === 'Object') return { ...json, raw }
    if (json.constructor.name === 'Array') return { collection: json, raw }
    return json
  },
})

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

const typePolicies: StrictTypedTypePolicies = {}

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    retryLink,
    authRestLink.concat(restLink),
    authLink.concat(httpLink),
  ]),
  cache: new InMemoryCache({
    possibleTypes: generatedIntrospection.possibleTypes,
    typePolicies,
  }),
})
