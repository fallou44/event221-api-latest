const bcrypt = require('bcryptjs');
const userRepo = require('../repositories/user.repository');
const { generateToken } = require('../utils/jwt');

const register = async ({ nom, email, motDePasse, role }) => {
  const existing = await userRepo.findByEmail(email);
  if (existing) throw { status: 409, message: `L'email "${email}" est déjà utilisé` };

  const hash = await bcrypt.hash(motDePasse, 10);
  const user = await userRepo.create({ nom, email, motDePasse: hash, role: role || 'USER' });

  const token = generateToken({ id: user.id, email: user.email, role: user.role });
  return { user, token };
};

const login = async ({ email, motDePasse }) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw { status: 401, message: 'Email ou mot de passe incorrect' };
  if (!user.actif) throw { status: 403, message: 'Compte désactivé. Contactez un administrateur.' };

  const valid = await bcrypt.compare(motDePasse, user.motDePasse);
  if (!valid) throw { status: 401, message: 'Email ou mot de passe incorrect' };

  const { motDePasse: _, ...safeUser } = user;
  const token = generateToken({ id: user.id, email: user.email, role: user.role });
  return { user: safeUser, token };
};

const getProfile = async (id) => {
  const user = await userRepo.findById(id);
  if (!user) throw { status: 404, message: 'Utilisateur introuvable' };
  const { motDePasse: _, ...safeUser } = user;
  return safeUser;
};

const changePassword = async (id, { ancienMotDePasse, nouveauMotDePasse }) => {
  const user = await userRepo.findById(id);
  if (!user) throw { status: 404, message: 'Utilisateur introuvable' };

  const valid = await bcrypt.compare(ancienMotDePasse, user.motDePasse);
  if (!valid) throw { status: 400, message: 'Ancien mot de passe incorrect' };

  const hash = await bcrypt.hash(nouveauMotDePasse, 10);
  await userRepo.update(id, { motDePasse: hash });
  return { message: 'Mot de passe mis à jour avec succès' };
};

// Admin only
const getAllUsers = () => userRepo.findAll();

const toggleActif = async (id) => {
  const user = await userRepo.findById(id);
  if (!user) throw { status: 404, message: 'Utilisateur introuvable' };
  return userRepo.update(id, { actif: !user.actif });
};

const updateRole = async (id, role) => {
  const user = await userRepo.findById(id);
  if (!user) throw { status: 404, message: 'Utilisateur introuvable' };
  return userRepo.update(id, { role });
};

module.exports = { register, login, getProfile, changePassword, getAllUsers, toggleActif, updateRole };
