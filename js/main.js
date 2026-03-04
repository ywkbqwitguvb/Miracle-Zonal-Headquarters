document.addEventListener('DOMContentLoaded', function() {
  // Year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav toggle with hamburger animation
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  const header = document.getElementById('site-header');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
      // Toggle hamburger animation
      navToggle.classList.toggle('active');
      // Toggle mobile menu
      nav.classList.toggle('open');
      // Prevent body scroll when menu is open
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
  }

  // Header scroll effect
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Mobile dropdown toggle
  const dropdowns = document.querySelectorAll('.nav .dropdown');
  dropdowns.forEach(function(dropdown) {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', function(e) {
        // Only handle dropdown toggle on mobile
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('active');
        }
      });
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (nav && nav.classList.contains('open')) {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
        nav.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  // Close mobile menu when pressing Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      navToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      const target = this.getAttribute('href');
      if (target.length > 1 && target !== '#') {
        e.preventDefault();
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      // Close mobile menu on link click
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Simple events carousel (auto-rotate)
  const eventsContainer = document.getElementById('events-container');
  if (eventsContainer) {
    let idx = 0;
    const children = [...eventsContainer.children];

    function rotate() {
      children.forEach(function(c, i) {
        c.style.display = (i === idx) ? 'block' : 'none';
      });
      idx = (idx + 1) % children.length;
    }

    rotate();
    setInterval(rotate, 4000);
  }

  // Ministry filter functionality
  const filterTabs = document.querySelectorAll('.filter-tab');
  const ministryCards = document.querySelectorAll('.ministry-card');

  if (filterTabs.length > 0 && ministryCards.length > 0) {
    filterTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        filterTabs.forEach(function(t) {
          t.classList.remove('active');
        });
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        ministryCards.forEach(function(card) {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(function() {
              card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});
