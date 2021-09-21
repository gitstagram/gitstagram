type IconProps = import('components/ui/icon/icon').IconProps

declare interface ComponentProps {
  className?: string
  children?: React.ReactNode
  as?: keyof React.ReactHTML
}

type InputStates = 'error' | 'success'
type PlaceholderPos = 'left' | 'center'
type InputChangeHandler<T> = (
  value: T,
  event: React.ChangeEvent<HTMLInputElement>
) => void

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
}
