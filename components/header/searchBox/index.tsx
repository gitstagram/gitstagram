import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useMenuState, MenuButton } from 'reakit/Menu'
import { ProfileIcon } from 'components/profileIcon'
import {
  TextInput,
  Menu,
  MenuItem,
  TextInfo,
  Spinner,
  Middot,
} from 'components/ui'
import { useFollowingVar } from 'components/data/gitstagramLibraryData'
import { SearchBoxStyles } from 'components/header/searchBox/styles'
import { useSearchUsersLazyQuery } from 'graphql/restOperations'
import { debounce, getURIQueryString, searchUsersQueryString } from 'helpers'
import { getProfilePath } from 'routes'

type SearchBoxProps = BaseProps

function SearchBoxBase(
  { className }: SearchBoxProps,
  ref: React.ForwardedRef<HTMLButtonElement>
): JSX.Element {
  const [search, setSearch] = useState<string>('')
  const following = useFollowingVar()
  const [searchUsers, { data, error }] = useSearchUsersLazyQuery()
  const searchResults = data?.searchUsers?.items?.filter((item) => {
    return item.name === 'gitstagram-library'
  })

  const menu = useMenuState({
    animated: true,
    gutter: 8,
    baseId: 'SearchBox',
    placement: 'bottom',
  })

  const handleChange = debounce<InputChangeHandler<string>>((val) => {
    setSearch(val)
    if (val) {
      menu.show()
      searchUsers({
        variables: {
          loginSearchQueryString: getURIQueryString(
            searchUsersQueryString(val)
          ),
        },
      })
    }
  }, 750)

  useEffect(() => {
    const blur = () => {
      const inputRef = ref as React.RefObject<HTMLButtonElement>
      inputRef?.current?.blur()
    }

    document.addEventListener('touchmove', blur, { passive: false })

    return () => document.removeEventListener('touchmove', blur)
  }, [ref])

  const showPrompt = !search && !error
  const showSpinner = search && !searchResults && !error
  const showResults = search && searchResults && !error
  const itemsInResults = showResults && searchResults?.length !== 0
  const emptyResults = showResults && searchResults?.length === 0

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
            onClick={menu.show}
            onFocus={menu.show}
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
        onClick={menu.hide}
      >
        {error && (
          <TextInfo className='search-prompt'>
            Issue searching, please try again
          </TextInfo>
        )}
        {showPrompt && (
          <TextInfo className='search-prompt'>Start typing to search</TextInfo>
        )}
        {emptyResults && (
          <TextInfo className='search-prompt'>
            No results, try another search
          </TextInfo>
        )}
        {showSpinner && (
          <Spinner
            className='search-prompt'
            ariaLabel='Search in progress...'
          />
        )}
        {itemsInResults &&
          searchResults?.map((node) => {
            return (
              <MenuItem
                {...menu}
                className='search-item'
                key={node.node_id}
                as='div'
              >
                <Link href={getProfilePath(node.owner.login)}>
                  <a>
                    <ProfileIcon
                      className='search-item-img'
                      url={node.owner.avatar_url}
                      userLogin={node.owner.login}
                      size={40}
                    />
                    <b className='search-item-name'>{node.owner.login}</b>
                    {following.includes(node.owner.login) && (
                      <>
                        <Middot />
                        <TextInfo>Following</TextInfo>
                      </>
                    )}
                  </a>
                </Link>
              </MenuItem>
            )
          })}
      </Menu>
    </SearchBoxStyles>
  )
}

export const SearchBox = React.forwardRef(SearchBoxBase)
