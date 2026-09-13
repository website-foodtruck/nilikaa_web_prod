// Ce fichier assemble la page : il place les textes de /content/ dans les pages,
// gère le menu, le formulaire de devis, le bandeau des festivals et les petites animations.
// Il n'y a normalement rien à modifier ici pour changer le contenu du site.

// Adresse qui reçoit les demandes de devis (à changer aussi dans content/contact.js).
const EMAIL_CONTACT = 'nilikaacantina@gmail.com';

document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  document.querySelectorAll('[data-include]').forEach((el) => {
    const key = el.dataset.include;
    const html = window.NILIKAA_CONTENT?.[key];
    if (html) {
      el.innerHTML = html;
      if (el.querySelector('#devis-form')) {
        setupDevisForm();
      }
      setupMarquees(el);
    } else {
      console.error(`Contenu "${key}" introuvable : vérifiez que content/${key}.js est bien chargé avant include.js`);
      el.innerHTML = '<div class="container"><p>Contenu indisponible pour le moment.</p></div>';
    }
  });

  setupMenuToggle();
  setupHeaderShadow();
  setupReveal();
  setupNavHighlight();
});

// Bouton "3 barres" de la barre du haut : ouvre et ferme le menu.
function setupMenuToggle() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // On referme le menu après un clic sur un lien, avec la touche Échap,
  // ou en cliquant ailleurs sur la page.
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
      setOpen(false);
    }
  });
}

function setupDevisForm() {
  const form = document.getElementById('devis-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const champ = (nom) => String(data.get(nom) || '');

    const subject = `Demande de devis - Nilikaa Cantina (${champ('nom')})`;
    const body = [
      `Nom / Prénom : ${champ('nom')}`,
      `E-mail : ${champ('email')}`,
      `Téléphone : ${champ('telephone')}`,
      `Type d'événement : ${champ('type-evenement')}`,
      `Date souhaitée : ${champ('date-evenement')}`,
      `Horaire : ${champ('horaire')}`,
      `Localisation (code postal) : ${champ('localisation')}`,
      `Nombre d'invités estimé : ${champ('invites')}`,
      '',
      'Message :',
      champ('message'),
    ].join('\n');

    window.location.href = `mailto:${EMAIL_CONTACT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

// Bandeau défilant des festivals : la liste de logos est recopiée une fois à la
// suite d'elle-même pour que le défilement boucle sans saut visible.
// Rien à modifier ici pour ajouter un festival : tout se passe dans content/partenaires.js.
function setupMarquees(scope) {
  scope.querySelectorAll('.marquee-track').forEach((track) => {
    const items = Array.from(track.children);
    if (!items.length) return;

    items.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.setAttribute('tabindex', '-1');
      track.appendChild(clone);
    });

    // Vitesse constante quel que soit le nombre de logos : environ 6 s par logo.
    track.style.animationDuration = `${Math.max(18, items.length * 6)}s`;
  });
}

// Ombre sous la barre du haut dès que la page défile.
function setupHeaderShadow() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

// Les blocs apparaissent en douceur quand on arrive dessus.
function setupReveal() {
  const blocks = document.querySelectorAll('.section > .container');
  if (!blocks.length) return;

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  blocks.forEach((block) => {
    block.classList.add('reveal');
    observer.observe(block);
  });
}

// Met en évidence, dans le menu, la section en cours de lecture.
function setupNavHighlight() {
  const sections = document.querySelectorAll('main .section[id]');
  if (!sections.length || !('IntersectionObserver' in window)) return;

  const links = new Map();
  document.querySelectorAll('.site-nav a[href^="#"]').forEach((link) => {
    links.set(link.getAttribute('href').slice(1), link);
  });
  if (!links.size) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = links.get(entry.target.id);
      if (link) {
        link.classList.toggle('is-active', entry.isIntersecting);
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });

  sections.forEach((section) => observer.observe(section));
}
