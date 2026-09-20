import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const navItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'Analytics', to: '/analytics' },
  { label: 'Orders', to: '/orders' },
  { label: 'Products', to: '/products' },
  { label: 'Users', to: '/users' },
]

export default function Sidebar() {
  const auth = useAuth()

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-brand-group">
        <img
          className="brand-logo"
          src="https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=128&q=80"
          alt="ShopSphere logo"
        />
        <div>
          <div className="dashboard-brand">ShopSphere</div>
        </div>
      </div>

      <nav className="dashboard-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `dashboard-link${isActive ? ' active' : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="dashboard-sidebar-footer">
        <div className="sidebar-cta">
          <p>Logged in as</p>
          <strong>{auth.user?.name || 'Admin'}</strong>
        </div>
        <button className="button button-secondary" onClick={auth.logout}>
          Logout
        </button>
      </div>
    </aside>
  )
}
