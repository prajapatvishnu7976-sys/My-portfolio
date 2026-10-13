'use strict';

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

const App = {
    init() {
        document.body.classList.add('no-scroll');
        Preloader.init();
        Navigation.init();
        ThemeManager.init();
        HeroTyping.init();
        TerminalAnim.init();
        StatsCounter.init();
        SkillProgress.init();
        ExperienceTabs.init();
        ProjectFilter.init();
        FaqAccordion.init();
        ContactForm.init();
        ScrollFeatures.init();
        LiveTime.init();
    }
};

const Preloader = {
    init() {
        const preloader = document.getElementById('preloader');
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-percent');

        if (!preloader) { document.body.classList.remove('no-scroll'); return; }

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.classList.add('hidden');
                        document.body.classList.remove('no-scroll');
                    }, 500);
                }, 300);
            }
            if (progressBar) progressBar.style.width = `${progress}%`;
            if (progressText) progressText.textContent = `${Math.floor(progress)}%`;
        }, 50);

        setTimeout(() => {
            if (!preloader.classList.contains('hidden')) {
                preloader.classList.add('hidden');
                document.body.classList.remove('no-scroll');
            }
        }, 4000);
    }
};

const Navigation = {
    init() {
        const navbar = document.getElementById('navbar');
        const toggleBtn = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!navbar) return;

        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
            this.updateActiveLink();
        });

        if (toggleBtn && navMenu) {
            toggleBtn.addEventListener('click', () => {
                toggleBtn.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    toggleBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            document.addEventListener('click', (e) => {
                if (navMenu.classList.contains('active') &&
                    !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
                    toggleBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    },

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 150) current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }
};

const ThemeManager = {
    init() {
        const toggle = document.getElementById('theme-toggle');
        const icon = document.getElementById('theme-icon');
        const toast = document.getElementById('theme-toast');
        if (!toggle) return;

        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-mode');
            icon.classList.replace('fa-moon', 'fa-sun');
        }

        toggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            if (isLight) {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'light');
                this.showToast(toast, 'fa-sun', '☀️ Light Mode Enabled');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'dark');
                this.showToast(toast, 'fa-moon', '🌙 Dark Mode Enabled');
            }
        });
    },
    showToast(toastEl, iconClass, msg) {
        if (!toastEl) return;
        const icon = toastEl.querySelector('i');
        if (icon) icon.className = `fas ${iconClass}`;
        toastEl.querySelector('span').textContent = msg;
        toastEl.style.transform = 'translateY(0)';
        toastEl.style.opacity = '1';
        clearTimeout(this._t);
        this._t = setTimeout(() => {
            toastEl.style.transform = 'translateY(30px)';
            toastEl.style.opacity = '0';
        }, 2200);
    }
};

const HeroTyping = {
    init() {
        const textEl = document.getElementById('typed-text');
        if (!textEl) return;
        const words = ["Production Mobile Apps", "Full Stack Web Solutions", "Java DSA Algorithms", "AI-Powered Tools"];
        let wordIdx = 0, charIdx = 0, isDeleting = false;

        function type() {
            const currentWord = words[wordIdx];
            textEl.textContent = isDeleting ? currentWord.substring(0, charIdx - 1) : currentWord.substring(0, charIdx + 1);
            charIdx += isDeleting ? -1 : 1;
            let speed = isDeleting ? 50 : 100;
            if (!isDeleting && charIdx === currentWord.length) { speed = 2000; isDeleting = true; }
            else if (isDeleting && charIdx === 0) { isDeleting = false; wordIdx = (wordIdx + 1) % words.length; speed = 500; }
            setTimeout(type, speed);
        }
        setTimeout(type, 1000);
    }
};

const TerminalAnim = {
    init() {
        const cmdEl = document.getElementById('terminal-command');
        const outEl = document.getElementById('terminal-output');
        const timeEl = document.getElementById('terminal-time');
        if (!cmdEl || !outEl) return;

        if (timeEl) {
            setInterval(() => {
                timeEl.textContent = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
            }, 1000);
        }

        const commands = [
            { cmd: "whoami", out: "Vishnu Kumar\nRole: Software Developer\nCollege: GEC Ajmer (CSE)" },
            { cmd: "cat skills.json", out: '{"Mobile": "Flutter", "Web": ["React","Node"], "Core": "Java DSA"}' },
            { cmd: "git status", out: "On branch master\nUp to date.\n\nReady for opportunities 🚀" }
        ];
        let cmdIdx = 0;

        function runTerminal() {
            const current = commands[cmdIdx];
            cmdEl.textContent = ""; outEl.textContent = "";
            let i = 0;
            (function typeCmd() {
                if (i < current.cmd.length) {
                    cmdEl.textContent += current.cmd.charAt(i); i++;
                    setTimeout(typeCmd, 100);
                } else {
                    setTimeout(() => {
                        outEl.textContent = current.out;
                        setTimeout(() => { cmdIdx = (cmdIdx + 1) % commands.length; runTerminal(); }, 4000);
                    }, 500);
                }
            })();
        }
        setTimeout(runTerminal, 2000);
    }
};

const StatsCounter = {
    init() {
        const stats = document.querySelectorAll('.stat-value');
        if (!stats.length) return;
        let animated = false;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animated) {
                animated = true;
                stats.forEach(stat => {
                    const target = parseFloat(stat.getAttribute('data-count'));
                    const isDecimal = stat.getAttribute('data-decimal') === "2";
                    const suffix = stat.getAttribute('data-suffix') || "";
                    let current = 0;
                    const inc = target / 60;
                    const t = setInterval(() => {
                        current += inc;
                        if (current >= target) { current = target; clearInterval(t); }
                        stat.textContent = (isDecimal ? current.toFixed(2) : Math.floor(current)) + suffix;
                    }, 30);
                });
            }
        }, { threshold: 0.5 });
        const container = document.querySelector('.hero-stats');
        if (container) observer.observe(container);
    }
};

const SkillProgress = {
    init() {
        const bars = document.querySelectorAll('.skill-progress-fill');
        if (!bars.length) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.width = entry.target.getAttribute('data-progress') + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        bars.forEach(b => observer.observe(b));
    }
};

const ExperienceTabs = {
    init() {
        const tabs = document.querySelectorAll('.exp-tab');
        const contents = document.querySelectorAll('.exp-content');
        if (!tabs.length) return;
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                const target = document.getElementById(`tab-${tab.getAttribute('data-tab')}`);
                if (target) target.classList.add('active');
            });
        });
    }
};

const ProjectFilter = {
    init() {
        const btns = document.querySelectorAll('.filter-btn');
        const projects = document.querySelectorAll('.project-mega-card');
        if (!btns.length) return;
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                projects.forEach(card => {
                    const cats = card.getAttribute('data-category');
                    card.classList.toggle('hidden-card', !(filter === 'all' || cats.includes(filter)));
                });
            });
        });
    }
};

const FaqAccordion = {
    init() {
        const items = document.querySelectorAll('.faq-item');
        if (!items.length) return;
        items.forEach(item => {
            const q = item.querySelector('.faq-question');
            if (!q) return;
            q.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                items.forEach(i => i.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        });
    }
};

const ContactForm = {
    init() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('.form-submit-btn');
            const btnText = btn.querySelector('.btn-text');
            const btnLoading = btn.querySelector('.btn-loading');
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
            btn.disabled = true;
            try {
                const formData = new FormData(form);
                const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
                const result = await res.json();
                alert(result.success ? '✅ Message sent successfully!' : '❌ Something went wrong. Try again.');
                if (result.success) form.reset();
            } catch {
                alert('❌ Network error. Please try again.');
            } finally {
                btnText.style.display = 'flex';
                btnLoading.style.display = 'none';
                btn.disabled = false;
            }
        });
    }
};

const ScrollFeatures = {
    init() {
        const progressBar = document.getElementById('scroll-progress');
        const bttBtn = document.getElementById('back-to-top');
        const bttCircle = document.querySelector('.btt-progress circle');
        const circumference = 2 * Math.PI * 45;
        if (bttCircle) bttCircle.style.strokeDasharray = circumference;

        window.addEventListener('scroll', () => {
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            const percent = scrollTotal > 0 ? window.scrollY / scrollTotal : 0;
            if (progressBar) progressBar.style.width = `${percent * 100}%`;
            if (bttBtn) {
                bttBtn.classList.toggle('visible', window.scrollY > 400);
                if (bttCircle) bttCircle.style.strokeDashoffset = circumference - (percent * circumference);
            }
        });

        if (bttBtn) bttBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
};

const LiveTime = {
    init() {
        const el = document.getElementById('live-time');
        if (!el) return;
        setInterval(() => {
            const t = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
            el.innerHTML = `<i class="fas fa-clock"></i> ${t} IST`;
        }, 1000);
    }
};