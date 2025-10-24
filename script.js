// ============================================
// THEME TOGGLE FUNCTIONALITY
// ============================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const profileImg = document.getElementById('profileImg');

// Check if user has a saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    updateThemeIcon();
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    // Save preference to localStorage
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light-mode');
    } else {
        localStorage.removeItem('theme');
    }
    
    updateThemeIcon();
});

// Update theme icon based on current theme
function updateThemeIcon() {
    if (body.classList.contains('light-mode')) {
        themeToggle.textContent = '🌙';
    } else {
        themeToggle.textContent = '☀️';
    }
}

// ============================================
// PORTFOLIO MODAL FUNCTIONALITY (ENHANCED)
// ============================================
const modal = document.getElementById('projectModal');
const closeBtn = document.getElementById('closeBtn');
const projectTitle = document.getElementById('projectTitle');
const projectDescription = document.getElementById('projectDescription');
const portfolioItems = document.querySelectorAll('.portfolio-item');

let lastFocusedTrigger = null;

// Guard: pastikan elemen modal ada
if (!modal || !projectTitle || !projectDescription || !closeBtn) {
  console.warn('Modal elements missing. Check IDs: projectModal, projectTitle, projectDescription, closeBtn.');
} else {
  // make portfolio items keyboard accessible and attach handlers
  portfolioItems.forEach(item => {
    // Ensure items are focusable
    if (!item.hasAttribute('tabindex')) item.setAttribute('tabindex', '0');

    const openHandler = (e) => {
      e.preventDefault();
      lastFocusedTrigger = item;
      const projectName = item.dataset.project || item.textContent.trim() || 'Project';
      showProjectModal(projectName, item);
    };

    item.addEventListener('click', openHandler);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openHandler(e);
      }
    });
  });

  // Show project modal
  function showProjectModal(projectName, triggerEl = null) {
    projectTitle.textContent = projectName;
    projectDescription.textContent = `This is a beautiful project showcasing modern design and development practices. ${projectName} demonstrates expertise in creating responsive, user-friendly digital experiences.`;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');

    // focus management: move focus to close button for easy dismissal
    closeBtn.focus();

    // trap focus inside modal
    document.addEventListener('focus', trapFocus, true);
  }

  // Close modal helper
  function closeProjectModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');

    // remove focus trap
    document.removeEventListener('focus', trapFocus, true);

    // restore focus to the element that opened the modal
    if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
      lastFocusedTrigger.focus();
    } else {
      // fallback: focus body
      document.body.focus();
    }
  }

  // Focus trap implementation (simple)
  function trapFocus(e) {
    if (!modal.contains(e.target)) {
      e.stopPropagation();
      // send focus back to closeBtn or modal
      closeBtn.focus();
    }
  }

  // Close modal with close button
  closeBtn.addEventListener('click', () => {
    closeProjectModal();
  });

  // Close modal when clicking outside modal content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeProjectModal();
    }

    // Optional: keyboard for cycling focus when modal open (Tab handling)
    if (modal.classList.contains('active') && e.key === 'Tab') {
      maintainTabFocus(e);
    }
  });

  // Maintain Tab focus inside modal (handles basic Tab/Shift+Tab)
  function maintainTabFocus(e) {
    const focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(modal.querySelectorAll(focusableSelectors)).filter(el => el.offsetParent !== null);
    if (focusable.length === 0) {
      e.preventDefault();
      closeBtn.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  }
}


// ============================================
// RESUME BUTTON HANDLER
// ============================================
const resumeBtn = document.getElementById('resumeBtn');
resumeBtn.addEventListener('click', () => {
    alert('Resume akan diunduh. Fitur ini dapat dihubungkan ke file PDF Anda atau tautan download eksternal.');
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    // Press 'T' to toggle theme
    if (e.key === 't' || e.key === 'T') {
        themeToggle.click();
    }
    
    // Press 'Escape' to close modal
    if (e.key === 'Escape') {
        modal.classList.remove('active');
    }
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    
    // Parallax effect on avatar container
    const avatarContainer = document.querySelector('.avatar-container');
    if (avatarContainer && scrollTop < window.innerHeight) {
        avatarContainer.style.transform = `translateY(${scrollTop * 0.5}px)`;
    }
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and portfolio items
document.querySelectorAll('.feature-card, .portfolio-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Update theme icon
    updateThemeIcon();
    
    // Initialize page animations
    console.log('Portfolio loaded successfully');
});
