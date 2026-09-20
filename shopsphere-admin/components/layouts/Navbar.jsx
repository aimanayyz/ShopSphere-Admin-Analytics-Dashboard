import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext.jsx'
import Button from '../ui/Button.jsx'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (location.pathname.startsWith('/products') || location.pathname.startsWith('/orders')) {
      setSearchQuery(params.get('search') || '')
    } else {
      setSearchQuery('')
    }
  }, [location])

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    const searchText = searchQuery.trim()
    const params = new URLSearchParams(location.search)
    if (searchText) {
      params.set('search', searchText)
    } else {
      params.delete('search')
    }
    params.set('page', '1')

    let target = '/products'
    if (location.pathname.startsWith('/orders')) {
      target = '/orders'
    } else if (location.pathname.startsWith('/products')) {
      target = '/products'
    } else if (location.pathname === '/' || location.pathname === '') {
      target = '/products'
    }

    navigate(`${target}?${params.toString()}`)
  }

  const toggleFilters = () => {
    const params = new URLSearchParams(location.search)
    if (location.pathname.startsWith('/orders')) {
      if (params.get('showFilters') === '1') params.delete('showFilters')
      else params.set('showFilters', '1')
      params.set('page', '1')
      navigate(`/orders?${params.toString()}`)
      return
    }

    // default: products
    if (params.get('showFilters') === '1') params.delete('showFilters')
    else params.set('showFilters', '1')
    params.set('page', '1')
    navigate(`/products?${params.toString()}`)
  }

  const toggleAddProduct = () => {
    const params = new URLSearchParams(location.search)
    if (location.pathname !== '/products') {
      params.set('add', '1')
    } else if (params.get('add') === '1') {
      params.delete('add')
    } else {
      params.set('add', '1')
    }
    params.set('page', '1')
    navigate(`/products?${params.toString()}`)
  }

  return (
    <header className="dashboard-topbar">
      <form className="topbar-search" onSubmit={handleSearchSubmit}>
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search products, orders, customers"
          aria-label="Search"
        />
      </form>
      <div className="button-group">
        <Button variant="secondary" onClick={toggleFilters}>
          Filters
        </Button>
        <Button variant="secondary" onClick={toggleTheme} aria-label="Toggle theme">
          <span className="theme-icon">{theme === 'dark' ? '☀' : '🌙'}</span>
        </Button>
        <Button variant="primary" onClick={toggleAddProduct}>
          Add product
        </Button>
      </div>
    </header>
  )
}
