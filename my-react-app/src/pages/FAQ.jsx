import { useState } from 'react'
import { faqs } from '../data/content.js'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="kicker">FAQ</div>
          <h1>A few things clients ask.</h1>
          <p>Still unsure? Message us on WhatsApp or call and we'll answer directly.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div className={`faq${openIndex === i ? ' open' : ''}`} key={f.q}>
                <button
                  className="faq-q"
                  aria-expanded={openIndex === i}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  {f.q}<span>+</span>
                </button>
                <div className="faq-a"><div><p>{f.a}</p></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
