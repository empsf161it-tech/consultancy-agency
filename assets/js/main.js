/**
 * VANGUARD STRATEGY PARTNERS — CORE JAVASCRIPT ENGINE
 * Handles: Theme Toggle, RTL Direction Toggle, Mobile Drawer,
 * Client-Side Form Validations, FAQ Accordion, ROI Calculator, and Blog Filter.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initNavigation();
  initFAQ();
  initForms();
  initCalculator();
  initBlogFilter();
});

/* ==========================================================================
   1. THEME TOGGLE (DARK / LIGHT) (STEP 6)
   ========================================================================== */
function initTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('vanguard_theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Set initial theme
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('vanguard_theme', newTheme);
    });
  });
}

function applyTheme(theme) {
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggles.forEach(btn => {
      btn.innerHTML = '<i class="ri-sun-line"></i>';
      btn.setAttribute('aria-label', 'Switch to light mode');
    });
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeToggles.forEach(btn => {
      btn.innerHTML = '<i class="ri-moon-line"></i>';
      btn.setAttribute('aria-label', 'Switch to dark mode');
    });
  }
}

/* ==========================================================================
   2. RTL SUPPORT (STEP 5)
   ========================================================================== */
function initRTL() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
  const savedRtl = localStorage.getItem('vanguard_rtl');

  if (savedRtl === 'rtl') {
    applyRTL(true);
  }

  rtlToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const isCurrentlyRTL = document.documentElement.getAttribute('dir') === 'rtl';
      applyRTL(!isCurrentlyRTL);
      localStorage.setItem('vanguard_rtl', !isCurrentlyRTL ? 'rtl' : 'ltr');
    });
  });
}

function applyRTL(enable) {
  const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
  if (enable) {
    document.documentElement.setAttribute('dir', 'rtl');
    document.body.classList.add('rtl');
    rtlToggles.forEach(btn => {
      btn.setAttribute('aria-label', 'Switch to Left-to-Right');
    });
  } else {
    document.documentElement.removeAttribute('dir');
    document.body.classList.remove('rtl');
    rtlToggles.forEach(btn => {
      btn.setAttribute('aria-label', 'Switch to Right-to-Left');
    });
  }
}

/* ==========================================================================
   3. MOBILE DRAWER & STICKY NAVBAR (STEP 4)
   ========================================================================== */
function initNavigation() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const drawerCloseBtn = document.querySelector('.mobile-drawer-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (hamburgerBtn && drawerOverlay) {
    hamburgerBtn.addEventListener('click', () => {
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    const closeDrawer = () => {
      drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', closeDrawer);
    }

    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) {
        closeDrawer();
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawerOverlay.classList.contains('active')) {
        closeDrawer();
      }
    });
  }

  // Active page indicator
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ==========================================================================
   4. FAQ ACCORDION (STEP 9.1)
   ========================================================================== */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach(otherItem => otherItem.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   5. CLIENT-SIDE FORM VALIDATION (STEP 12)
   ========================================================================== */
function initForms() {
  const forms = document.querySelectorAll('form[data-validate="true"]');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate required inputs and selects
      const inputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');
      inputs.forEach(input => {
        const group = input.closest('.form-group');
        const isRequired = input.hasAttribute('required');
        const value = input.value.trim();
        let fieldError = false;

        if (isRequired && !value) {
          fieldError = true;
        } else if (input.type === 'email' && value && !emailRegex.test(value)) {
          fieldError = true;
        } else if (input.type === 'password' && input.getAttribute('minlength')) {
          const minLength = parseInt(input.getAttribute('minlength'), 10);
          if (value.length < minLength) {
            fieldError = true;
          }
        }

        // Check password matching on confirm password
        if (input.name === 'confirm_password') {
          const pwd = form.querySelector('input[name="password"]');
          if (pwd && pwd.value !== value) {
            fieldError = true;
          }
        }

        if (fieldError) {
          input.classList.add('is-invalid');
          input.classList.remove('is-valid');
          if (group) group.classList.add('has-error');
          isValid = false;
        } else {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
          if (group) group.classList.remove('has-error');
        }

        // Clear error on input
        input.addEventListener('input', () => {
          input.classList.remove('is-invalid');
          if (group) group.classList.remove('has-error');
        }, { once: true });
      });

      // Terms checkbox validation
      const termsCheckbox = form.querySelector('input[name="terms"]');
      if (termsCheckbox && termsCheckbox.hasAttribute('required')) {
        const group = termsCheckbox.closest('.form-group');
        if (!termsCheckbox.checked) {
          if (group) group.classList.add('has-error');
          isValid = false;
        } else {
          if (group) group.classList.remove('has-error');
        }
      }

      // If valid, display inline success message
      if (isValid) {
        const successBanner = form.querySelector('.form-success-banner');
        if (successBanner) {
          successBanner.style.display = 'block';
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        form.reset();
        // Remove valid classes after reset
        inputs.forEach(input => input.classList.remove('is-valid'));
      }
    });
  });
}

/* ==========================================================================
   6. INTERACTIVE ROI CALCULATOR (HOME 2) (STEP 9.2)
   ========================================================================== */
function initCalculator() {
  const revInput = document.getElementById('calcRevenue');
  const effInput = document.getElementById('calcEfficiency');
  const revDisplay = document.getElementById('calcRevenueDisplay');
  const effDisplay = document.getElementById('calcEfficiencyDisplay');
  const resultDisplay = document.getElementById('calcResultDisplay');

  if (!revInput || !effInput || !resultDisplay) return;

  function updateCalculation() {
    const revenue = parseFloat(revInput.value); // in millions
    const efficiency = parseFloat(effInput.value); // percentage

    if (revDisplay) revDisplay.textContent = `$${revenue}M`;
    if (effDisplay) effDisplay.textContent = `${efficiency}%`;

    // Projected EBITDA Expansion = Revenue * (efficiency / 100) * 0.45 (industry multiplier)
    const expansion = (revenue * (efficiency / 100) * 0.45).toFixed(1);
    resultDisplay.textContent = `+$${expansion}M`;
  }

  revInput.addEventListener('input', updateCalculation);
  effInput.addEventListener('input', updateCalculation);
  updateCalculation();
}

/* ==========================================================================
   7. BLOG CATEGORY FILTER (STEP 9.5)
   ========================================================================== */
function initBlogFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const blogCards = document.querySelectorAll('.blog-card-item');

  if (!filterBtns.length || !blogCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      blogCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterCategory === 'all' || category === filterCategory) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
