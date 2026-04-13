const reservationRepo = require('../repositories/reservation.repository');
const espaceRepo = require('../repositories/espace.repository');
const clientRepo = require('../repositories/client.repository');
const prestataireRepo = require('../repositories/prestataire.repository');
const { isDateFuture } = require('../utils/date');
const { calculerMontantTotal, verifierCapacite } = require('../utils/calculator');

const getAll = () => reservationRepo.findAll();

const getById = async (id) => {
  const res = await reservationRepo.findById(id);
  if (!res) throw { status: 404, message: 'Réservation introuvable' };
  return res;
};

const create = async ({ clientId, espaceId, prestataireId, dateEvenement, nombreInvites }) => {
  // 1. Vérifier existence client
  const client = await clientRepo.findById(clientId);
  if (!client) throw { status: 404, message: 'Client introuvable' };

  // 2. Vérifier existence espace
  const espace = await espaceRepo.findById(espaceId);
  if (!espace) throw { status: 404, message: 'Espace introuvable' };

  // 3. Vérifier prestataire si fourni
  let prestataire = null;
  if (prestataireId) {
    prestataire = await prestataireRepo.findById(prestataireId);
    if (!prestataire) throw { status: 404, message: 'Prestataire introuvable' };
  }

  // 4. Valider dateEvenement >= aujourd'hui
  const date = new Date(dateEvenement);
  if (!isDateFuture(date)) throw { status: 400, message: "La dateEvenement doit être >= aujourd'hui" };

  // 5. Vérifier nombreInvites <= capaciteMax
  const capaciteCheck = verifierCapacite(nombreInvites, espace.capaciteMax);
  if (!capaciteCheck.valid) throw { status: 400, message: capaciteCheck.message };

  // 6. Vérifier disponibilité de l'espace à cette date
  const disponible = await espaceRepo.isDisponible(espaceId, dateEvenement);
  if (!disponible) {
    throw { status: 409, message: 'L\'espace n\'est pas disponible à cette date (réservation CONFIRMEE existante)' };
  }

  // 7. Calculer montantTotal
  const montantTotal = calculerMontantTotal(espace.prixParJour, prestataire ? prestataire.prixJournee : null);

  // 8. Créer avec statut CONFIRMEE
  return reservationRepo.create({
    clientId,
    espaceId,
    prestataireId: prestataireId || null,
    dateEvenement: date,
    nombreInvites,
    montantTotal,
    statut: 'CONFIRMEE',
  });
};

const updateStatut = async (id, statut) => {
  await getById(id);
  return reservationRepo.update(id, { statut });
};

const remove = async (id) => {
  await getById(id);
  return reservationRepo.remove(id);
};

module.exports = { getAll, getById, create, updateStatut, remove };
