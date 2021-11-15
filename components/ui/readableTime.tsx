import React, { useState, useEffect, FC } from 'react'
import styled from 'styled-components'
import { useTooltip } from 'components/ui/useTooltip'
import { TextAttn } from 'components/ui/text/textAttn'
import { timeAgo, isoToLocale } from 'helpers'

type ReadableTimeProps = ComponentProps & {
  isoString: string
  refreshRate?: number
}

const ReadableTimeStyles = styled.div`
  .readable-time-ref {
    width: fit-content;
  }
`

export const ReadableTime: FC<ReadableTimeProps> = ({
  isoString,
  refreshRate = 60_000, // 1 minute
  ...props
}: ReadableTimeProps): JSX.Element => {
  const [timeAgoStr, setTimeAgoStr] = useState('')

  const timeTip = useTooltip({
    baseId: 'readable-time',
    placement: 'bottom-start',
    gutter: 0,
  })

  useEffect(() => {
    setTimeAgoStr(timeAgo(isoString))

    const interval = setInterval(() => {
      setTimeAgoStr(timeAgo(isoString))
    }, refreshRate)

    return () => clearInterval(interval)
  }, [setTimeAgoStr, refreshRate, isoString])

  return (
    <ReadableTimeStyles>
      <timeTip.Ref {...timeTip.props} className='readable-time-ref'>
        <TextAttn {...props}>{timeAgoStr} </TextAttn>
      </timeTip.Ref>
      <timeTip.Tip {...timeTip.props}>{isoToLocale(isoString)}</timeTip.Tip>
    </ReadableTimeStyles>
  )
}
