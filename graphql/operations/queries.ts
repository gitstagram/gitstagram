import { gql } from '@apollo/client'

export const GET_REPO = gql`
  query GetRepo {
    repository(name: "gitstagram", owner: "mongkuen") {
      id
    }
  }
`
