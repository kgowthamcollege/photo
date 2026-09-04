import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogPosts, deckImages, faqs, galleryImages, INSTAGRAM, reels, services, reviews, YOUTUBE, youtubeVideos } from '../data/content.js'

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    deckImages.forEach(image => {
      const preloadImage = new Image()
      preloadImage.src = image.img
    })

    const timer = setInterval(() => {
      setActiveSlide(current => (current + 1) % deckImages.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index) => {
    setActiveSlide((index + deckImages.length) % deckImages.length)
  }

  return (
    <>
      <section className="hero">
        <div className="container">
          <div
            className="hero-visual"
            aria-label="Photography showcase"
          >
            <div className="hero-track">
              {deckImages.map((image, index) => (
                <div className={`hero-slide-panel ${index === activeSlide ? 'active' : ''}`} key={`${image.label}-${index}`}>
                  <div className="hero-slide">
                    <img src={image.img} alt={image.label} loading={index === 0 ? 'eager' : 'lazy'} />
                    <div className="hero-slide-caption">
                      <span className="hero-slide-num">{image.n}</span>
                      <span>{image.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="hero-dots" aria-label="Hero image slider controls">
              {deckImages.map((image, index) => (
                <button
                  key={`${image.label}-${index}`}
                  type="button"
                  className={index === activeSlide ? 'active' : ''}
                  aria-label={`Show ${image.label} slide`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>

          <div className="hero-copy-block">
            <div className="hero-eyebrow">
              <span>Chennai</span><span className="dot" /><span>Wedding</span>
              <span className="dot" /><span>Portrait</span><span className="dot" /><span>Film</span>
            </div>
            <h1>Photograph the <em>feeling.</em></h1>
            <p className="hero-copy">We don't just cover an event. We keep the tiny glances, loud laughs, soft chaos and all the people you wish you could pause forever.</p>
            <div className="hero-cta">
              <Link className="btn dark" to="/booking">Book a session ↗</Link>
              <Link className="btn light" to="/services">Explore services</Link>
            </div>
            <div className="hero-meta">
              <span>5.0 on Google</span><span>Candid + Traditional</span><span>Chennai & travel</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper2)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">Services</div>
              <h2>Choose your kind of story.</h2>
            </div>
            <p>Packages are shaped around the people, pace and scale of your day. We can combine photography, albums and films.</p>
          </div>
          <div className="services-container home-services-container">
            {services.slice(0, 3).map(s => (
              <div className="service-card" key={s.num}>
                <div className="service-image-wrap"><img src={s.img} alt={s.title} loading="lazy" /></div>
                <div className="service-glass-panel">
                  <div className="service-num-badge">{s.num}</div>
                  <div className="service-content"><h3>{s.title}</h3><p>{s.desc}</p></div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 30, textAlign: 'center' }}>
            <Link className="btn dark" to="/services">See all services</Link>
          </div>
        </div>
      </section>

      <section className="section instagram-reels-section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">Instagram</div>
              <h2>Fresh frames, first.</h2>
            </div>
            <Link className="btn light" to="/instagram">See all reels</Link>
          </div>
          <div className="instagram-reels-carousel" aria-label="Instagram Reels showcase">
            {reels.map((r, index) => (
              <a
                className="instagram-reel-card"
                key={r.title}
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View on Instagram: ${r.title}`}
              >
                <img src={r.img} alt={r.title} loading="lazy" />
                <span className="instagram-reel-topline">
                  <span>{String(index + 1).padStart(2, '0')} / {r.tag.split(' · ')[0].replace(' REEL', '')}</span>
                  <span>INSTAGRAM ↗</span>
                </span>
                <span className="instagram-reel-play" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
                <span className="instagram-reel-caption">
                  <strong>{index === 1 ? 'Golden Hour' : r.title}</strong>
                  <span>WATCH ON INSTAGRAM · REEL</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper2)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">YouTube</div>
              <h2>Stories in motion.</h2>
            </div>
            <Link className="btn light" to="/youtube">Visit channel</Link>
          </div>
          <div className="instagram-video-grid">
            {youtubeVideos.map((v, i) => (
              <a
                className="instagram-video-card"
                key={v.title}
                href={YOUTUBE}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch on YouTube: ${v.title}`}
              >
                <img src={v.img} alt={v.title} loading="lazy" />
                <span className="instagram-video-play" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
                <span className="instagram-video-caption">
                  <span>Video 0{i + 1}</span>
                  <strong>{v.title}</strong>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div>
            <div className="kicker">About DIGITALEYE</div>
            <div className="about-big">Quiet eyes.<br /><span className="serif">Fast cameras.</span></div>
          </div>
          <div className="about-text">
            <p>We are a Chennai photography studio built around observation. The goal isn't to make every image look identical — it's to make your images feel like your people, your rhythm and your day.</p>
            <p>That means stepping in when you need direction, disappearing when the moment needs room, and editing the final gallery with enough restraint that the memory stays believable.</p>
            <div className="signature">— DIGITALEYE Photography</div>
            <div className="about-notes">
              <div className="note"><strong>01 · Easy on people</strong><span>We help nervous people relax before the camera starts working.</span></div>
              <div className="note"><strong>02 · Built for print</strong><span>Albums, wall frames and digital galleries are considered from the start.</span></div>
              <div className="note"><strong>03 · Chennai + travel</strong><span>Available across the city and for selected destinations outside Chennai.</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper2)' }}>
        <div className="container">
          <div className="reviews-head">
            <div>
              <div className="kicker">Reviews · 5.0 on Google</div>
              <h2>Kind words from<br /><span className="serif">real clients.</span></h2>
            </div>
            <a className="google-link" href="https://www.google.com/maps/contrib/103660943324240107802/reviews/" target="_blank" rel="noopener noreferrer">
              <span className="g-dot">G</span> Read all Google reviews ↗
            </a>
          </div>
          <div className="review-grid">
            {reviews.map(r => (
              <div className="review-card" key={r.name}>
                <div className="review-stars">★★★★★</div>
                <div className="review-quote">"{r.quote}"</div>
                <div className="review-bottom">
                  <div className="avatar">{r.avatar}</div>
                  <div><div className="review-name">{r.name}</div><div className="review-role">Google review</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper2)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">Gallery</div>
              <h2>Real frames from real days.</h2>
            </div>
            <Link className="btn light" to="/gallery">View full gallery</Link>
          </div>
          <div className="gallery-grid">
            {galleryImages.slice(0, 4).map((img, i) => (
              <div className="gallery-item" key={`${img.alt}-${i}`}>
                <img src={img.src} alt={img.alt} loading="lazy" />
                <span className="label">{img.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">Journal</div>
              <h2>Notes from the studio.</h2>
            </div>
            <Link className="btn light" to="/blog">Read more</Link>
          </div>
          <div className="blog-grid">
            {blogPosts.slice(0, 3).map(p => (
              <Link className="blog-card" key={p.id} to="/blog" aria-label={`Read: ${p.title}`}>
                <div className="blog-thumb">
                  <img src={p.img} alt={p.title} loading="lazy" />
                  <span className="blog-tag">{p.tag}</span>
                </div>
                <div className="blog-body">
                  <div className="blog-meta">{p.meta}</div>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="blog-more">Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper2)' }}>
        <div className="container">
          <div className="section-head" style={{ marginBottom: 26 }}>
            <div>
              <div className="kicker">FAQ</div>
              <h2>Questions people ask before booking.</h2>
            </div>
            <Link className="btn light" to="/faq">See all answers</Link>
          </div>
          <div className="faq-list">
            {faqs.slice(0, 4).map((f, i) => (
              <div className={`faq${openFaq === i ? ' open' : ''}`} key={f.q}>
                <button
                  className="faq-q"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {f.q}<span>+</span>
                </button>
                <div className="faq-a"><div><p>{f.a}</p></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container location-grid">
          <div className="location-copy">
            <div className="kicker">Find us</div>
            <h3>Chennai,<br /><em className="serif">Tamil Nadu.</em></h3>
            <p>We're based in Chennai. Message ahead and we'll share the exact studio pin and parking details.</p>
            <div style={{ marginTop: 22 }}>
              <a className="btn dark" href="https://maps.google.com/?q=13.0672245,80.2113067" target="_blank" rel="noopener noreferrer">Open in Google Maps ↗</a>
            </div>
          </div>
          <div className="map-box" aria-label="Chennai studio approximate map">
            <div className="pin" />
            <div className="map-label">DIGITALEYE Photography · Chennai</div>
          </div>
        </div>
      </section>
    </>
  )
}
