import Sidebar from '../components/layouts/Sidebar.jsx'
import Navbar from '../components/layouts/Navbar.jsx'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <div className="dashboard-main">
        <Navbar />
        <div className="dashboard-header">
          <p className="dashboard-meta">Ecommerce admin</p>
          <h1>ShopSphere Control Center</h1>
          <p className="dashboard-intro">
            Everything your store needs in one modern, responsive admin experience.
          </p>
        </div>
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
