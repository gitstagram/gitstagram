import React from 'react'
import {
  useGetUserGitstagramLibraryQuery,
  useGetViewerQuery,
  useGetViewerGitstagramLibraryQuery,
} from 'graphql/generated'

type ProfileProps = {
  userLogin: string
}

export const Profile = ({ userLogin }: ProfileProps): JSX.Element => {
  const { data: loginData } = useGetViewerQuery()
  const { data: userData, loading: userLoading } =
    useGetUserGitstagramLibraryQuery({
      skip: loginData?.viewer.login === userLogin,
      variables: {
        userLogin,
      },
    })
  const { data: viewerData, loading: viewerLoading } =
    useGetViewerGitstagramLibraryQuery({
      skip: loginData?.viewer.login !== userLogin,
    })

  const data = userData || viewerData
  const loading = userLoading || viewerLoading

  return loading ? <>Loading</> : <pre>{JSON.stringify(data, null, 2)}</pre>
}
