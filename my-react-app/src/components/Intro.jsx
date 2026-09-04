import { useEffect, useRef, useState } from 'react'

/**
 * Camera-lens intro overlay, ported from the original site.
 * Shows once when mounted: auto-opens after 2.4s, or on click / Enter / Space.
 * Sequence: click-pop on the lens -> white flash -> overlay fades out & unmounts.
 * Calls onComplete() once the overlay has fully finished (safe to unlock
 * scroll / start section reveals / schedule the booking popup at that point).
 */
export default function Intro({ onComplete }) {
  const introRef = useRef(null)
  const glassRingRef = useRef(null)
  const lensRef = useRef(null)
  const autoTimer = useRef(null)
  const openedRef = useRef(false)

  const [reduce] = useState(() => (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ))
  const [clicked, setClicked] = useState(false)
  const [flashOn, setFlashOn] = useState(false)
  const [flashFadeOut, setFlashFadeOut] = useState(false)
  const [done, setDone] = useState(false)
  const [removed, setRemoved] = useState(false)

  // Lock page scroll while the intro is showing
  useEffect(() => {
    if (removed) return
    document.body.classList.add('lock')
    return () => document.body.classList.remove('lock')
  }, [removed])

  const finish = () => {
    onComplete?.()
  }

  const openSite = () => {
    if (openedRef.current) return
    openedRef.current = true

    if (autoTimer.current) {
      clearTimeout(autoTimer.current)
      autoTimer.current = null
    }

    setClicked(true)

    setTimeout(() => {
      setFlashOn(true)

      setTimeout(() => {
        setDone(true)
        finish()
        setFlashOn(false)
        setFlashFadeOut(true)

        setTimeout(() => {
          setRemoved(true)
        }, 600)
      }, 150)
    }, 200)
  }

  // Reduced-motion visitors skip straight past the overlay
  useEffect(() => {
    if (!reduce) return
    finish()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce])

  // Auto-open after 2.4s + parallax tilt tracking, mouse only
  useEffect(() => {
    if (reduce || removed) return

    autoTimer.current = setTimeout(openSite, 2400)

    const onMove = (e) => {
      if (openedRef.current) return
      const w = window.innerWidth
      const h = window.innerHeight
      const x = (e.clientX - w / 2) / (w / 2)
      const y = (e.clientY - h / 2) / (h / 2)
      if (glassRingRef.current && lensRef.current) {
        glassRingRef.current.style.transform =
          `rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translate3d(${x * 8}px, ${y * 8}px, 0)`
        lensRef.current.style.transform = `translate3d(${x * 4}px, ${y * 4}px, 8px)`
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onMove)
      if (autoTimer.current) clearTimeout(autoTimer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, removed])

  const onMouseLeave = () => {
    if (openedRef.current) return
    if (glassRingRef.current) glassRingRef.current.style.transform = ''
    if (lensRef.current) lensRef.current.style.transform = ''
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openSite()
    }
  }

  if (reduce || removed) return null

  return (
    <>
      <div
        id="intro"
        ref={introRef}
        role="button"
        aria-label="Enter website"
        tabIndex={0}
        className={`${clicked ? 'click ' : ''}${done ? 'done' : ''}`.trim()}
        onClick={openSite}
        onKeyDown={onKeyDown}
        onMouseLeave={onMouseLeave}
      >
        <div className="glass-ring" ref={glassRingRef}>
          <div className="lens" ref={lensRef}>
            <svg className="iris-svg" viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                <linearGradient id="irisGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#7c7467" stopOpacity="0.6" />
                  <stop offset="0.5" stopColor="#3c3831" stopOpacity="0.5" />
                  <stop offset="1" stopColor="#161412" stopOpacity="0.65" />
                </linearGradient>
              </defs>
              <circle className="ring" cx="50" cy="50" r="46" />
              <g className="blades">
                <path className="blade" d="M50 6 A44 44 0 0 1 88 28 A26 26 0 0 0 50 6 Z" />
                <path className="blade" d="M50 6 A44 44 0 0 1 88 28 A26 26 0 0 0 50 6 Z" transform="rotate(60 50 50)" />
                <path className="blade" d="M50 6 A44 44 0 0 1 88 28 A26 26 0 0 0 50 6 Z" transform="rotate(120 50 50)" />
                <path className="blade" d="M50 6 A44 44 0 0 1 88 28 A26 26 0 0 0 50 6 Z" transform="rotate(180 50 50)" />
                <path className="blade" d="M50 6 A44 44 0 0 1 88 28 A26 26 0 0 0 50 6 Z" transform="rotate(240 50 50)" />
                <path className="blade" d="M50 6 A44 44 0 0 1 88 28 A26 26 0 0 0 50 6 Z" transform="rotate(300 50 50)" />
              </g>
            </svg>
            <div className="lens-glass" />
            <div className="lens-ring" />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p className="intro-brand">DIGITAL<em>EYE</em></p>
          <p className="intro-brand intro-subtitle">Photography</p>
        </div>
        <p className="intro-cap">Tap to enter</p>
      </div>
      <div id="flash" className={`${flashOn ? 'on ' : ''}${flashFadeOut ? 'fade-out' : ''}`.trim()} />
    </>
  )
}
