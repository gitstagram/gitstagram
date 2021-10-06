import React, { useState } from 'react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { toast } from 'react-toastify'
import { TextAttn, Button } from 'components/ui'
import { times, promiseReduce, captureException } from 'helpers'
import { getIssueExportQueryPromise } from 'graphql/restOperations/restQueries'

type AccountExportIssuesProps = {
  name?: string
  totalIssues?: number
}

type ExportState = 'base' | 'loading' | 'error'

export const AccountExportIssues = ({
  name,
  totalIssues,
}: AccountExportIssuesProps): JSX.Element => {
  const [state, setState] = useState<ExportState>('base')

  const handleExportIssues = () => {
    if (totalIssues && name) {
      setState('loading')

      const pages = Math.ceil(totalIssues / 100)
      const promises = times(pages).map((_, index) => {
        const pageNum = index + 1
        return getIssueExportQueryPromise({
          userName: name,
          page: pageNum,
        })
          .then(({ data }) => data.restIssues.raw)
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

  const icon =
    state === 'loading'
      ? 'gear'
      : state === 'error'
      ? 'exclamation-triangle-fill'
      : 'file-earmark-zip'

  return (
    <>
      <TextAttn>Export repository issues:</TextAttn>
      <Button
        onClick={handleExportIssues}
        intent={state === 'error' ? 'warning-invert' : 'success-invert'}
        disabled={state === 'loading'}
        loading={state === 'loading'}
        icon={{ icon, ariaHidden: true }}
      >
        Download Zip
      </Button>
    </>
  )
}