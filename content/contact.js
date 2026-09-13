// Contenu de la section "Contact & devis" (index.html), y compris le formulaire.
// Modifiez uniquement le texte entre les backticks (`) ci-dessous.
// N'utilisez pas le caractère ` ni la séquence ${ dans votre texte.
//
// Attention : si vous changez l'adresse e-mail ci-dessous, changez-la aussi dans
// assets/js/include.js (c'est elle qui reçoit les demandes de devis du formulaire).
window.NILIKAA_CONTENT = window.NILIKAA_CONTENT || {};
window.NILIKAA_CONTENT.contact = `
<div class="container">
  <p class="eyebrow">Parlons de votre projet</p>
  <h2>Demandez votre devis</h2>
  <p class="section-lead">
    Une question, une envie d'événement ? Remplissez le formulaire, nous revenons vers vous rapidement.
  </p>

  <div class="contact-grid">
    <div class="contact-infos">
      <h3>Nous joindre</h3>
      <ul>
        <li>
          <strong>E-mail</strong>
          <a href="mailto:nilikaacantina@gmail.com">nilikaacantina@gmail.com</a>
        </li>
        <li>
          <strong>Téléphone</strong>
          <a href="tel:+33670963514">06 70 96 35 14</a>
        </li>
        <li>
          <strong>Zone de déplacement</strong>
          Lyon &amp; Auvergne Rhône-Alpes, déplacement en France sur demande
        </li>
      </ul>
    </div>

    <form id="devis-form" class="devis-form">
      <div class="form-row">
        <label for="nom">Nom / Prénom *</label>
        <input type="text" id="nom" name="nom" required>
      </div>
      <div class="form-row">
        <label for="email">E-mail *</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div class="form-row">
        <label for="telephone">Téléphone</label>
        <input type="tel" id="telephone" name="telephone">
      </div>
      <div class="form-row">
        <label for="type-evenement">Type d'événement</label>
        <input type="text" id="type-evenement" name="type-evenement" placeholder="Privé, entreprise, public...">
      </div>
      <div class="form-row">
        <label for="date-evenement">Date souhaitée</label>
        <input type="date" id="date-evenement" name="date-evenement">
      </div>
      <div class="form-row">
        <label for="horaire">Horaire</label>
        <input type="text" id="horaire" name="horaire" placeholder="ex. 12h-15h, ou service du soir">
      </div>
      <div class="form-row">
        <label for="localisation">Localisation (code postal)</label>
        <input type="text" id="localisation" name="localisation" inputmode="numeric" placeholder="ex. 69003">
      </div>
      <div class="form-row">
        <label for="invites">Nombre d'invités estimé</label>
        <input type="number" id="invites" name="invites" min="1">
      </div>
      <div class="form-row form-row-full">
        <label for="message">Message *</label>
        <textarea id="message" name="message" rows="5" required></textarea>
      </div>
      <button type="submit" class="btn">Envoyer la demande</button>
      <p class="form-note">
        En cliquant sur « Envoyer la demande », votre messagerie s'ouvrira avec un e-mail pré-rempli à destination de
        nilikaacantina@gmail.com. Aucune donnée n'est stockée ni envoyée à un autre service.
      </p>
    </form>
  </div>
</div>
`;
