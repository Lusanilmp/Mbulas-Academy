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
      desc: 'From algebra foundations to exam problem solving, built step by step.',
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
  const ANNOUNCEMENTS = [
    { icon: '•', text: 'The free Learning Hub is open: revision notes, self-check quizzes, downloadable sheets and study tools for Grades 8–12.', when: 'Learning resources' },
    { icon: '•', text: 'Contact the academy for current tutoring availability and matric upgrade registration details.', when: 'Enquiries' },
  ];

  // Clearly placeholder — do not treat as real feedback.
  const TESTIMONIALS = [
    { name: '[Student Name]', grade: 'Grade 11', quote: '[PLACEHOLDER — replace with a verified student testimonial.]' },
    { name: '[Student Name]', grade: 'Grade 9',  quote: '[PLACEHOLDER — replace with a verified student testimonial.]' },
    { name: '[Student Name]', grade: 'Grade 12', quote: '[PLACEHOLDER — replace with a verified student testimonial.]' },
  ];

  const FAQS = [
    { q: 'What grades does Mbula\u2019s Academy teach?', a: 'Grades 8 to 12, with Mathematics and Physical Science as the core focus.' },
    { q: 'Which subjects are offered?', a: 'Mathematics, Physical Science, Geography and Life Sciences. Geography for Grades 8–9 supports Social Sciences; Physical Science and Life Sciences resources start at Grade 10.' },
    { q: 'How do I register?', a: 'The free Learning Hub is open without signing in. For class registration and private tutoring, contact the academy on WhatsApp.' },
    { q: 'How does the R15 subscription work?', a: 'The proposed premium plan is R15 per month. Online checkout is not connected yet. Contact the academy to enquire; free Learning Hub materials are available now.' },
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
    if (!hubPreview) return;
    const g = grade.replace('Grade ', '');
    hubPreview.innerHTML = `
      <div class="hub-card"><span class="hub-card-label">Read &amp; practise</span><h4>${grade} revision lessons</h4><p>Clear explanations, worked examples and self-check questions.</p><a class="btn btn-outline" href="pages/learning.html?grade=${g}">Open lessons</a></div>
      <div class="hub-card"><span class="hub-card-label">Take it with you</span><h4>Download revision notes</h4><p>Keep a text copy for studying without a connection.</p><a class="btn btn-outline" href="pages/learning.html?grade=${g}&tab=resources">Get downloads</a></div>
      <div class="hub-card"><span class="hub-card-label">Watch &amp; learn</span><h4>Video learning library</h4><p>Preview curated lessons and watch inside the academy.</p><a class="btn btn-outline" href="pages/learning.html?grade=${g}&tab=videos">Browse videos</a></div>`;
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

    const url = 'https://wa.me/27711624028?text=' + encodeURIComponent(`Hi Mbula's Academy, I would like private tutoring.\nSubject: ${subject}\nGrade: ${grade}\nHelp needed: ${message}`);
    window.open(url, '_blank', 'noopener');
    tutStatus.replaceChildren();
    const fallback = document.createElement('a'); fallback.href = url; fallback.target = '_blank'; fallback.rel = 'noopener'; fallback.textContent = 'Open your request in WhatsApp and press Send.'; tutStatus.append(fallback);
    tutStatus.className = 'form-status success';
    tutForm.reset();
  });

  /* ---------------- PREMIUM SUBSCRIBE (demo placeholder) ---------------- */
  document.getElementById('subscribeBtn')?.addEventListener('click', () => {
    window.open('https://wa.me/27711624028?text=Hi%20Mbula%27s%20Academy%2C%20please%20tell%20me%20about%20the%20R15%20premium%20plan.', '_blank', 'noopener');
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
