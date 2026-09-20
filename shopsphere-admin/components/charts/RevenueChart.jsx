export default function RevenueChart() {
  return (
    <section className="chart-card">
      <div className="chart-card-header">
        <div>
          <p className="stat-label">Revenue</p>
          <h3>$108,240</h3>
        </div>
        <span>Monthly</span>
      </div>
      <div className="chart-placeholder chart-lines">
        <div className="line-point" />
        <div className="line-point" />
        <div className="line-point" />
        <div className="line-point" />
        <div className="line-point" />
      </div>
      <div className="chart-footer">
        <span>Conversion +12%</span>
        <span>Orders 642</span>
      </div>
    </section>
  )
}
