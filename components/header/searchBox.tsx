import React, { useState, useEffect } from 'react'
import { useMenuState, MenuButton } from 'reakit/Menu'
import styled from 'styled-components'
import { TextInput, Menu, MenuItem } from 'components/ui'
import { themeProp } from 'styles/themes'

const SearchBoxStyles = styled.div`
  .search-menu {
    max-height: 30vh;
  }
`

interface SearchBoxProps extends BaseProps {
  expand?: boolean
}

function SearchBoxBase(
  { className, expand }: SearchBoxProps,
  ref: React.ForwardedRef<HTMLButtonElement>
): JSX.Element {
  const [search, setSearch] = useState<string>('')
  const menu = useMenuState({
    animated: parseInt(themeProp('trans_Speed')),
    gutter: 2,
  })

  const handleChange: InputChangeHandler<string> = (val) => {
    setSearch(val)
    val ? menu.show() : menu.hide()
  }

  const handleClick = () => {
    search ? menu.show() : menu.hide()
  }

  useEffect(() => {
    const blur = () => {
      const inputRef = ref as React.RefObject<HTMLButtonElement>
      inputRef?.current?.blur()
    }

    document.addEventListener('touchmove', blur, { passive: false })

    return () => document.removeEventListener('touchmove', blur)
  }, [ref])

  return (
    <SearchBoxStyles>
      <MenuButton {...menu} ref={ref}>
        {(props) => (
          <TextInput
            {...props}
            className={`search-input ${className}`}
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
      <Menu
        {...menu}
        className='search-menu'
        hasArrow={false}
        ariaLabel='Search results'
        expand={expand}
      >
        {search.split('').map((letter) => {
          return (
            <MenuItem {...menu} key={letter}>
              Search letter: {letter}
            </MenuItem>
          )
        })}
      </Menu>
    </SearchBoxStyles>
  )
}

export const SearchBox = React.forwardRef(SearchBoxBase)
