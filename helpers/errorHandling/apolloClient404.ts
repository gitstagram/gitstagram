import { ApolloError } from '@apollo/client'

export const isApolloClient404 = (err: unknown): Maybe<boolean> => {
  const apolloNetworkError =
    typeof err === 'object' &&
    err?.constructor === ApolloError &&
    (err as ApolloError).networkError

  const is404 =
    apolloNetworkError &&
    Object.prototype.hasOwnProperty.call(apolloNetworkError, 'res') &&
    (apolloNetworkError as unknown as FetchThrowNotOk).res?.status === 404

  return is404
}

export const exceptApolloClient404 = (err: unknown): Maybe<boolean> => {
  return !isApolloClient404(err)
}
