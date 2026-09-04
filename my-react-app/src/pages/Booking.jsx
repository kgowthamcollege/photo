import { useState } from 'react'
import { Link } from 'react-router-dom'
import { WHATSAPP, STUDIO_PHONE_DISPLAY, shootTypes } from '../data/content.js'
import { saveBooking } from '../lib/booking.js'

const emptyForm = { name: '', phone: '', type: shootTypes[0], date: '', loc: '', msg: '' }

export default function Booking() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)

  const update = (key) => (e) => {
    setForm(f => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors(er => ({ ...er, [key]: false }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = true
    if (!form.phone.trim()) next.phone = true
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (!validate()) return
    saveBooking(form)
    setSubmitted(form)
  }

  const continueOnWhatsApp = () => {
    if (!submitted) return
    const lines = [
      'New booking enquiry — DIGITALEYE Photography', '',
      `Name: ${submitted.name}`, `Phone: ${submitted.phone}`, `Shoot type: ${submitted.type}`,
      submitted.date ? `Preferred date: ${submitted.date}` : '',
      submitted.loc ? `Location: ${submitted.loc}` : '',
      submitted.msg ? `Notes: ${submitted.msg}` : '',
    ].filter(Boolean)
    window.open(`${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener')
  }

  const bookAnother = () => {
    setForm(emptyForm)
    setSubmitted(null)
  }

  if (submitted) {
    return (
      <section className="page-hero">
        <div className="container">
          <div className="kicker">Enquiry received</div>
          <h1>Thanks, {submitted.name.split(' ')[0]}.</h1>
          <p>We've saved your details. Send it over on WhatsApp and we'll reply with dates and pricing.</p>

          <div className="admin-item" style={{ maxWidth: 480, marginTop: 32 }}>
            <div className="admin-grid">
              <div><b>Shoot</b>{submitted.type}</div>
              <div><b>Phone</b>{submitted.phone}</div>
              <div><b>Date</b>{submitted.date || '—'}</div>
              <div><b>Location</b>{submitted.loc || '—'}</div>
            </div>
            {submitted.msg && <p style={{ marginTop: 10, color: 'var(--muted)', fontSize: 12 }}>{submitted.msg}</p>}
          </div>

          <div className="hero-cta" style={{ marginTop: 28 }}>
            <button className="btn dark" onClick={continueOnWhatsApp}>Continue on WhatsApp ↗</button>
            <button className="btn light" onClick={bookAnother}>Book another session</button>
          </div>
          <p style={{ marginTop: 24 }}>
            <Link to="/" style={{ color: 'var(--muted)', fontSize: 13 }}>← Back to home</Link>
          </p>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="kicker">Now booking</div>
          <h1>Let's plan your story.</h1>
          <p>Share a few details below and we'll continue the conversation on WhatsApp, or call us directly on {STUDIO_PHONE_DISPLAY}.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 10 }}>
        <div className="container">
          <form onSubmit={submit} style={{ maxWidth: 640 }}>
            <div className="booking-grid">
              <div className="booking-field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Your name"
                  style={errors.name ? { borderColor: 'var(--red)' } : undefined}
                />
              </div>
              <div className="booking-field">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={update('phone')}
                  placeholder="Your number"
                  style={errors.phone ? { borderColor: 'var(--red)' } : undefined}
                />
              </div>
              <div className="booking-field">
                <label htmlFor="type">Shoot type</label>
                <select id="type" value={form.type} onChange={update('type')}>
                  {shootTypes.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="booking-field">
                <label htmlFor="date">Preferred date</label>
                <input id="date" type="date" value={form.date} onChange={update('date')} />
              </div>
              <div className="booking-field full">
                <label htmlFor="loc">Location</label>
                <input id="loc" value={form.loc} onChange={update('loc')} placeholder="Venue or area" />
              </div>
              <div className="booking-field full">
                <label htmlFor="msg">Anything else?</label>
                <textarea id="msg" value={form.msg} onChange={update('msg')} placeholder="Tell us about the occasion, guest count, or coverage needed." />
              </div>
            </div>
            {(errors.name || errors.phone) && (
              <p style={{ color: 'var(--red)', fontSize: 13, marginBottom: 12 }}>Please add your name and phone number.</p>
            )}
            <button className="booking-submit" type="submit" style={{ maxWidth: 320 }}>Send enquiry</button>
          </form>
        </div>
      </section>
    </>
  )
}
