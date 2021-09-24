type IconProps = import('components/ui/icon/icon').IconProps

declare interface ComponentProps {
  className?: string
  children?: React.ReactNode
  as?: keyof React.ReactHTML
}

type InputStates = 'error' | 'success'
type PlaceholderPos = 'left' | 'center'
type InputChangeHandler<T> = (value: T, event: React.SyntheticEvent) => void

declare interface InputProps<T> extends ComponentProps {
  id: string
  name: string
  initialValue: T
  placeholderText?: string
  placeholderPos?: PlaceholderPos
  placeholderIcon?: IconProps
  disabled?: boolean
  state?: InputStates
  clearable?: boolean
  onChange?: InputChangeHandler<T>
  onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void
  ref?: React.ForwardedRef
  type: string
  role: string
}
