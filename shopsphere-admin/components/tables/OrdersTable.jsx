const orders = [
  { id: '#4531', customer: 'Alice Johnson', status: 'Delivered', total: '$215.00' },
  { id: '#4527', customer: 'Daniel Reed', status: 'Preparing', total: '$139.50' },
  { id: '#4522', customer: 'Lina Patel', status: 'Processing', total: '$89.75' },
  { id: '#4518', customer: 'Marcus Lee', status: 'Cancelled', total: '$0.00' },
]

function statusClass(status) {
  return `order-pill order-pill--${status.toLowerCase().replace(/\s+/g, '-')}`
}

export default function OrdersTable({ items = orders, onChangeStatus, onDelete }) {
  return (
    <div className="orders-table">
      <div className="orders-row orders-row--head orders-row--actions">
        <span>Order</span>
        <span>Customer</span>
        <span>Status</span>
        <span>Total</span>
        <span>Actions</span>
      </div>
      {items.map((order) => (
        <div key={order.id} className="orders-row orders-row--actions">
          <span>{order.id}</span>
          <span>{order.customer}</span>
          <span className={statusClass(order.status)}>{order.status}</span>
          <span>{order.total}</span>
          <span className="orders-actions">
            <button
              type="button"
              className="button button-secondary button-sm"
              onClick={() => onChangeStatus?.(order.id)}
            >
              Next status
            </button>
            <button
              type="button"
              className="button button-danger button-sm"
              onClick={() => onDelete?.(order.id)}
            >
              Delete
            </button>
          </span>
        </div>
      ))}
    </div>
  )
}
