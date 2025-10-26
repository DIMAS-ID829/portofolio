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
// RESUME BUTTON HANDLER
// ============================================
const resumeBtn = document.getElementById('resumeBtn');
resumeBtn.addEventListener('click', () => {
    alert('Resume akan diunduh. Fitur ini dapat dihubungkan ke file PDF Anda atau tautan download eksternal.');
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
const closeModal = document.getElementById('closeModal');
const projectTitle = document.getElementById('projectTitle');
const projectCategory = document.getElementById('projectCategory');
const projectImage = document.getElementById('projectImage');
const projectImageContainer = document.getElementById('projectImageContainer');
const projectDescription = document.getElementById('projectDescription');
const projectTech = document.getElementById('projectTech');
const projectYear = document.getElementById('projectYear');
const projectRole = document.getElementById('projectRole');
const projectLiveLink = document.getElementById('projectLiveLink');
const projectGithubLink = document.getElementById('projectGithubLink');

// Project data dengan variasi lengkap
const projectData = {
    'Aimm Design': {
        category: 'Design',
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'A modern and elegant design system created for a boutique fashion brand. This project showcases minimalist aesthetics combined with intuitive user experience, featuring custom illustrations and a cohesive color palette.',
        tech: 'Figma, Adobe XD, Illustrator',
        year: '2024',
        role: 'UI/UX Designer & Art Director',
        liveLink: 'https://example.com/aimm-design',
        githubLink: '#'
    },
    'Portfolio X': {
        category: 'Development',
        image: 'https://images.pexels.com/photos/270632/pexels-photo-270632.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'A fully responsive portfolio website built with modern web technologies. Features smooth animations, dark mode toggle, and optimized performance. Includes interactive project showcases and contact forms with backend integration.',
        tech: 'React, Next.js, Tailwind CSS, Node.js',
        year: '2024',
        role: 'Full Stack Developer',
        liveLink: 'https://example.com/portfolio-x',
        githubLink: 'https://github.com/example/portfolio-x'
    },
    'Project B': {
        category: 'Branding',
        image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Complete brand identity development for a tech startup. Includes logo design, brand guidelines, color systems, typography selection, and marketing materials. The brand reflects innovation and trustworthiness.',
        tech: 'Adobe Creative Suite, Brand Strategy',
        year: '2023',
        role: 'Brand Designer & Strategist',
        liveLink: 'https://example.com/project-b',
        githubLink: '#'
    },
    'Belgium C': {
        category: 'Design',
        image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'An elegant e-commerce platform design for a European chocolate brand. Features sophisticated product displays, smooth checkout flow, and mobile-first approach with attention to detail in every interaction.',
        tech: 'Sketch, InVision, Photoshop',
        year: '2024',
        role: 'Lead Product Designer',
        liveLink: 'https://example.com/belgium-c',
        githubLink: '#'
    },
    'Varken D': {
        category: 'Development',
        image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'A real-time dashboard application for data visualization and analytics. Built with modern frameworks and featuring interactive charts, live data streaming, and customizable widgets for business intelligence.',
        tech: 'Vue.js, D3.js, Firebase, TypeScript',
        year: '2024',
        role: 'Frontend Engineer',
        liveLink: 'https://example.com/varken-d',
        githubLink: 'https://github.com/example/varken-d'
    },
    'Portfolio Z': {
        category: 'Branding',
        image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Comprehensive rebranding project for a sustainable fashion company. Created a fresh, eco-friendly brand identity with focus on environmental values, including packaging design and social media templates.',
        tech: 'Adobe Illustrator, InDesign, Brand Guidelines',
        year: '2023',
        role: 'Creative Director',
        liveLink: 'https://example.com/portfolio-z',
        githubLink: '#'
    }
};

// Add click event to portfolio items
portfolioItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const projectName = item.querySelector('.portfolio-overlay').textContent;
        showProjectModal(projectName);
    });
});

// Show project modal with data
function showProjectModal(projectName) {
    const project = projectData[projectName];
    
    if (!project) {
        console.error('Project not found:', projectName);
        return;
    }

    // Populate modal with project data
    projectTitle.textContent = projectName;
    projectCategory.textContent = project.category;
    projectCategory.className = `project-badge badge-${project.category.toLowerCase()}`;
    projectImage.src = project.image;
    projectImage.alt = projectName;
    projectDescription.textContent = project.description;
    projectTech.textContent = project.tech;
    projectYear.textContent = project.year;
    projectRole.textContent = project.role;
    projectLiveLink.href = project.liveLink;
    projectGithubLink.href = project.githubLink;

    // Hide GitHub link if not available
    if (project.githubLink === '#') {
        projectGithubLink.style.display = 'none';
    } else {
        projectGithubLink.style.display = 'inline-flex';
    }

    // Show modal with animation
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close modal function
function closeProjectModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Close modal with close button
closeModal.addEventListener('click', closeProjectModal);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeProjectModal();
    }
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
        if (modal.classList.contains('active')) {
            closeProjectModal();
        }
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
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Update theme icon
    updateThemeIcon();
    
    // Initialize page animations
    console.log('Portfolio loaded successfully');
});
