import styled from 'styled-components'
import {
  useTooltipState,
  Tooltip as ReakitTooltip,
  TooltipReference,
} from 'reakit/Tooltip'
import type { PopoverState } from 'reakit/Popover'
import { theme } from 'styles/themes'

const TooltipStyles = styled(ReakitTooltip)`
  max-width: ${theme('sz256')};
  padding: ${theme('sz12')} ${theme('sz24')};
  overflow-wrap: break-word;
  background-color: ${theme('base_BgColor')};
  border-radius: ${theme('roundedSmall_BorderRadius')};
  box-shadow: ${theme('panel_BoxShadow')};
  opacity: 0;
  transition: ${theme('trans_Opacity')};

  &[data-enter] {
    opacity: 1;
  }

  @media screen and (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

type UseTooltipProps = {
  baseId: string
  placement?: PopoverState['placement']
  gutter?: number
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useTooltip = ({
  baseId,
  placement = 'bottom-start',
  gutter = 0,
}: UseTooltipProps) => {
  const props = useTooltipState({
    animated: true,
    placement,
    gutter,
    baseId,
  })

  const Ref = TooltipReference
  const Tip = TooltipStyles

  return { props, Ref, Tip }
}
