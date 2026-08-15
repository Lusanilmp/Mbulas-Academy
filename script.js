/* =========================================================
   MBULA'S ACADEMY — SCRIPT
   Everything under "DEMO DATA" below is placeholder content
   for the frontend only. In Phase 5 these arrays are replaced
   by Supabase queries (subjects, lessons, exam_papers,
   announcements, testimonials tables).
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- DEMO DATA ---------------- */

  // Confirmed from the academy's own promotional poster: Mathematics, Physical
  // Science, Geography, Life Sciences. Chemistry appeared in the original brief
  // but isn't on the current poster, so it's left out until confirmed.
  const SUBJECTS = [
    { icon: '📐', name: 'Mathematics', color: 'var(--color-red)',
      desc: 'From algebra foundations to Paper 3 problem solving, built step by step.',
      grades: 'Grades 8–12' },
    { icon: '⚗️', name: 'Physical Science', color: 'var(--color-blue)',
      desc: 'Physics and chemistry principles explained with real, worked examples.',
      grades: 'Grades 10–12' },
    { icon: '🌍', name: 'Geography', color: 'var(--color-green)',
      desc: 'Physical and human geography, mapwork and data handling skills.',
      grades: 'Grades 8–12' },
    { icon: '🧬', name: 'Life Sciences', color: 'var(--color-orange)',
      desc: 'Biology concepts connected to real systems, from cells to ecosystems.',
      grades: 'Grades 10–12' },
  ];

  const GRADES = ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

  // Demo lessons/papers per grade — replace with lessons/exam_papers table queries.
  const HUB_DATA = {
    'Grade 8':  { lesson: 'Intro to Algebraic Expressions', paper: '2025 Term 2 Test — Mathematics', video: 'Understanding Integers' },
    'Grade 9':  { lesson: 'Solving Linear Equations', paper: '2025 Term 3 Test — Mathematics', video: 'Number Patterns Explained' },
    'Grade 10': { lesson: 'Trigonometric Ratios', paper: '2024 Paper 1 — Physical Science', video: 'Introduction to Motion' },
    'Grade 11': { lesson: 'Functions & Graphs', paper: '2024 Paper 2 — Mathematics', video: 'Newton\u2019s Laws in Practice' },
    'Grade 12': { lesson: 'Calculus: Rates of Change', paper: '2025 Paper 1 — Mathematics', video: 'Exam Technique: Paper 1' },
  };

  const ANNOUNCEMENTS = [
    // Confirmed real notice, from the academy's own promotional material.
    { icon: '📣', text: 'Grade 12 Matric Upgrade classes start 17 August 2026 for the November exam. Registration now open — Mon–Fri from 08:00 at Old Christ The King Primary School, Makwarela.', when: 'Confirmed' },
    // Demo entries below — replace once the admin dashboard is connected.
    { icon: '🔔', text: 'New Grade 12 Mathematics Paper 1 revision set now available.', when: '[DATE]' },
    { icon: '🔔', text: 'Premium members: new memorandums added to the Learning Hub.', when: '[DATE]' },
  ];

  // Clearly placeholder — do not treat as real feedback.
  const TESTIMONIALS = [
    { name: '[Student Name]', grade: 'Grade 11', quote: '[PLACEHOLDER — replace with a verified student testimonial.]' },
    { name: '[Student Name]', grade: 'Grade 9',  quote: '[PLACEHOLDER — replace with a verified student testimonial.]' },
    { name: '[Student Name]', grade: 'Grade 12', quote: '[PLACEHOLDER — replace with a verified student testimonial.]' },
  ];

  const FAQS = [
    { q: 'What grades does Mbula\u2019s Academy teach?', a: 'Grades 8 to 12, with Mathematics and Physical Science as the core focus.' },
    { q: 'Which subjects are offered?', a: 'Mathematics, Physical Science, Chemistry, Geography and Life Sciences, with more subjects planned.' },
    { q: 'How do I register?', a: 'Use the "Join the Academy" button to start registration. [Full registration flow ships in Phase 4.]' },
    { q: 'How does the R15 subscription work?', a: 'R15 unlocks premium resources — custom exam questions, revision packs and full memorandums. Payment is processed through PayFast.' },
    { q: 'Where is the academy located?', a: 'Old Christ The King Primary School, Makwarela. Use the "Get Directions" button in the Find Us section.' },
    { q: 'How do I contact Mbula?', a: 'Call 071 162 4028 or message the academy on WhatsApp using the floating chat button.' },
    { q: 'Can I request private tutoring?', a: 'Yes — use the Private Tutoring form to describe what you need help with and your subject and grade.' },
    { q: 'Can I access the academy from my phone?', a: 'Yes, the whole platform is built mobile-first and works on any phone, tablet or computer.' },
  ];

  /* ---------------- NAV ---------------- */
  const header = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');
  navToggle?.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('nav-open');
      navToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------- SUBJECT CARDS ---------------- */
  const subjectGrid = document.getElementById('subjectGrid');
  if (subjectGrid) {
    subjectGrid.innerHTML = SUBJECTS.map(s => `
      <div class="subject-card" style="--tab-color:${s.color}">
        <span class="subject-icon" aria-hidden="true">${s.icon}</span>
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
        <span class="subject-grades font-mono">${s.grades}</span>
        <a class="btn btn-outline" href="pages/learning.html?subject=${encodeURIComponent(s.name)}">Explore Subject</a>
      </div>
    `).join('');
  }

  /* ---------------- GRADE LADDER + LEARNING HUB PREVIEW ---------------- */
  const ladder = document.getElementById('gradeLadder');
  const hubPreview = document.getElementById('hubPreview');

  function renderHub(grade) {
    const data = HUB_DATA[grade];
    if (!hubPreview || !data) return;
    hubPreview.innerHTML = `
      <div class="hub-card">
        <span class="hub-card-label">Latest lesson</span>
        <h4>${data.lesson}</h4>
        <p>${grade} \u00b7 Mathematics</p>
      </div>
      <div class="hub-card">
        <span class="hub-card-label">Exam paper</span>
        <h4>${data.paper}</h4>
        <p>View or download from the full Learning Hub.</p>
      </div>
      <div class="hub-card">
        <span class="hub-card-label">Recommended video</span>
        <h4>${data.video}</h4>
        <p>Because you're in ${grade}.</p>
      </div>
    `;
  }

  if (ladder) {
    ladder.innerHTML = GRADES.map((g, i) => `
      <button class="grade-step" role="tab" data-grade="${g}" aria-selected="${i === GRADES.length - 1}">${g.replace('Grade ', 'G')}</button>
    `).join('');

    ladder.addEventListener('click', (e) => {
      const btn = e.target.closest('.grade-step');
      if (!btn) return;
      ladder.querySelectorAll('.grade-step').forEach(b => b.setAttribute('aria-selected', 'false'));
      btn.setAttribute('aria-selected', 'true');
      renderHub(btn.dataset.grade);
    });

    renderHub(GRADES[GRADES.length - 1]); // default: Grade 12
  }

  /* ---------------- ANNOUNCEMENTS ---------------- */
  const annList = document.getElementById('announcementList');
  if (annList) {
    annList.innerHTML = ANNOUNCEMENTS.map(a => `
      <div class="announcement-item${a.when === 'Confirmed' ? ' announcement-confirmed' : ''}">
        <span class="announcement-icon" aria-hidden="true">${a.icon}</span>
        <div><strong>${a.text}</strong><span>${a.when}</span></div>
      </div>
    `).join('');
  }

  /* ---------------- TESTIMONIALS ---------------- */
  const testGrid = document.getElementById('testimonialGrid');
  if (testGrid) {
    testGrid.innerHTML = TESTIMONIALS.map(t => `
      <div class="testimonial-card">
        <p>"${t.quote}"</p>
        <footer>${t.name} \u2014 ${t.grade}</footer>
      </div>
    `).join('');
  }

  /* ---------------- FAQ ACCORDION ---------------- */
  const faqList = document.getElementById('faqList');
  if (faqList) {
    faqList.innerHTML = FAQS.map((f, i) => `
      <div class="faq-item" id="faq-${i}">
        <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${i}">${f.q}</button>
        <div class="faq-answer" id="faq-answer-${i}"><p>${f.a}</p></div>
      </div>
    `).join('');

    faqList.addEventListener('click', (e) => {
      const q = e.target.closest('.faq-question');
      if (!q) return;
      const item = q.closest('.faq-item');
      const isOpen = item.classList.toggle('open');
      q.setAttribute('aria-expanded', String(isOpen));
    });
  }

  /* ---------------- TUTORING FORM (frontend validation demo) ---------------- */
  const tutForm = document.getElementById('tutoringForm');
  const tutStatus = document.getElementById('tutFormStatus');
  tutForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const subject = document.getElementById('tutSubject').value;
    const grade = document.getElementById('tutGrade').value;
    const message = document.getElementById('tutMessage').value.trim();

    if (!subject || !grade || message.length < 5) {
      tutStatus.textContent = 'Please fill in subject, grade and a short description.';
      tutStatus.className = 'form-status error';
      return;
    }

    // DEMO ONLY — no backend connected yet. Phase 5 posts to tutoring_requests.
    tutStatus.textContent = `Thanks! Your ${subject} request for ${grade} has been noted. (Demo — not yet sent to Mbula.)`;
    tutStatus.className = 'form-status success';
    tutForm.reset();
  });

  /* ---------------- PREMIUM SUBSCRIBE (demo placeholder) ---------------- */
  document.getElementById('subscribeBtn')?.addEventListener('click', () => {
    alert('PayFast checkout is not yet connected. [CONFIGURATION NEEDED: PayFast merchant ID, verified server-side before granting premium access.]');
  });

  /* ---------------- SCROLL TO TOP ---------------- */
  const scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    const show = window.scrollY > 480;
    scrollBtn.hidden = false; // keep in DOM for transition
    scrollBtn.classList.toggle('visible', show);
  }, { passive: true });

  scrollBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
