import { useEffect, useState } from 'react'

export default function ProductCard({ id, name, price, stock, sold, image, onDelete, onStockChange }) {
  const [editing, setEditing] = useState(false)
  const [stockValue, setStockValue] = useState(stock)

  useEffect(() => {
    setStockValue(stock)
  }, [stock])

  return (
    <article className="product-card">
      <div className="product-card-image">
        <img src={image} alt={name} loading="lazy" />
      </div>
      <div className="product-card-top">
        <h3>{name}</h3>
        <span className="product-stock">{stock} left</span>
      </div>
      <p className="product-price">{price}</p>
      <p className="product-meta">{sold} sold this week</p>
      {(onDelete || onStockChange) && (
        <div className="product-card-actions">
          {editing ? (
            <div className="stock-edit-row">
              <input
                type="number"
                min="0"
                value={stockValue}
                onChange={(event) => setStockValue(Number(event.target.value))}
              />
              <button
                type="button"
                className="button button-primary button-sm"
                onClick={() => {
                  onStockChange?.(id, stockValue)
                  setEditing(false)
                }}
              >
                Save
              </button>
              <button
                type="button"
                className="button button-secondary button-sm"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="product-card-action-buttons">
              {onStockChange && (
                <button
                  type="button"
                  className="button button-secondary button-sm"
                  onClick={() => setEditing(true)}
                >
                  Edit stock
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  className="button button-danger button-sm"
                  onClick={() => onDelete(id)}
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </article>
  )
}
