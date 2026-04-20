/**
 * Portfolio JavaScript for Aryaveer Lohia
 * Features: Preloader, Typing Animation, Scroll Reveal, Navbar logic, Form handling
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. PRELOADER
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                // Trigger initial reveals
                reveal();
            }, 500);
        }, 1000);
    });

    // 2. TYPING ANIMATION
    const typingText = document.getElementById('typing-text');
    const roles = [
        "Aspiring Software Developer",
        "Python Enthusiast",
        "Web Dev Learner",
        "Problem Solver"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    
    if (typingText) type();

    // 3. SCROLL REVEAL ANIMATION
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', reveal);

    // 4. NAVBAR SCROLL EFFECT & ACTIVE LINKS
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Navbar styling
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 5. MOBILE MENU
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.classList.remove('no-scroll');
        });
    });

    // 6. SCROLL TO TOP
    const scrollTopBtn = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 7. PARTICLES BACKGROUND (Pure JS)
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random styling for particles
        const size = Math.random() * 5 + 2 + 'px';
        const posX = Math.random() * 100 + 'vw';
        const posY = Math.random() * 100 + 'vh';
        const delay = Math.random() * 5 + 's';
        const duration = Math.random() * 10 + 10 + 's';
        
        Object.assign(particle.style, {
            position: 'absolute',
            width: size,
            height: size,
            backgroundColor: 'rgba(100, 255, 218, 0.1)',
            borderRadius: '50%',
            top: posY,
            left: posX,
            animation: `float ${duration} linear infinite`,
            animationDelay: delay
        });

        particlesContainer.appendChild(particle);
    }

    // CSS for floating particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
            20% { opacity: 0.5; }
            80% { opacity: 0.5; }
            100% { transform: translate(100px, -100px) rotate(360deg); opacity: 0; }
        }
        .no-scroll { overflow: hidden; }
    `;
    document.head.appendChild(style);

    // 8. CONTACT FORM HANDLING (Mock)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalBtnText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.backgroundColor = 'var(--accent)';
                submitBtn.style.color = 'var(--bg-dark)';
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = 'transparent';
                    submitBtn.style.color = 'var(--accent)';
                }, 3000);
            }, 1500);
        });
    }

});
