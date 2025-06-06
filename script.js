// Theme Toggle and Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme based on saved preference or system preference
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.checked = true;
    } else if (savedTheme === null && !prefersDarkScheme) {
        body.classList.add('light-theme');
        themeToggle.checked = true;
    }
    
    // Theme switch event handler
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');
    
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        const isActive = navMenu.classList.contains('active');
        
        // Animate hamburger to X
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (isActive) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    navOverlay.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Mobile skills circular rotation
    if (window.innerWidth <= 768) {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            const index = item.getAttribute('data-i');
            if (index) {
                item.style.setProperty('--i', index);
            }
        });
        
        // Add touch scrolling for skills
        const skillsContainer = document.querySelector('.skills-container');
        let startX, scrollLeft;
        
        const startDrag = (e) => {
            startX = e.type === 'touchstart' ? e.touches[0].pageX : e.pageX;
            scrollLeft = skillsContainer.scrollLeft;
            skillsContainer.style.cursor = 'grabbing';
        };
        
        const drag = (e) => {
            if (startX === undefined) return;
            e.preventDefault();
            const x = e.type === 'touchmove' ? e.touches[0].pageX : e.pageX;
            const dist = (startX - x);
            skillsContainer.scrollLeft = scrollLeft + dist;
        };
        
        const endDrag = () => {
            startX = undefined;
            skillsContainer.style.cursor = 'grab';
        };
        
        skillsContainer.addEventListener('touchstart', startDrag, { passive: true });
        skillsContainer.addEventListener('touchmove', drag, { passive: false });
        skillsContainer.addEventListener('touchend', endDrag);
        
        // Project cards circular movement
        const projectsGrid = document.querySelector('.projects-grid');
        let projectStartX, projectScrollLeft;
        
        const startProjectDrag = (e) => {
            projectStartX = e.type === 'touchstart' ? e.touches[0].pageX : e.pageX;
            projectScrollLeft = projectsGrid.scrollLeft;
            projectsGrid.style.cursor = 'grabbing';
        };
        
        const dragProject = (e) => {
            if (projectStartX === undefined) return;
            e.preventDefault();
            const x = e.type === 'touchmove' ? e.touches[0].pageX : e.pageX;
            const dist = (projectStartX - x);
            projectsGrid.scrollLeft = projectScrollLeft + dist;
        };
        
        const endProjectDrag = () => {
            projectStartX = undefined;
            projectsGrid.style.cursor = 'grab';
        };
        
        projectsGrid.addEventListener('touchstart', startProjectDrag, { passive: true });
        projectsGrid.addEventListener('touchmove', dragProject, { passive: false });
        projectsGrid.addEventListener('touchend', endProjectDrag);
    }
});

// Side navigation dots - highlight current section
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navDots = document.querySelectorAll('.side-nav a');
    
    // Function to determine which section is in view
    function highlightNavDot() {
        let scrollPosition = window.scrollY;
        
        // Add offset to account for the header
        scrollPosition += 100;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navDots.forEach(dot => dot.classList.remove('active'));
                navDots[index].classList.add('active');
            }
        });
    }
    
    // Highlight dot on scroll
    window.addEventListener('scroll', highlightNavDot);
    
    // Initial highlight
    highlightNavDot();
    
    // Smooth scrolling for navigation links with improved performance
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced tilt effect for profile image with improved performance
    if (document.querySelector('.tilt-effect')) {
        VanillaTilt.init(document.querySelector('.tilt-effect'), {
            max: 10,
            speed: 400,
            glare: true,
            'max-glare': 0.5,
            perspective: 1000,
            scale: 1.02
        });
    }
    
    // Enhanced tilt effect for project cards with improved performance
    VanillaTilt.init(document.querySelectorAll('.project-card'), {
        max: 8,
        speed: 400,
        glare: true,
        'max-glare': 0.3,
        scale: 1.03,
        perspective: 1000,
        gyroscope: true,
        gyroscopeMinAngleX: -45,
        gyroscopeMaxAngleX: 45, 
        gyroscopeMinAngleY: -45,
        gyroscopeMaxAngleY: 45
    });
    
    // Improved animate on scroll with better performance
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const animateOnScrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('animate__animated');
                element.classList.add(element.dataset.animation);
                animateOnScrollObserver.unobserve(element); // Stop observing once animated
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        animateOnScrollObserver.observe(element);
    });
    
    // Project card click handler with improved responsiveness
    const projectCards = document.querySelectorAll('.project-card');
    const projectDetails = {
        'grade-calculator': {
            title: 'Student Grade Calculator',
            description: 'An interactive application that calculates student grades based on input scores. It provides the total marks, average percentage, and final grade based on a grading scale with a beautifully designed UI.',
            link: 'projects/grade-calculator/index.html'
        },
        'nav-scroll': {
            title: 'Slide Down Navigation Bar',
            description: 'A smooth and responsive navigation bar that slides down when users scroll down the page, providing an elegant user experience for website navigation with customizable styling options.',
            link: 'projects/nav-scroll/index.html'
        },
        'bmi-calculator': {
            title: 'BMI Calculator',
            description: 'A health tool that calculates Body Mass Index (BMI) based on user\'s height, weight, and gender. It provides BMI value and category according to standard health metrics, along with personalized recommendations.',
            link: 'projects/bmi-calculator/index.html'
        },
        'toast-notification': {
            title: 'Toast Notification System',
            description: 'A sleek notification system that displays non-intrusive messages to users. Perfect for showing success messages, alerts, and other important information with customizable durations and styles.',
            link: 'projects/toast-notification/index.html'
        },
        'internet-speed': {
            title: 'Internet Speed Test',
            description: 'A comprehensive utility that measures internet connection speed, including download and upload speeds, helping users monitor their network performance with detailed analytics and historical tracking.',
            link: 'projects/internet-speed/index.html'
        },
        'tip-calculator': {
            title: 'Tip Calculator',
            description: 'A handy tool for calculating appropriate tips at restaurants or for services based on bill amount, service quality, and other customizable factors. Features include bill splitting and percentage options.',
            link: 'projects/tip-calculator/index.html'
        },
        'analog-clock': {
            title: 'Analog Clock',
            description: 'A beautifully designed analog clock that displays current time with smooth-moving hour, minute, and second hands. Features multiple themes and timezone support.',
            link: 'projects/analog-clock/index.html'
        },
        'payroll': {
            title: 'Pay Role Management',
            description: 'A comprehensive system for managing employee payroll, including salary calculations, tax deductions, and generating pay slips with detailed breakdowns and exportable reports.',
            link: 'projects/payroll/index.html'
        },
        'parallax': {
            title: 'Mousemove Parallax Effects',
            description: 'An interactive visual effect that creates depth illusion by moving elements at different speeds as users move their mouse across the screen, creating an engaging and immersive user experience.',
            link: 'projects/parallax/index.html'
        },
        'text-to-speech': {
            title: 'Text to Speech Converter',
            description: 'An accessibility tool that converts written text into spoken words, supporting various languages and voice options. Features adjustable speech rate, pitch, and volume controls.',
            link: 'projects/text-to-speech/index.html'
        },
        'ai-image-generator': {
            title: 'AI Image Generator',
            description: 'A cutting-edge application that uses OpenAI\'s DALL-E 3 to generate unique images based on text descriptions. Features different styles, sizes, and quality options for ultimate creative control.',
            link: 'projects/ai-image-generator/index.html'
        },
        'luxury-fashion': {
            title: 'Luxury Fashion Brand',
            description: 'A high-performance Shopify store for a luxury fashion brand featuring mobile-first responsive design, smooth image zoom functionality, dark/light mode toggle, and seamless checkout experience.',
            link: 'projects/luxury-fashion/index.html'
        }
    };
    
    // Enhanced project card click handler with touch support
    projectCards.forEach(card => {
        const handleProjectCardClick = () => {
            const projectId = card.getAttribute('data-project');
            const project = projectDetails[projectId];
            
            if (project) {
                if (project.link) {
                    window.open(project.link, '_blank');
                } else {
                    const modal = document.getElementById('project-modal');
                    const modalTitle = document.getElementById('modal-title');
                    const modalDescription = document.getElementById('modal-description');
                    
                    modalTitle.textContent = project.title;
                    modalDescription.textContent = project.description;
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
                }
            }
        };
        
        // Support both click and touch events
        card.addEventListener('click', handleProjectCardClick);
        card.addEventListener('touchend', function(e) {
            e.preventDefault(); // Prevent default touch behavior
            handleProjectCardClick();
        });
        
        // Add hover effect for image loading optimization
        const projectImage = card.querySelector('.project-image img');
        if (projectImage) {
            // Use Intersection Observer for lazy loading
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const dataSrc = img.getAttribute('data-src');
                        if (dataSrc) {
                            img.src = dataSrc;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            }, { threshold: 0.1 });
            
            imageObserver.observe(projectImage);
        }
    });
});

// Enhanced header animation on scroll with performance optimization
const header = document.querySelector('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    // Only update class if scroll direction or threshold changes
    if (scrollTop > 100) {
        if (!header.classList.contains('scrolled')) {
            header.classList.add('scrolled');
        }
    } else {
        if (header.classList.contains('scrolled')) {
            header.classList.remove('scrolled');
        }
    }
    
    lastScrollTop = scrollTop;
}, { passive: true }); // Use passive event listener for better performance

// Update header background on theme toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Set initial header color
    updateHeaderColor();
    
    // Update header color whenever theme changes
    themeToggle.addEventListener('change', updateHeaderColor);
    
    function updateHeaderColor() {
        // Force header to update its style based on current theme
        if (header.classList.contains('scrolled')) {
            header.classList.remove('scrolled');
            setTimeout(() => {
                header.classList.add('scrolled');
            }, 10);
        }
    }
});

// Enhanced contact form submission with EmailJS
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    // Ensure EmailJS is properly initialized
    try {
        emailjs.init("pk_live_pVRgTwc7ZTa5DYQ1pN9N14C83J0KQO06vMpPYzbCJI3bKcNRJGAjgpesRGE1ATvb");
        console.log("EmailJS initialized successfully");
    } catch (error) {
        console.error("EmailJS initialization error:", error);
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Set form status to loading
        formStatus.innerHTML = '<div class="alert alert-info">Sending message...</div>';
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Enhanced validation
        if (!name || !email || !message) {
            formStatus.innerHTML = '<div class="alert alert-danger">Please fill in all fields.</div>';
            shakeForm();
            return;
        }
        
        // Improved email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formStatus.innerHTML = '<div class="alert alert-danger">Please enter a valid email address.</div>';
            document.getElementById('email').classList.add('error-input');
            shakeForm();
            return;
        }
        
        const templateParams = {
            name: name,
            email: email,
            message: message,
            to_name: 'Muzzamil Anwar',
            to_email: 'anwaarmuzzamil@gmail.com'
        };
        
        // EmailJS credentials
        const serviceID = 'service_qbn0f5p'; 
        const templateID = 'template_zevxz4g';
        
        // Send email using EmailJS with improved error handling
        emailjs.send(serviceID, templateID, templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                formStatus.innerHTML = '<div class="alert alert-success">Your message has been sent successfully! I will get back to you soon.</div>';
                contactForm.reset();
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                
                // Display WhatsApp alternative message
                formStatus.innerHTML = `
                    <div class="alert alert-warning">
                        <p>There was an issue sending your email. Please contact me directly via WhatsApp:</p>
                        <a href="https://wa.me/923277153783" target="_blank" class="whatsapp-btn" style="margin-top: 10px;">
                            <i class="fab fa-whatsapp"></i> Contact on WhatsApp
                        </a>
                    </div>
                `;
            });
    });
    
    // Add shake animation to form on validation error
    function shakeForm() {
        contactForm.classList.add('shake-animation');
        setTimeout(() => {
            contactForm.classList.remove('shake-animation');
        }, 500);
    }
    
    // Clear error class on input focus
    document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.remove('error-input');
        });
    });
}

// Improved section animations on scroll with Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Observe sections for fade-in
    document.querySelectorAll('section.fade-in').forEach(section => {
        observer.observe(section);
    });
    
    // Observe timeline items for fade-in
    document.querySelectorAll('.timeline-item.fade-in').forEach(item => {
        observer.observe(item);
    });
    
    // Observe skill items for staggered fade-in with improved performance
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
        item.classList.add('fade-in');
    });
    
    // Lazy load images for better performance
    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
                imgObserver.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imgObserver.observe(img);
    });
});

// Enhanced project modal functionality
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeModal = document.querySelector('.close-modal');

// Close modal when clicking on X
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
});

// Close modal when pressing ESC key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}); 