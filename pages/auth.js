/* =========================================================
   MBULA'S ACADEMY — AUTH (FRONTEND DEMO ONLY)
   ---------------------------------------------------------
   IMPORTANT: This is Phase 4 frontend scaffolding, not real
   authentication. There is no server, no password hashing,
   no session security. Passwords and ID numbers are validated
   for format only and are NEVER persisted anywhere — not even
   to localStorage — because that would model an insecure
   pattern. Only non-sensitive demo profile fields (first name,
   grade, email) are stored, purely so the dashboard stub can
   greet the learner by name.

   In Phase 5 this entire file is replaced by Supabase Auth
   (supabase.auth.signUp / signInWithPassword), and the
   students table + row-level security take over from here.
   ========================================================= */

const DEMO_USER_KEY = 'mbulasAcademyDemoUser';   // { firstName, lastName, email, grade, registeredAt }
const DEMO_SESSION_KEY = 'mbulasAcademyDemoSession'; // { email }

/* ---------------- Validators ---------------- */

function validateName(value) {
  const v = value.trim();
  if (v.length < 2) return 'Enter at least 2 characters.';
  if (!/^[A-Za-z\u00C0-\u024F' -]+$/.test(v)) return 'Only letters, spaces and hyphens.';
  return '';
}

function validateEmail(value) {
  const v = value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email address.';
  return '';
}

function validatePhone(value) {
  const v = value.trim().replace(/\s|-/g, '');
  if (!/^(\+27|0)[0-9]{9}$/.test(v)) return 'Enter a valid SA number, e.g. 071 234 5678.';
  return '';
}

function validateGrade(value) {
  return value ? '' : 'Select a grade.';
}

// South African ID number: 13 digits, valid YYMMDD date, and a valid Luhn checksum.
function validateSAID(value) {
  const v = value.trim();
  if (!/^\d{13}$/.test(v)) return 'Must be exactly 13 digits.';

  const yy = parseInt(v.slice(0, 2), 10);
  const mm = parseInt(v.slice(2, 4), 10);
  const dd = parseInt(v.slice(4, 6), 10);
  if (mm < 1 || mm > 12) return 'Contains an invalid birth date.';
  const daysInMonth = new Date(2000 + yy, mm, 0).getDate();
  if (dd < 1 || dd > daysInMonth) return 'Contains an invalid birth date.';

  // Luhn checksum over all 13 digits.
  let sum = 0;
  for (let i = 0; i < 13; i++) {
    let digit = parseInt(v[i], 10);
    if (i % 2 !== 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  if (sum % 10 !== 0) return 'ID number checksum looks incorrect — please check it.';
  return '';
}

function validatePassword(value) {
  if (value.length < 8) return 'At least 8 characters.';
  if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) return 'Include at least one letter and one number.';
  return '';
}

function validateConfirm(password, confirm) {
  return password === confirm ? '' : 'Passwords do not match.';
}

/* ---------------- Field wiring helper ---------------- */

function wireField(inputEl, errorEl, validateFn, ...extraArgs) {
  if (!inputEl || !errorEl) return () => '';
  const run = () => {
    const msg = validateFn(inputEl.value, ...extraArgs);
    errorEl.textContent = msg;
    inputEl.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return msg;
  };
  inputEl.addEventListener('blur', run);
  return run;
}

/* ---------------- Demo storage helpers ---------------- */

function saveDemoUser(profile) {
  localStorage.setItem(DEMO_USER_KEY, JSON.stringify(profile));
}

function getDemoUser() {
  try {
    const raw = localStorage.getItem(DEMO_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function startDemoSession(email) {
  localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify({ email, at: Date.now() }));
}

function getDemoSession() {
  try {
    const raw = localStorage.getItem(DEMO_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function endDemoSession() {
  localStorage.removeItem(DEMO_SESSION_KEY);
}

/* ---------------- Registration page ---------------- */

function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  const fields = {
    firstName: document.getElementById('regFirstName'),
    lastName: document.getElementById('regLastName'),
    idNumber: document.getElementById('regIdNumber'),
    email: document.getElementById('regEmail'),
    phone: document.getElementById('regPhone'),
    grade: document.getElementById('regGrade'),
    password: document.getElementById('regPassword'),
    confirm: document.getElementById('regConfirm'),
    terms: document.getElementById('regTerms'),
  };
  const errors = {
    firstName: document.getElementById('err-regFirstName'),
    lastName: document.getElementById('err-regLastName'),
    idNumber: document.getElementById('err-regIdNumber'),
    email: document.getElementById('err-regEmail'),
    phone: document.getElementById('err-regPhone'),
    grade: document.getElementById('err-regGrade'),
    password: document.getElementById('err-regPassword'),
    confirm: document.getElementById('err-regConfirm'),
    terms: document.getElementById('err-regTerms'),
  };
  const status = document.getElementById('registerStatus');

  const checkFirstName = wireField(fields.firstName, errors.firstName, validateName);
  const checkLastName = wireField(fields.lastName, errors.lastName, validateName);
  const checkId = wireField(fields.idNumber, errors.idNumber, validateSAID);
  const checkEmail = wireField(fields.email, errors.email, validateEmail);
  const checkPhone = wireField(fields.phone, errors.phone, validatePhone);
  const checkGrade = wireField(fields.grade, errors.grade, validateGrade);
  const checkPassword = wireField(fields.password, errors.password, validatePassword);
  const checkConfirm = () => {
    const msg = validateConfirm(fields.password.value, fields.confirm.value);
    errors.confirm.textContent = msg;
    fields.confirm.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return msg;
  };
  fields.confirm?.addEventListener('blur', checkConfirm);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const results = [
      checkFirstName(), checkLastName(), checkId(),
      checkEmail(), checkPhone(), checkGrade(),
      checkPassword(), checkConfirm(),
    ];

    if (!fields.terms.checked) {
      errors.terms.textContent = 'You need to accept the terms to continue.';
      results.push('terms');
    } else {
      errors.terms.textContent = '';
    }

    const firstInvalid = results.find(r => r);
    if (firstInvalid) {
      status.textContent = 'Please fix the highlighted fields.';
      status.className = 'auth-status error';
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    // DEMO ONLY: no ID number or password is ever stored — see file header.
    saveDemoUser({
      firstName: fields.firstName.value.trim(),
      lastName: fields.lastName.value.trim(),
      email: fields.email.value.trim().toLowerCase(),
      grade: fields.grade.value,
      registeredAt: new Date().toISOString(),
    });

    status.textContent = 'Account created (demo). Redirecting to log in…';
    status.className = 'auth-status success';

    setTimeout(() => {
      window.location.href = `login.html?email=${encodeURIComponent(fields.email.value.trim())}&registered=1`;
    }, 900);
  });
}

/* ---------------- Login page ---------------- */

function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const emailField = document.getElementById('loginEmail');
  const passwordField = document.getElementById('loginPassword');
  const status = document.getElementById('loginStatus');

  if (params.get('email')) emailField.value = params.get('email');
  if (params.get('registered') === '1') {
    status.textContent = 'Account created. Log in below to continue (demo).';
    status.className = 'auth-status success';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailField.value.trim().toLowerCase();
    const emailErr = validateEmail(email);
    const pwErr = passwordField.value ? '' : 'Enter your password.';

    document.getElementById('err-loginEmail').textContent = emailErr;
    document.getElementById('err-loginPassword').textContent = pwErr;
    emailField.setAttribute('aria-invalid', emailErr ? 'true' : 'false');
    passwordField.setAttribute('aria-invalid', pwErr ? 'true' : 'false');
    if (emailErr || pwErr) {
      status.textContent = 'Please fix the highlighted fields.';
      status.className = 'auth-status error';
      return;
    }

    // DEMO ONLY: the password is never checked — there is nothing real to
    // check it against yet. Phase 5 replaces this with Supabase Auth.
    const demoUser = getDemoUser();
    if (!demoUser || demoUser.email !== email) {
      status.textContent = 'No demo account found for that email. Try registering first.';
      status.className = 'auth-status error';
      return;
    }

    startDemoSession(email);
    status.textContent = 'Logged in (demo). Redirecting…';
    status.className = 'auth-status success';
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 600);
  });
}

/* ---------------- Dashboard stub ---------------- */

function initDashboard() {
  const root = document.getElementById('dashRoot');
  if (!root) return;

  const session = getDemoSession();
  const user = getDemoUser();

  if (!session || !user || session.email !== user.email) {
    window.location.href = 'login.html';
    return;
  }

  document.getElementById('dashName').textContent = user.firstName;
  document.getElementById('dashGrade').textContent = user.grade;
  const gradeCard = document.getElementById('dashGradeCard');
  if (gradeCard) gradeCard.textContent = user.grade;

  document.getElementById('dashLogout')?.addEventListener('click', () => {
    endDemoSession();
    window.location.href = '../index.html';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initRegisterForm();
  initLoginForm();
  initDashboard();

  // Reuse the same mobile nav toggle pattern as the main site on auth pages.
  const header = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');
  navToggle?.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
});
