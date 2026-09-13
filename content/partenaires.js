// Bandeau défilant des festivals et événements où le foodtruck est déjà passé (index.html).
//
// POUR AJOUTER UN FESTIVAL :
//   1. Déposez son logo dans le dossier /photos/logos_partners/
//   2. Copiez-collez un bloc <a> ... </a> ci-dessous et changez 3 choses :
//        - href  : l'adresse du site du festival
//        - src   : le nom du fichier du logo
//        - alt   : le nom du festival (utile pour Google et les lecteurs d'écran)
//   3. Si le logo est BLANC ou très clair, ajoutez logo-clair après marquee-item,
//      comme ceci : class="marquee-item logo-clair" (la vignette passe alors en bleu foncé).
//
// Le défilement automatique et la boucle sont gérés tout seuls, quel que soit le nombre de logos.
// N'utilisez pas le caractère ` ni la séquence ${ dans votre texte.
window.NILIKAA_CONTENT = window.NILIKAA_CONTENT || {};
window.NILIKAA_CONTENT.partenaires = `
<div class="container">
  <h2>Ils nous ont fait confiance</h2>
</div>

<div class="marquee">
  <div class="marquee-track">

    <a class="marquee-item logo-clair" target="_blank" rel="noopener">
      <img src="photos/logos_partners/logo_bayonne.svg" alt="Fêtes de Bayonne" loading="lazy">
    </a>

    <a class="marquee-item logo-clair" target="_blank" rel="noopener">
      <img src="photos/logos_partners/logo_africajarc.png.webp" alt="Festival Africajarc" loading="lazy">
    </a>

    <a class="marquee-item" target="_blank" rel="noopener">
      <img src="photos/logos_partners/logo_music_en_ciel.png" alt="Festival Music en Ciel" loading="lazy">
    </a>

    <a class="marquee-item" target="_blank" rel="noopener">
      <img src="photos/logos_partners/logo_larayonne.png" alt="La Rayonne" loading="lazy">
    </a>

    <a class="marquee-item" target="_blank" rel="noopener">
      <img src="photos/logos_partners/erva_logo.webp" alt="Erva Festival" loading="lazy">
    </a>

    <a class="marquee-item" target="_blank" rel="noopener">
      <img src="photos/logos_partners/logo_coupeicare.jpeg" alt="Coupe Icare 2026" loading="lazy">
    </a>

    <a class="marquee-item" target="_blank" rel="noopener">
      <img src="photos/logos_partners/logo_feteanimaux.jpeg" alt="Fête des Animaux" loading="lazy">
    </a>

    <a class="marquee-item" target="_blank" rel="noopener">
      <img src="photos/logos_partners/logo_grappefleurie.jpeg" alt="Camping de la Grappe Fleurie" loading="lazy">
    </a>

    <a class="marquee-item" target="_blank" rel="noopener">
      <img src="photos/logos_partners/logo_mairielyon8.jpeg" alt="Mairie de Lyon 8" loading="lazy">
    </a>


  </div>
</div>
`;
