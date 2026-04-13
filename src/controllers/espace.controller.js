const espaceService = require('../services/espace.service');

const getAll = async (req, res, next) => {
  try {
    const data = await espaceService.getAll();
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const data = await espaceService.getById(Number(req.params.id));
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const data = await espaceService.create(req.body);
    res.status(201).json({ success: true, message: 'Espace créé avec succès', data });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const data = await espaceService.update(Number(req.params.id), req.body);
    res.json({ success: true, message: 'Espace mis à jour', data });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await espaceService.remove(Number(req.params.id));
    res.json({ success: true, message: 'Espace supprimé avec succès' });
  } catch (err) { next(err); }
};

module.exports = { getAll, getById, create, update, remove };
