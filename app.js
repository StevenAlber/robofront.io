

const counters = document.querySelectorAll('[data-count]');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const el = entry.target;
      const target = Number(el.dataset.count || 0);
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){ el.textContent = target.toLocaleString(); observer.unobserve(el); return; }
      let start = 0;
      const duration = 800;
      const startTime = performance.now();
      const tick = (now)=>{
        const progress = Math.min((now-startTime)/duration, 1);
        const eased = 1 - Math.pow(1-progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if(progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.unobserve(el);
    }
  });
},{threshold:0.4});
counters.forEach(el=>observer.observe(el));

/* ---- Access form: FormSubmit relay (no backend needed) ---- */
const ROBOFRONT_EMAIL = 'partners@robofront.io';   // <- change here if the inbox changes
const form = document.querySelector('.briefing-form');
const statusEl = form ? form.querySelector('.form-status') : null;
function setStatus(msg, kind){
  if(!statusEl) return;
  statusEl.textContent = msg;
  statusEl.className = 'form-status ' + (kind||'');
  statusEl.hidden = false;
}
form?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  if(form._honey && form._honey.value) return;          // bot caught
  const btn = form.querySelector('button[type=submit]');
  const data = new FormData(form);
  data.append('_subject', 'Robofront access request \u2014 ' + (data.get('interest')||''));
  data.append('_captcha', 'false');
  data.append('_template', 'table');
  btn.disabled = true; const label = btn.textContent; btn.textContent = 'Sending\u2026';
  setStatus('Sending your request\u2026', '');
  try{
    const res = await fetch('https://formsubmit.co/ajax/' + ROBOFRONT_EMAIL, {
      method:'POST', headers:{'Accept':'application/json'}, body:data
    });
    if(!res.ok) throw new Error('http '+res.status);
    form.reset();
    setStatus('Request received. The desk will be in touch shortly.', 'ok');
  }catch(err){
    setStatus('Could not send right now \u2014 email ' + ROBOFRONT_EMAIL + ' directly.', 'err');
  }finally{
    btn.disabled = false; btn.textContent = label;
  }
});

/* ---- Product CTAs: preselect Interest, then jump to the form ---- */
document.querySelectorAll('[data-interest]').forEach(a=>{
  a.addEventListener('click', ()=>{
    const sel = form ? form.querySelector('select[name=interest]') : null;
    if(sel){
      const want = a.getAttribute('data-interest');
      [...sel.options].forEach(o=>{ if(o.text.trim()===want) sel.value=o.value; });
    }
    setTimeout(()=>{ form?.querySelector('input[name=name]')?.focus({preventScroll:true}); }, 600);
  });
});

  
/* ---- Mobile nav toggle ---- */
const menuBtn=document.querySelector('.menu-toggle');
const siteNav=document.querySelector('.site-nav');
if(menuBtn&&siteNav){
  menuBtn.setAttribute('aria-expanded','false');
  const setOpen=(o)=>{
    siteNav.classList.toggle('open',o);
    menuBtn.setAttribute('aria-expanded',o?'true':'false');
    menuBtn.textContent=o?'\u2715':'\u2630';
    menuBtn.setAttribute('aria-label',o?'Close navigation':'Open navigation');
  };
  menuBtn.addEventListener('click',(e)=>{e.stopPropagation();setOpen(!siteNav.classList.contains('open'));});
  siteNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
  document.addEventListener('click',(e)=>{if(siteNav.classList.contains('open')&&!siteNav.contains(e.target)&&e.target!==menuBtn)setOpen(false);});
  document.addEventListener('keydown',(e)=>{if(e.key==='Escape')setOpen(false);});
}


/* ---- Shenzhen live clock (command bar) ---- */
const szClock=document.querySelector('[data-shenzhen-clock]');
if(szClock){
  const tick=()=>{
    const t=new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'Asia/Shanghai'});
    szClock.textContent='SHENZHEN '+t;
  };
  tick(); setInterval(tick,30000);
}

/* ---- Access page: preselect Interest from ?interest= ---- */
(function(){
  const sel=document.querySelector('.briefing-form select[name=interest]');
  if(!sel) return;
  const want=new URLSearchParams(location.search).get('interest');
  if(want){ [...sel.options].forEach(o=>{ if(o.text.trim()===want) sel.value=o.value; }); }
})();
