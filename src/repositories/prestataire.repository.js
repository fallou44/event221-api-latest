const prisma = require('../config/prisma');

const findAll = () => prisma.prestataire.findMany({ orderBy: { createdAt: 'desc' } });

const findById = (id) => prisma.prestataire.findUnique({ where: { id } });

const findByEmail = (email) => prisma.prestataire.findUnique({ where: { email } });

const create = (data) => prisma.prestataire.create({ data });

const update = (id, data) => prisma.prestataire.update({ where: { id }, data });

const remove = (id) => prisma.prestataire.delete({ where: { id } });

const hasReservations = async (id) => {
  const count = await prisma.reservation.count({ where: { prestataireId: id } });
  return count > 0;
};

module.exports = { findAll, findById, findByEmail, create, update, remove, hasReservations };
