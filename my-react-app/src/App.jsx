import { Routes, Route, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './Navbar.jsx'
import Footer from './components/Footer.jsx'
import FloatingActions from './components/FloatingActions.jsx'
import Intro from './components/Intro.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import Gallery from './pages/Gallery.jsx'
import Blog from './pages/Blog.jsx'
import FAQ from './pages/FAQ.jsx'
import Booking from './pages/Booking.jsx'
import Admin from './pages/Admin.jsx'
import InstagramPage from './pages/InstagramPage.jsx'
import YouTubeChannel from './pages/YoutubeChannel.jsx'

const INTRO_KEY = 'digitaleye_intro_shown'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'
  const showBackHome = location.pathname !== '/'

  // Show the intro once per browser session (skips it on internal navigation
  // and on repeat visits within the same tab).
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !isAdmin && sessionStorage.getItem(INTRO_KEY) !== '1'
    } catch {
      return !isAdmin
    }
  })

  const completeIntro = () => {
    try { sessionStorage.setItem(INTRO_KEY, '1') } catch { /* ignore */ }
    setShowIntro(false)
  }

  return (
    <>
      {showIntro && <Intro onComplete={completeIntro} />}
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      {showBackHome && (
        <Link className="page-home-back" to="/" aria-label="Back to home" title="Back to home">
          <span aria-hidden="true">←</span>
        </Link>
      )}
      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/instagram" element={<InstagramPage />} />
          <Route path="/youtube" element={<YouTubeChannel />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingActions />}
    </>
  )
}
