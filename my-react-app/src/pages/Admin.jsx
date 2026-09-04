import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ADMIN_PASSWORD } from '../data/content.js'
import { getBookings, removeBooking } from '../lib/booking.js'

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const [bookings, setBookings] = useState([])

  const refresh = () => setBookings(getBookings().sort((a, b) => b.ts - a.ts))

  useEffect(() => {
    if (!authed) return
    const timer = setTimeout(refresh, 0)
    return () => clearTimeout(timer)
  }, [authed])

  const submit = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  const waLink = (phone) => {
    const digits = (phone || '').replace(/\D/g, '')
    if (!digits) return ''
    return `https://wa.me/${digits.length === 10 ? '91' + digits : digits}`
  }

  if (!authed) {
    return (
      <div className="container">
        <div className="admin-gate">
          <div className="kicker">Private studio dashboard</div>
          <h1 style={{ fontFamily: '"Playfair Display",serif', fontSize: 32 }}>Admin sign in</h1>
          <form onSubmit={submit}>
            <input
              type="Digital@1999"
              placeholder="Password"
              value={pw}
              onChange={e => { setPw(e.target.value); setError(false) }}
              autoFocus
              autoComplete="current-password"
            />
            {error && <p style={{ color: 'var(--red)', fontSize: 13, marginBottom: 12 }}>Incorrect password.</p>}
            <button className="btn dark" type="submit" style={{ width: '100%' }}>Enter</button>
          </form>
          <p style={{ marginTop: 20 }}>
            <Link to="/" style={{ color: 'var(--muted)', fontSize: 13 }}>← Back to site</Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <div className="admin-bar">
        <div>
          <div className="kicker">Private studio dashboard</div>
          <h1 style={{ fontFamily: '"Playfair Display",serif', fontSize: 32 }}>Booking enquiries</h1>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 6 }}>Saved locally in this browser · {bookings.length} total</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="admin-logout" onClick={refresh}>Refresh</button>
        </div>
      </div>

      <div className="admin-list">
        {bookings.length === 0 && <div className="admin-empty">No booking enquiries saved in this browser.</div>}
        {bookings.map(b => (
          <div className="admin-item" key={b.ts}>
            <div className="admin-top">
              <div className="admin-name">{b.name}</div>
              <div className="admin-meta">{new Date(b.ts).toLocaleString()}</div>
            </div>
            <div className="admin-grid">
              <div><b>Shoot</b>{b.type}</div>
              <div><b>Phone</b>{b.phone}</div>
              <div><b>Date</b>{b.date || '—'}</div>
              <div><b>Time</b>{b.time || '—'}</div>
              <div style={{ gridColumn: '1/-1' }}><b>Location</b>{b.loc || '—'}</div>
            </div>
            {b.msg && <p style={{ marginTop: 10, color: 'var(--muted)', fontSize: 12 }}>{b.msg}</p>}
            <div className="admin-actions">
              {waLink(b.phone) && <a href={waLink(b.phone)} target="_blank" rel="noopener noreferrer">Reply on WhatsApp</a>}
              <button onClick={() => { removeBooking(b.ts); refresh() }}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
