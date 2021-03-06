import { gql } from '@apollo/client'

export const localTypeDefs = gql`
  enum UserHasBeen {
    UNTOUCHED
    FOLLOWED
    UNFOLLOWED
  }

  type User {
    libraryRepoId: String
    currentOid: String
    stargazerCount: Int
    issuesTotalCount: Int
    followingUsers: [String!]
    followingTags: [String!]
    saved: [String!]
    hasBeen: UserHasBeen
    fullyLoaded: Boolean
  }

  type RestLibraryData {
    content: String!
    sha: String!
  }

  extend type Query {
    libraryData(userLogin: String!): RestLibraryData
  }
`
