document.addEventListener('DOMContentLoaded', () => {
    // Home section transition animation
    const homeSection = document.querySelector('#home');
    const homeElements = document.querySelectorAll('.home-content .profile-img, .home-content h1, .home-content p, .home-content .btn');
    
    setTimeout(() => {
        homeSection.classList.add('loaded');
        homeElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 200);
        });
    }, 100);

    // Sidebar profile picture animation
    const sidebarProfileImg = document.querySelector('.sidebar-profile-img');
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelector('.nav-links');

    // Show sidebar profile picture when sidebar is active or navigating
    const showSidebarProfile = () => {
        sidebarProfileImg.classList.add('visible');
    };

    // Hide sidebar profile picture on home section
    const hideSidebarProfile = () => {
        sidebarProfileImg.classList.remove('visible');
    };

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        navLinks.classList.toggle('active');
        if (sidebar.classList.contains('active')) {
            showSidebarProfile();
        } else {
            hideSidebarProfile();
        }
    });

    // Smooth scroll and blur transition
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Add blur to all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.add('blur');
                section.style.opacity = '0.5'; // Fade out non-target sections
            });

            // Show sidebar profile picture except on home
            if (targetId !== 'home') {
                showSidebarProfile();
            } else {
                hideSidebarProfile();
            }

            // Remove blur and scroll to target with faster delay
            setTimeout(() => {
                targetSection.classList.remove('blur');
                targetSection.style.opacity = '1'; // Fade in target section
                targetSection.scrollIntoView({ behavior: 'smooth' });
                document.querySelectorAll('.section').forEach(section => {
                    if (section !== targetSection) {
                        section.classList.remove('blur');
                        section.style.opacity = '1'; // Restore opacity
                    }
                });
                // Close sidebar on mobile after click
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }, 400); // Faster delay (400ms)
        });
    });

    // Scroll animations for text, cards, and category icons
    const animateElements = document.querySelectorAll('.animate-text');
    const categoryIcons = document.querySelectorAll('.category-icon');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Trigger category icon animation if present
                const icon = entry.target.querySelector('.category-icon');
                if (icon) {
                    setTimeout(() => {
                        icon.classList.add('visible');
                    }, 100); // Slight delay for staggered effect
                }
            } else {
                entry.target.classList.remove('visible');
                const icon = entry.target.querySelector('.category-icon');
                if (icon) {
                    icon.classList.remove('visible');
                }
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(element => observer.observe(element));

    // Gallery lightbox
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const galleryLightbox = document.querySelector('#lightbox');
    const galleryLightboxImg = document.querySelector('#lightbox-img');
    const galleryCaption = document.querySelector('#caption');
    const galleryClose = document.querySelector('#lightbox .close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            galleryLightbox.style.display = 'flex';
            galleryLightboxImg.src = item.src;
            galleryCaption.textContent = item.parentElement.querySelector('.caption').textContent;
        });
    });

    galleryClose.addEventListener('click', () => {
        galleryLightbox.style.display = 'none';
    });

    galleryLightbox.addEventListener('click', (e) => {
        if (e.target === galleryLightbox) {
            galleryLightbox.style.display = 'none';
        }
    });

    // Photography lightbox
    const photographyItems = document.querySelectorAll('.photography-item img');
    const photographyLightbox = document.querySelector('#photography-lightbox');
    const photographyLightboxImg = document.querySelector('#photography-lightbox-img');
    const photographyCaption = document.querySelector('#photography-caption');
    const photographyClose = document.querySelector('#photography-lightbox .close');

    photographyItems.forEach(item => {
        item.addEventListener('click', () => {
            photographyLightbox.style.display = 'flex';
            photographyLightboxImg.src = item.src;
            photographyCaption.textContent = item.parentElement.querySelector('.caption').textContent;
        });
    });

    photographyClose.addEventListener('click', () => {
        photographyLightbox.style.display = 'none';
    });

    photographyLightbox.addEventListener('click', (e) => {
        if (e.target === photographyLightbox) {
            photographyLightbox.style.display = 'none';
        }
    });

    // Filter for activities, certificates, gallery, and photography
    const filterButtons = document.querySelectorAll('.filter button');
    const filterableItems = document.querySelectorAll('.activity-card, .certificate-card, .gallery-item, .photography-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            const section = button.closest('.section');
            const items = section.querySelectorAll('.activity-card, .certificate-card, .gallery-item, .photography-item');
            items.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Contact form submission (demo alert)
    const form = document.querySelector('#contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Message sent! (This is a demo)');
        form.reset();
    });

    // Educational Technology background animation
    const bgCanvas = document.createElement('canvas');
    document.getElementById('background-canvas').appendChild(bgCanvas);
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    const bgCtx = bgCanvas.getContext('2d');

    const icons = [
        { char: '📚', type: 'education' }, // Book
        { char: '💻', type: 'technology' }, // Laptop
        { char: '🎓', type: 'education' }, // Graduation cap
        { char: '💡', type: 'education' }, // Lightbulb
        { char: '📝', type: 'education' }, // Pencil
        { char: '🌐', type: 'technology' }, // Globe
        { char: '⚙️', type: 'technology' }, // Gear
        { char: '⌨️', type: 'technology' } // Code brackets
    ];
    const edTechIcons = [];
    const numIcons = 15;

    class EdTechIcon {
        constructor() {
            this.x = Math.random() * bgCanvas.width;
            this.y = Math.random() * bgCanvas.height;
            this.icon = icons[Math.floor(Math.random() * icons.length)];
            this.size = Math.random() * 40 + 30; // Larger icons (30-70px)
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.2 + 0.4; // Adjusted for darker background
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.015;
            this.pulse = Math.random() * Math.PI * 2;
            this.pulseSpeed = 0.05;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.rotation += this.rotationSpeed;
            this.pulse += this.pulseSpeed;
            this.opacity = 0.4 + Math.sin(this.pulse) * 0.2; // Pulsing effect

            // Wrap around edges
            if (this.x < -this.size) this.x = bgCanvas.width + this.size;
            if (this.x > bgCanvas.width + this.size) this.x = -this.size;
            if (this.y < -this.size) this.y = bgCanvas.height + this.size;
            if (this.y > bgCanvas.height + this.size) this.y = -this.size;
        }

        draw() {
            bgCtx.save();
            bgCtx.translate(this.x, this.y);
            bgCtx.rotate(this.rotation);
            bgCtx.font = `${this.size}px sans-serif`;
            bgCtx.fillStyle = `rgba(0, 183, 235, ${this.opacity})`;
            bgCtx.textAlign = 'center';
            bgCtx.textBaseline = 'middle';
            bgCtx.fillText(this.icon.char, 0, 0);
            bgCtx.restore();
        }
    }

    // Initialize icons
    for (let i = 0; i < numIcons; i++) {
        edTechIcons.push(new EdTechIcon());
    }

    function animateBackground() {
        // Draw gradient background (dark blue to indigo)
        const gradient = bgCtx.createLinearGradient(0, 0, 0, bgCanvas.height);
        gradient.addColorStop(0, '#001133'); // Dark blue
        gradient.addColorStop(1, '#2f004f'); // Indigo
        bgCtx.fillStyle = gradient;
        bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

        // Draw connections between education and technology icons
        for (let i = 0; i < edTechIcons.length; i++) {
            for (let j = i + 1; j < edTechIcons.length; j++) {
                const icon1 = edTechIcons[i];
                const icon2 = edTechIcons[j];
                if (icon1.icon.type !== icon2.icon.type) { // Connect education to technology
                    const dx = icon1.x - icon2.x;
                    const dy = icon1.y - icon2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 200) {
                        bgCtx.beginPath();
                        bgCtx.moveTo(icon1.x, icon1.y);
                        bgCtx.lineTo(icon2.x, icon2.y);
                        bgCtx.strokeStyle = `rgba(0, 183, 235, ${0.3 - distance / 200})`;
                        bgCtx.lineWidth = 0.5;
                        bgCtx.stroke();
                    }
                }
            }
        }

        // Update and draw icons
        edTechIcons.forEach(icon => {
            icon.update();
            icon.draw();
        });

        requestAnimationFrame(animateBackground);
    }

    // Resize background canvas
    window.addEventListener('resize', () => {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
    });

    animateBackground();
});