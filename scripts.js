// scripts.js (deferred)
'use strict';

/* -------------------------
  Data: 12 sample projects
   Each project: id, title, desc, tags (array), image (url), long (case study html)
---------------------------*/
const projects = [
    {
        id: 'p1',
        client: 'HELGE KOOL',
        /* logo: 'logos/Helge-Kool-Logo.png',*/
        title: 'Making Mental Health Resources More Engaging for the Youth Through UX and Gamification',
        desc: ' ',
        tags: ['UI Design', 'UX Research', 'Motion'],
        image: 'covers/helge1.webp',
        hoverColor: '#7E66D5',
    },
    {
        id: 'p2',
        client: 'ARVAMUSFESTIVAL',
        /*logo: 'logos/AF-logo.png',*/
        title: 'Festival Campaign – Animated Ads & Printed Materials',
        desc: ' ',
        tags: ['Visual Communication', 'Motion', 'Ads'],
        image: 'covers/arvamus.webp',
        hoverColor: '#eec97d',
        overlayGradient: true,
    },
    {
        id: 'p3',
        client: 'VÕRU GÜMNAASIUM',
        /* logo: 'logos/võru-logo.svg', */
        title: 'Transforming a School’s Website with Research-Driven UX/UI Design',
        desc: ' ',
        tags: ['UI Design', 'UX Research', 'Website'],
        image: 'covers/võru1.png',
        hoverColor: '#120d8d',
    },
    {
        id: 'p4',
        client: 'VARIOUS CLIENTS',
        title: 'Social Media & Ad Design',
        desc: ' ',
        tags: ['Visual Communication'],
        image: 'covers/sotsm.webp',
        hoverColor: '#aed6ff',
        overlayGradient: true,
    },
    {
        id: 'p5',
        client: 'VILJANDI CITY',
        title: 'Website to Aid in Restoring Viljandi’s Historic Stairway',
        desc: ' ',
        tags: ['UI Design', 'Website'],
        image: 'covers/viljandi1.webp',
        hoverColor: '#eec97d',
    },
    {
        id: 'p6',
        client: 'TARTU CITY',
        /*logo: 'logos/tartu-logo.png',*/
        title: 'Designing Tote Bags that Reflect the Identity of Tartu City',
        desc: ' ',
        tags: ['Visual Communication', 'Physical Product'],
        image: 'covers/tartu.webp',
        hoverColor: '#ffcdf4',
        overlayGradient: true,
    },
    {
        id: 'p7',
        client: 'PERSONAL PROJECT',
        title: 'Moodiest App – Exploration of AI in Mood Tracking',
        desc: ' ',
        tags: ['UI Design', 'Mobile App', 'Digital Product'],
        image: 'covers/moodiest1.webp',
        hoverColor: '#eec97d',
    },
    {
        id: 'p8',
        client: 'SUTLEMA-AESPA KINDERGARTEN',
        title: 'Logo Design System for Sutlema-Aespa Kindergarten',
        desc: ' ',
        tags: ['Visual Communcation', 'Branding', 'Logo Design'],
        image: 'covers/lasteaed.webp',
        hoverColor: '#eec97d',
        overlayGradient: true,
    },

    {
        id: 'p11',
        client: 'JooksOnLahe',
        title: 'Improving the User Experience of a Sports App Website',
        desc: ' ',
        tags: ['UX Research',],
        image: 'covers/jooks-cover.png',
        hoverColor: '#4aa27d',
    },

    /* PROJECT FILES MISSING
    {
        id: 'p9',
        client: 'KOTIKIELI',
        title: 'Branding and Web Design for a Language Teacher',
        desc: ' ',
        tags: ['Visual Communication', 'UI Design', 'Website'],
        image: 'covers/eestikeel1.png',
        hoverColor: '#aed6ff',
        long: `<h2>Pulse</h2><p>Data viz and interaction patterns.</p>`
    }, */


    {
        id: 'p10',
        client: 'VOCO',
        title: 'From Concept to Physical Product: Wooden Phone Stand for VOCO',
        desc: ' ',
        tags: ['Visual Communication', 'Physical Product'],
        image: 'covers/voco.png',
        hoverColor: '#aed6ff',
        overlayGradient: true,
    },

    /* PROJECT FILES MISSING
    {
        id: 'p11',
        client: 'FRILLICE',
        title: 'What Stops Users from Becoming Paying Subscribers? UX Research for a Nutrition App',
        desc: ' ',
        tags: ['UX Research', 'Mobile App'],
        image: 'covers/frillice1.png',
        hoverColor: '#7E66D5',
        long: `<h2>PixelPlay</h2><p>Interaction experiments.</p>`
    }, */



    {
        id: 'p12',
        client: 'CATRAIN KOMBUCHA',
        title: 'Product Photos for Catrain Kombucha',
        desc: ' ',
        tags: ['Visual Communication', 'Photography'],
        image: 'covers/kombucha.png',
        hoverColor: '#ffcdf4',
        overlayGradient: true,
    }
];

/* -------------------------
  UI: filters + grid rendering
---------------------------*/
const allFilters = ['UI Design', 'UX Research', 'Visual Communication', 'Motion'];
const selectedFilters = [];

function initFilters() {
    const uiDesignFilter = document.getElementById('ui-design-filter-btn');
    const uxResearchFilter = document.getElementById('ux-research-filter-btn');
    const visualCommunicationFilter = document.getElementById('visual-communication-filter-btn');
    const motionFilter = document.getElementById('motion-filter-btn');
    const filterButtons = [uiDesignFilter, uxResearchFilter, visualCommunicationFilter, motionFilter];

    for (let i = 0; i < 4; i++) {
        const listener = () => {
            toggleFilter(allFilters[i], filterButtons[i])
        }
        filterButtons[i].removeEventListener('click', listener)
        filterButtons[i].addEventListener('click', listener)
    }
}

function toggleFilter(filter, btn) {
    const i = selectedFilters.findIndex(f => f === filter);
    if (i !== -1) {
        selectedFilters.splice(i, 1);
        btn.classList.remove('selected');
    } else {
        selectedFilters.push(filter);
        btn.classList.add('selected');
    }
    renderGrid();
}

function matchesFilters(project) {
    if (selectedFilters.length === 0) return true;
    // OR behavior: if project has any of the selected tags
    for (const t of project.tags) {
        if (selectedFilters.some(f => f === t)) return true;
    }
    return false;
}

function renderGrid() {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';
    const visible = projects.filter(matchesFilters);

    if (visible.length === 0) {
        const el = document.createElement('div');
        el.className = 'center';
        el.style.padding = '36px';
        el.innerHTML = '<p>No projects match the filters.</p>';
        grid.appendChild(el);
        return;
    }

    visible.forEach(p => {
        const card = document.createElement('a');
        card.className = 'card';

        // assign a hover color for this card
        card.style.setProperty('--hover-color', p.hoverColor);
        if (p.overlayGradient) card.classList.add('overlay-gradient');

        // Make entire card clickable
        card.href = `/project/${p.id.substring(1)}`;
        

        card.addEventListener('mouseenter', () => {
            const button = card.getElementsByClassName('filter-btn')[0]
            button.classList.add('filter-btn-hover')
        })

        card.addEventListener('mouseleave', () => {
            const button = card.getElementsByClassName('filter-btn')[0]
            button.classList.remove('filter-btn-hover')
        })

        // Thumbnail image (top section)
        const thumb = document.createElement('div');
        thumb.className = 'thumb';
        thumb.style.backgroundImage = `url(${p.image})`;
        thumb.setAttribute('aria-hidden', 'true');

        // Content wrapper
        const content = document.createElement('div');
        content.className = 'card-content';

        // Add logo above title
        if (p.logo) {
            const logo = document.createElement('img');
            logo.src = p.logo;
            logo.alt = `${p.title} logo`;
            logo.className = 'project-logo';
            content.appendChild(logo);
        }

        // ADD CLIENT NAME (NEW)
        if (p.client) {
            const client = document.createElement('div');
            client.className = 'client';
            client.textContent = p.client;
            content.appendChild(client);
        }

        const title = document.createElement('h3');
        title.textContent = p.title;

        const desc = document.createElement('p');
        desc.textContent = p.desc;

        const tagsWrap = document.createElement('div');
        tagsWrap.className = 'tag-list';
        p.tags.forEach(t => {
            const tspan = document.createElement('span');
            tspan.className = 'tag';
            tspan.textContent = t;
            tagsWrap.appendChild(tspan);
        });

        const actions = document.createElement('div');
        actions.className = 'card-actions';
        const viewBtn = document.createElement('div');
        viewBtn.className = 'filter-btn';
        viewBtn.textContent = 'View project →';
        actions.appendChild(viewBtn);

        // viewBtn.addEventListener('click', e => e.stopPropagation());


        // Add everything to content
        content.appendChild(title);
        content.appendChild(desc);
        content.appendChild(tagsWrap);
        content.appendChild(actions);

        // Build final card
        card.appendChild(thumb);
        card.appendChild(content);
        grid.appendChild(card);
    });
}

/* -------------------------
  Banner gradient interactivity
---------------------------*/
function initBanner() {
    const header = document.querySelector('.banner');
    const gradientEl = (header && header.querySelector('.banner-gradient')) || document.querySelector('.banner-gradient');

    if (!header || !gradientEl) {
        console.warn('initBanner: missing .banner or .banner-gradient element.');
        return;
    }

    console.log('initBanner: started');

    // State
    let mouseX = 50, mouseY = 50;
    let targetX = 50, targetY = 50;
    let swirlOffset = 0;
    let lastTime = performance.now();
    let elapsed = 0;

    // Tweakable params
    const followSpeed = 0.35;      // how fast mouse follows target (higher = less lag)
    const ambientRate = 0.00004;   // smaller = slower ambient drift
    const swirlPerMs = 0.0025;     // how fast swirl offset increases per ms
    const swirlAmplitude = 18;     // how wide the swirl orbit is
    const mix = 1.4;               // how strongly mouse influences gradients

    function animate(now) {
        const delta = now - lastTime;
        lastTime = now;

        // accumulate elapsed time scaled by ambientRate
        elapsed += delta * ambientRate;

        // ambient drift (slow)
        const drift1x = 30 + Math.sin(elapsed * 0.6) * 8;
        const drift1y = 50 + Math.cos(elapsed * 0.8) * 5;
        const drift2x = 70 + Math.cos(elapsed * 0.7) * 8;
        const drift2y = 55 + Math.sin(elapsed * 0.9) * 5;

        // swirl advances smoothly with frame time
        swirlOffset += delta * swirlPerMs;

        // smooth-follow the target
        mouseX += (targetX - mouseX) * followSpeed;
        mouseY += (targetY - mouseY) * followSpeed;

        // combine drift, mouse influence and swirl
        const x1 = drift1x + (mouseX - 50) * mix + Math.sin(swirlOffset) * swirlAmplitude;
        const y1 = drift1y + (mouseY - 50) * mix + Math.cos(swirlOffset * 1.3) * swirlAmplitude;
        const x2 = drift2x + (mouseX - 50) * mix + Math.cos(swirlOffset * 1.1) * swirlAmplitude;
        const y2 = drift2y + (mouseY - 50) * mix + Math.sin(swirlOffset * 1.4) * swirlAmplitude;

        // write vars directly to the gradient element
        gradientEl.style.setProperty('--x1', `${x1}%`);
        gradientEl.style.setProperty('--y1', `${y1}%`);
        gradientEl.style.setProperty('--x2', `${x2}%`);
        gradientEl.style.setProperty('--y2', `${y2}%`);

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    // pointermove is more universal (handles touch-pointers gracefully)
    header.addEventListener('pointermove', (e) => {
        const rect = header.getBoundingClientRect();
        targetX = ((e.clientX - rect.left) / rect.width) * 100;
        targetY = ((e.clientY - rect.top) / rect.height) * 100;
    });

    header.addEventListener('mouseleave', () => {
        targetX = 50;
        targetY = 50;
    });
}

/* -------------------------
  Init on load
---------------------------*/
document.addEventListener('DOMContentLoaded', () => {
    initBanner();
    initFilters();
    renderGrid();
});
