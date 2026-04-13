const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reservation.controller');
const validate = require('../middlewares/validate');
const { reservationSchema, updateStatutSchema } = require('../validations/schemas');

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Lister toutes les réservations
 *     tags: [Réservations]
 *     responses:
 *       200:
 *         description: Liste des réservations avec détails client, espace et prestataire
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Reservation'
 */
router.get('/', ctrl.getAll);

/**
 * @swagger
 * /api/reservations/{id}:
 *   get:
 *     summary: Obtenir une réservation par ID
 *     tags: [Réservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Réservation trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Réservation introuvable
 */
router.get('/:id', ctrl.getById);

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Créer une nouvelle réservation
 *     tags: [Réservations]
 *     description: |
 *       Crée une réservation avec statut CONFIRMEE. Règles appliquées :
 *       - clientId et espaceId doivent exister
 *       - prestataireId optionnel, doit exister s'il est fourni
 *       - dateEvenement doit être >= aujourd'hui
 *       - nombreInvites <= capacité max de l'espace
 *       - L'espace ne doit pas avoir de réservation CONFIRMEE à la même date
 *       - montantTotal calculé automatiquement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReservationInput'
 *     responses:
 *       201:
 *         description: Réservation créée avec statut CONFIRMEE
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Données invalides ou règles métier non respectées
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Client, espace ou prestataire introuvable
 *       409:
 *         description: Espace non disponible à cette date
 */
router.post('/', validate(reservationSchema), ctrl.create);

/**
 * @swagger
 * /api/reservations/{id}/statut:
 *   patch:
 *     summary: Mettre à jour le statut d'une réservation
 *     tags: [Réservations]
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
 *             required: [statut]
 *             properties:
 *               statut:
 *                 type: string
 *                 enum: [CONFIRMEE, ANNULEE, TERMINEE]
 *                 example: ANNULEE
 *     responses:
 *       200:
 *         description: Statut mis à jour
 *       400:
 *         description: Statut invalide
 *       404:
 *         description: Réservation introuvable
 */
router.patch('/:id/statut', validate(updateStatutSchema), ctrl.updateStatut);

/**
 * @swagger
 * /api/reservations/{id}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Réservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Réservation supprimée
 *       404:
 *         description: Réservation introuvable
 */
router.delete('/:id', ctrl.remove);

module.exports = router;
