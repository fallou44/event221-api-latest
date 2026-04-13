const prestataireService = require('../services/prestataire.service');

const getAll = async (req, res, next) => {
  try {
    const data = await prestataireService.getAll();
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const data = await prestataireService.getById(Number(req.params.id));
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const data = await prestataireService.create(req.body);
    res.status(201).json({ success: true, message: 'Prestataire créé avec succès', data });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const data = await prestataireService.update(Number(req.params.id), req.body);
    res.json({ success: true, message: 'Prestataire mis à jour', data });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await prestataireService.remove(Number(req.params.id));
    res.json({ success: true, message: 'Prestataire supprimé avec succès' });
  } catch (err) { next(err); }
};

module.exports = { getAll, getById, create, update, remove };
