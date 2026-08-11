// Initialize AOS Library On Page Load
AOS.init({
    duration: 1000,
    once: true,
    offset: 120
});

// Interactive 3D Laptop System Boot Execution
const powerOffScreen = document.getElementById('powerOffScreen');
const powerOnScreen = document.getElementById('powerOnScreen');
const laptopScreen = document.getElementById('laptopScreen');
const siteHeader = document.getElementById('siteHeader');
const mainPortfolioContent = document.getElementById('mainPortfolioContent');
const siteFooter = document.getElementById('siteFooter');

if (powerOffScreen && powerOnScreen) {
    powerOffScreen.addEventListener('click', () => {
        // Hide power off screen & display laptop desktop
        powerOffScreen.style.display = 'none';
        powerOnScreen.style.display = 'block';

        if (laptopScreen) {
            laptopScreen.style.borderColor = '#00f2fe';
            laptopScreen.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.8), 0 0 45px rgba(0, 242, 254, 0.35)';
        }

        // Unhide header, main content sections & footer
        if (siteHeader) siteHeader.classList.add('boot-visible');
        if (mainPortfolioContent) mainPortfolioContent.classList.add('boot-visible');
        if (siteFooter) siteFooter.classList.add('boot-visible');

        // CRITICAL FIX: Re-initialize & Refresh AOS library when sections become visible so scroll animations work 100%
        setTimeout(() => {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 120
            });
            AOS.refresh();
        }, 150);

        // Run typing animation inside laptop screen
        typeOnce();
    });
}

// Mobile Navigation Drawer Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

// Single Phrase Typing Animation (IT Professional & Specialist)
const typingText = document.querySelector('.typing-text');
const phrase = "IT Professional & Specialist";
let charIndex = 0;

function typeOnce() {
    if (!typingText) return;
    
    if (charIndex < phrase.length) {
        typingText.textContent += phrase.charAt(charIndex);
        charIndex++;
        setTimeout(typeOnce, 80);
    }
}

// Scroll To Top Logic
const scrollTopBtn = document.getElementById('scroll-top-btn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Subtle Professional Background Canvas
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    class AmbientParticle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 1.5 + 0.5;
            this.vy = -(Math.random() * 0.3 + 0.1);
            this.alpha = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.y += this.vy;
            if (this.y < 0) {
                this.y = height;
                this.x = Math.random() * width;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 242, 254, ${this.alpha})`;
            ctx.fill();
        }
    }

    const particles = Array.from({ length: 45 }, () => new AmbientParticle());

    function renderBackground() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(renderBackground);
    }
    renderBackground();
}