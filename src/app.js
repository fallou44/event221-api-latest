require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const errorHandler = require('./middlewares/errorHandler');
const { authenticate } = require('./middlewares/auth.middleware');

const authRoutes = require('./routes/auth.routes');
const espaceRoutes = require('./routes/espace.routes');
const prestataireRoutes = require('./routes/prestataire.routes');
const clientRoutes = require('./routes/client.routes');
const reservationRoutes = require('./routes/reservation.routes');

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'EVENT 221 — API Docs',
  customCss: `
    .swagger-ui .topbar { background-color: #1a1a2e; }
    .swagger-ui .topbar-wrapper img { content: none; }
    .swagger-ui .topbar-wrapper::before {
      content: '🎪 EVENT 221 API';
      color: #e94560;
      font-size: 1.4rem;
      font-weight: bold;
    }
  `,
}));

// Route d'accueil
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🎪 Bienvenue sur l\'API EVENT 221 — Centre d\'Événements',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      auth:         '/api/auth',
      espaces:      '/api/espaces',
      prestataires: '/api/prestataires',
      clients:      '/api/clients',
      reservations: '/api/reservations',
    },
  });
});

// ── Routes publiques ────────────────────────────────────────────
app.use('/api/auth', authRoutes);

// ── Routes protégées (JWT requis) ──────────────────────────────
app.use('/api/espaces',      authenticate, espaceRoutes);
app.use('/api/prestataires', authenticate, prestataireRoutes);
app.use('/api/clients',      authenticate, clientRoutes);
app.use('/api/reservations', authenticate, reservationRoutes);

// Route 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route "${req.originalUrl}" introuvable` });
});

// Gestionnaire d'erreurs global
app.use(errorHandler);

module.exports = app;
