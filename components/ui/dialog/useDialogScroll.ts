import { useEffect } from 'react'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { DialogStateReturn } from 'reakit/Dialog'

/**
 * This fixes iOS scroll lock not being released
 * https://github.com/reakit/reakit/issues/469
 */
export const useDialogScroll = (
  dialogProps: DialogStateReturn,
  scrollRef: React.RefObject<HTMLElement>
): void => {
  useEffect(() => {
    const scrollBox = scrollRef.current
    if (dialogProps.visible && scrollBox) {
      disableBodyScroll(scrollBox)
    }
    return () => {
      scrollBox && enableBodyScroll(scrollBox)
    }
  }, [dialogProps.visible, scrollRef])
}
