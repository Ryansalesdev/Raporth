SENTINEL ENGENHARIA — Site estático (HTML + CSS + JS puro)

Como usar:
1. Descompacte a pasta em qualquer lugar do seu computador.
2. Abra o arquivo "index.html" diretamente no navegador (duplo clique),
   ou sirva localmente para evitar bloqueios do navegador:
     - Python:  python3 -m http.server 8000
     - Node:    npx serve .
   Depois acesse http://localhost:8000

Estrutura:
  /assets/         imagens (JPG)
  index.html       marcação + SEO
  styles.css       design system (cores #552f1b · #af9884 · #e3d9cd)
  script.js        navbar, modal portfolio, slider depoimentos, form

Personalização rápida:
- Cores: edite as variáveis :root no topo de styles.css
- Textos: tudo em index.html (hero, sobre, contato) e em script.js
  (services[], projects[], diffs[], testimonials[])
- Imagens: substitua os JPGs em /assets mantendo os mesmos nomes
- WhatsApp: troque o número 5511999999999 em index.html e script.js
- Formulário: hoje simula envio. Para enviar de verdade, integre com
  serviços tipo Formspree, Web3Forms, ou seu próprio backend.
