import React, { useState, useEffect } from 'react'
import { useMenuState, MenuButton } from 'reakit/Menu'
import styled from 'styled-components'
import { TextInput, Menu, MenuItem } from 'components/ui'
import { theme, themeConstant } from 'styles/themes'

const SearchBoxStyles = styled.div`
  width: 100%;

  [data-leave] {
    visibility: hidden;
  }

  .search-menu {
    width: 90vw;
    max-width: ${theme('sz384')};
    height: 65vh;
    margin-right: auto;
    margin-left: auto;
    overflow: scroll;
  }

  ${themeConstant('media__TabletLandscape')} {
    .search-menu {
      width: ${theme('sz384')};
      height: 40vh;
    }
  }

  .search-item {
    flex-shrink: 0;
    width: 100%;
  }
`

type SearchBoxProps = BaseProps

function SearchBoxBase(
  { className }: SearchBoxProps,
  ref: React.ForwardedRef<HTMLButtonElement>
): JSX.Element {
  const [search, setSearch] = useState<string>('')
  const menu = useMenuState({
    animated: true,
    gutter: 8,
    baseId: 'SearchBox',
    placement: 'bottom',
  })

  const handleChange: InputChangeHandler<string> = (val) => {
    setSearch(val)
    val ? menu.show() : menu.hide()
  }

  const showMenu = () => {
    menu.show()
  }

  const hideMenu = () => {
    menu.hide()
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
            onClick={showMenu}
            onFocus={showMenu}
            type='input'
            role='search'
          />
        )}
      </MenuButton>
      <Menu
        {...menu}
        allowScroll
        className='search-menu'
        hasArrow={false}
        ariaLabel='Search results'
        onClick={hideMenu}
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
