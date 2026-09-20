import { useState } from 'react'

export default function UserTable({ items = [], onDelete, onEdit }) {
  const [editing, setEditing] = useState(null)
  const [draft, setDraft] = useState({ name: '', role: '', email: '' })

  function startEdit(user) {
    setEditing(user.email)
    setDraft({ name: user.name, role: user.role, email: user.email })
  }

  function cancelEdit() {
    setEditing(null)
    setDraft({ name: '', role: '', email: '' })
  }

  function saveEdit(originalEmail) {
    onEdit && onEdit(originalEmail, { ...draft })
    cancelEdit()
  }

  return (
    <div className="users-table">
      <div className="table-row table-row--head">
        <span>Name</span>
        <span>Role</span>
        <span>Email</span>
        <span>Actions</span>
      </div>
      {items.map((user) => (
        <div key={user.email} className="table-row">
          {editing === user.email ? (
            <>
              <span>
                <input value={draft.name} onChange={e => setDraft(d => ({ ...d, name: e.target.value }))} />
              </span>
              <span>
                <input value={draft.role} onChange={e => setDraft(d => ({ ...d, role: e.target.value }))} />
              </span>
              <span>
                <input value={draft.email} onChange={e => setDraft(d => ({ ...d, email: e.target.value }))} />
              </span>
              <span>
                <button className="button button-primary button-sm" onClick={() => saveEdit(user.email)}>Save</button>
                <button className="button button-secondary button-sm" onClick={cancelEdit}>Cancel</button>
              </span>
            </>
          ) : (
            <>
              <span>{user.name}</span>
              <span>{user.role}</span>
              <span>{user.email}</span>
              <span>
                <button type="button" className="button button-ghost" onClick={() => startEdit(user)}>Edit</button>
                <button
                  type="button"
                  className="button button-ghost"
                  onClick={() => onDelete && onDelete(user.email)}
                >
                  Delete
                </button>
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
