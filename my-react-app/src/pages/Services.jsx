import { Link } from 'react-router-dom'
import { services } from '../data/content.js'

export default function Services() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="kicker">Services</div>
          <h1>Choose your kind of story.</h1>
          <p>Packages are shaped around the people, pace and scale of your day. We can combine photography, albums and films into one plan.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="services-container">
            {services.map(s => (
              <div className="service-card" key={s.num}>
                <div className="service-image-wrap"><img src={s.img} alt={s.title} loading="lazy" /></div>
                <div className="service-glass-panel">
                  <div className="service-num-badge">{s.num}</div>
                  <div className="service-content">
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <Link className="service-photos-link" to={`/gallery?category=${encodeURIComponent(s.title)}`} onClick={event => event.stopPropagation()}>View photos <span aria-hidden="true">↗</span></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <Link className="btn dark" to="/booking">Talk to us about a package ↗</Link>
          </div>
        </div>
      </section>
    </>
  )
}
