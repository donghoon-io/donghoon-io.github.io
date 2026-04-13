document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
  initNavigation();
  initModals();
  initProjectGridEffects();
});

function initNavigation() {
  var navToggle = document.querySelector('[data-nav-toggle]');
  var navTarget = navToggle ? document.querySelector(navToggle.getAttribute('data-nav-target')) : null;
  var mobileBreakpoint = 768;

  function closeMobileNav() {
    if (!navTarget || window.innerWidth >= mobileBreakpoint) {
      return;
    }

    navTarget.classList.remove('show');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
    }

    document.querySelectorAll('.dropdown.is-open').forEach(function (dropdown) {
      dropdown.classList.remove('is-open');
      var toggle = dropdown.querySelector('[data-dropdown-toggle]');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (navToggle && navTarget) {
    navToggle.addEventListener('click', function () {
      var isOpen = navTarget.classList.toggle('show');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  var dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');
  dropdownToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (event) {
      if (window.innerWidth >= mobileBreakpoint) {
        return;
      }

      event.preventDefault();
      var dropdown = toggle.closest('.dropdown');
      var isOpen = dropdown.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  document.addEventListener('click', function (event) {
    document.querySelectorAll('.dropdown.is-open').forEach(function (dropdown) {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('is-open');
        var toggle = dropdown.querySelector('[data-dropdown-toggle]');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= mobileBreakpoint) {
      document.querySelectorAll('.dropdown.is-open').forEach(function (dropdown) {
        dropdown.classList.remove('is-open');
        var toggle = dropdown.querySelector('[data-dropdown-toggle]');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
        }
      });

      if (navTarget) {
        navTarget.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  if (navTarget) {
    navTarget.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (!link.hasAttribute('data-dropdown-toggle')) {
          closeMobileNav();
        }
      });
    });
  }
}

function initModals() {
  var activeModal = null;

  document.querySelectorAll('[data-modal-toggle]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var targetSelector = trigger.getAttribute('data-modal-target');
      if (!targetSelector) {
        return;
      }

      var modal = document.querySelector(targetSelector);
      if (!modal) {
        return;
      }

      openModal(modal);
    });
  });

  document.querySelectorAll('[data-modal-dismiss]').forEach(function (button) {
    button.addEventListener('click', function () {
      var modal = button.closest('.modal');
      closeModal(modal);
    });
  });

  document.querySelectorAll('.modal').forEach(function (modal) {
    modal.addEventListener('click', function (event) {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && activeModal) {
      closeModal(activeModal);
    }
  });

  function openModal(modal) {
    if (activeModal && activeModal !== modal) {
      closeModal(activeModal);
    }

    modal.classList.add('show');
    modal.removeAttribute('aria-hidden');
    document.body.classList.add('modal-open');
    activeModal = modal;
  }

  function closeModal(modal) {
    if (!modal) {
      return;
    }

    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    if (activeModal === modal) {
      activeModal = null;
    }
  }
}

function initProjectGridEffects() {
  var projectGrid = document.querySelector('.project-grid');
  if (!projectGrid) {
    return;
  }

  var resizeTimer = null;
  var lastViewportBucket = getViewportBucket();

  window.addEventListener('resize', function () {
    var nextViewportBucket = getViewportBucket();
    if (nextViewportBucket === lastViewportBucket) {
      return;
    }

    lastViewportBucket = nextViewportBucket;
    projectGrid.classList.remove('is-reflowing');
    window.clearTimeout(resizeTimer);

    // Force reflow so the animation restarts when the column count changes.
    void projectGrid.offsetWidth;
    projectGrid.classList.add('is-reflowing');

    resizeTimer = window.setTimeout(function () {
      projectGrid.classList.remove('is-reflowing');
    }, 280);
  });

  function getViewportBucket() {
    var width = window.innerWidth;
    if (width >= 1400) {
      return 'xl';
    }
    if (width >= 992) {
      return 'lg';
    }
    if (width >= 576) {
      return 'sm';
    }
    return 'xs';
  }
}
