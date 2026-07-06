document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Terminal typing effect ---------- */
  const query = `SELECT name, role, status FROM data_scientists WHERE name = 'Dalmas Otieno Owino';`;
  const typedEl = document.getElementById('typedQuery');
  const resultEl = document.getElementById('queryResult');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function typeQuery() {
    if (!typedEl) return;

    if (prefersReducedMotion) {
      typedEl.textContent = query;
      resultEl.classList.add('show');
      return;
    }

    let i = 0;
    const speed = 28;
    function step() {
      if (i <= query.length) {
        typedEl.textContent = query.slice(0, i);
        i++;
        setTimeout(step, speed);
      } else {
        setTimeout(() => resultEl.classList.add('show'), 250);
      }
    }
    step();
  }
  typeQuery();

  /* ---------- Pipeline nav: scroll spy + progress bar ---------- */
  const sections = document.querySelectorAll('main .section, .hero');
  const navLinks = document.querySelectorAll('.pipeline-nav__stages a');
  const progressBar = document.getElementById('pipelineProgress');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  sections.forEach(sec => { if (sec.id) spyObserver.observe(sec); });

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = `${pct}%`;
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- Skill bars reveal on scroll ---------- */
  const skillBars = document.querySelectorAll('.skill-bar');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(bar => barObserver.observe(bar));

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = document.querySelectorAll(
    '.hero__copy, .terminal, .about-content, .photo-frame, .fact-table, .skills-table, .job-card, .chart-mock, .connect-terminal, .footer'
  );
  revealTargets.forEach(target => target.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -10% 0px' });

  revealTargets.forEach(target => revealObserver.observe(target));

});
