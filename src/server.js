require('dotenv').config();
const app = require('./app');
const prisma = require('./config/prisma');

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await prisma.$connect();
    console.log('✅ Connexion à la base de données réussie');

    app.listen(PORT, () => {
      console.log(`🚀 Serveur EVENT 221 démarré sur le port ${PORT}`);
      console.log(`📚 Documentation Swagger : http://localhost:${PORT}/api-docs`);
      console.log(`🌐 Environnement : ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error);
    process.exit(1);
  }
}

main();

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('\n🛑 Serveur arrêté proprement.');
  process.exit(0);
});
