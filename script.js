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

/* ===== SVG icon helper ===== */
const ic = (path) => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
const icons = {
  building: ic('<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/>'),
  ruler:    ic('<path d="M21.3 8.7L8.7 21.3a1 1 0 0 1-1.4 0L2.7 16.7a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4z"/><path d="M7 17l-2-2M11 13l-2-2M15 9l-2-2"/>'),
  hardhat:  ic('<path d="M2 18h20v2H2zM6 18V12a6 6 0 0 1 12 0v6M9 12V6h6v6"/>'),
  wrench:   ic('<path d="M14.7 6.3a4 4 0 0 0 5 5l-1.4 1.4a2 2 0 0 1 0 2.8l-7.4 7.4a2 2 0 0 1-2.8 0l-3.5-3.5a2 2 0 0 1 0-2.8l7.4-7.4a2 2 0 0 1 2.8 0z"/>'),
  clip:     ic('<rect x="6" y="4" width="12" height="18" rx="2"/><path d="M9 4V2h6v2M9 12l2 2 4-4"/>'),
  layers:   ic('<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>'),
  clock:    ic('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
  shield:   ic('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>'),
  spark:    ic('<path d="M12 2l2.5 5.5L20 10l-5.5 2.5L12 18l-2.5-5.5L4 10l5.5-2.5L12 2zM5 18l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2zM19 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z"/>'),
  chart:    ic('<path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/>'),
  users:    ic('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>'),
  award:    ic('<circle cx="12" cy="8" r="7"/><path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.12"/>'),
  arrowUR:  ic('<path d="M7 17L17 7M7 7h10v10"/>'),
};

/* ===== SERVICES ===== */
const services = [
  { i:'building', t:'Construções residenciais e comerciais', d:'Executamos obras do planejamento à entrega, com rigor técnico, gestão eficiente e atenção aos detalhes em cada etapa.' },
  { i:'ruler',    t:'Projetos arquitetônicos ',   d:'Projetos completos e personalizados, desenvolvidos para unir funcionalidade, estética e viabilidade de execução. Gerenciamento de obras' },
  { i:'hardhat',  t:'Gerenciamento de obras',  d:'Coordenamos cronograma, custos, equipes e qualidade, garantindo transparência e acompanhamento durante toda a obra.' },
  { i:'wrench',   t:'Especialistas em flats',      d:'Projetamos e executamos flats e kitnets com foco em otimização de espaço, funcionalidade e valorização do investimento.' },
  { i:'clip',     t:'Casas de alto padrão',     d:'Projetos e obras desenvolvidos com soluções personalizadas, acabamentos refinados e execução compatível com o nível de exigência de cada cliente.' },
  { i:'layers',   t:'Reformas comerciais e residenciais',       d:'Reformas planejadas para modernizar ambientes, minimizar impactos na execução e assegurar acabamento de alto padrão.' },
];
document.getElementById('servicesGrid').innerHTML = services.map((s,i) => `
  <article class="service reveal d${(i%4)+1}">
    <div class="icon">
      <img src="assets/logo.png" alt="Logo">
    </div>
    <h3>${s.t}</h3>
    <p>${s.d}</p>
  </article>
`).join('');

document.querySelectorAll('#servicesGrid .reveal').forEach(el => io.observe(el));
/* ===== PORTFOLIO ===== */


const projects = [
  {
    t:'Edifício Aurora 360',
    cat:'Casa de alto padrão',
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
      'assets/imagem interna 01.jpg',
      'assets/imagem interna 02.jpg'
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
  'Casa de alto padrão',
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

        <div class="project-loc">
          ${p.loc} · ${p.year}
        </div>

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

  modalBackdrop.classList.add('open');

  const modalImg = modalBackdrop.querySelector('.modal-image');

  const dots = modalBackdrop.querySelectorAll('.gallery-dot');

  function updateImage(){

    modalImg.src = p.imgs[current];

    dots.forEach(dot => {
      dot.classList.remove('active');
    });

    if (dots[current]) {
      dots[current].classList.add('active');
    }
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
  }

  const modalImg = modalBackdrop.querySelector('.modal-image');

  if (!modalImg) return;

  const p = projects.find(project =>
    project.imgs.includes(modalImg.src.split('/').pop())
  );

  if (!p) return;
});