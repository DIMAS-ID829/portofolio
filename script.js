// ============================================
// PROJECT DATA STRUCTURE
// ============================================
const projectsData = {
    'Nike Air': {
        title: 'Nike Air',
        description: 'This is a beautiful project showcasing modern design and development practices. Nike Air demonstrates expertise in creating responsive, user-friendly digital experiences.',
        image: 'https://via.placeholder.com/400x300/ff6b6b/ffffff?text=Nike+Air',
        technologies: ['UI Design', 'Figma', 'Responsive Design'],
        year: '2024',
        link: 'https://nike.com'
    },
    'Nail Trends': {
        title: 'Nail Trends',
        description: 'A modern beauty platform showcasing the latest nail design trends. Nail Trends combines stunning visuals with intuitive user experience for fashion-forward clients.',
        image: 'https://via.placeholder.com/400x300/4ecdc4/ffffff?text=Nail+Trends',
        technologies: ['Web Design', 'Frontend Development', 'E-commerce'],
        year: '2024',
        link: 'https://example.com/nails'
    },
    'Dropnow': {
        title: 'Dropnow',
        description: 'An innovative delivery application designed for speed and efficiency. Dropnow features real-time tracking and seamless user interface for modern logistics.',
        image: 'https://via.placeholder.com/400x300/f093fb/ffffff?text=Dropnow',
        technologies: ['Mobile App', 'UX/UI', 'Real-time Tracking'],
        year: '2023',
        link: 'https://example.com/dropnow'
    },
    'Bouquet Delivery': {
        title: 'Bouquet Delivery',
        description: 'An elegant flower delivery platform combining beautiful design with practical functionality. Bouquet Delivery showcases expertise in creating delightful customer experiences.',
        image: 'https://via.placeholder.com/400x300/4b5ef7/ffffff?text=Bouquet+Delivery',
        technologies: ['Web Development', 'Payment Integration', 'Database Design'],
        year: '2023',
        link: 'https://example.com/bouquet'
    },
    'Aimm Design': {
        title: 'Aimm Design',
        description: 'A comprehensive design system and branding project. Aimm Design demonstrates mastery in creating cohesive visual identities and design guidelines.',
        image: 'https://via.placeholder.com/400x300/667eea/ffffff?text=Aimm+Design',
        technologies: ['Brand Design', 'Design System', 'Illustration'],
        year: '2023',
        link: 'https://example.com/aimm'
    },
    'Nunito': {
        title: 'Nunito',
        description: 'A typography-focused project featuring the Nunito font family. Nunito showcases the importance of typography in creating engaging digital experiences.',
        image: 'https://via.placeholder.com/400x300/f093fb/ffffff?text=Nunito',
        technologies: ['Typography', 'Font Design', 'Web Typography'],
        year: '2023',
        link: 'https://example.com/nunito'
    }
};

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
// PROFILE IMAGE FUNCTIONALITY
// ============================================
const avatarImage = document.getElementById('avatarImage');

// Make profile image clickable to change
avatarImage.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG' || e.target.id === 'avatarImage') {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    profileImg.src = event.target.result;
                    localStorage.setItem('profileImage', event.target.result);
                };
                reader.readAsDataURL(file);
            }
        };
        
        input.click();
    }
});

// Load saved profile image on page load
const savedProfileImage = localStorage.getItem('profileImage');
if (savedProfileImage) {
    profileImg.src = savedProfileImage;
}

// Add cursor pointer to indicate clickability
avatarImage.title = 'Click to change profile image';

// ============================================
// PORTFOLIO MODAL FUNCTIONALITY
// ============================================
const modal = document.getElementById('projectModal');
const closeBtn = document.getElementById('closeBtn');
const projectTitle = document.getElementById('projectTitle');
const projectDescription = document.getElementById('projectDescription');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Add click event to each portfolio item
portfolioItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const projectName = item.dataset.project;
        showProjectModal(projectName);
    });
});

// Show project modal with detailed information
function showProjectModal(projectName) {
    const project = projectsData[projectName];
    
    if (project) {
        projectTitle.textContent = project.title;
        
        // Buat HTML untuk deskripsi dan informasi tambahan
        const modalContent = `
            <div class="modal-project-info">
                <p class="modal-description">${project.description}</p>
                
                <div class="modal-meta">
                    <div class="meta-item">
                        <strong>Year:</strong>
                        <span>${project.year}</span>
                    </div>
                </div>
                
                <div class="modal-technologies">
                    <strong>Technologies Used:</strong>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
        
        projectDescription.innerHTML = modalContent;
        modal.classList.add('active');
    }
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
    // Ganti dengan link ke file resume Anda
    const resumeLink = 'path/to/your/resume.pdf'; // Update ini dengan path resume Anda
    
    // Option 1: Download file
    // const link = document.createElement('a');
    // link.href = resumeLink;
    // link.download = 'Dimitri_Marco_Resume.pdf';
    // link.click();
    
    // Option 2: Buka di tab baru
    window.open(resumeLink, '_blank');
    
    // Atau tampilkan alert
    // alert('Resume akan diunduh. Fitur ini dapat dihubungkan ke file PDF Anda atau tautan download eksternal.');
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

// Observe service cards and portfolio items
document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
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
    updateThemeIcon();
    console.log('Portfolio loaded successfully');
});
