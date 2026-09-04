import { reels, INSTAGRAM, WHATSAPP } from '../data/content.js'

export default function InstagramPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="kicker">On Instagram</div>
          <h1>Reels & fresh frames.</h1>
          <p>Short reels and recent shoots go up on Instagram first — a quicker, looser feed alongside the full galleries. Follow along for previews before the blog and gallery are updated.</p>
          <div className="hero-cta" style={{ marginTop: 24 }}>
            <a className="btn dark" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Follow @digitaleyes_photography ↗</a>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 10 }}>
        <div className="container">
          <div className="gallery-grid">
            {reels.map((r) => (
              <a
                className="gallery-item"
                key={r.title}
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View on Instagram: ${r.title}`}
              >
                <img src={r.img} alt={r.title} loading="lazy" />
                <span style={{
                  position: 'absolute', top: 10, right: 10, zIndex: 2, color: '#fff',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
                <span className="label">{r.title}</span>
              </a>
            ))}
          </div>

          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <p style={{ color: 'var(--muted)', fontSize: 13.5, marginBottom: 18 }}>
              See the full reel and every recent post on Instagram.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a className="btn dark" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Open Instagram ↗</a>
              <a className="btn light" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Ask us about a shoot</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
