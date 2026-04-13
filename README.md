# 🎪 EVENT 221 — API de gestion du centre d'événements

API REST Node.js/Express pour la gestion des espaces, prestataires, clients et réservations du centre **EVENT 221**.

> **Projet :** Sujet 23 — Serigne F. Seck  
> **Stack :** Node.js · Express · Prisma · PostgreSQL (Neon) · Swagger · Render

---

## 🏗️ Architecture

```
event221/
├── prisma/
│   └── schema.prisma          # Modèles de données
├── src/
│   ├── config/
│   │   ├── prisma.js          # Client Prisma
│   │   └── swagger.js         # Configuration Swagger/OpenAPI
│   ├── controllers/           # Logique HTTP (req/res)
│   │   ├── espace.controller.js
│   │   ├── prestataire.controller.js
│   │   ├── client.controller.js
│   │   └── reservation.controller.js
│   ├── middlewares/
│   │   ├── errorHandler.js    # Gestionnaire d'erreurs global
│   │   └── validate.js        # Middleware de validation Zod
│   ├── repositories/          # Accès base de données (Prisma)
│   │   ├── espace.repository.js
│   │   ├── prestataire.repository.js
│   │   ├── client.repository.js
│   │   └── reservation.repository.js
│   ├── routes/                # Définition des routes + Swagger JSDoc
│   │   ├── espace.routes.js
│   │   ├── prestataire.routes.js
│   │   ├── client.routes.js
│   │   └── reservation.routes.js
│   ├── services/              # Logique métier
│   │   ├── espace.service.js
│   │   ├── prestataire.service.js
│   │   ├── client.service.js
│   │   └── reservation.service.js
│   ├── validations/
│   │   └── schemas.js         # Schémas Zod
│   ├── app.js                 # Configuration Express
│   └── server.js              # Point d'entrée
├── .env.example
├── .gitignore
└── package.json
```

---

## ⚙️ Installation locale

### 1. Cloner et installer les dépendances

```bash
git clone https://github.com/votre-repo/event221-api.git
cd event221-api
npm install
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example .env
```

Editer `.env` avec votre URL Neon :

```env
DATABASE_URL="postgresql://user:password@ep-xxx.neon.tech/dbname?sslmode=require"
PORT=3000
NODE_ENV=development
```

### 3. Générer le client Prisma et pousser le schéma

```bash
npm run db:generate
npm run db:push
```

### 4. Démarrer le serveur

```bash
# Développement (avec rechargement automatique)
npm run dev

# Production
npm start
```

L'API est disponible sur `http://localhost:3000`  
La documentation Swagger sur `http://localhost:3000/api-docs`

---

## 🗄️ Configuration Neon (PostgreSQL)

1. Créer un compte sur [neon.tech](https://neon.tech)
2. Créer un nouveau projet
3. Copier la **Connection string** depuis le dashboard Neon
4. La coller dans `DATABASE_URL` dans votre `.env`

La chaîne ressemble à :
```
postgresql://user:password@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

---

## 🚀 Déploiement sur Render

### Étape 1 — Préparer le dépôt GitHub

```bash
git init
git add .
git commit -m "feat: initial commit EVENT 221 API"
git remote add origin https://github.com/votre-user/event221-api.git
git push -u origin main
```

### Étape 2 — Créer le service sur Render

1. Aller sur [render.com](https://render.com) → **New** → **Web Service**
2. Connecter votre dépôt GitHub
3. Configurer :
   - **Name** : `event221-api`
   - **Runtime** : `Node`
   - **Build Command** : `npm install && npx prisma generate && npx prisma db push`
   - **Start Command** : `npm start`
   - **Plan** : Free

### Étape 3 — Variables d'environnement sur Render

Dans l'onglet **Environment** du service Render, ajouter :

| Clé | Valeur |
|-----|--------|
| `DATABASE_URL` | Votre URL Neon complète |
| `NODE_ENV` | `production` |
| `PORT` | `3000` |

### Étape 4 — Déployer

Cliquer **Deploy** — Render build et démarre automatiquement.

Votre API sera accessible sur : `https://event221-api.onrender.com`

---

## 📚 Endpoints API

### Espaces

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/espaces` | Lister tous les espaces |
| GET | `/api/espaces/:id` | Obtenir un espace |
| POST | `/api/espaces` | Créer un espace |
| PUT | `/api/espaces/:id` | Modifier un espace |
| DELETE | `/api/espaces/:id` | Supprimer un espace |

### Prestataires

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/prestataires` | Lister tous les prestataires |
| GET | `/api/prestataires/:id` | Obtenir un prestataire |
| POST | `/api/prestataires` | Créer un prestataire |
| PUT | `/api/prestataires/:id` | Modifier un prestataire |
| DELETE | `/api/prestataires/:id` | Supprimer un prestataire |

### Clients

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/clients` | Lister tous les clients |
| GET | `/api/clients/:id` | Obtenir un client |
| POST | `/api/clients` | Créer un client |
| PUT | `/api/clients/:id` | Modifier un client |
| DELETE | `/api/clients/:id` | Supprimer un client |

### Réservations

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/reservations` | Lister toutes les réservations |
| GET | `/api/reservations/:id` | Obtenir une réservation |
| POST | `/api/reservations` | Créer une réservation |
| PATCH | `/api/reservations/:id/statut` | Changer le statut |
| DELETE | `/api/reservations/:id` | Supprimer une réservation |

---

## 📋 Exemples de requêtes

### Créer un espace

```json
POST /api/espaces
{
  "code": "ESP-001",
  "nom": "Salle Diamono",
  "capaciteMax": 200,
  "type": "SALLE_FETE",
  "prixParJour": 150000
}
```

### Créer un client

```json
POST /api/clients
{
  "prenom": "Amadou",
  "nom": "Diallo",
  "email": "amadou.diallo@email.com",
  "telephone": "+221 77 123 45 67",
  "type": "PARTICULIER"
}
```

### Créer un prestataire

```json
POST /api/prestataires
{
  "nom": "Cheikh Catering",
  "type": "TRAITEUR",
  "email": "contact@cheikhcatering.sn",
  "telephone": "+221 76 987 65 43"
}
```

### Réserver un événement

```json
POST /api/reservations
{
  "clientId": 1,
  "espaceId": 1,
  "prestataireId": 1,
  "dateEvenement": "2026-12-25",
  "nombreInvites": 150
}
```

### Annuler une réservation

```json
PATCH /api/reservations/1/statut
{
  "statut": "ANNULEE"
}
```

---

## ✅ Règles métier implémentées

- **Espaces** : code unique, nom obligatoire, capacité et prix > 0
- **Prestataires** : email unique, nom et type obligatoires
- **Clients** : email unique, prénom/nom/type obligatoires
- **Réservations** :
  - Vérification existence client, espace, prestataire
  - `dateEvenement >= aujourd'hui`
  - `nombreInvites <= capaciteMax` de l'espace
  - Pas de double réservation CONFIRMEE à la même date
  - `montantTotal` calculé automatiquement
  - Statut initial = `CONFIRMEE`
- **Suppressions protégées** :
  - Espace avec réservation CONFIRMEE → bloquée
  - Prestataire lié à des réservations → bloquée
  - Client avec réservations → bloquée

---

## 🛠️ Technologies

| Technologie | Usage |
|-------------|-------|
| **Node.js** | Runtime JavaScript |
| **Express** | Framework HTTP |
| **Prisma** | ORM + migrations |
| **Neon** | PostgreSQL serverless |
| **Zod** | Validation des données |
| **Swagger/OpenAPI** | Documentation interactive |
| **Render** | Hébergement cloud |
