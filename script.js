/* ============================================
   🔥 VISHNU KUMAR - PROFESSIONAL PORTFOLIO JS
   Full Stack Developer (Web + App)
   Version: 2.1 - Form Fixed Edition
   ============================================ */

'use strict';

/* ============================================
   DOM CONTENT LOADED - INITIALIZE EVERYTHING
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    App.init();
});

/* ============================================
   MAIN APPLICATION OBJECT
   ============================================ */
const App = {
    // Configuration
    config: {
        typingSpeed: 80,
        typingDeleteSpeed: 50,
        scrollOffset: 80,
        animationDuration: 800,
        counterDuration: 2000,
    },

    // Initialize all modules
    init() {
        console.log('%c🚀 Initializing Portfolio...', 'color: #6366f1; font-size: 14px; font-weight: bold;');
        
        // Core Modules
        Preloader.init();
        CustomCursor.init();
        Navigation.init();
        ThemeSwitcher.init();
        
        // Animation Modules
        TypingEffect.init();
        ScrollAnimations.init();
        StatsCounter.init();
        SkillBars.init();
        
        // Interactive Modules
        ContactForm.init();
        BackToTop.init();
        SmoothScroll.init();
        
        // Utility Modules
        LiveTime.init();
        ScrollProgress.init();
        ProfileImage.init();
        ProjectImages.init();
        
        // Log success
        this.logWelcome();
    },

    // Console welcome message
    logWelcome() {
        console.log('%c═══════════════════════════════════════', 'color: #6366f1');
        console.log('%c   Welcome to Vishnu Kumar\'s Portfolio   ', 'background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; font-size: 16px; padding: 10px 20px; border-radius: 5px; font-weight: bold;');
        console.log('%c═══════════════════════════════════════', 'color: #6366f1');
        console.log('%c💼 Full Stack Developer (Web + App)', 'color: #06b6d4; font-size: 12px;');
        console.log('%c📧 Contact: prajapatvishnu7976@gmail.com', 'color: #10b981; font-size: 12px;');
        console.log('%c📍 Location: Ajmer, Rajasthan', 'color: #f59e0b; font-size: 12px;');
        console.log('%c═══════════════════════════════════════', 'color: #6366f1');
    }
};

/* ============================================
   PRELOADER MODULE
   ============================================ */
const Preloader = {
    elements: {
        preloader: null,
        progressBar: null,
        progressPercent: null,
    },
    progress: 0,

    init() {
        this.elements.preloader = document.getElementById('preloader');
        this.elements.progressBar = document.getElementById('progress-bar');
        this.elements.progressPercent = document.getElementById('progress-percent');

        if (!this.elements.preloader) return;

        this.simulateLoading();
    },

    simulateLoading() {
        const interval = setInterval(() => {
            this.progress += Math.random() * 15;
            
            if (this.progress >= 100) {
                this.progress = 100;
                clearInterval(interval);
                this.hidePreloader();
            }

            this.updateProgress();
        }, 100);

        // Fallback: Hide after 3 seconds max
        setTimeout(() => {
            if (this.elements.preloader && !this.elements.preloader.classList.contains('hidden')) {
                this.progress = 100;
                this.updateProgress();
                this.hidePreloader();
            }
        }, 3000);
    },

    updateProgress() {
        const value = Math.min(Math.round(this.progress), 100);
        
        if (this.elements.progressBar) {
            this.elements.progressBar.style.width = `${value}%`;
        }
        
        if (this.elements.progressPercent) {
            this.elements.progressPercent.textContent = `${value}%`;
        }
    },

    hidePreloader() {
        setTimeout(() => {
            if (this.elements.preloader) {
                this.elements.preloader.classList.add('hidden');
                document.body.style.overflow = 'visible';
                
                // Trigger entrance animations
                ScrollAnimations.revealOnLoad();
            }
        }, 500);
    }
};

/* ============================================
   CUSTOM CURSOR MODULE
   ============================================ */
const CustomCursor = {
    elements: {
        dot: null,
        outline: null,
    },
    mouse: { x: 0, y: 0 },
    cursor: { x: 0, y: 0 },
    outline: { x: 0, y: 0 },
    isEnabled: true,

    init() {
        // Check for touch device
        if (this.isTouchDevice()) {
            this.isEnabled = false;
            return;
        }

        this.elements.dot = document.getElementById('cursor-dot');
        this.elements.outline = document.getElementById('cursor-outline');

        if (!this.elements.dot || !this.elements.outline) return;

        this.bindEvents();
        this.animate();
    },

    isTouchDevice() {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    },

    bindEvents() {
        // Mouse move
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, input, textarea, .project-card, .skill-card, .service-item, .highlight-item, .timeline-card, .social-link, .social-icon, .nav-link, .tool-item, .btn, .logo-icon'
        );

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.onHover());
            el.addEventListener('mouseleave', () => this.onLeave());
        });

        // Click events
        document.addEventListener('mousedown', () => this.onClick());
        document.addEventListener('mouseup', () => this.onRelease());

        // Hide when leaving window
        document.addEventListener('mouseleave', () => this.hide());
        document.addEventListener('mouseenter', () => this.show());
    },

    animate() {
        if (!this.isEnabled) return;

        // Smooth cursor following
        this.cursor.x += (this.mouse.x - this.cursor.x) * 0.2;
        this.cursor.y += (this.mouse.y - this.cursor.y) * 0.2;

        this.outline.x += (this.mouse.x - this.outline.x) * 0.12;
        this.outline.y += (this.mouse.y - this.outline.y) * 0.12;

        if (this.elements.dot) {
            this.elements.dot.style.left = `${this.cursor.x}px`;
            this.elements.dot.style.top = `${this.cursor.y}px`;
        }

        if (this.elements.outline) {
            this.elements.outline.style.left = `${this.outline.x}px`;
            this.elements.outline.style.top = `${this.outline.y}px`;
        }

        requestAnimationFrame(() => this.animate());
    },

    onHover() {
        if (this.elements.dot) this.elements.dot.classList.add('hovering');
        if (this.elements.outline) this.elements.outline.classList.add('hovering');
    },

    onLeave() {
        if (this.elements.dot) this.elements.dot.classList.remove('hovering');
        if (this.elements.outline) this.elements.outline.classList.remove('hovering');
    },

    onClick() {
        if (this.elements.dot) this.elements.dot.classList.add('clicking');
        if (this.elements.outline) this.elements.outline.classList.add('clicking');
    },

    onRelease() {
        if (this.elements.dot) this.elements.dot.classList.remove('clicking');
        if (this.elements.outline) this.elements.outline.classList.remove('clicking');
    },

    hide() {
        if (this.elements.dot) this.elements.dot.style.opacity = '0';
        if (this.elements.outline) this.elements.outline.style.opacity = '0';
    },

    show() {
        if (this.elements.dot) this.elements.dot.style.opacity = '1';
        if (this.elements.outline) this.elements.outline.style.opacity = '0.5';
    }
};

/* ============================================
   NAVIGATION MODULE
   ============================================ */
const Navigation = {
    elements: {
        navbar: null,
        navMenu: null,
        navToggle: null,
        navLinks: null,
    },
    lastScrollY: 0,
    scrollThreshold: 50,

    init() {
        this.elements.navbar = document.getElementById('navbar');
        this.elements.navMenu = document.getElementById('nav-menu');
        this.elements.navToggle = document.getElementById('nav-toggle');
        this.elements.navLinks = document.querySelectorAll('.nav-link');

        if (!this.elements.navbar) return;

        this.bindEvents();
        this.checkScroll();
    },

    bindEvents() {
        // Scroll event
        window.addEventListener('scroll', Utils.throttle(() => {
            this.onScroll();
            this.updateActiveLink();
        }, 100));

        // Mobile menu toggle
        if (this.elements.navToggle) {
            this.elements.navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Close menu on link click
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (this.elements.navbar && !this.elements.navbar.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    },

    checkScroll() {
        if (window.scrollY > this.scrollThreshold) {
            this.elements.navbar.classList.add('scrolled');
        }
    },

    onScroll() {
        const currentScrollY = window.scrollY;

        // Add/remove scrolled class
        if (currentScrollY > this.scrollThreshold) {
            this.elements.navbar.classList.add('scrolled');
        } else {
            this.elements.navbar.classList.remove('scrolled');
        }

        this.lastScrollY = currentScrollY;
    },

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                this.elements.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    },

    toggleMobileMenu() {
        if (this.elements.navMenu) this.elements.navMenu.classList.toggle('active');
        if (this.elements.navToggle) this.elements.navToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    },

    closeMobileMenu() {
        if (this.elements.navMenu) this.elements.navMenu.classList.remove('active');
        if (this.elements.navToggle) this.elements.navToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
};

/* ============================================
   THEME SWITCHER MODULE
   ============================================ */
const ThemeSwitcher = {
    elements: {
        toggle: null,
        icon: null,
    },
    currentTheme: 'dark',
    storageKey: 'portfolio-theme',

    init() {
        this.elements.toggle = document.getElementById('theme-toggle');
        this.elements.icon = document.getElementById('theme-icon');

        if (!this.elements.toggle) return;

        this.loadSavedTheme();
        this.bindEvents();
    },

    loadSavedTheme() {
        const savedTheme = localStorage.getItem(this.storageKey);
        
        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.currentTheme = prefersDark ? 'dark' : 'light';
        }

        this.applyTheme();
    },

    bindEvents() {
        this.elements.toggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(this.storageKey)) {
                this.currentTheme = e.matches ? 'dark' : 'light';
                this.applyTheme();
            }
        });
    },

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme();
        this.saveTheme();
        
        // Show toast notification
        Toast.show(
            this.currentTheme === 'dark' 
                ? '🌙 Dark Mode Activated!' 
                : '☀️ Light Mode Activated!'
        );
    },

    applyTheme() {
        if (this.currentTheme === 'light') {
            document.body.classList.add('light-mode');
            if (this.elements.icon) {
                this.elements.icon.classList.remove('fa-moon');
                this.elements.icon.classList.add('fa-sun');
            }
        } else {
            document.body.classList.remove('light-mode');
            if (this.elements.icon) {
                this.elements.icon.classList.remove('fa-sun');
                this.elements.icon.classList.add('fa-moon');
            }
        }
    },

    saveTheme() {
        localStorage.setItem(this.storageKey, this.currentTheme);
    }
};

/* ============================================
   TYPING EFFECT MODULE
   ============================================ */
const TypingEffect = {
    element: null,
    phrases: [
        'Full Stack Developer 🚀',
        'Web Developer 💻',
        'App Developer 📱',
        'React & Node.js Expert ⚛️',
        'Flutter Developer 📲',
        'DSA Enthusiast 🧠',
        'Problem Solver 💡',
        'B.Tech CSE Student 🎓',
    ],
    currentPhraseIndex: 0,
    currentCharIndex: 0,
    isDeleting: false,
    typingSpeed: 80,
    deletingSpeed: 50,
    pauseDelay: 2000,

    init() {
        this.element = document.getElementById('typed-text');
        if (!this.element) return;

        this.type();
    },

    type() {
        const currentPhrase = this.phrases[this.currentPhraseIndex];
        
        if (this.isDeleting) {
            // Deleting
            this.currentCharIndex--;
            this.element.textContent = currentPhrase.substring(0, this.currentCharIndex);
            
            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
                setTimeout(() => this.type(), 500);
                return;
            }
        } else {
            // Typing
            this.currentCharIndex++;
            this.element.textContent = currentPhrase.substring(0, this.currentCharIndex);
            
            if (this.currentCharIndex === currentPhrase.length) {
                this.isDeleting = true;
                setTimeout(() => this.type(), this.pauseDelay);
                return;
            }
        }

        const speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;
        setTimeout(() => this.type(), speed);
    }
};

/* ============================================
   SCROLL ANIMATIONS MODULE
   ============================================ */
const ScrollAnimations = {
    observerOptions: {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    },

    init() {
        this.setupObservers();
    },

    setupObservers() {
        // Fade in up animation
        const fadeElements = document.querySelectorAll(
            '.section-header, .about-card, .info-card, .timeline-item, .skill-category, .project-card, .contact-info, .contact-form-wrapper'
        );

        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.observerOptions);

        fadeElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            fadeObserver.observe(el);
        });
    },

    revealOnLoad() {
        // Trigger initial animations after preloader
        const heroElements = document.querySelectorAll('.hero-content > *, .hero-visual');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
};

/* ============================================
   STATS COUNTER MODULE
   ============================================ */
const StatsCounter = {
    elements: null,
    hasAnimated: false,

    init() {
        this.elements = document.querySelectorAll('.stat-number[data-count]');
        if (this.elements.length === 0) return;

        this.setupObserver();
    },

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.hasAnimated = true;
                    this.animateCounters();
                }
            });
        }, { threshold: 0.5 });

        // Observe the first stat element
        const statsContainer = document.querySelector('.hero-stats');
        if (statsContainer) {
            observer.observe(statsContainer);
        }
    },

    animateCounters() {
        this.elements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.round(target * easeOutQuart);
                
                counter.textContent = currentValue + '+';
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };

            requestAnimationFrame(updateCounter);
        });
    }
};

/* ============================================
   SKILL BARS MODULE
   ============================================ */
const SkillBars = {
    elements: null,

    init() {
        this.elements = document.querySelectorAll('.skill-progress[data-progress]');
        if (this.elements.length === 0) return;

        this.setupObserver();
    },

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const progress = progressBar.getAttribute('data-progress');
                    
                    setTimeout(() => {
                        progressBar.style.width = `${progress}%`;
                    }, 200);
                    
                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });

        this.elements.forEach(el => observer.observe(el));
    }
};

/* ============================================
   CONTACT FORM MODULE - FIXED FOR WEB3FORMS
   ============================================ */
const ContactForm = {
    form: null,
    submitBtn: null,

    init() {
        this.form = document.getElementById('contact-form');
        if (!this.form) return;

        this.submitBtn = this.form.querySelector('.btn-submit');
        this.bindEvents();
    },

    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate
            if (!this.validateForm()) {
                return;
            }

            // Show loading
            this.setLoadingState(true);

            try {
                // Submit to Web3Forms
                const formData = new FormData(this.form);
                
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    Toast.show('✅ Message sent successfully!', 'success');
                    this.form.reset();
                    
                    // Reset input animations
                    document.querySelectorAll('.input-wrapper').forEach(wrapper => {
                        wrapper.classList.remove('focused');
                    });
                } else {
                    throw new Error(result.message || 'Submission failed');
                }

            } catch (error) {
                console.error('Form error:', error);
                Toast.show('❌ Failed to send. Please try again.', 'error');
            } finally {
                this.setLoadingState(false);
            }
        });

        // Input animations
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    },

    validateForm() {
        // FIXED: Use #subject-input instead of #subject
        const name = this.form.querySelector('#name')?.value.trim();
        const email = this.form.querySelector('#email')?.value.trim();
        const subject = this.form.querySelector('#subject-input')?.value.trim(); // FIXED LINE
        const message = this.form.querySelector('#message')?.value.trim();

        if (!name) {
            Toast.show('⚠️ Please enter your name', 'warning');
            this.form.querySelector('#name')?.focus();
            return false;
        }

        if (!email || !email.includes('@')) {
            Toast.show('⚠️ Please enter a valid email', 'warning');
            this.form.querySelector('#email')?.focus();
            return false;
        }

        if (!subject) {
            Toast.show('⚠️ Please enter a subject', 'warning');
            this.form.querySelector('#subject-input')?.focus(); // FIXED LINE
            return false;
        }

        if (!message) {
            Toast.show('⚠️ Please enter your message', 'warning');
            this.form.querySelector('#message')?.focus();
            return false;
        }

        return true;
    },

    setLoadingState(isLoading) {
        if (this.submitBtn) {
            if (isLoading) {
                this.submitBtn.classList.add('loading');
                this.submitBtn.disabled = true;
            } else {
                this.submitBtn.classList.remove('loading');
                this.submitBtn.disabled = false;
            }
        }
    }
};

/* ============================================
   BACK TO TOP MODULE
   ============================================ */
const BackToTop = {
    button: null,
    scrollThreshold: 500,

    init() {
        this.button = document.getElementById('back-to-top');
        if (!this.button) return;

        this.bindEvents();
    },

    bindEvents() {
        // Show/hide button on scroll
        window.addEventListener('scroll', Utils.throttle(() => {
            this.toggleVisibility();
        }, 100));

        // Scroll to top on click
        this.button.addEventListener('click', () => {
            this.scrollToTop();
        });
    },

    toggleVisibility() {
        if (window.scrollY > this.scrollThreshold) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    },

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        Toast.show('🚀 Back to top!');
    }
};

/* ============================================
   SMOOTH SCROLL MODULE
   ============================================ */
const SmoothScroll = {
    init() {
        this.bindEvents();
    },

    bindEvents() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                
                if (targetId === '#') return;
                
                this.scrollToElement(targetId);
            });
        });
    },

    scrollToElement(targetId) {
        const targetElement = document.querySelector(targetId);
        
        if (!targetElement) return;

        const headerOffset = App.config.scrollOffset;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

/* ============================================
   LIVE TIME MODULE
   ============================================ */
const LiveTime = {
    element: null,

    init() {
        this.element = document.getElementById('current-time');
        if (!this.element) return;

        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    },

    updateTime() {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        
        const timeString = now.toLocaleTimeString('en-IN', options);
        this.element.innerHTML = `<i class="fas fa-clock"></i> ${timeString} IST`;
    }
};

/* ============================================
   SCROLL PROGRESS MODULE
   ============================================ */
const ScrollProgress = {
    element: null,

    init() {
        this.element = document.getElementById('scroll-progress');
        if (!this.element) return;

        window.addEventListener('scroll', Utils.throttle(() => {
            this.updateProgress();
        }, 50));
    },

    updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        
        this.element.style.width = `${scrollPercent}%`;
    }
};

/* ============================================
   PROFILE IMAGE MODULE
   ============================================ */
const ProfileImage = {
    init() {
        const profileImg = document.getElementById('profile-img');
        const placeholder = document.getElementById('photo-placeholder');
        
        if (!profileImg || !placeholder) return;

        // Check if image loads successfully
        profileImg.addEventListener('load', () => {
            // Image loaded successfully, hide placeholder
            placeholder.style.display = 'none';
            profileImg.style.display = 'block';
        });

        profileImg.addEventListener('error', () => {
            // Image failed to load, show placeholder
            placeholder.style.display = 'flex';
            profileImg.style.display = 'none';
        });

        // Check if src is valid
        if (!profileImg.src || profileImg.src.includes('your-photo.jpg') || profileImg.src === window.location.href) {
            placeholder.style.display = 'flex';
            profileImg.style.display = 'none';
        }
    }
};

/* ============================================
   PROJECT IMAGES MODULE
   ============================================ */
const ProjectImages = {
    init() {
        const projectImages = document.querySelectorAll('.project-img');
        
        projectImages.forEach(img => {
            const placeholder = img.nextElementSibling;
            
            if (!placeholder || !placeholder.classList.contains('project-img-placeholder')) return;

            // Check if image loads successfully
            img.addEventListener('load', () => {
                if (img.src && !img.src.includes('placeholder') && img.naturalWidth > 0) {
                    placeholder.style.display = 'none';
                    img.style.display = 'block';
                }
            });

            img.addEventListener('error', () => {
                placeholder.style.display = 'flex';
                img.style.display = 'none';
            });

            // Initial check
            if (!img.src || img.src.includes('.jpg') && img.naturalWidth === 0) {
                placeholder.style.display = 'flex';
                img.style.display = 'none';
            }
        });
    }
};

/* ============================================
   TOAST NOTIFICATION MODULE
   ============================================ */
const Toast = {
    container: null,
    timeout: null,

    show(message, type = 'info', duration = 3000) {
        // Remove existing toast
        this.remove();

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        toast.innerHTML = `
            <span class="toast-message">${message}</span>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;

        // Add styles
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            padding: 15px 25px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            border-radius: 50px;
            font-size: 0.95rem;
            font-weight: 500;
            z-index: 100000;
            box-shadow: 0 10px 40px rgba(99, 102, 241, 0.4);
            display: flex;
            align-items: center;
            gap: 15px;
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            max-width: 90%;
        `;

        // Type-specific styles
        if (type === 'success') {
            toast.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            toast.style.boxShadow = '0 10px 40px rgba(16, 185, 129, 0.4)';
        } else if (type === 'error') {
            toast.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            toast.style.boxShadow = '0 10px 40px rgba(239, 68, 68, 0.4)';
        } else if (type === 'warning') {
            toast.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
            toast.style.boxShadow = '0 10px 40px rgba(245, 158, 11, 0.4)';
        }

        document.body.appendChild(toast);
        this.container = toast;

        // Close button
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1rem;
            opacity: 0.8;
            transition: opacity 0.3s;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        closeBtn.addEventListener('click', () => this.remove());

        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 50);

        // Auto remove
        this.timeout = setTimeout(() => {
            this.remove();
        }, duration);
    },

    remove() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        if (this.container) {
            this.container.style.transform = 'translateX(-50%) translateY(100px)';
            this.container.style.opacity = '0';
            
            setTimeout(() => {
                if (this.container && this.container.parentNode) {
                    this.container.parentNode.removeChild(this.container);
                }
                this.container = null;
            }, 400);
        }
    }
};

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */
const Utils = {
    // Throttle function - limits function calls
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Debounce function - delays function calls
    debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Get random number between min and max
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
};

/* ============================================
   KEYBOARD SHORTCUTS
   ============================================ */
document.addEventListener('keydown', (e) => {
    // Don't trigger shortcuts when typing in inputs
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }

    // 'T' - Toggle theme
    if (e.key === 't' || e.key === 'T') {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) themeToggle.click();
    }

    // 'Home' - Go to top
    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 'End' - Go to bottom
    if (e.key === 'End') {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }

    // 'Escape' - Close mobile menu
    if (e.key === 'Escape') {
        Navigation.closeMobileMenu();
    }
});

/* ============================================
   EASTER EGG - KONAMI CODE
   ============================================ */
const KonamiCode = {
    sequence: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
    current: [],

    init() {
        document.addEventListener('keydown', (e) => {
            this.current.push(e.key);
            this.current = this.current.slice(-10);

            if (this.current.join(',') === this.sequence.join(',')) {
                this.activate();
            }
        });
    },

    activate() {
        Toast.show('🎮 Konami Code Activated! You found the secret!', 'success', 5000);
        this.createConfetti();
        
        // Rainbow animation
        document.body.style.animation = 'rainbow 2s linear';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    },

    createConfetti() {
        const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#ef4444'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: ${Utils.random(5, 15)}px;
                height: ${Utils.random(5, 15)}px;
                background: ${colors[Utils.random(0, colors.length - 1)]};
                left: ${Utils.random(0, 100)}vw;
                top: -20px;
                border-radius: ${Utils.random(0, 1) ? '50%' : '0'};
                pointer-events: none;
                z-index: 999999;
                animation: confettiFall ${Utils.random(2, 5)}s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }
    }
};

// Initialize Konami Code
KonamiCode.init();

/* ============================================
   ADD ANIMATIONS TO STYLES
   ============================================ */
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    body.menu-open {
        overflow: hidden;
    }
`;
document.head.appendChild(style);

/* ============================================
   PERFORMANCE OPTIMIZATION - LAZY LOADING
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});

/* ============================================
   ERROR HANDLING
   ============================================ */
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

/* ============================================
   FINAL CONSOLE MESSAGE
   ============================================ */
console.log('%c✨ Portfolio loaded successfully!', 'color: #10b981; font-size: 14px; font-weight: bold;');
console.log('%cPress "T" to toggle theme, use Konami Code for a surprise! 🎮', 'color: #6366f1; font-size: 12px;');