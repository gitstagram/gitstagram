import React from 'react'
import { TextInput } from 'components/ui'

export const SearchBox = (): JSX.Element => {
  const handleChange: InputChangeHandler<string> = () => {
    void 0
  }

  return (
    <TextInput
      className='search-input'
      id='search'
      name='search'
      initialValue=''
      placeholderPos='center'
      placeholderText='Search'
      placeholderIcon={{ icon: 'search', ariaHidden: true }}
      clearable
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onChange={handleChange}
    />
  )
}
