/**
 * Utilitaires pour la gestion des dates (réservations, événements)
 */

/**
 * Vérifie si une date est >= aujourd'hui (à minuit)
 */
const isDateFuture = (date) => {
  const input = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return input >= today;
};

/**
 * Retourne le début de journée d'une date (00:00:00.000 UTC)
 */
const startOfDay = (date) => {
  const d = new Date(date);
  return new Date(d.toISOString().split('T')[0] + 'T00:00:00.000Z');
};

/**
 * Retourne la fin de journée d'une date (23:59:59.999 UTC)
 */
const endOfDay = (date) => {
  const d = new Date(date);
  return new Date(d.toISOString().split('T')[0] + 'T23:59:59.999Z');
};

/**
 * Formate une date en chaîne lisible (fr-SN)
 */
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

module.exports = {
  isDateFuture,
  startOfDay,
  endOfDay,
  formatDate,
};
