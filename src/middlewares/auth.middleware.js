const { verifyToken } = require('../utils/jwt');
const userRepo = require('../repositories/user.repository');

/**
 * Middleware d'authentification — vérifie le Bearer token JWT
 */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Token manquant. Authentification requise.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const user = await userRepo.findById(decoded.id);
    if (!user) return res.status(401).json({ success: false, message: 'Utilisateur introuvable' });
    if (!user.actif) return res.status(403).json({ success: false, message: 'Compte désactivé' });

    const { motDePasse: _, ...safeUser } = user;
    req.user = safeUser;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expiré. Veuillez vous reconnecter.' });
    }
    return res.status(401).json({ success: false, message: 'Token invalide.' });
  }
};

/**
 * Middleware d'autorisation par rôle(s)
 * Usage : authorize('ADMIN') ou authorize('ADMIN', 'MANAGER')
 */
const authorize = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Non authentifié' });
  }
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: `Accès refusé. Rôle requis : ${roles.join(' ou ')}. Votre rôle : ${req.user.role}`,
    });
  }
  next();
};

module.exports = { authenticate, authorize };
