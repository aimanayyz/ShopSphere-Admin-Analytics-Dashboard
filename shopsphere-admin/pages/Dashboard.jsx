import StatCard from '../components/cards/StatCard.jsx'
import ProductCard from '../components/cards/ProductCard.jsx'
import RevenueChart from '../components/charts/RevenueChart.jsx'
import CategoryChart from '../components/charts/CategoryChart.jsx'
import SalesChart from '../components/charts/SalesChart.jsx'
import OrdersTable from '../components/tables/OrdersTable.jsx'
import lunaImg from '../assets/luna.png'
import backpackImg from '../assets/backpack.png'

const stats = [
  { label: 'Total sales', value: '$79,420', change: '+14%' },
  { label: 'Orders placed', value: '642', change: '+8%' },
  { label: 'Returning customers', value: '3,842', change: '+5%' },
]

const products = [
  {
    name: 'Aurora Hoodie',
    price: '$48.00',
    stock: 26,
    sold: 92,
    image:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Luna Sneakers',
    price: '$78.00',
    stock: 11,
    sold: 64,
    image:
      lunaImg,
  },
  {
    name: 'Nova Backpack',
    price: '$39.00',
    stock: 35,
    sold: 47,
    image:
      backpackImg,
  },
]

export default function Dashboard() {
  return (
    <section className="dashboard-page">
      <div className="page-actions">
        <div>
          <h2>Live store insights</h2>
          <p>Quickly review orders, inventory, and revenue trends across your ecommerce store.</p>
        </div>
      </div>

      <div className="dashboard-banner">
        <div className="dashboard-banner-copy">
          <p className="eyebrow">Ecommerce dashboard</p>
          <h3>Turn browsing into sales with an ecommerce-optimized store experience.</h3>
          <p>Track performance, manage inventory, and keep every customer journey smooth.</p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"
          alt="Ecommerce storefront overview"
        />
      </div>

      <div className="dashboard-grid stats-grid">
        {stats.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </div>

      <div className="dashboard-grid mid-grid">
        <RevenueChart />
        <SalesChart />
        <CategoryChart />
      </div>

      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <h3>Top products</h3>
            <p style={{ color: 'var(--muted)', marginTop: '6px' }}>
              Best-selling items this week.
            </p>
          </div>
        </div>

        <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <h3>Recent orders</h3>
            <p style={{ color: 'var(--muted)', marginTop: '6px' }}>
              Orders processed in the last 24 hours.
            </p>
          </div>
        </div>

        <OrdersTable />
      </section>
    </section>
  )
}
