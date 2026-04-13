/**
 * Utilitaires de calcul métier pour EVENT 221
 */

/**
 * Calcule le montant total d'une réservation.
 * montantTotal = prixParJour de l'espace (+ tarif du prestataire si applicable)
 *
 * @param {number} prixEspace - Prix par jour de l'espace
 * @param {number|null} prixPrestataire - Tarif journalier du prestataire (optionnel)
 * @returns {number} montantTotal
 */
const calculerMontantTotal = (prixEspace, prixPrestataire = null) => {
  const montant = prixEspace + (prixPrestataire || 0);
  return Math.round(montant * 100) / 100; // Arrondi à 2 décimales
};

/**
 * Vérifie que le nombre d'invités ne dépasse pas la capacité max
 *
 * @param {number} nombreInvites
 * @param {number} capaciteMax
 * @returns {{ valid: boolean, message?: string }}
 */
const verifierCapacite = (nombreInvites, capaciteMax) => {
  if (nombreInvites > capaciteMax) {
    return {
      valid: false,
      message: `Le nombre d'invités (${nombreInvites}) dépasse la capacité maximale de l'espace (${capaciteMax})`,
    };
  }
  return { valid: true };
};

module.exports = {
  calculerMontantTotal,
  verifierCapacite,
};
