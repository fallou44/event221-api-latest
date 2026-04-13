const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EVENT 221 API',
      version: '1.0.0',
      description: 'API de gestion du centre d\'événements EVENT 221 — Espaces, Prestataires, Clients et Réservations',
      contact: {
        name: 'Serigne F. Seck',
      },
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production'
          ? 'https://event221-api-latest.onrender.com'
          : `http://localhost:${process.env.PORT || 3000}`,
        description: process.env.NODE_ENV === 'production' ? 'Production (Render)' : 'Développement local',
      },
    ],
    security: [{ bearerAuth: [] }],
    tags: [
      { name: 'Authentification', description: 'Inscription, connexion et gestion des utilisateurs' },
      { name: 'Espaces', description: 'Gestion des espaces du centre' },
      { name: 'Prestataires', description: 'Gestion des prestataires' },
      { name: 'Clients', description: 'Gestion des clients' },
      { name: 'Réservations', description: 'Gestion des réservations d\'événements' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Entrez votre token JWT : Bearer <token>',
        },
      },
      schemas: {
        RegisterInput: {
          type: 'object',
          required: ['nom', 'email', 'motDePasse'],
          properties: {
            nom: { type: 'string', example: 'Serigne Seck' },
            email: { type: 'string', format: 'email', example: 'admin@event221.sn' },
            motDePasse: { type: 'string', example: 'motdepasse123', minLength: 6 },
            role: { type: 'string', enum: ['ADMIN', 'MANAGER', 'USER'], example: 'MANAGER' },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'motDePasse'],
          properties: {
            email: { type: 'string', format: 'email', example: 'admin@event221.sn' },
            motDePasse: { type: 'string', example: 'motdepasse123' },
          },
        },
        ChangePasswordInput: {
          type: 'object',
          required: ['ancienMotDePasse', 'nouveauMotDePasse'],
          properties: {
            ancienMotDePasse: { type: 'string', example: 'ancien123' },
            nouveauMotDePasse: { type: 'string', example: 'nouveau456', minLength: 6 },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Connexion réussie' },
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            user: { $ref: '#/components/schemas/User' },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nom: { type: 'string', example: 'Serigne Seck' },
            email: { type: 'string', example: 'admin@event221.sn' },
            role: { type: 'string', enum: ['ADMIN', 'MANAGER', 'USER'] },
            actif: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Espace: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            code: { type: 'string', example: 'ESP-001' },
            nom: { type: 'string', example: 'Salle Diamono' },
            capaciteMax: { type: 'integer', example: 200 },
            type: { type: 'string', enum: ['SALLE_CONFERENCE', 'JARDIN', 'ROOFTOP', 'SALLE_FETE'] },
            prixParJour: { type: 'number', example: 150000 },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        EspaceInput: {
          type: 'object',
          required: ['code', 'nom', 'capaciteMax', 'type', 'prixParJour'],
          properties: {
            code: { type: 'string', example: 'ESP-001' },
            nom: { type: 'string', example: 'Salle Diamono' },
            capaciteMax: { type: 'integer', example: 200, minimum: 1 },
            type: { type: 'string', enum: ['SALLE_CONFERENCE', 'JARDIN', 'ROOFTOP', 'SALLE_FETE'] },
            prixParJour: { type: 'number', example: 150000, minimum: 1 },
          },
        },
        Prestataire: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nom: { type: 'string', example: 'Cheikh Catering' },
            type: { type: 'string', enum: ['TRAITEUR', 'DJ', 'PHOTOGRAPHE', 'DECORATEUR'] },
            email: { type: 'string', example: 'cheikh@catering.sn' },
            telephone: { type: 'string', example: '+221 77 123 45 67' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        PrestataireInput: {
          type: 'object',
          required: ['nom', 'type', 'email', 'telephone'],
          properties: {
            nom: { type: 'string', example: 'Cheikh Catering' },
            type: { type: 'string', enum: ['TRAITEUR', 'DJ', 'PHOTOGRAPHE', 'DECORATEUR'] },
            email: { type: 'string', format: 'email', example: 'cheikh@catering.sn' },
            telephone: { type: 'string', example: '+221 77 123 45 67' },
          },
        },
        Client: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            prenom: { type: 'string', example: 'Amadou' },
            nom: { type: 'string', example: 'Diallo' },
            email: { type: 'string', example: 'amadou.diallo@email.com' },
            telephone: { type: 'string', example: '+221 70 987 65 43' },
            type: { type: 'string', enum: ['PARTICULIER', 'ENTREPRISE'] },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        ClientInput: {
          type: 'object',
          required: ['prenom', 'nom', 'email', 'type'],
          properties: {
            prenom: { type: 'string', example: 'Amadou' },
            nom: { type: 'string', example: 'Diallo' },
            email: { type: 'string', format: 'email', example: 'amadou.diallo@email.com' },
            telephone: { type: 'string', example: '+221 70 987 65 43' },
            type: { type: 'string', enum: ['PARTICULIER', 'ENTREPRISE'] },
          },
        },
        Reservation: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            clientId: { type: 'integer', example: 1 },
            espaceId: { type: 'integer', example: 1 },
            prestataireId: { type: 'integer', example: 2, nullable: true },
            dateEvenement: { type: 'string', format: 'date-time' },
            nombreInvites: { type: 'integer', example: 100 },
            montantTotal: { type: 'number', example: 200000 },
            statut: { type: 'string', enum: ['CONFIRMEE', 'ANNULEE', 'TERMINEE'] },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        ReservationInput: {
          type: 'object',
          required: ['clientId', 'espaceId', 'dateEvenement', 'nombreInvites'],
          properties: {
            clientId: { type: 'integer', example: 1 },
            espaceId: { type: 'integer', example: 1 },
            prestataireId: { type: 'integer', example: 2, nullable: true },
            dateEvenement: { type: 'string', format: 'date', example: '2025-12-25' },
            nombreInvites: { type: 'integer', example: 100 },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Message d\'erreur' },
            errors: { type: 'array', items: { type: 'string' } },
          },
        },
        Success: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Opération réussie' },
            data: { type: 'object' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
