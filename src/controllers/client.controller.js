const clientService = require('../services/client.service');

const getAll = async (req, res, next) => {
  try {
    const data = await clientService.getAll();
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const data = await clientService.getById(Number(req.params.id));
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const data = await clientService.create(req.body);
    res.status(201).json({ success: true, message: 'Client créé avec succès', data });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const data = await clientService.update(Number(req.params.id), req.body);
    res.json({ success: true, message: 'Client mis à jour', data });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await clientService.remove(Number(req.params.id));
    res.json({ success: true, message: 'Client supprimé avec succès' });
  } catch (err) { next(err); }
};

module.exports = { getAll, getById, create, update, remove };
