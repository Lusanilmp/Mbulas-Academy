# Mbula’s Academy

Static HTML/CSS/JavaScript site hosted on Netlify from the main branch.

## Learning Hub

Open `pages/learning.html`. The public hub includes 16 supplementary starter lessons (Grades 8–12), worked examples, one self-check per lesson, 16 flashcards, 16 downloadable text sheets, six externally hosted videos, grade/subject/search/saved filters, completion tracking, dark mode, a focus timer, a task planner, a map-scale calculator and study notes. Video playback is click-to-load using YouTube privacy-enhanced embeds and stays on the page. External providers control availability and embedding permissions.

`assets/learning-data.js` owns lesson content; matching revision sheets are in `assets/resources/`. These are original supplementary notes, not official past papers or a complete curriculum. Official DBE and WCED collections are linked separately. Senior science subjects start at Grade 10; junior Geography supports Social Sciences. The six-video starter collection covers algebra, trigonometry, Newton’s laws, Grade 12 mapwork and Grade 12 genetics. Empty states explain unavailable subject videos.

Progress, bookmarks, tasks, notes and theme are stored in the current browser only. No account sync or server-backed learning records. Export controls allow students to keep local copies; clearing browser data clears local records. Storage failures are handled without blocking access.

Existing registration and login pages remain explicitly labelled frontend demos, not real authentication. The former dashboard directs to the free hub. Premium payments are not connected; enquiries open WhatsApp and require the visitor to press Send. Do not gate paid content using localStorage. Real accounts and paid access need server-backed authentication and verified PayFast notifications.

Check syntax with `node --check assets/learning.js`, `node --check assets/learning-data.js`, `node --check script.js`. Serve the repository root for local preview.

## Resource attribution

Videos are embedded from their original Mindset and Khan Academy YouTube channels; ownership remains with the creators. No video files are redistributed or charged for. Official papers: https://www.education.gov.za/Examinations/tabid/338/Default.aspx and https://wcedeportal.westerncape.gov.za/nsc-past-exam-papers-and-memos.

## Publishing status

Prepared 8 November 2026. The connected GitHub integration denied write access (403 Resource not accessible by integration), so these source changes have not been pushed or deployed. The archive is ready for a full static deployment. Publishing an upload without updating GitHub can be overwritten by the next production branch push.
