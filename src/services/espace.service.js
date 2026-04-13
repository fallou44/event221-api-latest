const espaceRepo = require('../repositories/espace.repository');

const getAll = () => espaceRepo.findAll();

const getById = async (id) => {
  const espace = await espaceRepo.findById(id);
  if (!espace) throw { status: 404, message: 'Espace introuvable' };
  return espace;
};

const create = async (data) => {
  const existing = await espaceRepo.findByCode(data.code);
  if (existing) throw { status: 409, message: `Le code "${data.code}" est déjà utilisé` };
  return espaceRepo.create(data);
};

const update = async (id, data) => {
  await getById(id);
  if (data.code) {
    const existing = await espaceRepo.findByCode(data.code);
    if (existing && existing.id !== id) throw { status: 409, message: `Le code "${data.code}" est déjà utilisé` };
  }
  return espaceRepo.update(id, data);
};

const remove = async (id) => {
  await getById(id);
  const hasConfirmees = await espaceRepo.hasReservationsConfirmees(id);
  if (hasConfirmees) throw { status: 400, message: 'Impossible de supprimer un espace ayant des réservations CONFIRMEE' };
  return espaceRepo.remove(id);
};

module.exports = { getAll, getById, create, update, remove };
