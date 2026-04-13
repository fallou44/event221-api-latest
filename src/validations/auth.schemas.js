const { z } = require('zod');

const registerSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  motDePasse: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  role: z.enum(['ADMIN', 'MANAGER', 'USER']).optional(),
});

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  motDePasse: z.string().min(1, 'Le mot de passe est requis'),
});

const changePasswordSchema = z.object({
  ancienMotDePasse: z.string().min(1, 'L\'ancien mot de passe est requis'),
  nouveauMotDePasse: z.string().min(6, 'Le nouveau mot de passe doit contenir au moins 6 caractères'),
});

module.exports = { registerSchema, loginSchema, changePasswordSchema };
