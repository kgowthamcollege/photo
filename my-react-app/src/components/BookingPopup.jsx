import { useEffect, useState } from 'react'
import { WHATSAPP, shootTypes } from '../data/content.js'
import { saveBooking } from '../lib/booking.js'

const emptyForm = { name: '', phone: '', type: shootTypes[0], date: '', loc: '', msg: '' }

export default function BookingPopup({ onClose }) {
  const [form, setForm] = useState(emptyForm)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.body.classList.add('lock')
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.classList.remove('lock')
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [onClose])

  const update = (key) => (event) => {
    setForm(current => ({ ...current, [key]: event.target.value }))
  }

  const submit = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return

    const booking = { ...form, name: form.name.trim(), phone: form.phone.trim(), loc: form.loc.trim(), msg: form.msg.trim() }
    saveBooking(booking)
    setSubmitted(true)
  }

  const continueOnWhatsApp = () => {
    const lines = [
      'New booking enquiry — DIGITALEYE Photography', '',
      `Name: ${form.name}`, `Phone: ${form.phone}`, `Shoot type: ${form.type}`,
      form.date ? `Preferred date: ${form.date}` : '',
      form.loc ? `Location: ${form.loc}` : '',
      form.msg ? `Notes: ${form.msg}` : '',
    ].filter(Boolean)
    window.open(`${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener')
    onClose()
  }

  return (
    <div className="booking-popup open" role="dialog" aria-modal="true" aria-labelledby="popup-booking-title" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="booking-card">
        <button className="booking-close" type="button" onClick={onClose} aria-label="Close booking form">×</button>
        {submitted ? (
          <>
            <div className="booking-kicker">Enquiry saved</div>
            <h3 id="popup-booking-title">Let's plan your story.</h3>
            <p>Your details are saved. Continue on WhatsApp and we will reply with dates and pricing.</p>
            <button className="booking-submit" type="button" onClick={continueOnWhatsApp}>Continue on WhatsApp ↗</button>
            <button className="booking-later" type="button" onClick={onClose}>Maybe later</button>
          </>
        ) : (
          <>
            <div className="booking-kicker">Now booking</div>
            <h3 id="popup-booking-title">Let's plan your story.</h3>
            <p>Share a few details and we'll continue the conversation on WhatsApp.</p>
            <form onSubmit={submit}>
              <div className="booking-grid">
                <div className="booking-field">
                  <label htmlFor="popup-name">Name</label>
                  <input id="popup-name" value={form.name} onChange={update('name')} placeholder="Your name" required />
                </div>
                <div className="booking-field">
                  <label htmlFor="popup-phone">Phone</label>
                  <input id="popup-phone" type="tel" value={form.phone} onChange={update('phone')} placeholder="Your number" required />
                </div>
                <div className="booking-field">
                  <label htmlFor="popup-type">Shoot type</label>
                  <select id="popup-type" value={form.type} onChange={update('type')}>
                    {shootTypes.map(type => <option key={type}>{type}</option>)}
                  </select>
                </div>
                <div className="booking-field">
                  <label htmlFor="popup-date">Preferred date</label>
                  <input id="popup-date" type="date" value={form.date} onChange={update('date')} />
                </div>
                <div className="booking-field full">
                  <label htmlFor="popup-location">Location</label>
                  <input id="popup-location" value={form.loc} onChange={update('loc')} placeholder="Venue or area" />
                </div>
                <div className="booking-field full">
                  <label htmlFor="popup-message">Anything else?</label>
                  <textarea id="popup-message" value={form.msg} onChange={update('msg')} placeholder="Tell us about the occasion, guest count, or coverage needed." />
                </div>
              </div>
              <button className="booking-submit" type="submit">Save details ↗</button>
              <button className="booking-later" type="button" onClick={onClose}>Maybe later</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
