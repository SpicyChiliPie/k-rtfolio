'use strict';

function setActive() {
    const navLinks = document.querySelectorAll('.section-links .nav-item');
    let userScrolling = true; // Whether observer updates are allowed
    let scrollTimeout;

    // Map of section ID → corresponding nav link
    const sectionMap = {};
    navLinks.forEach(link => {
        const id = link.getAttribute('href').substring(1);
        const section = document.getElementById(id);
        if (section) sectionMap[id] = link;

        // When clicking a link, temporarily disable observer updates
        link.addEventListener('click', e => {
            userScrolling = false;

            // Remove active state from all, activate the clicked one immediately
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Re-enable updates after scroll settles
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => (userScrolling = true), 800);
        });
    });

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                const link = sectionMap[id];
                if (entry.isIntersecting) {
                    // Remove "active" from all, then activate current
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        },
        {
            root: null,          // viewport
            threshold: 0.8       // section must be at least 80% visible
        }
    );

    // Observe each section
    Object.keys(sectionMap).forEach(id => observer.observe(document.getElementById(id)));

}

document.addEventListener('DOMContentLoaded', setActive);
