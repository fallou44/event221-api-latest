const prisma = require('../config/prisma');

const findAll = () => prisma.client.findMany({ orderBy: { createdAt: 'desc' } });

const findById = (id) => prisma.client.findUnique({ where: { id } });

const findByEmail = (email) => prisma.client.findUnique({ where: { email } });

const create = (data) => prisma.client.create({ data });

const update = (id, data) => prisma.client.update({ where: { id }, data });

const remove = (id) => prisma.client.delete({ where: { id } });

const hasReservations = async (id) => {
  const count = await prisma.reservation.count({ where: { clientId: id } });
  return count > 0;
};

module.exports = { findAll, findById, findByEmail, create, update, remove, hasReservations };
