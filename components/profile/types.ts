import { GetViewerGitstagramLibraryQueryResult } from 'graphql/generated'

export type UserData = NonNullable<
  GetViewerGitstagramLibraryQueryResult['data']
>['viewer']
