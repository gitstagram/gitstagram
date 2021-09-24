import React, { useState } from 'react'
import { useMenuState, MenuButton } from 'reakit/Menu'
import { TextInput, Menu, MenuItem } from 'components/ui'
import { themeProp } from 'styles/themes'

export const SearchBox = (): JSX.Element => {
  const [search, setSearch] = useState<string>('')
  const menu = useMenuState({
    animated: parseInt(themeProp('trans_Speed')),
    placement: 'bottom',
    unstable_virtual: true,
  })

  const handleChange: InputChangeHandler<string> = (val) => {
    setSearch(val)
    val ? menu.show() : menu.hide()
  }

  const handleClick = () => {
    search ? menu.show() : menu.hide()
  }

  return (
    <>
      <MenuButton {...menu}>
        {(props) => (
          <TextInput
            {...props}
            className='search-input'
            id='search'
            name='search'
            initialValue={search}
            placeholderPos='center'
            placeholderText='Search'
            placeholderIcon={{ icon: 'search', ariaHidden: true }}
            clearable
            onChange={handleChange}
            onClick={handleClick}
            type='input'
            role='search'
          />
        )}
      </MenuButton>
      <Menu {...menu} hasArrow={false} ariaLabel='Search results'>
        {search.split('').map((letter) => {
          return (
            <MenuItem {...menu} key={letter}>
              Search letter: {letter}
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}
