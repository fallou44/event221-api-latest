const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/prestataire.controller');
const validate = require('../middlewares/validate');
const { prestataireSchema } = require('../validations/schemas');

/**
 * @swagger
 * /api/prestataires:
 *   get:
 *     summary: Lister tous les prestataires
 *     tags: [Prestataires]
 *     responses:
 *       200:
 *         description: Liste des prestataires
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Prestataire'
 */
router.get('/', ctrl.getAll);

/**
 * @swagger
 * /api/prestataires/{id}:
 *   get:
 *     summary: Obtenir un prestataire par ID
 *     tags: [Prestataires]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Prestataire trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prestataire'
 *       404:
 *         description: Prestataire introuvable
 */
router.get('/:id', ctrl.getById);

/**
 * @swagger
 * /api/prestataires:
 *   post:
 *     summary: Créer un nouveau prestataire
 *     tags: [Prestataires]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PrestataireInput'
 *     responses:
 *       201:
 *         description: Prestataire créé
 *       400:
 *         description: Données invalides
 *       409:
 *         description: Email déjà utilisé
 */
router.post('/', validate(prestataireSchema), ctrl.create);

/**
 * @swagger
 * /api/prestataires/{id}:
 *   put:
 *     summary: Mettre à jour un prestataire
 *     tags: [Prestataires]
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
 *             $ref: '#/components/schemas/PrestataireInput'
 *     responses:
 *       200:
 *         description: Prestataire mis à jour
 *       404:
 *         description: Prestataire introuvable
 */
router.put('/:id', validate(prestataireSchema), ctrl.update);

/**
 * @swagger
 * /api/prestataires/{id}:
 *   delete:
 *     summary: Supprimer un prestataire
 *     tags: [Prestataires]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Prestataire supprimé
 *       400:
 *         description: Prestataire lié à des réservations
 *       404:
 *         description: Prestataire introuvable
 */
router.delete('/:id', ctrl.remove);

module.exports = router;
