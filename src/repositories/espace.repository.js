const prisma = require('../config/prisma');

const findAll = () => prisma.espace.findMany({ orderBy: { createdAt: 'desc' } });

const findById = (id) => prisma.espace.findUnique({ where: { id } });

const findByCode = (code) => prisma.espace.findUnique({ where: { code } });

const create = (data) => prisma.espace.create({ data });

const update = (id, data) => prisma.espace.update({ where: { id }, data });

const remove = (id) => prisma.espace.delete({ where: { id } });

const hasReservationsConfirmees = async (id) => {
  const count = await prisma.reservation.count({
    where: { espaceId: id, statut: 'CONFIRMEE' },
  });
  return count > 0;
};

const isDisponible = async (espaceId, dateEvenement) => {
  const date = new Date(dateEvenement);
  const startOfDay = new Date(date.toISOString().split('T')[0] + 'T00:00:00.000Z');
  const endOfDay = new Date(date.toISOString().split('T')[0] + 'T23:59:59.999Z');

  const count = await prisma.reservation.count({
    where: {
      espaceId,
      statut: 'CONFIRMEE',
      dateEvenement: { gte: startOfDay, lte: endOfDay },
    },
  });
  return count === 0;
};

module.exports = { findAll, findById, findByCode, create, update, remove, hasReservationsConfirmees, isDisponible };
