import { useState } from 'react'

export default function UserCard({ user, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({ name: user.name, role: user.role, email: user.email })

  function save() {
    onEdit && onEdit(user.email, draft)
    setEditing(false)
  }

  return (
    <article className="user-card">
      {editing ? (
        <div className="user-card-edit">
          <label>
            Name
            <input value={draft.name} onChange={e => setDraft(d => ({ ...d, name: e.target.value }))} />
          </label>
          <label>
            Role
            <input value={draft.role} onChange={e => setDraft(d => ({ ...d, role: e.target.value }))} />
          </label>
          <label>
            Email
            <input value={draft.email} onChange={e => setDraft(d => ({ ...d, email: e.target.value }))} />
          </label>
          <div className="user-card-actions">
            <button className="button button-primary button-sm" onClick={save}>Save</button>
            <button className="button button-secondary button-sm" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="user-card-body">
            <div className="avatar">{user.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
            <div>
              <h4>{user.name}</h4>
              <div className="muted">{user.role}</div>
              <div className="muted" style={{ marginTop: 6 }}>{user.email}</div>
            </div>
          </div>
          <div className="user-card-actions">
            <button className="button button-ghost" onClick={() => setEditing(true)}>Edit</button>
            <button className="button button-ghost" onClick={() => onDelete && onDelete(user.email)}>Delete</button>
          </div>
        </>
      )}
    </article>
  )
}
