const prisma = require('../config/prisma');

const findAll = () =>
  prisma.user.findMany({
    select: { id: true, nom: true, email: true, role: true, actif: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  });

const findById = (id) =>
  prisma.user.findUnique({ where: { id } });

const findByEmail = (email) =>
  prisma.user.findUnique({ where: { email } });

const create = (data) =>
  prisma.user.create({
    data,
    select: { id: true, nom: true, email: true, role: true, actif: true, createdAt: true },
  });

const update = (id, data) =>
  prisma.user.update({
    where: { id },
    data,
    select: { id: true, nom: true, email: true, role: true, actif: true, updatedAt: true },
  });

const remove = (id) => prisma.user.delete({ where: { id } });

module.exports = { findAll, findById, findByEmail, create, update, remove };
