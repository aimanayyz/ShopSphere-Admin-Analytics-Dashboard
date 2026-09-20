import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const success = auth.login({ email, password })
    if (!success) {
      setError('Invalid email or password. Try admin@shopsphere.com / admin123')
    }
  }

  useEffect(() => {
    if (auth.user) navigate('/', { replace: true })
  }, [auth.user, navigate])

  return (
    <div className="login-page">
      <div className="login-card login-card--split">
        <div className="login-visual" aria-hidden>
          <div className="visual-overlay">
            <h2>Welcome back</h2>
            <p>Manage your store — orders, inventory, and analytics in one place.</p>
          </div>
          <div className="float-shape shape-1" />
          <div className="float-shape shape-2" />
        </div>

        <div className="login-form-wrapper">
          <div className="brand-row">
            <div className="brand-small">SS</div>
            <h1>ShopSphere</h1>
          </div>
          <p className="login-text">Sign in to access your ecommerce dashboard and manage store activity.</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@shopsphere.com"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="admin123"
                required
              />
            </label>
            {error && <p className="login-error">{error}</p>}
            <div className="login-actions">
              <button className="button button-primary" type="submit">
                Sign in
              </button>
            </div>
          </form>
          <p style={{ marginTop: 18, color: 'var(--muted)', fontSize: 13 }}>
            Demo account: admin@shopsphere.com / admin123
          </p>
        </div>
      </div>
    </div>
  )
}
