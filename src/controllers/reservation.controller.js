const reservationService = require('../services/reservation.service');

const getAll = async (req, res, next) => {
  try {
    const data = await reservationService.getAll();
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const data = await reservationService.getById(Number(req.params.id));
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const data = await reservationService.create(req.body);
    res.status(201).json({ success: true, message: 'Réservation créée avec succès', data });
  } catch (err) { next(err); }
};

const updateStatut = async (req, res, next) => {
  try {
    const data = await reservationService.updateStatut(Number(req.params.id), req.body.statut);
    res.json({ success: true, message: 'Statut mis à jour', data });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await reservationService.remove(Number(req.params.id));
    res.json({ success: true, message: 'Réservation supprimée avec succès' });
  } catch (err) { next(err); }
};

module.exports = { getAll, getById, create, updateStatut, remove };
