// Contenu de la section "Contact & devis" (index.html), y compris le formulaire.
// Modifiez uniquement le texte entre les backticks (`) ci-dessous.
// N'utilisez pas le caractère ` ni la séquence ${ dans votre texte.
window.NILIKAA_CONTENT = window.NILIKAA_CONTENT || {};
window.NILIKAA_CONTENT.contact = `
<div class="container">
  <h2>Contact &amp; demande de devis</h2>
  <p>
    Une question, une envie d'événement ? Remplissez le formulaire ci-dessous ou écrivez-nous directement à
    <a href="mailto:chellitkahina@yahoo.com">chellitkahina@yahoo.com</a>.
  </p>
  <p>[Téléphone : 0X XX XX XX XX] — [Zone de déplacement : ville / région]</p>

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
      <input type="text" id="type-evenement" name="type-evenement" placeholder="Mariage, entreprise, anniversaire...">
    </div>
    <div class="form-row">
      <label for="date-evenement">Date souhaitée</label>
      <input type="date" id="date-evenement" name="date-evenement">
    </div>
    <div class="form-row">
      <label for="invites">Nombre d'invités estimé</label>
      <input type="number" id="invites" name="invites" min="1">
    </div>
    <div class="form-row">
      <label for="message">Message *</label>
      <textarea id="message" name="message" rows="5" required></textarea>
    </div>
    <button type="submit" class="btn">Envoyer la demande</button>
    <p class="form-note">
      En cliquant sur « Envoyer la demande », votre messagerie s'ouvrira avec un e-mail pré-rempli à destination de
      chellitkahina@yahoo.com. Aucune donnée n'est stockée ni envoyée à un autre service.
    </p>
  </form>
</div>
`;
