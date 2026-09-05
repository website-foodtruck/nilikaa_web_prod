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
      setupScrollGalleries(el);
    } else {
      console.error(`Contenu "${key}" introuvable : vérifiez que content/${key}.js est bien chargé avant include.js`);
      el.innerHTML = '<div class="container"><p>Contenu indisponible pour le moment.</p></div>';
    }
  });
});

function setupDevisForm() {
  const form = document.getElementById('devis-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);

    const subject = `Demande de devis - Nilikaa Cantina (${data.get('nom') || ''})`;
    const body = [
      `Nom / Prénom : ${data.get('nom') || ''}`,
      `E-mail : ${data.get('email') || ''}`,
      `Téléphone : ${data.get('telephone') || ''}`,
      `Type d'événement : ${data.get('type-evenement') || ''}`,
      `Date souhaitée : ${data.get('date-evenement') || ''}`,
      `Nombre d'invités estimé : ${data.get('invites') || ''}`,
      '',
      'Message :',
      data.get('message') || '',
    ].join('\n');

    window.location.href = `mailto:chellitkahina@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

function setupScrollGalleries(scope) {
  scope.querySelectorAll('.scroll-gallery').forEach((gallery) => {
    const track = gallery.querySelector('.scroll-gallery-track');
    const prevBtn = gallery.querySelector('.scroll-btn-prev');
    const nextBtn = gallery.querySelector('.scroll-btn-next');
    if (!track) return;

    const scrollAmount = () => track.clientWidth * 0.8;
    prevBtn?.addEventListener('click', () => track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
    nextBtn?.addEventListener('click', () => track.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));
  });
}
