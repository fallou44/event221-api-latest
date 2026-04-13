const prestataireRepo = require('../repositories/prestataire.repository');

const getAll = () => prestataireRepo.findAll();

const getById = async (id) => {
  const prestataire = await prestataireRepo.findById(id);
  if (!prestataire) throw { status: 404, message: 'Prestataire introuvable' };
  return prestataire;
};

const create = async (data) => {
  const existing = await prestataireRepo.findByEmail(data.email);
  if (existing) throw { status: 409, message: `L'email "${data.email}" est déjà utilisé` };
  return prestataireRepo.create(data);
};

const update = async (id, data) => {
  await getById(id);
  if (data.email) {
    const existing = await prestataireRepo.findByEmail(data.email);
    if (existing && existing.id !== id) throw { status: 409, message: `L'email "${data.email}" est déjà utilisé` };
  }
  return prestataireRepo.update(id, data);
};

const remove = async (id) => {
  await getById(id);
  const hasRes = await prestataireRepo.hasReservations(id);
  if (hasRes) throw { status: 400, message: 'Impossible de supprimer un prestataire lié à des réservations' };
  return prestataireRepo.remove(id);
};

module.exports = { getAll, getById, create, update, remove };
