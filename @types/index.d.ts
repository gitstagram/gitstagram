type IconProps = import('components/ui/icon/icon').IconProps
type Maybe<T> = T | null | undefined

declare interface BaseProps {
  className?: string
  children?: React.ReactNode
}

declare interface ComponentProps extends BaseProps {
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
  type?: string
  role?: string
  label?: string
  loading?: boolean
}
