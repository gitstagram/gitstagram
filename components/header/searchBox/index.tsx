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
  TextDeemph,
} from 'components/ui'
import { useFollowingVar } from 'components/data/gitstagramLibraryData'
import { SearchBoxStyles } from 'components/header/searchBox/styles'
import { searchCacheVar, useSearchCacheVar } from 'components/data/searchCache'
import { useOnMount } from 'components/hooks'
import { useSearchUsersLazyQuery, SearchUsersQuery } from 'graphql/generated'
import { debounce, searchUsersQueryString } from 'helpers'
import { getProfilePath } from 'routes'

type SearchBoxProps = BaseProps

// [number] gets value type of nodes[]
type SearchTypes = NonNullable<SearchUsersQuery['search']['nodes']>[number]
// Extract the Repository/User type
type SearchRepo = Extract<SearchTypes, { __typename?: 'Repository' }>

function SearchBoxBase(
  { className }: SearchBoxProps,
  ref: React.ForwardedRef<HTMLButtonElement>
): JSX.Element {
  const searchCache = useSearchCacheVar()
  const [search, setSearch] = useState<string>(searchCache || '')
  const following = useFollowingVar()
  const [searchUsers, { data, error }] = useSearchUsersLazyQuery()
  const searchResults = data?.search?.nodes?.filter(
    (item) =>
      item?.__typename === 'Repository' && item.name === 'gitstagram-library'
  ) as SearchRepo[]

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
          loginSearch: searchUsersQueryString(val),
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

  // Search term gets cached and passed to search boxes that may be unmounted
  // Sync search term states between mobile/desktop search boxes
  // Simply hiding mobile search bar breaks iOS search input focusing with keyboard
  // https://github.com/jquery/jquery-mobile/issues/3016
  useEffect(() => {
    searchCacheVar(search)
  }, [search])

  useOnMount(() => {
    searchCache &&
      searchUsers({
        variables: {
          loginSearch: searchUsersQueryString(searchCache),
        },
      })
  })

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
              node?.owner.__typename === 'User' && (
                <Link
                  href={getProfilePath(node.owner.login)}
                  passHref
                  key={node.owner.id}
                >
                  <MenuItem {...menu} className='search-item' as='a'>
                    <ProfileIcon
                      className='search-item-img'
                      url={node.owner.avatarUrl as string | undefined}
                      userLogin={node.owner.login}
                      size={48}
                    />
                    <div className='search-item-text'>
                      <div className='search-item-headline'>
                        <b className='search-item-login'>{node.owner.login}</b>
                        {following.includes(node.owner.login) && (
                          <>
                            <Middot />
                            <TextInfo>Following</TextInfo>
                          </>
                        )}
                      </div>
                      {node.owner?.name && (
                        <TextDeemph className='search-item-byline'>
                          {node.owner.name}
                        </TextDeemph>
                      )}
                    </div>
                  </MenuItem>
                </Link>
              )
            )
          })}
      </Menu>
    </SearchBoxStyles>
  )
}

export const SearchBox = React.forwardRef(SearchBoxBase)
