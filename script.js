// ============================================
// THEME TOGGLE FUNCTIONALITY
// ============================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check if user has a saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    updateThemeIcon();
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    // Save preference to localStorage
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
    
    updateThemeIcon();
});

// Update theme icon based on current theme
function updateThemeIcon() {
    if (body.classList.contains('light-mode')) {
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }
}

// ============================================
// MOBILE NAVIGATION (HAMBURG MENU)
// ============================================
function hamburg() {
    const navbar = document.querySelector(".dropdown");
    if (navbar) {
        navbar.style.transform = "translateY(0px)";
    }
}

function cancel() {
    const navbar = document.querySelector(".dropdown");
    if (navbar) {
        navbar.style.transform = "translateY(-500px)";
    }
}

// ============================================
// TYPEWRITER ANIMATION
// ============================================
const texts = [
    "DEVELOPER",
    "YOUTUBER",
    "DESIGNER"
];
let speed = 100;
const textElements = document.querySelector(".typewriter-text");
let textIndex = 0;
let characterIndex = 0;

function typeWriter() {
    if (textElements && characterIndex < texts[textIndex].length) {
        textElements.innerHTML += texts[textIndex].charAt(characterIndex);
        characterIndex++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(eraseText, 1000);
    }
}

function eraseText() {
    if (textElements && textElements.innerHTML.length > 0) {
        textElements.innerHTML = textElements.innerHTML.slice(0, -1);
        setTimeout(eraseText, 50);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        characterIndex = 0;
        setTimeout(typeWriter, 500);
    }
}

// ============================================
// RESUME BUTTON HANDLER
// ============================================
const resumeBtn = document.getElementById('resumeBtn');
if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
        alert('Resume akan diunduh. Fitur ini dapat dihubungkan ke file PDF Anda atau tautan download eksternal.');
    });
}

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
// PORTFOLIO FILTER FUNCTIONALITY
// ============================================
const filterBtns = document.querySelectorAll('.filter-btn');
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

// ============================================
// PROJECT MODAL FUNCTIONALITY
// ============================================
const modal = document.getElementById('projectModal');
const closeModalBtn = document.getElementById('closeModal');
const projectTitle = document.getElementById('projectTitle');
const projectCategory = document.getElementById('projectCategory');
const projectImage = document.getElementById('projectImage');
const projectDescription = document.getElementById('projectDescription');
const projectTech = document.getElementById('projectTech');
const projectYear = document.getElementById('projectYear');
const projectRole = document.getElementById('projectRole');
const projectLiveLink = document.getElementById('projectLiveLink');
const projectGithubLink = document.getElementById('projectGithubLink');

// Project data dengan variasi lengkap
const projectData = {
    'Nike Air': {
        category: 'Design',
        image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'A modern e-commerce platform design for Nike featuring dynamic product showcases, seamless shopping experience, and responsive design across all devices.',
        tech: 'Figma, Adobe XD, Photoshop',
        year: '2024',
        role: 'UI/UX Designer',
        liveLink: 'https://nike.com',
        githubLink: '#'
    },
    'Nail Trends': {
        category: 'Design',
        image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'A beauty and wellness website showcasing nail art trends, tutorials, and booking system for salon appointments with elegant design.',
        tech: 'Figma, Illustrator, InVision',
        year: '2024',
        role: 'Product Designer',
        liveLink: 'https://example.com/nails',
        githubLink: '#'
    },
    'Dropnow': {
        category: 'Development',
        image: 'https://images.pexels.com/photos/270632/pexels-photo-270632.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'A data onboarding platform for product growth with clean interface and powerful analytics features built with modern tech stack.',
        tech: 'React, Node.js, MongoDB, TypeScript',
        year: '2024',
        role: 'Full Stack Developer',
        liveLink: 'https://example.com/dropnow',
        githubLink: 'https://github.com/example/dropnow'
    },
    'Bouquet Delivery': {
        category: 'Design',
        image: 'https://images.pexels.com/photos/1458866/pexels-photo-1458866.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Smart bouquet delivery service with elegant UI, featuring real-time tracking, subscription plans, and personalized flower recommendations.',
        tech: 'Figma, Adobe XD, After Effects',
        year: '2024',
        role: 'Lead Designer',
        liveLink: 'https://example.com/bouquet',
        githubLink: '#'
    },
    'Aimm Design': {
        category: 'Design',
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'A comprehensive design system and UI toolkit for building consistent, accessible user interfaces with modern design principles.',
        tech: 'Figma, Sketch, Design Tokens',
        year: '2024',
        role: 'Design System Lead',
        liveLink: 'https://example.com/aimm',
        githubLink: '#'
    },
    'Nunito': {
        category: 'Branding',
        image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Complete brand identity and creative design platform featuring collaboration tools, design resources, and team workspace.',
        tech: 'Branding, Adobe Creative Suite',
        year: '2024',
        role: 'Creative Director',
        liveLink: 'https://example.com/nunito',
        githubLink: '#'
    }
};

// Add click event to portfolio items
if (portfolioItems.length > 0) {
    portfolioItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const projectName = item.getAttribute('data-project');
            if (projectName && modal) {
                showProjectModal(projectName);
            }
        });
    });
}

// Show project modal with data
function showProjectModal(projectName) {
    const project = projectData[projectName];
    
    if (!project) {
        console.error('Project not found:', projectName);
        return;
    }

    // Populate modal with project data
    if (projectTitle) projectTitle.textContent = projectName;
    if (projectCategory) {
        projectCategory.textContent = project.category;
        projectCategory.className = `project-badge badge-${project.category.toLowerCase()}`;
    }
    if (projectImage) {
        projectImage.src = project.image;
        projectImage.alt = projectName;
    }
    if (projectDescription) projectDescription.textContent = project.description;
    if (projectTech) projectTech.textContent = project.tech;
    if (projectYear) projectYear.textContent = project.year;
    if (projectRole) projectRole.textContent = project.role;
    if (projectLiveLink) projectLiveLink.href = project.liveLink;
    if (projectGithubLink) {
        projectGithubLink.href = project.githubLink;
        // Hide GitHub link if not available
        if (project.githubLink === '#') {
            projectGithubLink.style.display = 'none';
        } else {
            projectGithubLink.style.display = 'inline-flex';
        }
    }

    // Show modal with animation
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

// Close modal function
function closeProjectModal() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close modal with close button
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeProjectModal);
}

// Close modal when clicking outside
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    // Press 'T' to toggle theme
    if (e.key === 't' || e.key === 'T') {
        if (themeToggle) themeToggle.click();
    }
    
    // Press 'Escape' to close modal
    if (e.key === 'Escape') {
        if (modal && modal.classList.contains('active')) {
            closeProjectModal();
        }
    }
});

// ============================================
// SMOOTH SCROLL ANIMATIONS
// ============================================
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    
    // Parallax effect on avatar container
    const avatarContainer = document.querySelector('.avatar-container');
    if (avatarContainer && scrollTop < window.innerHeight) {
        avatarContainer.style.transform = `translateY(${scrollTop * 0.3}px)`;
    }

    // Header shadow on scroll
    const header = document.querySelector('.header');
    if (header) {
        if (scrollTop > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    }

    // Fade in elements on scroll
    const elements = document.querySelectorAll('.feature-card, .portfolio-item');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    });
}, observerOptions);

// Observe feature cards and portfolio items with initial state
document.querySelectorAll('.feature-card, .portfolio-item, .hero-content, .hero-avatar').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
});

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Update theme icon
    updateThemeIcon();
    
    // Start typewriter animation if element exists
    if (textElements) {
        typeWriter();
    }
    
    // Add smooth entrance animation to body
    body.style.opacity = '0';
    setTimeout(() => {
        body.style.transition = 'opacity 0.5s ease';
        body.style.opacity = '1';
    }, 100);
    
    // Initialize page
    console.log('Portfolio loaded successfully');
    
    // Trigger initial animations for visible elements
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-content, .hero-avatar');
        heroElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }, 200);
});
