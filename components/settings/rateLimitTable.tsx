import React from 'react'
import styled from 'styled-components'
import cn from 'classnames'
import { theme } from 'styles/themes'

import { RateLimitResource } from 'graphql/operations'
import { getUtc, fromSeconds, pluralize, nullish } from 'helpers'

const RateLimitTableStyles = styled.table`
  width: 100%;
  text-align: left;

  th {
    width: 50%;
    padding: ${theme('sz8')} ${theme('sz12')};
    background-color: ${theme('tableRow_BgColor__THead')};
  }

  .table-row-odd {
    background-color: ${theme('tableRow_BgColor__TRowOdd')};

    td {
      padding: ${theme('sz8')} ${theme('sz12')};
    }
  }

  .top-left {
    border-top-left-radius: ${theme('rounded_BorderRadius')};
  }

  .top-right {
    border-top-right-radius: ${theme('rounded_BorderRadius')};
  }

  .bottom-left {
    border-bottom-left-radius: ${theme('rounded_BorderRadius')};
  }

  .bottom-right {
    border-bottom-right-radius: ${theme('rounded_BorderRadius')};
  }

  .low-usage {
    color: ${theme('intentSuccess_Color')};
  }

  .medium-usage {
    color: ${theme('intentWarning_Color')};
  }

  .high-usage {
    color: ${theme('intentDanger_Color')};
  }
`

type RateLimitTableProps = {
  resource?: RateLimitResource
}

export const RateLimitTable = ({
  resource,
}: RateLimitTableProps): JSX.Element => {
  const diffInSeconds = resource && resource?.reset - getUtc()
  const diffNoNegative = diffInSeconds && diffInSeconds < 0 ? 0 : diffInSeconds
  const minutes =
    diffNoNegative &&
    fromSeconds({ seconds: diffNoNegative, to: 'minutes', round: 0 })

  const percentageUsed = resource && (resource.used / resource.limit) * 100

  return (
    <RateLimitTableStyles>
      <thead>
        <tr>
          <th className='top-left'>Used:</th>
          <th className='top-right'>Resets in:</th>
        </tr>
      </thead>
      <tbody>
        <tr className='table-row-odd'>
          <td
            className={cn('bottom-left', {
              ['low-usage']: !nullish(percentageUsed) && percentageUsed <= 40,
              ['medium-usage']:
                !nullish(percentageUsed) &&
                percentageUsed > 40 &&
                percentageUsed <= 80,
              ['high-usage']: !nullish(percentageUsed) && percentageUsed > 80,
            })}
          >
            {resource?.used} / {resource?.limit}
          </td>
          <td className='bottom-right'>
            {minutes}{' '}
            {!nullish(minutes) &&
              pluralize({ word: 'minute', number: minutes })}
          </td>
        </tr>
      </tbody>
    </RateLimitTableStyles>
  )
}
