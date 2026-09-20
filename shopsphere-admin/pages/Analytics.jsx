import RevenueChart from '../components/charts/RevenueChart.jsx'
import SalesChart from '../components/charts/SalesChart.jsx'
import CategoryChart from '../components/charts/CategoryChart.jsx'

export default function Analytics() {
  return (
    <section className="dashboard-page">
      <div className="page-actions">
        <div>
          <h2>Analytics</h2>
          <p>Analyze revenue performance, sales growth, and category trends.</p>
        </div>
      </div>
      <div className="dashboard-grid mid-grid">
        <RevenueChart />
        <SalesChart />
      </div>
      <div className="dashboard-grid stats-grid">
        <CategoryChart />
      </div>
    </section>
  )
}
