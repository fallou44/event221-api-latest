const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/espace.controller');
const validate = require('../middlewares/validate');
const { espaceSchema } = require('../validations/schemas');

/**
 * @swagger
 * /api/espaces:
 *   get:
 *     summary: Lister tous les espaces
 *     tags: [Espaces]
 *     responses:
 *       200:
 *         description: Liste des espaces
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Espace'
 */
router.get('/', ctrl.getAll);

/**
 * @swagger
 * /api/espaces/{id}:
 *   get:
 *     summary: Obtenir un espace par ID
 *     tags: [Espaces]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Espace trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Espace'
 *       404:
 *         description: Espace introuvable
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', ctrl.getById);

/**
 * @swagger
 * /api/espaces:
 *   post:
 *     summary: Créer un nouvel espace
 *     tags: [Espaces]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EspaceInput'
 *     responses:
 *       201:
 *         description: Espace créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Code déjà utilisé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', validate(espaceSchema), ctrl.create);

/**
 * @swagger
 * /api/espaces/{id}:
 *   put:
 *     summary: Mettre à jour un espace
 *     tags: [Espaces]
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
 *             $ref: '#/components/schemas/EspaceInput'
 *     responses:
 *       200:
 *         description: Espace mis à jour
 *       404:
 *         description: Espace introuvable
 */
router.put('/:id', validate(espaceSchema), ctrl.update);

/**
 * @swagger
 * /api/espaces/{id}:
 *   delete:
 *     summary: Supprimer un espace
 *     tags: [Espaces]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Espace supprimé
 *       400:
 *         description: Espace a des réservations CONFIRMEE
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Espace introuvable
 */
router.delete('/:id', ctrl.remove);

module.exports = router;
