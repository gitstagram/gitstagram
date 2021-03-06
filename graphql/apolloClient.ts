import {
  ApolloClient,
  createHttpLink,
  ApolloLink,
  InMemoryCache,
  defaultDataIdFromObject,
  StoreObject,
} from '@apollo/client'
import { KeyFieldsContext } from '@apollo/client/cache/inmemory/policies'
import { setContext } from '@apollo/client/link/context'
import { RetryLink } from '@apollo/client/link/retry'
import { RestLink } from 'apollo-link-rest'
import { getSession } from 'next-auth/client'
import type { Session } from 'next-auth'
import camelCase from 'camelcase'
import { snakeCase } from 'snake-case'
import { toast } from 'react-toastify'
import generatedIntrospection from 'graphql/generated/fragmentIntrospection'
import { typePolicies } from 'graphql/typePolicies'
import { localTypeDefs } from 'graphql/localTypeDefs'

/*
 * Apollo Link seems to catch all errors and prevents propagation back to caller
 * https://github.com/apollographql/apollo-link/issues/1022
 *   - Query Hook { error } becomes empty
 *   - Mutation Hook { error } becomes empty, .catch() on hook promise empty
 *   - apolloClient promise .catch becomes empty
 *   - async utility receives no errors
 *   - forward(operation) makes no difference
 */
// import { captureException } from 'helpers'
// import { onError } from '@apollo/client/link/error'

// const errorLink = onError(
//   ({ graphQLErrors, networkError, forward, operation }) => {
//     if (graphQLErrors) {
//       toast.warn('Experiencing Graphql issues, try again later?')
//       captureException({ graphQLErrors, msgs: ['apolloClient gql error'] })
//     }
//     if (networkError) {
//       toast.warn('Experiencing network issues, try again later?')
//       captureException({ networkError, msgs: ['apolloClient network error'] })
//     }
//     return forward(operation)
//   }
// )

const retryLink = new RetryLink({
  attempts: {
    max: 2,
  },
})

export const customFetch = (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  // Cached responses causes issues with contents not updating
  return fetch(input, {
    ...init,
    cache: 'no-store',
  })
    .then((res) => {
      // fetch's 404 / 500 do not throw and instead return responses
      if (!res.ok) throw { res } as FetchThrowNotOk
      return res
    })
    .catch((err) => {
      // Show network error if it is not a thrown response object
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!err.res) toast.warn('You may have network issues, try again later?')
      // toast.warn('You may have network issues, try again later?')
      // Keep throwing error to ApolloClient
      throw err
    })
}

const restLink = new RestLink({
  customFetch: customFetch,
  uri: 'https://api.github.com',
  responseTransformer: async (response: Response) => {
    // If response is null (404) or empty object (no response e.g. DELETE)
    const isResponse = response instanceof Response
    if (!isResponse) return response

    const json = (await response.json()) as AnyRecord | Array<unknown>
    const raw = JSON.stringify(json)
    // Append entire response into `raw` key.
    // Array returns placed under `collection` key
    if (json.constructor.name === 'Object') return { ...json, raw }
    if (json.constructor.name === 'Array') return { collection: json, raw }
    return json
  },
  fieldNameNormalizer: (key: string) => camelCase(key),
  fieldNameDenormalizer: (key: string) => snakeCase(key),
})

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
  fetch: customFetch,
})

type PreviousContext = {
  headers: Record<string, string>
}

let session: Session | null
const getAuthorization = async (type: 'graphql' | 'rest') => {
  if (!session) {
    session = await getSession()
  }

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
    // errorLink,
    retryLink,
    authRestLink.concat(restLink),
    authLink.concat(httpLink),
  ]),
  cache: new InMemoryCache({
    possibleTypes: generatedIntrospection.possibleTypes,
    typePolicies,
    dataIdFromObject: (object: StoreObject, context: KeyFieldsContext) => {
      if (
        object.__typename === 'SearchResultItemConnection' &&
        context.fragmentMap
      ) {
        const isFeed = Object.keys(context.fragmentMap).includes(
          'FeedSearchIdentifier'
        )
        if (isFeed) return 'Feed'
      }
      return defaultDataIdFromObject(object)
    },
  }),
  typeDefs: localTypeDefs,
})
