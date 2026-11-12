document.addEventListener('DOMContentLoaded', () => {
  // Active nav highlighting
  const navLinks = document.querySelectorAll('.nav-link[data-nav]');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((el) => el.classList.remove('is-active'));
      link.classList.add('is-active');
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isHidden = mobileDrawer.hasAttribute('hidden');
      if (isHidden) {
        mobileDrawer.removeAttribute('hidden');
        mobileToggle.setAttribute('aria-expanded', 'true');
      } else {
        mobileDrawer.setAttribute('hidden', '');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    mobileDrawer.querySelectorAll('a, button').forEach((item) => {
      item.addEventListener('click', () => {
        mobileDrawer.setAttribute('hidden', '');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Quote modal interactions
  const quoteModal = document.getElementById('quote-modal');
  const quoteForm = document.getElementById('quote-form');
  const quoteSuccess = document.getElementById('quote-success');
  const quoteSuccessMsg = document.getElementById('quote-success-msg');
  const productSelect = document.getElementById('quote-product-select');
  const closeQuoteBtn = document.getElementById('close-quote-btn');
  const doneQuoteBtn = document.getElementById('done-quote-btn');

  function openQuoteModal(productName) {
    if (!quoteModal) return;
    if (productName && productSelect) {
      productSelect.value = productName;
    }
    if (quoteForm && quoteSuccess) {
      quoteForm.hidden = false;
      quoteSuccess.hidden = true;
    }
    quoteModal.removeAttribute('hidden');
  }

  function closeQuoteModal() {
    if (!quoteModal) return;
    quoteModal.setAttribute('hidden', '');
  }

  document.querySelectorAll('[data-open-quote]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const product = btn.getAttribute('data-open-quote');
      openQuoteModal(product);
    });
  });

  if (closeQuoteBtn) closeQuoteBtn.addEventListener('click', closeQuoteModal);
  if (doneQuoteBtn) doneQuoteBtn.addEventListener('click', closeQuoteModal);
  if (quoteModal) {
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) closeQuoteModal();
    });
  }

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(quoteForm);
      const contact = data.get('contact') || 'Partner';
      const product = data.get('product') || 'Diesel Fuel';
      const emirate = data.get('emirate') || 'Dubai';

      if (quoteSuccessMsg) {
        quoteSuccessMsg.textContent = `Thank you, ${contact}. Our Dubai dispatch desk will contact you shortly with competitive rates for ${product} in ${emirate}.`;
      }
      quoteForm.hidden = true;
      if (quoteSuccess) quoteSuccess.hidden = false;
    });
  }

  // Search modal interactions
  const searchModal = document.getElementById('search-modal');
  const openSearchBtn = document.getElementById('open-search-btn');
  const closeSearchBtn = document.getElementById('close-search-btn');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  const isAboutPage = window.location.pathname.endsWith('about.html');
  const homePrefix = isAboutPage ? 'index.html' : '';

  const catalog = [
    { category: 'Company', title: 'About Dubai Diesel Trading LLC', href: 'about.html' },
    { category: 'Compliance', title: 'ISO 9001, 14001 & 45001 Certifications', href: 'about.html#certifications' },
    { category: 'Product', title: 'Ultra Low Sulfur Diesel (10ppm)', href: `${homePrefix}#services` },
    { category: 'Product', title: 'Industrial Gas Oil', href: `${homePrefix}#services` },
    { category: 'Product', title: 'Marine Gas Oil (MGO)', href: `${homePrefix}#services` },
    { category: 'Product', title: 'AdBlue & Fleet Lubricants', href: `${homePrefix}#services` },
    { category: 'Service', title: 'Bulk Fuel Delivery', href: `${homePrefix}#services` },
    { category: 'Service', title: 'Diesel Supply', href: `${homePrefix}#services` },
    { category: 'Service', title: 'Industrial Fuel', href: `${homePrefix}#services` },
    { category: 'Service', title: 'Marine Fuel', href: `${homePrefix}#services` },
    { category: 'Service', title: 'Generator Fuel', href: `${homePrefix}#services` },
    { category: 'Service', title: 'Bulk Fuel Supply', href: `${homePrefix}#services` },
    { category: 'Service', title: '24/7 Fleet Refueling', href: `${homePrefix}#services` },
    { category: 'Sector', title: 'Construction & Infrastructure', href: `${homePrefix}#sectors` },
    { category: 'Sector', title: 'Manufacturing & Warehousing', href: `${homePrefix}#sectors` },
    { category: 'Sector', title: 'Logistics & Heavy Transport', href: `${homePrefix}#sectors` },
    { category: 'Sector', title: 'Power Generation', href: `${homePrefix}#sectors` },
    { category: 'Sector', title: 'Marine & Port Operations', href: `${homePrefix}#sectors` },
  ];

  function renderSearch(query = '') {
    if (!searchResults) return;
    const q = query.trim().toLowerCase();
    const matches = catalog.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );

    if (!matches.length) {
      searchResults.innerHTML =
        '<p style="padding:20px;text-align:center;color:#64748b;font-size:13.5px;">No matching fuels or services found.</p>';
      return;
    }

    searchResults.innerHTML = matches
      .map(
        (item) => `
        <a href="${item.href}" class="search-result-item">
          <div>
            <small>${item.category}</small>
            <strong>${item.title}</strong>
          </div>
          <span>&rarr;</span>
        </a>`
      )
      .join('');

    searchResults.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => searchModal.setAttribute('hidden', ''));
    });
  }

  if (openSearchBtn && searchModal) {
    openSearchBtn.addEventListener('click', () => {
      searchModal.removeAttribute('hidden');
      renderSearch('');
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
    });
  }

  if (closeSearchBtn && searchModal) {
    closeSearchBtn.addEventListener('click', () => searchModal.setAttribute('hidden', ''));
  }

  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) searchModal.setAttribute('hidden', '');
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => renderSearch(e.target.value));
  }

  // Escape closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuoteModal();
      if (searchModal) searchModal.setAttribute('hidden', '');
    }
  });

  // Reusable horizontal carousel controller
  function initCarousel({ viewportSelector, itemSelector, prevBtnId, nextBtnId, dotsSelector, fallbackStep }) {
    const viewport = document.querySelector(viewportSelector);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const dots = document.querySelectorAll(dotsSelector);

    if (!viewport) return;

    const getStepWidth = () => {
      const card = viewport.querySelector(itemSelector);
      return card ? card.offsetWidth + 18 : fallbackStep;
    };

    const setActiveDot = (index) => {
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === index);
      });
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        viewport.scrollBy({ left: -getStepWidth(), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        viewport.scrollBy({ left: getStepWidth(), behavior: 'smooth' });
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        const maxScroll = Math.max(1, viewport.scrollWidth - viewport.clientWidth);
        const targetScroll = (maxScroll / Math.max(1, dots.length - 1)) * idx;
        viewport.scrollTo({ left: targetScroll, behavior: 'smooth' });
        setActiveDot(idx);
      });
    });

    viewport.addEventListener(
      'scroll',
      () => {
        const maxScroll = viewport.scrollWidth - viewport.clientWidth;
        if (maxScroll <= 0) return;
        const progress = viewport.scrollLeft / maxScroll;
        const activeIdx = Math.min(
          dots.length - 1,
          Math.max(0, Math.round(progress * (dots.length - 1)))
        );
        setActiveDot(activeIdx);
      },
      { passive: true }
    );
  }

  initCarousel({
    viewportSelector: '.services-carousel-viewport',
    itemSelector: '.svc-card',
    prevBtnId: 'svc-prev-btn',
    nextBtnId: 'svc-next-btn',
    dotsSelector: '#services-dots .svc-dot',
    fallbackStep: 262,
  });

  initCarousel({
    viewportSelector: '#clients-viewport',
    itemSelector: '.client-card',
    prevBtnId: 'clients-prev-btn',
    nextBtnId: 'clients-next-btn',
    dotsSelector: '#clients-dots .svc-dot',
    fallbackStep: 178,
  });

  initCarousel({
    viewportSelector: '#industries-viewport',
    itemSelector: '.ind-card',
    prevBtnId: 'ind-prev-btn',
    nextBtnId: 'ind-next-btn',
    dotsSelector: '#industries-dots .svc-dot',
    fallbackStep: 224,
  });

  // Progressive section & card entrance animations
  function initScrollReveals() {
    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    document.documentElement.classList.add('has-reveal');

    const revealGroups = [
      { selector: '#about .about-visual', direction: 'left', stagger: 0 },
      {
        selector: '#about .about-content > .section-eyebrow, #about .about-title, #about .about-lead, #about .about-actions',
        direction: 'up',
        stagger: 80,
      },
      { selector: '#about .pillar-item', direction: 'up', stagger: 75, baseDelay: 140 },
      { selector: '#services .services-header-row', direction: 'up', stagger: 0 },
      { selector: '#services .svc-card', direction: 'up', stagger: 80, baseDelay: 60 },
      { selector: '#services .services-dots', direction: 'up', stagger: 0, baseDelay: 240 },
      { selector: '#why-choose-us .why-media-panel', direction: 'left', stagger: 0 },
      {
        selector: '#why-choose-us .why-content > .section-eyebrow, #why-choose-us .why-title, #why-choose-us .why-subtitle',
        direction: 'up',
        stagger: 75,
      },
      { selector: '#why-choose-us .why-card', direction: 'up', stagger: 70, baseDelay: 110 },
      { selector: '#get-in-touch .git-cta-block', direction: 'left', stagger: 0 },
      { selector: '#get-in-touch .git-highlight-item', direction: 'right', stagger: 90, baseDelay: 90 },
      { selector: '#get-in-touch .git-media-panel', direction: 'scale', stagger: 0, baseDelay: 60 },
      { selector: '#sectors .industries-intro', direction: 'left', stagger: 0 },
      { selector: '#sectors .ind-card', direction: 'up', stagger: 75, baseDelay: 80 },
      { selector: '#clients .clients-header', direction: 'up', stagger: 0 },
      { selector: '#clients .clients-carousel-shell', direction: 'scale', stagger: 0, baseDelay: 100 },
      { selector: '#clients .clients-dots', direction: 'up', stagger: 0, baseDelay: 160 },
      { selector: '#contact .footer-col-brand, #contact .footer-col', direction: 'up', stagger: 85 },
      { selector: '#contact .footer-bottom-inner', direction: 'up', stagger: 0, baseDelay: 240 },
      { selector: '.abp-trust-card', direction: 'up', stagger: 0 },
      { selector: '#our-company .abp-bento', direction: 'left', stagger: 0 },
      { selector: '#our-company .abp-company-copy', direction: 'up', stagger: 0, baseDelay: 80 },
      { selector: '.abp-stats-bar', direction: 'scale', stagger: 0 },
      { selector: '.abp-stat-item', direction: 'up', stagger: 70, baseDelay: 80 },
      { selector: '#why-choose .abp-why-header', direction: 'up', stagger: 0 },
      { selector: '#why-choose .abp-why-card', direction: 'up', stagger: 80, baseDelay: 80 },
      { selector: '#certifications .abp-certs-card', direction: 'up', stagger: 0 },
      { selector: '.abp-cert-item', direction: 'up', stagger: 70, baseDelay: 90 },
      { selector: '.abp-cta-banner', direction: 'scale', stagger: 0 },
    ];

    const targets = [];
    revealGroups.forEach(({ selector, direction = 'up', stagger = 70, baseDelay = 0 }) => {
      document.querySelectorAll(selector).forEach((el, index) => {
        const delay = Math.min(baseDelay + index * stagger, 420);
        el.setAttribute('data-reveal', direction);
        el.style.setProperty('--reveal-delay', `${delay}ms`);
        el.dataset.revealDelay = String(delay);
        targets.push(el);
      });
    });

    const revealElement = (el) => {
      if (el.classList.contains('is-visible')) return;
      el.classList.add('is-visible');
      const delayMs = Number(el.dataset.revealDelay || 0);
      window.setTimeout(() => {
        el.classList.add('reveal-done');
      }, delayMs + 720);
    };

    const revealVisibleInViewport = () => {
      const thresholdY = window.innerHeight * 0.96;
      targets.forEach((el) => {
        if (el.classList.contains('is-visible')) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= thresholdY) {
          revealElement(el);
        }
      });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight) {
              revealElement(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.06, rootMargin: '0px 0px -24px 0px' }
      );

      targets.forEach((el) => observer.observe(el));
    } else {
      targets.forEach(revealElement);
    }

    revealVisibleInViewport();
    window.addEventListener('hashchange', revealVisibleInViewport);
    window.addEventListener('scroll', revealVisibleInViewport, { passive: true });
  }

  initScrollReveals();

  // Dynamic rotating hero headline text ("Diesel & Fuel Solutions")
  function initHeroTextRotator() {
    const target = document.getElementById('hero-dynamic-text');
    if (!target) return;

    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const phrases = [
      'Diesel & Fuel Solutions',
      'EN590 Diesel Supply',
      'Bulk Fuel Delivery',
      'Industrial Gas Oil',
      'Marine Fuel Solutions',
    ];

    let index = 0;

    const cyclePhrase = () => {
      if (document.hidden) return;
      target.classList.add('is-exiting');

      window.setTimeout(() => {
        index = (index + 1) % phrases.length;
        target.textContent = phrases[index];
        target.classList.remove('is-exiting');
        target.classList.add('is-entering');

        // Force reflow so transition runs cleanly from bottom offset back to rest
        void target.offsetHeight;
        target.classList.remove('is-entering');
      }, 340);
    };

    window.setInterval(cyclePhrase, 2800);
  }

  initHeroTextRotator();

  // Stat counter animation for About page metrics bar
  function initStatCounters() {
    const statEls = document.querySelectorAll('.abp-stat-num[data-count]');
    if (!statEls.length) return;

    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const animateCounter = (el) => {
      if (el.dataset.counted === 'true') return;
      el.dataset.counted = 'true';
      const target = Number(el.dataset.count || 0);
      const suffix = el.dataset.suffix || '';
      const duration = 900;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.max(1, Math.round(eased * target));
        el.textContent = `${current}${suffix}`;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.textContent = `${target}${suffix}`;
        }
      };

      window.requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      statEls.forEach((el) => observer.observe(el));
    }
  }

  initStatCounters();
});
