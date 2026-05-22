// =========================================================
// Module 1 Full Lesson Site JS (Clean)
// Goals: small, readable, teaches DOM + events + form handling
// =========================================================

console.log('app.js loaded ✅');

// 1) Highlight active nav link based on current file
(() => {
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path) a.setAttribute('aria-current', 'page');
  });
})();

// 2) Theme tweak demo: cycles accent colors by updating CSS variables
(() => {
  const btn = document.querySelector('[data-action="cycle-accent"]');
  if (!btn) return;

  const accents = [
    ['#5aa7ff', '#8b5cf6'], // blue/purple
    ['#22c55e', '#06b6d4'], // green/cyan
    ['#f97316', '#ef4444'], // orange/red
    ['#eab308', '#f43f5e']  // yellow/pink
  ];

  let i = 0;
  btn.addEventListener('click', () => {
    i = (i + 1) % accents.length;
    document.documentElement.style.setProperty('--accent', accents[i][0]);
    document.documentElement.style.setProperty('--accent-2', accents[i][1]);
  });
})();

// 3) Contact form: keep built-in validation, show success + echo key fields
(() => {
  const form = document.getElementById('contactForm');
  const out = document.getElementById('formOutput');
  if (!form || !out) return;

  form.addEventListener('submit', (e) => {
    // If invalid, the browser shows validation UI automatically.
    if (!form.checkValidity()) return;

    e.preventDefault();

    const data = new FormData(form);
    const firstName = (data.get('firstName') || '').trim();
    const lastName  = (data.get('lastName')  || '').trim();
    const email     = (data.get('email')     || '').trim();
    const subject   = (data.get('subject')   || '').trim();

    const fullName = `${firstName} ${lastName}`.trim();

    out.hidden = false;
    out.innerHTML = `
      <h2 class="notice-title">Submission received ✅</h2>
      <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p class="muted small">Demo note: No server yet — this is just showing what the browser captured.</p>
    `;

    form.reset();

    clearTimeout(out._timer);
    out._timer = setTimeout(() => {
      out.hidden = true;
      out.innerHTML = '';
    }, 8000);
  });

  function escapeHtml(str) {
    return String(str)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }
})();
