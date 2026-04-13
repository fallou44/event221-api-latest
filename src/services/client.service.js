const clientRepo = require('../repositories/client.repository');

const getAll = () => clientRepo.findAll();

const getById = async (id) => {
  const client = await clientRepo.findById(id);
  if (!client) throw { status: 404, message: 'Client introuvable' };
  return client;
};

const create = async (data) => {
  const existing = await clientRepo.findByEmail(data.email);
  if (existing) throw { status: 409, message: `L'email "${data.email}" est déjà utilisé` };
  return clientRepo.create(data);
};

const update = async (id, data) => {
  await getById(id);
  if (data.email) {
    const existing = await clientRepo.findByEmail(data.email);
    if (existing && existing.id !== id) throw { status: 409, message: `L'email "${data.email}" est déjà utilisé` };
  }
  return clientRepo.update(id, data);
};

const remove = async (id) => {
  await getById(id);
  const hasRes = await clientRepo.hasReservations(id);
  if (hasRes) throw { status: 400, message: 'Impossible de supprimer un client ayant des réservations' };
  return clientRepo.remove(id);
};

module.exports = { getAll, getById, create, update, remove };
