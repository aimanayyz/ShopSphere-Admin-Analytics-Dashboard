export default function SalesChart() {
  return (
    <section className="chart-card">
      <div className="chart-card-header">
        <div>
          <p className="stat-label">Sales</p>
          <h3>2,340</h3>
        </div>
        <span>Weekly</span>
      </div>
      <div className="chart-placeholder chart-bars">
        <div className="chart-bar bar-1" />
        <div className="chart-bar bar-2" />
        <div className="chart-bar bar-3" />
        <div className="chart-bar bar-4" />
        <div className="chart-bar bar-5" />
      </div>
      <div className="chart-footer">
        <span>Online +18%</span>
        <span>Store -4%</span>
      </div>
    </section>
  )
}
