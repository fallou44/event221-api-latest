const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/auth.controller');
const validate = require('../middlewares/validate');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { registerSchema, loginSchema, changePasswordSchema } = require('../validations/auth.schemas');
const { z } = require('zod');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Créer un compte utilisateur
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: Compte créé — retourne le token JWT
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       409:
 *         description: Email déjà utilisé
 */
router.post('/register', validate(registerSchema), ctrl.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Se connecter et obtenir un token JWT
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Connexion réussie — retourne le token JWT
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Identifiants incorrects
 *       403:
 *         description: Compte désactivé
 */
router.post('/login', validate(loginSchema), ctrl.login);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Obtenir le profil de l'utilisateur connecté
 *     tags: [Authentification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Non authentifié
 */
router.get('/profile', authenticate, ctrl.getProfile);

/**
 * @swagger
 * /api/auth/change-password:
 *   patch:
 *     summary: Changer son mot de passe
 *     tags: [Authentification]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordInput'
 *     responses:
 *       200:
 *         description: Mot de passe mis à jour
 *       400:
 *         description: Ancien mot de passe incorrect
 *       401:
 *         description: Non authentifié
 */
router.patch('/change-password', authenticate, validate(changePasswordSchema), ctrl.changePassword);

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Lister tous les utilisateurs (ADMIN uniquement)
 *     tags: [Authentification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       403:
 *         description: Accès refusé — rôle ADMIN requis
 */
router.get('/users', authenticate, authorize('ADMIN'), ctrl.getAllUsers);

/**
 * @swagger
 * /api/auth/users/{id}/toggle-actif:
 *   patch:
 *     summary: Activer / désactiver un compte (ADMIN)
 *     tags: [Authentification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Statut du compte modifié
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Utilisateur introuvable
 */
router.patch('/users/:id/toggle-actif', authenticate, authorize('ADMIN'), ctrl.toggleActif);

/**
 * @swagger
 * /api/auth/users/{id}/role:
 *   patch:
 *     summary: Modifier le rôle d'un utilisateur (ADMIN)
 *     tags: [Authentification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [role]
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [ADMIN, MANAGER, USER]
 *                 example: MANAGER
 *     responses:
 *       200:
 *         description: Rôle mis à jour
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Utilisateur introuvable
 */
router.patch(
  '/users/:id/role',
  authenticate,
  authorize('ADMIN'),
  validate(z.object({ role: z.enum(['ADMIN', 'MANAGER', 'USER']) })),
  ctrl.updateRole
);

module.exports = router;
