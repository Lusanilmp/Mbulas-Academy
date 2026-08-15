# Mbula's Academy — Maths & Science Made Easy

Phase 1 build: the public landing page (marketing site + demo-data-driven previews).
Vanilla HTML/CSS/JS. No frameworks, no dependencies except two Google Fonts.

## What's in this folder

- `index.html` — full landing page: hero, about/founder, subjects, grade
  ladder + Learning Hub preview, gallery, premium (R15), private tutoring
  form, announcements, testimonials, FAQ, location, contact, footer,
  floating WhatsApp button, scroll-to-top.
- `style.css` — design tokens (colors/type/spacing as CSS variables) +
  fully responsive layout, tested down to 320px.
- `script.js` — nav toggle, grade-ladder filtering, FAQ accordion, form
  validation. Demo data is clearly labeled and lives at the top of the file.
- `assets/images`, `assets/videos`, `assets/icons` — empty; drop Mbula's
  real photos/video here and swap the `[CONTENT NEEDED]` placeholder blocks
  in `index.html`.

## Auth pages (Phase 4 — frontend only)

- `pages/register.html` — full validation: name, SA ID number (13 digits,
  valid birth date, Luhn checksum), email, SA phone format, grade, password
  strength, confirm match, terms checkbox.
- `pages/login.html` — email + password form, "remember me", forgot-password
  stub.
- `pages/dashboard.html` — placeholder shell so login leads somewhere real;
  full dashboard is Phase 7.
- `pages/auth.js` — all the logic above, heavily commented. **It does not
  store passwords or ID numbers anywhere, including localStorage** — only
  first name, email and grade are kept, purely to greet the learner on the
  dashboard stub. There is no real password check. This whole file is
  deleted and replaced by Supabase Auth in Phase 5.

## What's a placeholder right now

Search `index.html` for `[CONTENT NEEDED]` / `[CONFIGURATION NEEDED]`:
founder bio, exact street address, PayFast merchant details, social media
handles, real testimonials, and all photos/video. Nothing here was invented.

## Not built yet (next phases)

- `pages/learning.html`, `resources.html`, `classes.html`, `profile.html`,
  `payments.html`, `admin.html`
- Supabase auth + database (schema drafted, not implemented — `auth.js` is
  a clearly-labeled frontend-only stand-in, see below)
- PayFast integration (button currently shows a placeholder alert)
- Server-side payment/attendance/admin logic

## Colors

No brand artwork was supplied, so the red/green/blue identity was drawn
from the subject itself (exercise-book divider tabs) rather than invented
freely. Swap the hex values in `:root` in `style.css` if Mbula's real
brand colors differ — everything derives from those variables.
