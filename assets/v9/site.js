(() => {
  const d = document, root = d.documentElement, ko = root.lang === 'ko';
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');

  // situation picker (home): show the plan for the chosen situation; without script every plan stays visible
  const plans = [...d.querySelectorAll('[data-plan]')];
  if (plans.length) {
    const show = v => plans.forEach(p => { p.hidden = p.dataset.plan !== v; });
    d.querySelectorAll('input[name="sit"]').forEach(r => r.addEventListener('change', () => show(r.value)));
    show((d.querySelector('input[name="sit"]:checked') || {}).value || 'a');
  }

  // header rule and back-to-top button (motion 5)
  const top = d.getElementById('top'), totop = d.getElementById('totop');
  const onScroll = () => { const y = scrollY; top && top.classList.toggle('scrolled', y > 8); totop && totop.classList.toggle('show', y > 900); };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if (totop) totop.addEventListener('click', () => {
    scrollTo({ top: 0, behavior: still ? 'auto' : 'smooth' });
    const h1 = d.querySelector('h1'); if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
  });

  // copy e-mail
  const copy = d.getElementById('copy'), mail = d.getElementById('mail');
  if (copy && mail) {
    const label = copy.textContent;
    copy.addEventListener('click', () => {
      const done = () => { copy.textContent = ko ? '복사했습니다' : 'Copied'; setTimeout(() => copy.textContent = label, 1800); };
      const fallback = () => { const r = d.createRange(); r.selectNodeContents(mail); const s = getSelection(); s.removeAllRanges(); s.addRange(r); copy.textContent = ko ? '선택됨, 복사하세요' : 'Selected, copy it'; };
      try { navigator.clipboard.writeText(mail.textContent).then(done, fallback); } catch (e) { fallback(); }
    });
  }

  // only one video plays at a time
  d.addEventListener('play', e => d.querySelectorAll('video').forEach(v => { if (v !== e.target) v.pause(); }), true);

  if (still || !('IntersectionObserver' in window)) return;

  // motion 1: card lamps light red, amber, green (0.5s each)
  const lamps = [...d.querySelectorAll('#lamps .lamp')];
  lamps.forEach(l => l.classList.remove('lit'));
  lamps.forEach((l, i) => setTimeout(() => l.classList.add('lit'), 350 + i * 450));

  // motion 2: blocks rise 16px as they enter (0.5s); content is visible at rest
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  d.querySelectorAll('.rise').forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in'); else io.observe(el); });

  // motion 4: numbers count up once (0.6s)
  const fmt = n => n.toLocaleString(ko ? 'ko-KR' : 'en-US');
  const count = el => { const end = +el.dataset.count, t0 = performance.now(), dur = 600;
    const step = t => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(Math.round(end * e)); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step); };
  const nio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { count(e.target); nio.unobserve(e.target); } }), { threshold: .6 });
  d.querySelectorAll('[data-count]').forEach(el => nio.observe(el));
})();
