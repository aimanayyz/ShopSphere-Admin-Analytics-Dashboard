import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import OrdersTable from '../components/tables/OrdersTable.jsx'
import Pagination from '../components/common/Pagination.jsx'

const initialOrders = [
  { id: '#4531', customer: 'Alice Johnson', status: 'Delivered', total: '$215.00' },
  { id: '#4527', customer: 'Daniel Reed', status: 'Preparing', total: '$139.50' },
  { id: '#4522', customer: 'Lina Patel', status: 'Processing', total: '$89.75' },
  { id: '#4518', customer: 'Marcus Lee', status: 'Cancelled', total: '$0.00' },
]

const statusSteps = ['Processing', 'Preparing', 'Delivered', 'Cancelled']

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders)
  const [showForm, setShowForm] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [orderTotal, setOrderTotal] = useState('$0.00')
  const [orderStatus, setOrderStatus] = useState('Processing')
  const [nextId, setNextId] = useState(4532)

  const [searchParams] = useSearchParams()
  const searchQuery = (searchParams.get('search') || '').toLowerCase()

  const filteredOrders = orders.filter((order) => {
    if (!searchQuery) return true
    return (
      (order.id || '').toLowerCase().includes(searchQuery) ||
      (order.customer || '').toLowerCase().includes(searchQuery)
    )
  })

  const handleChangeStatus = (id) => {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== id) return order
        const index = statusSteps.indexOf(order.status)
        const nextStatus = statusSteps[(index + 1) % statusSteps.length]
        return { ...order, status: nextStatus }
      }),
    )
  }

  const handleDelete = (id) => {
    setOrders((current) => current.filter((order) => order.id !== id))
  }

  const handleCreateOrder = (event) => {
    event.preventDefault()
    if (!customerName.trim() || !orderTotal.trim()) return

    setOrders((current) => [
      {
        id: `#${nextId}`,
        customer: customerName.trim(),
        status: orderStatus,
        total: orderTotal,
      },
      ...current,
    ])

    setNextId((value) => value + 1)
    setCustomerName('')
    setOrderTotal('$0.00')
    setOrderStatus('Processing')
    setShowForm(false)
  }

  return (
    <section className="dashboard-page">
      <div className="page-actions">
        <div>
          <h2>Orders</h2>
          <p>Track, filter, and update customer orders in real time.</p>
        </div>
        <div className="button-group">
          <button className="button button-primary" onClick={() => setShowForm((value) => !value)}>
            {showForm ? 'Cancel' : 'New order'}
          </button>
        </div>
      </div>

      {showForm && (
        <form className="order-form" onSubmit={handleCreateOrder}>
          <div className="order-form-row">
            <label>
              Customer name
              <input
                type="text"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="Enter customer name"
                required
              />
            </label>
            <label>
              Total amount
              <input
                type="text"
                value={orderTotal}
                onChange={(event) => setOrderTotal(event.target.value)}
                placeholder="$120.00"
                required
              />
            </label>
            <label>
              Status
              <select value={orderStatus} onChange={(event) => setOrderStatus(event.target.value)}>
                {statusSteps.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="order-form-actions">
            <button type="submit" className="button button-primary">
              Add order
            </button>
            <button type="button" className="button button-secondary" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="dashboard-section">
        <OrdersTable
          items={filteredOrders}
          onChangeStatus={handleChangeStatus}
          onDelete={handleDelete}
        />
      </div>
      <Pagination />
    </section>
  )
}
