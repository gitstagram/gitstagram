import { gql } from '@apollo/client'
import * as frags from 'graphql/documents/fragments/fields'
import * as parts from 'graphql/documents/fragments/parts'

export const CACHE_Generate_UserInfo_LiftedProps = gql`
  ${parts.PART_Repository_With_Issues}
  ${frags.FRAG_User_Fields}

  fragment CACHE_Generate_UserInfo_LiftedProps on User {
    ...FRAG_User_Fields
    repository(name: $repositoryName) {
      ...PART_Repository_With_Issues
    }
  }
`

export const CACHE_UserInfo_LiftedProps = gql`
  fragment CACHE_UserInfo_LiftedProps on User {
    libraryRepoId @client
    currentOid @client
    stargazerCount @client
    issuesTotalCount @client
  }
`

export const CACHE_UserInfo_ViewerLibData = gql`
  fragment CACHE_UserInfo_ViewerLibData on User {
    followingUsers @client
    followingTags @client
    saved @client
  }
`

export const CACHE_UserInfo_UserLibData = gql`
  fragment CACHE_UserInfo_UserLibData on User {
    followingUsers @client
    fullyLoaded @client
  }
`

export const CACHE_UserInfo_HasBeen = gql`
  fragment CACHE_UserInfo_HasBeen on User {
    hasBeen @client
  }
`

export const CACHE_RestLibraryData = gql`
  fragment CACHE_RestLibraryData on RestLibraryData {
    content
    sha
  }
`

export const CACHE_UserInfo_ViewerProps = gql`
  query CACHE_UserInfo_ViewerProps {
    viewer {
      login
      avatarUrl
      name
      location
      twitterUsername
      bio
      libraryRepoId @client
      currentOid @client
      stargazerCount @client
      issuesTotalCount @client
      followingUsers @client
      followingTags @client
      saved @client
    }
  }
`

export const CACHE_UserInfo_UserProps = gql`
  fragment CACHE_UserInfo_UserProps on User {
    login
    avatarUrl
    name
    location
    twitterUsername
    bio
    stargazerCount @client
    issuesTotalCount @client
    followingUsers @client
    hasBeen @client
    fullyLoaded @client
  }
`
