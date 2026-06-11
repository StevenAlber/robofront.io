// ROBOFRONT Intelligence · v2.1
const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const mobileNav = document.querySelector('[data-mobile-nav]');

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
});

menuButton?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});
mobileNav?.querySelectorAll('a,button').forEach(el => el.addEventListener('click', () => {
  mobileNav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

// Reveal on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ---- Form modal ----
const FORMS = {
  brief: {
    kicker: 'THE FRONT BRIEF',
    title: 'Join the briefing list',
    sub: 'The weekly dispatch on China\u2019s robotics economy \u2014 concise, sourced, free.',
    submit: 'Subscribe',
    subject: 'ROBOFRONT \u2014 Front Brief subscription',
    fields: { org: false, role: false, msg: false }
  },
  introduction: {
    kicker: 'INTRODUCTION',
    title: 'Request an introduction',
    sub: 'Tell us who you are and what you are deciding \u2014 a named analyst replies personally.',
    submit: 'Request introduction',
    subject: 'ROBOFRONT \u2014 Introduction request',
    fields: { org: true, role: true, msg: true }
  },
  access: {
    kicker: 'DELEGATIONS \u00b7 ACCESS',
    title: 'Apply for field access',
    sub: 'Curated, application-only access to the Shenzhen ecosystem: showrooms, expos, suppliers, introductions.',
    submit: 'Apply for access',
    subject: 'ROBOFRONT \u2014 Field access application',
    fields: { org: true, role: true, msg: true }
  },
  trial: {
    kicker: 'CHINA ROBOTICS MONTHLY',
    title: 'Start a trial',
    sub: 'Structured monthly intelligence on shipments, manufacturers, pricing, and deployment signals.',
    submit: 'Request trial access',
    subject: 'ROBOFRONT \u2014 China Robotics Monthly trial',
    fields: { org: true, role: true, msg: false }
  },
  deepdive: {
    kicker: 'DEEP DIVES',
    title: 'Request access',
    sub: 'Quarterly long-form reports on humanoids, embodied AI, supply chains, and category leaders.',
    submit: 'Request access',
    subject: 'ROBOFRONT \u2014 Deep Dive access',
    fields: { org: true, role: true, msg: false }
  },
  briefing: {
    kicker: 'EXECUTIVE BRIEFINGS',
    title: 'Request a briefing',
    sub: 'Board-ready notes and diligence support, scoped to the decision in front of you.',
    submit: 'Request briefing',
    subject: 'ROBOFRONT \u2014 Executive briefing request',
    fields: { org: true, role: true, msg: true }
  }
};

const modal = document.querySelector('[data-modal]');
const mTitle = document.querySelector('[data-modal-title]');
const mKicker = document.querySelector('[data-modal-kicker]');
const mSub = document.querySelector('[data-modal-sub]');
const fSubject = document.querySelector('[data-f-subject]');
const fType = document.querySelector('[data-f-type]');
const fOrg = document.querySelector('[data-f-org]');
const fRole = document.querySelector('[data-f-role]');
const fMsg = document.querySelector('[data-f-msg]');
const fSubmit = document.querySelector('[data-f-submit]');
let lastFocus = null;

function openForm(key) {
  const cfg = FORMS[key];
  if (!cfg || !modal) return;
  lastFocus = document.activeElement;
  mKicker.textContent = cfg.kicker;
  mTitle.textContent = cfg.title;
  mSub.textContent = cfg.sub;
  fSubmit.textContent = cfg.submit;
  fSubject.value = cfg.subject;
  fType.value = cfg.title;
  fOrg.style.display = cfg.fields.org ? '' : 'none';
  fRole.style.display = cfg.fields.role ? '' : 'none';
  fMsg.style.display = cfg.fields.msg ? '' : 'none';
  modal.hidden = false;
  document.body.classList.add('modal-open');
  modal.querySelector('input[name="name"]').focus();
}
function closeModal() {
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  lastFocus?.focus();
}
document.querySelectorAll('[data-form]').forEach(el => {
  el.addEventListener('click', e => { e.preventDefault(); openForm(el.getAttribute('data-form')); });
});
document.querySelectorAll('[data-modal-close]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeLightbox(); } });

// ---- Lightbox ----
const lb = document.querySelector('[data-lightbox]');
const lbImg = document.querySelector('[data-lightbox-img]');
function closeLightbox() { if (lb) { lb.hidden = true; document.body.classList.remove('modal-open'); } }
document.querySelectorAll('.g-item').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    lbImg.src = a.getAttribute('href');
    lbImg.alt = a.querySelector('img')?.alt || '';
    lb.hidden = false;
    document.body.classList.add('modal-open');
  });
});
document.querySelector('[data-lightbox-close]')?.addEventListener('click', closeLightbox);
lb?.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
