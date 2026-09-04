# DIGITALEYE Photography — React Site

A multi-page React port of the original single-page site, built with Vite + React Router.

## Pages
- `/` — Home (hero, manifesto, services preview, about, reviews, location)
- `/services` — Full services grid
- `/gallery` — Filterable image gallery with lightbox
- `/blog` — Journal list with a full-article reader
- `/faq` — Accordion FAQ
- `/admin` — Password-gated dashboard for booking enquiries (password: `eye`)

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Notes
- The booking popup (appears ~3s after page load) and the Admin dashboard both read/write
  the same `localStorage` key, so bookings submitted through the popup show up on `/admin`
  in the same browser.
- All content (services, blog posts, FAQs, reviews, gallery images) lives in
  `src/data/content.js` — edit that file to update copy or images without touching components.
- Images are hot-linked from the original site's Unsplash/CDN URLs; swap in your own
  photography by replacing the URLs in `content.js`.
