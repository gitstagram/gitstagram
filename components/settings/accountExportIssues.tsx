import React, { useState } from 'react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { toast } from 'react-toastify'
import { TextAttn, Button } from 'components/ui'
import { times, promiseReduce, captureException } from 'helpers'
import { getIssueExportQueryPromise } from 'graphql/restOperations'

type AccountExportIssuesProps = {
  viewerLogin: string
  totalIssues?: number
}

type ExportState = 'base' | 'loading'

export const AccountExportIssues = ({
  viewerLogin,
  totalIssues,
}: AccountExportIssuesProps): JSX.Element => {
  const [state, setState] = useState<ExportState>('base')

  const handleExportIssues = () => {
    if (viewerLogin) {
      setState('loading')
      const pagesNumerator = totalIssues ? totalIssues : 1

      const pages = Math.ceil(pagesNumerator / 100)
      const promises = times(pages).map((_, index) => {
        const pageNum = index + 1
        return getIssueExportQueryPromise({
          userLogin: viewerLogin,
          page: pageNum,
        })
          .then(({ data }) => data.issueExport.raw)
          .catch((err) => {
            captureException(err)
            // continue throwing down the promise chain
            // so error fetching issue creates exception for file saving
            throw err
          })
      })

      void promiseReduce(promises)
        .then((values) => {
          const vals = values as string[]
          const zip = new JSZip()

          vals.forEach((rawVal, index) => {
            const pageNum = index + 1
            zip.file(`page-${pageNum}.json`, rawVal)
          })

          return zip.generateAsync({ type: 'blob' })
        })
        .then((content) => saveAs(content, 'issues-export.zip'))
        .catch((err) => {
          toast.warn(`Problem exporting issues from Github`)
          captureException(err)
        })
        .finally(() => setState('base'))
    }
  }

  const icon = state === 'loading' ? 'gear' : 'file-earmark-zip'

  return (
    <>
      <TextAttn>Export repository issues:</TextAttn>
      <Button
        onClick={handleExportIssues}
        intent='success-invert'
        disabled={state === 'loading'}
        loading={state === 'loading'}
        icon={{ icon, ariaHidden: true }}
      >
        Download Zip
      </Button>
    </>
  )
}
