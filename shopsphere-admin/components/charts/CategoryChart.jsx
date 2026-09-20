const categories = [
  { label: 'Apparel', value: 42 },
  { label: 'Electronics', value: 28 },
  { label: 'Home goods', value: 18 },
  { label: 'Accessories', value: 12 },
]

export default function CategoryChart() {
  return (
    <section className="chart-card">
      <div className="chart-card-header">
        <div>
          <p className="stat-label">Categories</p>
          <h3>Top product mix</h3>
        </div>
      </div>
      <ul className="metric-list">
        {categories.map((item) => (
          <li key={item.label}>
            <strong>{item.label}</strong>
            <div className="progress-line">
              <div className="progress-fill" style={{ width: `${item.value}%` }} />
            </div>
            <span>{item.value}%</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
