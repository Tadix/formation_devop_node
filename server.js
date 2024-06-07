const express = require('express');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
  });
const app = express();

const commandeRoutes = require('./src/resource/commande');
const initializeDatabase = require('./src/service/db_conf');

app.use(express.json());

app.use('/commande', commandeRoutes);


const port = process.env.PORT || 8001;
initializeDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Serveur démarré sur http://localhost:${port}`);
    });
}).catch(error => {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
});
