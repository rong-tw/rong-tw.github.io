document.addEventListener('DOMContentLoaded', function() {

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const heroButton = document.getElementById('hero-button');

    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }

    // Close menu and highlight link on click
    if (navMenu) {
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', e => {
                navMenu.querySelectorAll('a').forEach(l => l.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
                navMenu.classList.remove('open');
            });
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Hero button click to scroll
    if (heroButton) {
        heroButton.addEventListener('click', function() {
            const targetElement = document.getElementById('research_highlight');
            if (targetElement) {
                targetElement.scrollIntoView();
            }
        });
    }

    // Initialize all carousels
    const carouselSections = document.querySelectorAll('.carousel-section');
    carouselSections.forEach(section => {
        const leftBtn = section.querySelector('.carousel-button.left');
        const rightBtn = section.querySelector('.carousel-button.right');
        const track = section.querySelector('.carousel-track');

        if (!leftBtn || !rightBtn || !track) return;

        let scrollStep;

        function updateScrollStep() {
            // 將滾動距離設定為輪播軌道的可見寬度
            scrollStep = track.offsetWidth;
        }

        updateScrollStep();
        window.addEventListener('resize', updateScrollStep);

        leftBtn.addEventListener('click', () => {
            track.scrollBy({ left: -scrollStep, behavior: 'smooth' });
        });

        rightBtn.addEventListener('click', () => {
            track.scrollBy({ left: scrollStep, behavior: 'smooth' });
        });

        // Drag to scroll functionality
        let isDown = false;
        let startX;
        let scrollLeft;

        track.addEventListener('mousedown', (e) => {
            isDown = true;
            track.classList.add('dragging');
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
            track.style.scrollBehavior = 'auto'; // Disable smooth scroll for drag
        });

        track.addEventListener('mouseleave', () => {
            isDown = false;
            track.classList.remove('dragging');
            track.style.scrollBehavior = 'smooth';
        });

        track.addEventListener('mouseup', () => {
            isDown = false;
            track.classList.remove('dragging');
            track.style.scrollBehavior = 'smooth'; // Re-enable smooth scroll
        });

        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2; // Adjust scroll speed here
            track.scrollLeft = scrollLeft - walk;
        });
    });
});