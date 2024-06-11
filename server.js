require('dotenv').config({
    path: process.env.NODE_ENV !== undefined ? "environments/" + process.env.NODE_ENV : 'environments/common'
});

const express = require('express');
const commandeRoutes = require('./src/resource/commande');
const app = express();
const db = require('./src/models');


app.use(express.json());
app.use('/commande', commandeRoutes);


db.sequelize.sync().then((req) => {
    app.listen(process.env.PORT, () => {
        console.log(`Serveur démarré sur http://localhost:${process.env.PORT}`);
    });
}).catch(error => {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
});