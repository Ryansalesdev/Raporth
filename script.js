/* ============ Sentinel — vanilla JS ============ */

/* Year */
document.getElementById('year').textContent = new Date().getFullYear();

/* Preloader */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader').classList.add('done'), 700);
});

/* Navbar scroll state */
const navbar = document.getElementById('navbar');
const onScroll = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 24);
  const h = document.documentElement;
  const total = h.scrollHeight - h.clientHeight;
  const pct = total > 0 ? (h.scrollTop / total) * 100 : 0;
  document.getElementById('scroll-progress').style.width = pct + '%';
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* Mobile menu */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

/* Reveal on scroll */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ===== SVG ICONS ===== */

const ic = (path) => `
<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden=" true"> ${path} </svg>`;

const icons = {

    /* 1. Construções residenciais e comerciais */
    building: ic(`
        <path d="M3 21h18"/>
        <path d="M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16"/>
        <path d="M15 9h4a2 2 0 0 1 2 2v10"/>
        <path d="M9 7h2"/>
        <path d="M9 11h2"/>
        <path d="M9 15h2"/>
        <path d="M17 13h2"/>
        <path d="M17 17h2"/>
    `),

    /* 2. Projetos arquitetônicos */
    ruler: ic(`
        <path d="M4 20L20 4"/>
        <path d="M6 18l-2-2"/>
        <path d="M9 15l-2-2"/>
        <path d="M12 12l-2-2"/>
        <path d="M15 9l-2-2"/>
        <path d="M18 6l-2-2"/>
        <path d="M4 20h4"/>
        <path d="M20 4v4"/>
    `),

    /* 3. Gerenciamento de obras */
    hardhat: ic(`
        <path d="M3 18h18"/>
        <path d="M5 18v-2a7 7 0 0 1 14 0v2"/>
        <path d="M12 9V3"/>
        <path d="M9 6h6"/>
        <path d="M7 18v3"/>
        <path d="M17 18v3"/>
    `),

    /* 4. Especialistas em flats */
    flats: ic(`
        <rect x="5" y="3" width="14" height="18" rx="2"/>
        <path d="M9 7h2"/>
        <path d="M13 7h2"/>
        <path d="M9 11h2"/>
        <path d="M13 11h2"/>
        <path d="M9 15h2"/>
        <path d="M13 15h2"/>
        <path d="M10 21v-3h4v3"/>
    `),

    /* 5. Casas de alto padrão */
    luxury: ic(`
        <path d="M3 11l9-8 9 8"/>
        <path d="M5 10v10h14V10"/>
        <path d="M9 20v-6h6v6"/>
        <path d="M7 12h2"/>
        <path d="M15 12h2"/>
        <path d="M10 7h4"/>
    `),

    /* 6. Reformas comerciais e residenciais */
    renovation: ic(`
        <path d="M14.7 6.3a4 4 0 0 0 5 5"/>
        <path d="M19.7 11.3l-2.1 2.1"/>
        <path d="M16.5 14.5L9 22H5v-4l7.5-7.5"/>
        <path d="M12.5 10.5l3 3"/>
        <path d="M5 6h5"/>
        <path d="M7 4v4"/>
    `),

    /* Seta do portfólio */
    arrowUR: ic(`
        <path d="M7 17L17 7"/>
        <path d="M7 7h10v10"/>
    `)
};


/* ===== SERVICES ===== */

const services = [
    {
        i: 'building',
        t: 'Construções residenciais e comerciais',
        d: 'Executamos obras do planejamento à entrega, com rigor técnico, gestão eficiente e atenção aos detalhes em cada etapa.'
    },

    {
        i: 'ruler',
        t: 'Projetos arquitetônicos',
        d: 'Projetos completos e personalizados, desenvolvidos para unir funcionalidade, estética e viabilidade de execução.'
    },

    {
        i: 'hardhat',
        t: 'Gerenciamento de obras',
        d: 'Coordenamos cronograma, custos, equipes e qualidade, garantindo transparência e acompanhamento durante toda a obra.'
    },

    {
        i: 'flats',
        t: 'Especialistas em flats',
        d: 'Projetamos e executamos flats e kitnets com foco em otimização de espaço, funcionalidade e valorização do investimento.'
    },

    {
        i: 'luxury',
        t: 'Casas de alto padrão',
        d: 'Projetos e obras desenvolvidos com soluções personalizadas, acabamentos refinados e execução compatível com o nível de exigência de cada cliente.'
    },

    {
        i: 'renovation',
        t: 'Reformas comerciais e residenciais',
        d: 'Reformas planejadas para modernizar ambientes, minimizar impactos na execução e assegurar acabamento de alto padrão.'
    }
];


document.getElementById('servicesGrid').innerHTML = services.map((s, i) => `
    <article class="service reveal d${(i % 4) + 1}">

        <div class="icon">
            ${icons[s.i]}
        </div>

        <h3>${s.t}</h3>

        <p>${s.d}</p>

    </article>
`).join('');


document
    .querySelectorAll('#servicesGrid .reveal')
    .forEach(el => io.observe(el));


/* =========================================
   SERVICES — 3D CARD MOTION
========================================= */

document.querySelectorAll('.service').forEach(card => {

    let rect;

    card.addEventListener('mouseenter', () => {
        rect = card.getBoundingClientRect();
    });

    card.addEventListener('mousemove', (e) => {

        if (!rect) {
            rect = card.getBoundingClientRect();
        }

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX =
            ((y / rect.height) - 0.5) * -4;

        const rotateY =
            ((x / rect.width) - 0.5) * 4;

        card.style.setProperty(
            '--rotate-x',
            `${rotateX}deg`
        );

        card.style.setProperty(
            '--rotate-y',
            `${rotateY}deg`
        );

    });

    card.addEventListener('mouseleave', () => {

        card.style.setProperty(
            '--rotate-x',
            '0deg'
        );

        card.style.setProperty(
            '--rotate-y',
            '0deg'
        );

        rect = null;

    });

});
/* ===== PORTFOLIO ===== */


const projects = [
  {
    t:'Edifício Aurora 360',
    cat:'Casas',
    imgs:[
      'assets/fachada-01.jpg',
      'assets/fachada-02.jpg',
      'assets/fachada-03.jpg'
    ],
   
  },

  {
    t:'Centro Logístico Atlas',
    cat:'Flats',
    imgs:[
     'assets/flats01.JPEG',
     'assets/flats02.JPEG',
     'assets/flats03.JPEG'
    ],
   
  },

  {
    t:'Sede Corporativa Iridium',
    cat:'Projetos 3D',
    imgs:[
      'assets/fachada-r01.jpg',
      'assets/imagem interna-01.jpg',
      'assets/imagem interna-02.jpg'
    ],
   
  },

  {
    t:'Viaduto Serra Azul',
    cat:'Reforma comercial',
    imgs:[
      'assets/reforma 01.jpg',
      'assets/reforma 02.jpg',
      'assets/reforma 03.jpg'
    ],
  },

  {
    t:'Shopping Praça Central',
    cat:'Reforma residencial',
    imgs:[
      'assets/residencial 01.jpg',
      'assets/residencial 02.jpg',
      'assets/residencial 03.jpg'
    ],
  },
];

const cats = [
  'Todos',
  'Casas',
  'Flats',
  'Projetos 3D',
  'Reforma comercial',
  'Reforma residencial',
];

let activeCat = 'Todos';

const filtersEl = document.getElementById('portfolioFilters');

filtersEl.innerHTML = cats.map(c => `
  <button
    class="filter ${c===activeCat?'active':''}"
    data-cat="${c}"
  >
    ${c}
  </button>
`).join('');

filtersEl.addEventListener('click', (e) => {

  const b = e.target.closest('.filter');

  if (!b) return;

  activeCat = b.dataset.cat;

  filtersEl
    .querySelectorAll('.filter')
    .forEach(f => {
      f.classList.toggle(
        'active',
        f.dataset.cat === activeCat
      );
    });

  renderProjects();
});

const grid = document.getElementById('portfolioGrid');

function renderProjects(){

  const list = activeCat === 'Todos'
    ? projects
    : projects.filter(p => p.cat === activeCat);

  grid.innerHTML = list.map((p,i) => `

    <button
      class="project reveal d${(i%4)+1}"
      data-idx="${projects.indexOf(p)}"
    >

      <img
        src="${p.imgs[0]}"
        alt="${p.t}"
        loading="lazy"
      />

      ${
        p.imgs.length > 1
        ? `
          <div class="project-count">
            +${p.imgs.length - 1}
          </div>
        `
        : ''
      }

      <div class="project-arrow">
        ${icons.arrowUR}
      </div>

      <div class="project-content">

        <div class="project-cat">
          ${p.cat}
        </div>

        <h3>
          ${p.t}
        </h3>
      </div>

    </button>

  `).join('');

  grid
    .querySelectorAll('.reveal')
    .forEach(el => io.observe(el));
}

renderProjects();

/* ===== MODAL ===== */

const modalBackdrop = document.createElement('div');

modalBackdrop.className = 'modal-backdrop';

document.body.appendChild(modalBackdrop);

grid.addEventListener('click', (e) => {

  const b = e.target.closest('.project');

  if (!b) return;

  const p = projects[+b.dataset.idx];

  let current = 0;

 modalBackdrop.innerHTML = `
<div class="modal image-only" onclick="event.stopPropagation()">

  <button class="modal-close" aria-label="Fechar">
    ✕
  </button>

  <div class="modal-gallery">

    <img
      class="modal-image"
      src="${p.imgs[0]}"
      alt="${p.t}"
    />

    ${
      p.imgs.length > 1
      ? `
        <button class="gallery-btn prev">‹</button>
        <button class="gallery-btn next">›</button>
      `
      : ''
    }

    <div class="gallery-dots">
      ${p.imgs.map((_, index) => `
        <span
          class="gallery-dot ${index === 0 ? 'active' : ''}"
          data-index="${index}"
        ></span>
      `).join('')}
    </div>

  </div>

</div>
`;

  const modalImg = modalBackdrop.querySelector('.modal-image');

const dots = modalBackdrop.querySelectorAll('.gallery-dot');

function updateImage(){

    modalImg.classList.remove('loaded');

    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    if (dots[current]) {
        dots[current].classList.add('active');
    }

    modalImg.onload = () => {

        requestAnimationFrame(() => {
            modalImg.classList.add('loaded');
        });

    };

    modalImg.src = p.imgs[current];
}
// Só abre depois que a primeira imagem estiver carregada
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

const nextBtn = modalBackdrop.querySelector('.next');

const prevBtn = modalBackdrop.querySelector('.prev');

  if (nextBtn){

    nextBtn.onclick = () => {

      current = (current + 1) % p.imgs.length;

      updateImage();
    };
  }

  if (prevBtn){

    prevBtn.onclick = () => {

      current = (
        current - 1 + p.imgs.length
      ) % p.imgs.length;

      updateImage();
    };
  }

  dots.forEach(dot => {

    dot.onclick = () => {

      current = +dot.dataset.index;

      updateImage();
    };
  });

  modalBackdrop
    .querySelector('.modal-close')
    .onclick = () => {

      modalBackdrop.classList.remove('open');
    };
});

modalBackdrop.addEventListener('click', (e) => {

  if (e.target === modalBackdrop){

    modalBackdrop.classList.remove('open');
  }
});

document.addEventListener('keydown', (e) => {

  if (!modalBackdrop.classList.contains('open')) return;

  if (e.key === 'Escape') {

    modalBackdrop.classList.remove('open');

    return;
}

const modalImg = modalBackdrop.querySelector('.modal-image');

if (!modalImg) return;

const nextBtn = modalBackdrop.querySelector('.next');
const prevBtn = modalBackdrop.querySelector('.prev');

if (e.key === 'ArrowRight' && nextBtn) {
    nextBtn.click();
}

if (e.key === 'ArrowLeft' && prevBtn) {
    prevBtn.click();
}
});


/* =========================================
   HERO — MOUSE PARALLAX
========================================= */

const hero = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');
const heroInner = document.querySelector('.hero-inner');

if (hero && heroBg && heroInner) {

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    hero.addEventListener('mousemove', (e) => {

        const rect = hero.getBoundingClientRect();

        mouseX =
            ((e.clientX - rect.left) / rect.width - 0.5);

        mouseY =
            ((e.clientY - rect.top) / rect.height - 0.5);

    });


    hero.addEventListener('mouseleave', () => {

        mouseX = 0;
        mouseY = 0;

    });


    function animateHero(){

        currentX += (mouseX - currentX) * 0.04;
        currentY += (mouseY - currentY) * 0.04;


        heroBg.style.transform = `
            scale(1.09)
            translate3d(
                ${currentX * -14}px,
                ${currentY * -10}px,
                0
            )
        `;


        heroInner.style.transform = `
            translate3d(
                ${currentX * 5}px,
                ${currentY * 3}px,
                0
            )
        `;


        requestAnimationFrame(animateHero);

    }


    animateHero();

}

/* =========================================
   SCROLL MOTION
========================================= */

const motionElements = document.querySelectorAll(
  '.about-img, .section-head, .portfolio-head'
);

window.addEventListener('scroll', () => {

  const scrollY = window.scrollY;

  motionElements.forEach(el => {

    const rect = el.getBoundingClientRect();

    const center =
      rect.top + rect.height / 2;

    const screenCenter =
      window.innerHeight / 2;

    const distance =
      (center - screenCenter) * 0.03;

    el.style.transform =
      `translateY(${distance}px)`;

  });

}, { passive:true });




/* =========================================
   SERVICES — 3D CARD MOTION
========================================= */

document.querySelectorAll('.service').forEach(card => {

    let rect;

    card.addEventListener('mouseenter', () => {

        rect = card.getBoundingClientRect();

    });


    card.addEventListener('mousemove', (e) => {

        if (!rect) {
            rect = card.getBoundingClientRect();
        }

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX =
            ((y / rect.height) - 0.5) * -5;

        const rotateY =
            ((x / rect.width) - 0.5) * 5;


        card.style.setProperty(
            '--rotate-x',
            `${rotateX}deg`
        );

        card.style.setProperty(
            '--rotate-y',
            `${rotateY}deg`
        );

    });


    card.addEventListener('mouseleave', () => {

        card.style.setProperty(
            '--rotate-x',
            '0deg'
        );

        card.style.setProperty(
            '--rotate-y',
            '0deg'
        );

        rect = null;

    });

});