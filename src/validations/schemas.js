const { z } = require('zod');

const espaceSchema = z.object({
  code: z.string().min(1, 'Le code est requis'),
  nom: z.string().min(1, 'Le nom est requis'),
  capaciteMax: z.number().int().positive('La capacité doit être > 0'),
  type: z.enum(['SALLE_CONFERENCE', 'JARDIN', 'ROOFTOP', 'SALLE_FETE'], {
    errorMap: () => ({ message: 'Type invalide: SALLE_CONFERENCE, JARDIN, ROOFTOP, SALLE_FETE' }),
  }),
  prixParJour: z.number().positive('Le prix doit être > 0'),
});

const prestataireSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  type: z.enum(['TRAITEUR', 'DJ', 'PHOTOGRAPHE', 'DECORATEUR'], {
    errorMap: () => ({ message: 'Type invalide: TRAITEUR, DJ, PHOTOGRAPHE, DECORATEUR' }),
  }),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(1, 'Le téléphone est requis'),
});

const clientSchema = z.object({
  prenom: z.string().min(1, 'Le prénom est requis'),
  nom: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  telephone: z.string().optional(),
  type: z.enum(['PARTICULIER', 'ENTREPRISE'], {
    errorMap: () => ({ message: 'Type invalide: PARTICULIER, ENTREPRISE' }),
  }),
});

const reservationSchema = z.object({
  clientId: z.number().int().positive('clientId invalide'),
  espaceId: z.number().int().positive('espaceId invalide'),
  prestataireId: z.number().int().positive('prestataireId invalide').optional().nullable(),
  dateEvenement: z.string().refine((d) => !isNaN(Date.parse(d)), 'dateEvenement invalide'),
  nombreInvites: z.number().int().positive('Le nombre d\'invités doit être > 0'),
});

const updateStatutSchema = z.object({
  statut: z.enum(['CONFIRMEE', 'ANNULEE', 'TERMINEE'], {
    errorMap: () => ({ message: 'Statut invalide: CONFIRMEE, ANNULEE, TERMINEE' }),
  }),
});

module.exports = {
  espaceSchema,
  prestataireSchema,
  clientSchema,
  reservationSchema,
  updateStatutSchema,
};
