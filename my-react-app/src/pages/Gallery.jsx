import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { galleryImages } from '../data/content.js'

export default function Gallery() {
  const categories = useMemo(() => ['All', ...new Set(galleryImages.map(g => g.category))], [])
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedCategory = searchParams.get('category')
  const [filter, setFilter] = useState(() => categories.includes(requestedCategory) ? requestedCategory : 'All')
  const [active, setActive] = useState(null)

  const items = filter === 'All' ? galleryImages : galleryImages.filter(g => g.category === filter)

  useEffect(() => {
    document.body.classList.toggle('lock', !!active)
  }, [active])

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setActive(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="kicker">Gallery</div>
          <h1>Frames from real days.</h1>
          <p>A mix of weddings, portraits, cultural coverage and events — filter by category or tap any image to view it larger.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="gallery-filter">
            {categories.map(c => (
              <button key={c} className={c === filter ? 'active' : ''} onClick={() => { setFilter(c); c === 'All' ? setSearchParams({}) : setSearchParams({ category: c }) }}>{c}</button>
            ))}
          </div>
          <div className="gallery-grid">
            {items.map((img, i) => (
              <div className="gallery-item" key={i} onClick={() => setActive(img)}>
                <img src={img.src} alt={img.alt} loading="lazy" />
                <span className="label">{img.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={`lightbox${active ? ' open' : ''}`} onClick={() => setActive(null)}>
        <button className="lb-close" aria-label="Close image" onClick={() => setActive(null)}>×</button>
        {active && <img src={active.src} alt={active.alt} onClick={e => e.stopPropagation()} />}
      </div>
    </>
  )
}
