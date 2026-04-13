const prisma = require('../config/prisma');

const findAll = () =>
  prisma.reservation.findMany({
    include: { client: true, espace: true, prestataire: true },
    orderBy: { createdAt: 'desc' },
  });

const findById = (id) =>
  prisma.reservation.findUnique({
    where: { id },
    include: { client: true, espace: true, prestataire: true },
  });

const create = (data) =>
  prisma.reservation.create({
    data,
    include: { client: true, espace: true, prestataire: true },
  });

const update = (id, data) =>
  prisma.reservation.update({
    where: { id },
    data,
    include: { client: true, espace: true, prestataire: true },
  });

const remove = (id) => prisma.reservation.delete({ where: { id } });

module.exports = { findAll, findById, create, update, remove };
