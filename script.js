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
// PORTFOLIO MODAL FUNCTIONALITY
// ============================================
const modal = document.getElementById('projectModal');
const closeBtn = document.getElementById('closeBtn');
const projectTitle = document.getElementById('projectTitle');
const projectDescription = document.getElementById('projectDescription');
const filterBtns = document.querySelectorAll('.filter-btn')
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = 'block';
                        // Add animation
                        item.style.animation = 'none';
                        setTimeout(() => {
                            item.style.animation = 'fadeInUp 0.6s ease';
                        }, 10);
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
// Add click event to each portfolio item (prevent default link behavior for modal)
portfolioItems.forEach(item => {
    item.addEventListener('click', (e) => {
        // Allow link to work normally if you want
        // Uncomment next line if you want to navigate to link instead of modal
        // e.preventDefault();
        
        // For modal popup behavior:
        e.preventDefault();
        const projectName = item.dataset.project;
        showProjectModal(projectName);
    });
});

// Show project modal
function showProjectModal(projectName) {
    projectTitle.textContent = projectName;
    projectDescription.textContent = `This is a beautiful project showcasing modern design and development practices. ${projectName} demonstrates expertise in creating responsive, user-friendly digital experiences.`;
    modal.classList.add('active');
}

// Close modal with close button
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Close modal when clicking outside modal content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

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
