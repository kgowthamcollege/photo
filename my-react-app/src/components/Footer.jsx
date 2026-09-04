import { Link } from 'react-router-dom'
import { LOGO, WHATSAPP, STUDIO_PHONE_DISPLAY, STUDIO_EMAIL, INSTAGRAM } from '../data/content.js'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <span className="brand-logo-lockup">
              <img src={LOGO} alt="DIGITALEYE Photography" className="brand-logo brand-logo-base" />
              <img src={LOGO} alt="" aria-hidden="true" className="brand-logo brand-logo-text" />
            </span>
            <p>Wedding, birthday, outdoor, cultural and event photography in Chennai. Light, held still.</p>
          </div>
          <div className="foot-col">
            <h4>Explore</h4>
            <Link to="/gallery">Gallery</Link>
            <Link to="/services">Services</Link>
            <Link to="/blog">Journal</Link>
            <Link to="/instagram">Instagram</Link>
            <Link to="/youtube">YouTube</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/booking">Book a session</Link>
            <Link to="/">Home</Link>
          </div>
          <div className="foot-col">
            <h4>Reach us</h4>
            <a href={`tel:+${STUDIO_PHONE_DISPLAY.replace(/\D/g, '')}`}>{STUDIO_PHONE_DISPLAY}</a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href={`mailto:${STUDIO_EMAIL}`}>{STUDIO_EMAIL}</a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <div className="copy">
          <span>© {new Date().getFullYear()} DIGITALEYE Photography</span>
          <span className="asteroic-credit">
            <a href="https://asteroic.com" target="_blank" rel="noopener noreferrer">Powered by asteroic</a>
            <a className="asteroic-logo-link" href="https://asteroic.com" target="_blank" rel="noopener noreferrer" aria-label="Visit asteroic.com">
              <img src="/asteroic-logo.svg" alt="Asteroic" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
