
/* =========================================================
   YEAR
========================================================= */

const yearEl = document.getElementById('year');

if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}


/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener('load', () => {

    const preloader = document.getElementById('preloader');

    if (!preloader) return;

    setTimeout(() => {
        preloader.classList.add('done');
    }, 700);

}, { once: true });


/* =========================================================
   NAVBAR + SCROLL PROGRESS
========================================================= */

const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scroll-progress');

let scrollTicking = false;

function updateScrollUI() {

    const scrollY = window.scrollY;

    if (navbar) {
        navbar.classList.toggle('scrolled', scrollY > 24);
    }

    if (scrollProgress) {

        const doc = document.documentElement;

        const total =
            doc.scrollHeight - doc.clientHeight;

        const pct =
            total > 0
                ? (scrollY / total) * 100
                : 0;

        scrollProgress.style.width = `${pct}%`;
    }

    scrollTicking = false;
}

function requestScrollUpdate() {

    if (!scrollTicking) {

        scrollTicking = true;

        requestAnimationFrame(updateScrollUI);
    }
}

window.addEventListener(
    'scroll',
    requestScrollUpdate,
    { passive: true }
);

updateScrollUI();


/* =========================================================
   MOBILE MENU
========================================================= */

const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (navToggle && mobileMenu) {

    navToggle.addEventListener('click', () => {

        mobileMenu.classList.toggle('open');

    });

    mobileMenu
        .querySelectorAll('a')
        .forEach(link => {

            link.addEventListener('click', () => {

                mobileMenu.classList.remove('open');

            });

        });
}


/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const io = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add('is-visible');

            io.unobserve(entry.target);

        });

    },
    {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    }
);

document
    .querySelectorAll('.reveal')
    .forEach(el => io.observe(el));


/* =========================================================
   SVG ICON 
========================================================= */

const ic = path => `
<svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
>
    ${path}
</svg>
`;


/* =========================================================
   ÍCONES
========================================================= */

const icons = {

    /* CASA — Construções residenciais e comerciais */
    house: ic(`
        <path d="M3 10.5L12 3l9 7.5"/>
        <path d="M5 9.5V21h14V9.5"/>
        <path d="M9 21v-6h6v6"/>
    `),

    /* ESQUADRO — Projetos arquitetônicos */
ruler: ic(`
    <path d="M5 19V5h14L5 19z"/>
    <path d="M5 15h4"/>
    <path d="M5 11h7"/>
    <path d="M5 7h3"/>
`),

   hardhat: ic(`
    <path d="M3 17.5h18"/>
    <path d="M5 17.5v-3a7 7 0 0 1 14 0v3"/>
    <path d="M3 17.5c0 1 1 1.5 2 1.5h14c1 0 2-.5 2-1.5"/>
    <path d="M8.5 14.5v-2"/>
    <path d="M12 13v-3"/>
    <path d="M15.5 14.5v-2"/>
`),

    /* PRÉDIO — Especialistas em flats */
    building: ic(`
        <path d="M5 21V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17"/>
        <path d="M8 6h2"/>
        <path d="M14 6h2"/>
        <path d="M8 10h2"/>
        <path d="M14 10h2"/>
        <path d="M8 14h2"/>
        <path d="M14 14h2"/>
        <path d="M9 21v-4h6v4"/>
    `),

    /* RENOVAÇÃO */
    renovation: ic(`
        <path d="M3 21h18"/>
        <path d="M5 21V9l7-5 7 5v12"/>
        <path d="M9 21v-6h6v6"/>
        <path d="M8 9h.01M12 9h.01M16 9h.01"/>
    `),

    arrowUR: ic(`
        <path d="M7 17L17 7"/>
        <path d="M7 7h10v10"/>
    `)
};

/* =========================================================
    CARD DE SERVIÇOS 
========================================================= */

const services = [

    {
        id: 'construcoes',
        icon: 'assets/casinha2.png',
        t: 'Construções residenciais e comerciais',
        d: 'Executamos obras do planejamento à entrega, com rigor técnico, gestão eficiente e atenção aos detalhes em cada etapa.'
    },

    {
        id: 'projetos',
        icon: 'assets/esquadro2.png',
        t: 'Projetos arquitetônicos',
        d: 'Projetos completos e personalizados, desenvolvidos para unir funcionalidade, estética e viabilidade de execução.'
    },

    {
        id: 'gerenciamento',
        icon: 'assets/log-obra.png',
        t: 'Gerenciamento de obras',
        d: 'Coordenamos cronograma, custos, equipes e qualidade, garantindo transparência e acompanhamento durante toda a obra.'
    },

    {
        id: 'flats',
        icon: 'assets/log-flats.png',
        t: 'Especialistas em flats',
        d: 'Projetamos e executamos flats e kitnets com foco em otimização de espaço, funcionalidade e valorização do investimento.'
    },

    {
        id: 'reformas',
        icon: 'assets/teste33.png',
        t: 'Reformas comerciais e residenciais',
        d: 'Reformas planejadas para modernizar ambientes, minimizar impactos na execução e assegurar acabamento de alto padrão.'
    }

];

const servicesGrid =
    document.getElementById('servicesGrid');


if (servicesGrid) {

    servicesGrid.innerHTML = services
        .map((s, i) => `

            <article
                class="service reveal d${(i % 4) + 1}"
                id="servico-${s.id}"
            >

               <div class="icon">
                ${s.icon
                 ? `<img src="${s.icon}" alt="">`
                 : icons[s.i]
                }
            </div>  
                <h3>${s.t}</h3>

                <p>${s.d}</p>

            </article>

        `)
        .join('');


    servicesGrid
        .querySelectorAll('.reveal')
        .forEach(el => io.observe(el));

}

/* =========================================================
   PORTFOLIO
========================================================= */


const projects = [

    {
        t: 'Construções residenciais',
        imgs: [
            'assets/fachada-01.jpg',
            'assets/fachada-02.jpg',
            'assets/fachada-03.jpg'
        ]
    },
       {
    t: 'Construções comerciais',
    imgs: [
        'assets/constcomercial.jpg',
        'assets/constcomercial2.JPG',
        'assets/constcomercial3.jpeg'
    ]
},


    {

        
        
        t: 'Flats',
        imgs: [
            'assets/flats01.JPEG',
            'assets/flats02.JPEG',
            'assets/flats03.JPEG'
        ]
    },

     {
        t: 'Reforma comerciais',
        imgs: [
            'assets/reforma 01.jpg',
            'assets/reforma 02.jpg',
            'assets/reforma 03.jpg'
        ]
    },

     {
        t: 'Reforma residenciais',
     
        imgs: [
            'assets/residencial 01.jpg',
            'assets/residencial 02.jpg',
            'assets/residencial 03.jpg'
        ]
    },



    {
        t: 'Projetos 3D',
        imgs: [
            'assets/fachada-r01.jpg',
            'assets/imagem interna-01.jpg',
            'assets/imagem interna-02.jpg'
        ]
    },


  
];


const cats = [
    'Todos',
    'Construções residenciais',
    'Construções comerciais',
    'Flats',
    'Projetos 3D',
    'Reforma comerciais',
    'Reforma residenciais'
    
];


let activeCat = 'Todos';

const filtersEl =
    document.getElementById('portfolioFilters');

const grid =
    document.getElementById('portfolioGrid');


/* FILTERS */

if (filtersEl) {

    filtersEl.innerHTML = cats
        .map(cat => `

            <button
                class="filter ${cat === activeCat ? 'active' : ''}"
                data-cat="${cat}"
            >
                ${cat}
            </button>

        `)
        .join('');


    filtersEl.addEventListener('click', event => {

        const button =
            event.target.closest('.filter');

        if (!button) return;

        activeCat =
            button.dataset.cat;

        filtersEl
            .querySelectorAll('.filter')
            .forEach(filter => {

                filter.classList.toggle(
                    'active',
                    filter.dataset.cat === activeCat
                );

            });

        renderProjects();

    });

}


/* =========================================================
   RENDER PROJECTS
========================================================= */

function renderProjects() {

    if (!grid) return;

    const list =
        activeCat === 'Todos'
            ? projects
            : projects.filter(
                project => project.t === activeCat
            );


    grid.innerHTML = list
        .map((project, index) => `

            <button
                class="project reveal d${(index % 4) + 1}"
                data-idx="${projects.indexOf(project)}"
            >

                <img
                    src="${project.imgs[0]}"
                    alt="${project.t}"
                    loading="lazy"
                    decoding="async"
                />

                ${
                    project.imgs.length > 1
                        ? `
                            <div class="project-count">
                                +${project.imgs.length - 1}
                            </div>
                        `
                        : ''
                }

                <div class="project-arrow">
                    ${icons.arrowUR}
                </div>

                <div class="project-content">

                    <h3>
                        ${project.t}
                    </h3>

                </div>

            </button>

        `)
        .join('');


    grid
        .querySelectorAll('.reveal')
        .forEach(el => io.observe(el));

}


renderProjects();


/* =========================================================
   MODAL
========================================================= */

const modalBackdrop =
    document.createElement('div');

modalBackdrop.className =
    'modal-backdrop';

document.body.appendChild(
    modalBackdrop
);


if (grid) {

    grid.addEventListener('click', event => {

        const button =
            event.target.closest('.project');

        if (!button) return;

        const project =
            projects[+button.dataset.idx];

        let current = 0;


        modalBackdrop.innerHTML = `

            <div
                class="modal image-only"
                onclick="event.stopPropagation()"
            >

                <button
                    class="modal-close"
                    aria-label="Fechar"
                >
                    ✕
                </button>


                <div class="modal-gallery">

                    <img
                        class="modal-image"
                        src="${project.imgs[0]}"
                        alt="${project.t}"
                    />


                    ${
                        project.imgs.length > 1
                            ? `
                                <button class="gallery-btn prev">
                                    ‹
                                </button>

                                <button class="gallery-btn next">
                                    ›
                                </button>
                            `
                            : ''
                    }


                    <div class="gallery-dots">

                        ${project.imgs
                            .map(
                                (_, index) => `
                                    <span
                                        class="gallery-dot ${
                                            index === 0
                                                ? 'active'
                                                : ''
                                        }"
                                        data-index="${index}"
                                    ></span>
                                `
                            )
                            .join('')}

                    </div>

                </div>

            </div>

        `;


        const modalImg =
            modalBackdrop.querySelector('.modal-image');

        const dots =
            modalBackdrop.querySelectorAll('.gallery-dot');


        function updateImage() {

            if (!modalImg) return;


            modalImg.classList.remove('loaded');


            dots.forEach(dot => {

                dot.classList.remove('active');

            });


            if (dots[current]) {

                dots[current]
                    .classList.add('active');

            }


            const newImage =
                new Image();


            newImage.onload = () => {

                modalImg.src =
                    newImage.src;

                requestAnimationFrame(() => {

                    modalImg.classList.add('loaded');

                });

            };


            newImage.src =
                project.imgs[current];

        }


        /* FIRST IMAGE */

        if (modalImg.complete) {

            modalImg.classList.add('loaded');

            requestAnimationFrame(() => {

                modalBackdrop.classList.add('open');

            });

        } else {

            modalImg.onload = () => {

                modalImg.classList.add('loaded');

                requestAnimationFrame(() => {

                    modalBackdrop.classList.add('open');

                });

            };

        }


        /* NEXT */

        const nextBtn =
            modalBackdrop.querySelector('.next');


        if (nextBtn) {

            nextBtn.onclick = () => {

                current =
                    (current + 1) %
                    project.imgs.length;

                updateImage();

            };

        }


        /* PREVIOUS */

        const prevBtn =
            modalBackdrop.querySelector('.prev');


        if (prevBtn) {

            prevBtn.onclick = () => {

                current =
                    (
                        current -
                        1 +
                        project.imgs.length
                    ) %
                    project.imgs.length;

                updateImage();

            };

        }


        /* DOTS */

        dots.forEach(dot => {

            dot.onclick = () => {

                current =
                    +dot.dataset.index;

                updateImage();

            };

        });


        /* CLOSE */

        const closeBtn =
            modalBackdrop.querySelector('.modal-close');


        if (closeBtn) {

            closeBtn.onclick = () => {

                modalBackdrop.classList.remove('open');

            };

        }

    });

}


/* CLICK OUTSIDE MODAL */

modalBackdrop.addEventListener(
    'click',
    event => {

        if (event.target === modalBackdrop) {

            modalBackdrop.classList.remove('open');

        }

    }
);


/* =========================================================
   KEYBOARD MODAL
========================================================= */

document.addEventListener(
    'keydown',
    event => {

        if (
            !modalBackdrop.classList.contains('open')
        ) {
            return;
        }


        if (event.key === 'Escape') {

            modalBackdrop.classList.remove('open');

            return;

        }


        const nextBtn =
            modalBackdrop.querySelector('.next');

        const prevBtn =
            modalBackdrop.querySelector('.prev');


        if (
            event.key === 'ArrowRight' &&
            nextBtn
        ) {

            nextBtn.click();

        }


        if (
            event.key === 'ArrowLeft' &&
            prevBtn
        ) {

            prevBtn.click();

        }

    }
);


/* =========================================================
   HERO — OPTIMIZED MOUSE PARALLAX
========================================================= */

const hero =
    document.querySelector('.hero');

const heroBg =
    document.querySelector('.hero-bg');

const heroInner =
    document.querySelector('.hero-inner');


if (
    hero &&
    heroBg &&
    heroInner &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    let heroAnimating = false;


    hero.addEventListener(
        'mousemove',
        event => {

            const rect =
                hero.getBoundingClientRect();

            mouseX =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            mouseY =
                (event.clientY - rect.top) /
                rect.height -
                0.5;


            if (!heroAnimating) {

                heroAnimating = true;

                requestAnimationFrame(
                    animateHero
                );

            }

        },
        { passive: true }
    );


    hero.addEventListener(
        'mouseleave',
        () => {

            mouseX = 0;
            mouseY = 0;

            if (!heroAnimating) {

                heroAnimating = true;

                requestAnimationFrame(
                    animateHero
                );

            }

        },
        { passive: true }
    );


    function animateHero() {

        currentX +=
            (mouseX - currentX) * 0.08;

        currentY +=
            (mouseY - currentY) * 0.08;


        heroBg.style.transform = `
            translate3d(
                ${currentX * -14}px,
                ${currentY * -10}px,
                0
            )
            scale(1.09)
        `;


        heroInner.style.transform = `
            translate3d(
                ${currentX * 5}px,
                ${currentY * 3}px,
                0
            )
        `;


        const stillMoving =
            Math.abs(mouseX - currentX) > 0.001 ||
            Math.abs(mouseY - currentY) > 0.001;


        if (stillMoving) {

            requestAnimationFrame(
                animateHero
            );

        } else {

            heroAnimating = false;

        }

    }

}


/* =========================================================
   SCROLL MOTION — OPTIMIZED
========================================================= */

const motionElements =
    document.querySelectorAll(
        '.about-img, .section-head, .portfolio-head'
    );


let motionTicking = false;


function updateMotionElements() {

    const screenCenter =
        window.innerHeight / 2;


    motionElements.forEach(el => {

        const rect =
            el.getBoundingClientRect();


        const center =
            rect.top +
            rect.height / 2;


        const distance =
            (center - screenCenter) * 0.03;


        el.style.transform =
            `translate3d(0, ${distance}px, 0)`;

    });


    motionTicking = false;

}


window.addEventListener(
    'scroll',
    () => {

        if (!motionTicking) {

            motionTicking = true;

            requestAnimationFrame(
                updateMotionElements
            );

        }

    },
    { passive: true }
);


/* =========================================================
   SERVICES — OPTIMIZED 3D CARDS
========================================================= */

const serviceCards =
    document.querySelectorAll('.service');


const reducedMotion =
    window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;


if (!reducedMotion) {

    serviceCards.forEach(card => {

        let rect = null;
        let cardFrame = null;

        let targetX = 0;
        let targetY = 0;

        let currentX = 0;
        let currentY = 0;


        card.addEventListener(
            'mouseenter',
            () => {

                rect =
                    card.getBoundingClientRect();

            },
            { passive: true }
        );


        card.addEventListener(
            'mousemove',
            event => {

                if (!rect) {

                    rect =
                        card.getBoundingClientRect();

                }


                targetX =
                    (
                        (event.clientY - rect.top) /
                        rect.height -
                        0.5
                    ) * -5;


                targetY =
                    (
                        (event.clientX - rect.left) /
                        rect.width -
                        0.5
                    ) * 5;


                if (!cardFrame) {

                    cardFrame =
                        requestAnimationFrame(
                            animateCard
                        );

                }

            },
            { passive: true }
        );


        function animateCard() {

            currentX +=
                (targetX - currentX) * 0.18;

            currentY +=
                (targetY - currentY) * 0.18;


            card.style.setProperty(
                '--rotate-x',
                `${currentX}deg`
            );

            card.style.setProperty(
                '--rotate-y',
                `${currentY}deg`
            );


            const stillMoving =
                Math.abs(targetX - currentX) > 0.01 ||
                Math.abs(targetY - currentY) > 0.01;


            if (stillMoving) {

                cardFrame =
                    requestAnimationFrame(
                        animateCard
                    );

            } else {

                cardFrame = null;

            }

        }


        card.addEventListener(
            'mouseleave',
            () => {

                targetX = 0;
                targetY = 0;

                rect = null;


                if (!cardFrame) {

                    cardFrame =
                        requestAnimationFrame(
                            animateCard
                        );

                }

            },
            { passive: true }
        );

    });

}


/* =========================================================
   INITIAL MOTION UPDATE
========================================================= */

if (motionElements.length) {

    requestAnimationFrame(
        updateMotionElements
    );

}


/* =========================================================
   IMAGE PERFORMANCE
========================================================= */

document
    .querySelectorAll('img')
    .forEach(img => {

        if (!img.hasAttribute('decoding')) {

            img.decoding = 'async';

        }

    });