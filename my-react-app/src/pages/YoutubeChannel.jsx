import { youtubeVideos, YOUTUBE, WHATSAPP } from '../data/content.js'

export default function YouTubeChannel() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="kicker">On YouTube</div>
          <h1>Films, in motion.</h1>
          <p>Wedding highlights, behind-the-scenes stories and event films — the moving companion to the photo galleries. Subscribe on YouTube to catch new uploads first.</p>
          <div className="hero-cta" style={{ marginTop: 24 }}>
            <a className="btn dark" href={YOUTUBE} target="_blank" rel="noopener noreferrer">Visit our YouTube channel ↗</a>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 10 }}>
        <div className="container">
          <div className="blog-grid">
            {youtubeVideos.map((v, i) => (
              <a
                className="blog-card"
                key={v.title}
                href={YOUTUBE}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch on YouTube: ${v.title}`}
              >
                <div className="blog-thumb">
                  <img src={v.img} alt={v.title} loading="lazy" />
                  <span className="blog-tag">Video 0{i + 1}</span>
                  <span style={{
                    position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', zIndex: 2,
                  }}>
                    <span style={{
                      width: 58, height: 58, borderRadius: '50%', background: 'rgba(10,8,6,.55)',
                      display: 'grid', placeItems: 'center', color: '#fff',
                    }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                    </span>
                  </span>
                </div>
                <div className="blog-body">
                  <div className="blog-meta">{v.meta}</div>
                  <h3>{v.title}</h3>
                  <span className="blog-more">Watch on YouTube →</span>
                </div>
              </a>
            ))}
          </div>

          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <p style={{ color: 'var(--muted)', fontSize: 13.5, marginBottom: 18 }}>
              Want a cinematic film alongside your photography coverage?
            </p>
            <a className="btn light" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Ask about video coverage ↗</a>
          </div>
        </div>
      </section>
    </>
  )
}
