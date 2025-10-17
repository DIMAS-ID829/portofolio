// ============================================
// THEME TOGGLE FUNCTIONALITY
// ============================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

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
// SMOOTH SCROLL FOR NAVIGATION LINKS
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
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.dataset.animation;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
    el.dataset.animation = getComputedStyle(el).animation;
    observer.observe(el);
});

// ============================================
// PORTFOLIO ITEM CLICK HANDLER
// ============================================
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const projectName = item.querySelector('.portfolio-placeholder').textContent;
        showProjectModal(projectName);
    });

    // Add hover effect with slight rotation
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05) rotate(1deg)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ============================================
// PROJECT MODAL FUNCTION
// ============================================
function showProjectModal(projectName) {
    // Create modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
        background: #1a1a2e;
        padding: 40px;
        border-radius: 15px;
        max-width: 500px;
        color: white;
        position: relative;
        animation: slideInUp 0.3s ease;
    `;

    const title = document.createElement('h2');
    title.textContent = projectName;
    title.style.cssText = `
        color: #00d4d4;
        margin-bottom: 15px;
        font-size: 28px;
    `;

    const description = document.createElement('p');
    description.textContent = `This is a beautiful project showcasing modern design and development practices. ${projectName} demonstrates expertise in creating responsive, user-friendly digital experiences.`;
    description.style.cssText = `
        color: #b0b0b0;
        margin-bottom: 25px;
        line-height: 1.6;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.cssText = `
        background: #00d4d4;
        color: #0a0e27;
        border: none;
        padding: 12px 30px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    `;

    closeBtn.addEventListener('hover', () => {
        closeBtn.style.transform = 'translateY(-2px)';
    });

    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(closeBtn);
    modal.appendChild(content);
    document.body.appendChild(modal);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// ============================================
// RESUME BUTTON HANDLER
// ============================================
const resumeBtn = document.querySelector('.resume-btn');
resumeBtn.addEventListener('click', () => {
    alert('Resume download functionality would be implemented here!');
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    
    // Parallax effect on hero avatar
    const avatar = document.querySelector('.avatar-circle');
    if (avatar && scrollTop < window.innerHeight) {
        avatar.style.transform = `translateY(${scrollTop * 0.5}px)`;
    }
});

// ============================================
// TYPING ANIMATION FOR HERO TITLE
// ============================================
function typewriterEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    // Only animate on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', type);
    } else {
        type();
    }
}

// ============================================
// ACTIVE LINK INDICATOR
// ============================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
});

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to body
    body.style.animation = 'fadeInUp 0.6s ease';
    
    // Initialize page
    updateThemeIcon();
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    // Press 'T' to toggle theme
    if (e.key === 't' || e.key === 'T') {
        themeToggle.click();
    }
    
    // Press 'Escape' to close any modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('div[style*="position: fixed"]');
        modals.forEach(modal => {
            if (modal.style.zIndex === '1000') {
                modal.remove();
            }
        });
    }
});

// ============================================
// MOBILE MENU SUPPORT
// ============================================
const nav = document.querySelector('.nav');
if (nav) {
    nav.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Lazy load images if they exist
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}
