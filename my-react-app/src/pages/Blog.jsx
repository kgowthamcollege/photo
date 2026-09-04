import { useEffect, useState } from 'react'
import { blogPosts, WHATSAPP, STUDIO_PHONE_DISPLAY } from '../data/content.js'

export default function Blog() {
  const [openId, setOpenId] = useState(null)
  const post = blogPosts.find(p => p.id === openId) || null

  useEffect(() => {
    document.body.classList.toggle('lock', !!post)
  }, [post])

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setOpenId(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="kicker">Journal</div>
          <h1>Notes from the studio.</h1>
          <p>Short, practical pieces on preparing for a shoot, choosing coverage and getting the most out of your gallery.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map(p => (
              <button className="blog-card" key={p.id} onClick={() => setOpenId(p.id)} aria-label={`Read: ${p.title}`}>
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
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className={`blog-modal${post ? ' open' : ''}`}>
        {post && (
          <article className="blog-read">
            <button className="blog-read-close" aria-label="Close article" onClick={() => setOpenId(null)}>×</button>
            <div className="blog-read-meta">{post.tag} · {post.meta}</div>
            <h3>{post.title}</h3>
            <img className="blog-read-hero" src={post.img} alt={post.title} />
            <div className="blog-read-body">
              {post.body.map((block, i) => (
                <div key={i}>
                  {block.h && <h4>{block.h}</h4>}
                  {block.p && <p>{block.p}</p>}
                  {block.list && <ul>{block.list.map((li, j) => <li key={j}>{li}</li>)}</ul>}
                </div>
              ))}
            </div>
            <div className="blog-read-cta">
              <a className="btn dark" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Ask us about your shoot →</a>
              <span>Or call {STUDIO_PHONE_DISPLAY}</span>
            </div>
          </article>
        )}
      </div>
    </>
  )
}
