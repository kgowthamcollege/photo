import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LOGO, STUDIO_PHONE_DISPLAY, STUDIO_EMAIL, INSTAGRAM } from './data/content.js'

const links = [
  { to: '/gallery', label: 'Gallery' },
  { to: '/services', label: 'Services' },
  { to: '/blog', label: 'Journal' },
  { to: '/instagram', label: 'Instagram' },
  { to: '/youtube', label: 'YouTube' },
  { to: '/faq', label: 'FAQ' },
  { to: '/', label: 'Home', end: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('lock', open)
  }, [open])

  return (
    <>
      <nav className={`site-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <NavLink to="/" className="brand" aria-label="DIGITALEYE Photography home">
            <span className="brand-logo-lockup">
              <img src={LOGO} alt="DIGITALEYE Photography" className="brand-logo brand-logo-base" />
              <img src={LOGO} alt="" aria-hidden="true" className="brand-logo brand-logo-text" />
            </span>
          </NavLink>
          <div className="nav-links">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => isActive ? 'active' : ''}>
                {l.label}
              </NavLink>
            ))}
          </div>
          <div className="nav-actions">
            <NavLink className="nav-btn" to="/booking">Book a session</NavLink>
            <button className="menu-btn" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(o => !o)}>
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`sheet${open ? ' open' : ''}`} aria-hidden={!open}>
        <div className="sheet-inner">
          <div className="sheet-top">
            <span className="sheet-eyebrow">Menu</span>
            <button className="sheet-close" aria-label="Close menu" onClick={() => setOpen(false)}>×</button>
          </div>
          <nav className="sheet-links" aria-label="Main menu">
            <NavLink to="/" end onClick={() => setOpen(false)}><i>01</i>Home</NavLink>
            <NavLink to="/gallery" onClick={() => setOpen(false)}><i>02</i>Gallery</NavLink>
            <NavLink to="/services" onClick={() => setOpen(false)}><i>03</i>Services</NavLink>
            <NavLink to="/blog" onClick={() => setOpen(false)}><i>04</i>Journal</NavLink>
            <NavLink to="/instagram" onClick={() => setOpen(false)}><i>05</i>Instagram</NavLink>
            <NavLink to="/youtube" onClick={() => setOpen(false)}><i>06</i>YouTube</NavLink>
            <NavLink to="/faq" onClick={() => setOpen(false)}><i>07</i>FAQ</NavLink>
            <NavLink to="/booking" onClick={() => setOpen(false)}><i>08</i>Book a session</NavLink>
          </nav>
          <aside className="sheet-side">
            <div className="sheet-block">
              <small>Get in touch</small>
              <a href={`tel:+${STUDIO_PHONE_DISPLAY.replace(/\D/g, '')}`}>{STUDIO_PHONE_DISPLAY}</a>
              <a href={`mailto:${STUDIO_EMAIL}`}>{STUDIO_EMAIL}</a>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
            <div className="sheet-block">
              <small>Studio</small>
              <p>Chennai, Tamil Nadu<br />Weddings · Birthdays · Outdoor · Cultural · Events</p>
            </div>
            <NavLink className="btn dark sheet-cta" to="/booking" onClick={() => setOpen(false)}>
              Plan your shoot →
            </NavLink>
          </aside>
        </div>
      </div>
    </>
  )
}
