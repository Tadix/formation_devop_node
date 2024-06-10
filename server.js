require('dotenv').config({
    path: process.env.NODE_ENV === 'qa' ? '.env.qua' : '.env'
  });

const express = require('express');
const commandeRoutes = require('./src/resource/commande');

const app = express();
const port = process.env.PORT || 8001;
const db = require('./models');


app.use(express.json());

app.use('/commande', commandeRoutes);


db.sequelize.sync().then((req)=>{
    app.listen(port, () => {
        console.log(`Serveur démarré sur http://localhost:${port}`);
    });
}).catch(error => {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
});


// ajouter un endpoint qui renvoi le l'env 