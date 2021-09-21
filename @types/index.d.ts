type IconProps = import('components/ui/icon/icon').IconProps

declare interface IComponentProps {
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

declare interface IInputProps<T> extends IComponentProps {
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
