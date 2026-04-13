const authService = require('../services/auth.service');

const register = async (req, res, next) => {
  try {
    const data = await authService.register(req.body);
    res.status(201).json({ success: true, message: 'Compte créé avec succès', ...data });
  } catch (err) { next(err); }
};

const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    res.json({ success: true, message: 'Connexion réussie', ...data });
  } catch (err) { next(err); }
};

const getProfile = async (req, res, next) => {
  try {
    const data = await authService.getProfile(req.user.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const changePassword = async (req, res, next) => {
  try {
    const data = await authService.changePassword(req.user.id, req.body);
    res.json({ success: true, ...data });
  } catch (err) { next(err); }
};

// Admin
const getAllUsers = async (req, res, next) => {
  try {
    const data = await authService.getAllUsers();
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const toggleActif = async (req, res, next) => {
  try {
    const data = await authService.toggleActif(Number(req.params.id));
    res.json({ success: true, message: `Compte ${data.actif ? 'activé' : 'désactivé'}`, data });
  } catch (err) { next(err); }
};

const updateRole = async (req, res, next) => {
  try {
    const data = await authService.updateRole(Number(req.params.id), req.body.role);
    res.json({ success: true, message: 'Rôle mis à jour', data });
  } catch (err) { next(err); }
};

module.exports = { register, login, getProfile, changePassword, getAllUsers, toggleActif, updateRole };
