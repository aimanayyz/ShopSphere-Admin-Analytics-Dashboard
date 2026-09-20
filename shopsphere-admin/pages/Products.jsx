import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/cards/ProductCard.jsx'
import lunaImg from '../assets/luna.png'
import backpackImg from '../assets/backpack.png'
import watchImg from '../assets/watch.svg'
import Pagination from '../components/common/Pagination.jsx'

const initialProducts = [
  {
    id: 'p1',
    name: 'Aurora Hoodie',
    price: '$48.00',
    stock: 26,
    sold: 92,
    image:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'p2',
    name: 'Luna Sneakers',
    price: '$78.00',
    stock: 11,
    sold: 64,
    image: lunaImg,
  },
  {
    id: 'p3',
    name: 'Nova Backpack',
    price: '$39.00',
    stock: 35,
    sold: 47,
    image: backpackImg,
  },
  {
    id: 'p4',
    name: 'Stellar Watch',
    price: '$128.00',
    stock: 14,
    sold: 23,
    image:
      watchImg,
  },
]

export default function Products() {
  const [products, setProducts] = useState(initialProducts)
  const [searchParams, setSearchParams] = useSearchParams()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState(0)
  const [image, setImage] = useState('')

  const handleDelete = (id) => {
    setProducts((current) => current.filter((product) => product.id !== id))
  }

  const handleStockChange = (id, newStock) => {
    setProducts((current) => current.map((product) => (product.id === id ? { ...product, stock: newStock } : product)))
  }

  const handleAddProduct = (event) => {
    event.preventDefault()
    if (!name.trim() || !price.trim()) return

    const newProduct = {
      id: `p${Date.now()}`,
      name: name.trim(),
      price: price.trim(),
      stock: Number(stock),
      sold: 0,
      image: image || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    }

    setProducts((current) => [newProduct, ...current])
    setName('')
    setPrice('')
    setStock(0)
    setImage('')
    const params = new URLSearchParams(searchParams)
    params.delete('add')
    setSearchParams(params)
  }

  const searchValue = searchParams.get('search') ?? ''
  const showFilters = searchParams.get('showFilters') === '1'
  const stockStatus = searchParams.get('stockStatus') ?? 'all'
  const page = Math.max(1, Number(searchParams.get('page') ?? '1'))
  const showAddForm = searchParams.get('add') === '1'

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchValue.toLowerCase())
      const matchesStatus =
        stockStatus === 'all' ||
        (stockStatus === 'in' && product.stock > 5) ||
        (stockStatus === 'low' && product.stock > 0 && product.stock <= 5) ||
        (stockStatus === 'out' && product.stock === 0)
      return matchesSearch && matchesStatus
    })
  }, [products, searchValue, stockStatus])

  const itemsPerPage = 4
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage))
  const normalizedPage = Math.min(page, totalPages)
  const visibleProducts = filteredProducts.slice((normalizedPage - 1) * itemsPerPage, normalizedPage * itemsPerPage)

  useEffect(() => {
    if (page > totalPages) {
      const params = new URLSearchParams(searchParams)
      params.set('page', '1')
      setSearchParams(params)
    }
  }, [page, totalPages, searchParams, setSearchParams])

  const toggleAddProduct = () => {
    const params = new URLSearchParams(searchParams)
    if (params.get('add') === '1') {
      params.delete('add')
    } else {
      params.set('add', '1')
    }
    params.set('page', '1')
    setSearchParams(params)
  }

  const setStockFilter = (value) => {
    const params = new URLSearchParams(searchParams)
    params.set('stockStatus', value)
    params.set('page', '1')
    setSearchParams(params)
  }

  const goToPage = (newPage) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(newPage))
    setSearchParams(params)
  }

  const totalProducts = products.length
  const totalStock = useMemo(() => products.reduce((sum, item) => sum + item.stock, 0), [products])

  return (
    <section className="dashboard-page">
      <div className="page-actions">
        <div>
          <h2>Products</h2>
          <p>Manage product inventory, pricing, and stock status across categories.</p>
        </div>
        <div className="button-group">
          <button className="button button-primary" onClick={toggleAddProduct}>
            {showAddForm ? 'Cancel' : 'Add product'}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="product-filter-panel">
          <label>
            Stock status
            <select value={stockStatus} onChange={(event) => setStockFilter(event.target.value)}>
              <option value="all">All products</option>
              <option value="in">In stock</option>
              <option value="low">Low stock</option>
              <option value="out">Out of stock</option>
            </select>
          </label>
        </div>
      )}

      <div className="dashboard-grid stats-grid">
        <div className="stat-card">
          <p className="stat-label">Total products</p>
          <h2 className="stat-value">{totalProducts}</h2>
          <span className="stat-change">Inventory overview</span>
        </div>
        <div className="stat-card">
          <p className="stat-label">Total stock</p>
          <h2 className="stat-value">{totalStock}</h2>
          <span className="stat-change">Available units</span>
        </div>
      </div>

      {showAddForm && (
        <form className="order-form" onSubmit={handleAddProduct}>
          <div className="order-form-row">
            <label>
              Product name
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Nova Watch" />
            </label>
            <label>
              Price
              <input value={price} onChange={(event) => setPrice(event.target.value)} placeholder="$99.00" />
            </label>
            <label>
              Stock
              <input type="number" min="0" value={stock} onChange={(event) => setStock(Number(event.target.value))} />
            </label>
          </div>
          <div className="order-form-row">
            <label>
              Image URL
              <input value={image} onChange={(event) => setImage(event.target.value)} placeholder="Optional image URL" />
            </label>
          </div>
          <div className="order-form-actions">
            <button type="submit" className="button button-primary">
              Create product
            </button>
          </div>
        </form>
      )}

      <div className="dashboard-grid stats-grid product-grid">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            {...product}
            onDelete={handleDelete}
            onStockChange={handleStockChange}
          />
        ))}
      </div>

      <Pagination
        page={normalizedPage}
        pages={totalPages}
        onPrevious={() => goToPage(normalizedPage - 1)}
        onNext={() => goToPage(normalizedPage + 1)}
      />
    </section>
  )
}
