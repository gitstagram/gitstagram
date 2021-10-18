import styled from 'styled-components'
import {
  useTooltipState,
  Tooltip as ReakitTooltip,
  TooltipReference,
} from 'reakit/Tooltip'
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useTooltip = () => {
  const props = useTooltipState({
    animated: true,
    placement: 'bottom-start',
    gutter: 0,
  })

  const Ref = TooltipReference
  const Tip = TooltipStyles

  return { props, Ref, Tip }
}
