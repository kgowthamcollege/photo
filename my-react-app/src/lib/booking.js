import { BOOKINGS_KEY } from '../data/content.js'

export function getBookings() {
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveBooking(booking) {
  const all = getBookings()
  all.push({ ...booking, ts: Date.now() })
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(all))
  } catch {
    /* storage unavailable */
  }
}

export function removeBooking(ts) {
  const all = getBookings().filter(b => b.ts !== ts)
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(all))
  } catch {
    /* storage unavailable */
  }
}
