import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import UserTable from '../components/tables/usertable.jsx'
import UserCard from '../components/cards/UserCard.jsx'
import Pagination from '../components/common/Pagination.jsx'
import initialUsers from '../data/users.js'

export default function Users() {
  const [users, setUsers] = useState(initialUsers)
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') || ''
  const [page, setPage] = useState(1)
  const perPage = 6

  useEffect(() => {
    setPage(1)
  }, [search])

  const filtered = useMemo(() => {
    if (!search) return users
    const q = search.toLowerCase()
    return users.filter(u => (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.role || '').toLowerCase().includes(q)
    ))
  }, [users, search])

  const pages = Math.max(1, Math.ceil(filtered.length / perPage))
  const start = (page - 1) * perPage
  const pageItems = filtered.slice(start, start + perPage)

  const [viewMode, setViewMode] = useState('cards')

  function handleDelete(email) {
    if (!confirm('Delete user ' + email + '?')) return
    setUsers(prev => prev.filter(u => u.email !== email))
  }

  function handleEdit(originalEmail, updated) {
    setUsers(prev => prev.map(u => (u.email === originalEmail ? { ...u, ...updated } : u)))
  }

  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState('')
  const [newRole, setNewRole] = useState('')
  const [newEmail, setNewEmail] = useState('')

  function handleAddUser(e) {
    e.preventDefault()
    if (!newName.trim() || !newEmail.trim()) return
    const user = { name: newName.trim(), role: newRole.trim() || 'Member', email: newEmail.trim() }
    setUsers(prev => [user, ...prev])
    setNewName(''); setNewRole(''); setNewEmail(''); setShowAdd(false)
  }

  return (
    <section className="dashboard-page">
      <div className="page-actions">
        <div>
          <h2>Users</h2>
          <p>See store team members, roles, and contact details in one place.</p>
        </div>
        <div>
          <input
            placeholder="Search users by name, email or role"
            value={search}
            onChange={e => setSearchParams({ search: e.target.value })}
            style={{ padding: '8px 12px', borderRadius: 12, border: '1px solid var(--border)' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div />
        <div>
          <button className="button button-primary" onClick={() => setShowAdd(s => !s)}>{showAdd ? 'Cancel' : 'Add user'}</button>
        </div>
      </div>

      {showAdd && (
        <form className="order-form" onSubmit={handleAddUser} style={{ marginBottom: 12 }}>
          <div className="order-form-row">
            <label>
              Name
              <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Full name" />
            </label>
            <label>
              Role
              <input value={newRole} onChange={e => setNewRole(e.target.value)} placeholder="Role (e.g. Support)" />
            </label>
            <label>
              Email
              <input value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="email@example.com" />
            </label>
          </div>
          <div className="order-form-actions">
            <button type="submit" className="button button-primary">Create user</button>
          </div>
        </form>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div />
        <div style={{ display: 'flex', gap: 12 }}>
          <button className={`button ${viewMode === 'table' ? 'button-secondary' : 'button-ghost'}`} onClick={() => setViewMode('table')}>Table</button>
          <button className={`button ${viewMode === 'cards' ? 'button-secondary' : 'button-ghost'}`} onClick={() => setViewMode('cards')}>Cards</button>
        </div>
      </div>

      <div className="dashboard-section">
        {viewMode === 'table' ? (
          <UserTable items={pageItems} onDelete={handleDelete} onEdit={handleEdit} />
        ) : (
          <div className="user-cards">
            {pageItems.map(u => (
              <UserCard key={u.email} user={u} onDelete={handleDelete} onEdit={handleEdit} />
            ))}
          </div>
        )}
      </div>

      <Pagination
        page={page}
        pages={pages}
        onPrevious={() => setPage(p => Math.max(1, p - 1))}
        onNext={() => setPage(p => Math.min(pages, p + 1))}
      />
    </section>
  )
}
