// Contenu de la section "Nos prestations" (index.html) - première section de la page.
//
// Chaque prestation est un bloc <details class="rubrique"> :
//   - ce qui est dans <summary> reste toujours visible (titre + début du texte)
//   - ce qui est après </summary> s'affiche seulement quand le visiteur clique
// Pour ajouter une prestation, copiez-collez un bloc <details> ... </details> entier.
//
// Photos : elles sont dans /photos/galerie/. Ajoutez ou retirez des lignes <img>
// dans le quadrillage ci-dessous (mieux vaut un nombre pair de photos).
//
// Modifiez uniquement le texte entre les backticks (`) ci-dessous.
// N'utilisez pas le caractère ` ni la séquence ${ dans votre texte.
window.NILIKAA_CONTENT = window.NILIKAA_CONTENT || {};
window.NILIKAA_CONTENT.prestation = `
<div class="container">
  <h2>Nos prestations</h2>
  <p class="section-lead">
    Un <strong>repas original, sur mesure</strong> qui rassemble et mélange tous vos invités autour du food truck ou en format traiteur. 
    Nous sommes à votre écoute pour répondre à vos envies et vos contraintes pour <strong>rendre votre événement unique</strong>.
    Notre good street-food s'adapte à toutes les demandes culinaires pour vos <strong>déjeuners, diner, brunch</strong>...
  </p>

  <div class="split split--start">
    <div class="split-text">
      <div class="rubriques">

        <details class="rubrique">
          <summary>
            <span class="rubrique-title">Événements privés</span>
            <span class="rubrique-teaser">
              Anniversaire, mariage, cousinade… ou tout autres événements qui rassemble...
            </span>
            <span class="rubrique-more"></span>
          </summary>
          <p>
            Nous sommes là pour apporter une touche d'originalité et de gourmandise en vous libérant de toute la logistique contraignante 
            d'un repas réussi. Le food-truck et nos buffets créent une ambiance originale, festive et chaleureuse
            autour d'une expérience street-food à domicile.
          </p>
        </details>

        <details class="rubrique">
          <summary>
            <span class="rubrique-title">Événements entreprises</span>
            <span class="rubrique-teaser">
               Vous souhaitez offrir un événement moderne et conviviale pour vos équipes et vos collaborateurs,
               le format food truck Nilikaa répond totalement à cette exigence.
            </span>
            <span class="rubrique-more"></span>
          </summary>
          <p>
            Nous créons une expérience commune à tous dans une ambiance décontractée
            qui laisse des souvenirs de proximité et de partage autour de notre good street-food originale et savoureuse.
          </p>
        </details>

        <details class="rubrique">
          <summary>
            <span class="rubrique-title">Événements publics</span>
            <span class="rubrique-teaser">
              Festivals, ferias, open air, fêtes populaires, événements culturels : une carte adaptée au volume, une
              organisation en amont et une équipe expérimentée...
            </span>
            <span class="rubrique-more"></span>
          </summary>
          <p>
            Nous permettent de répondre aux besoin d'un public gourmand et impatient de profiter de son événement. 
            Nous nous adaptons aux grandes fréquentations et à l'identité de l'événement tout en proposant une offre de qualité et abordable au grand public.
          </p>
        </details>

      </div>

      <p>Une envie particulière ? <a href="#contact">Demandez votre devis gratuit</a>, nous vous répondons rapidement.</p>
    </div>

    <div class="split-media photo-grid">
      <img src="photos/prestation/foodtruck_queue.jpeg" alt="File d'attente devant le foodtruck" loading="lazy">
      <img src="photos/prestation/menu_buddhabowl.jpeg" alt="Buddha bowl servi en événement" loading="lazy">
      <img src="photos/prestation/menu_keftadwich.jpeg" alt="Keftadwich servi en événement" loading="lazy">
      <img src="photos/prestation/foodtruck_bayonne.jpeg" alt="Le foodtruck sur un événement public" loading="lazy">
      <img src="photos/prestation/foodtruck_soirée.jpeg" alt="Le foodtruck en soirée" loading="lazy">
      <img src="photos/prestation/foodtruck_queue_rayonne.jpeg" alt="Le foodtruck Nilikaa Cantina sur un festival" loading="lazy">
    </div>
  </div>
</div>
`;
