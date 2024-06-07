const express = require('express');
const router = express.Router();
// const Commande = require('../entity/commande');
const Commande = require('../service/commande');




router.get('/:id',async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const commande = await Commande.findById(id);
    console.log("commandesssssssssss2223");

console.log(commande);
    if (commande) {
        res.json(commande);
    } else {
        res.status(404).send('Commande non trouvée');
    }
});


router.post('/', async (req, res) => {
    const { client, items, status } = req.body;
    console.log("commandesssssssssss2222");

    try {
        const newCommande = await Commande.create(client, items, status);
        res.status(201).json(newCommande);
    } catch (error) {
        res.status(500).send('Erreur du serveur');
    }
});

router.get('/', async (req, res) => { 

    try {
      const commandes = await Commande.findAll();
      if (commandes) {
        res.json(commandes);
      } else {
        res.status(404).send('Commandes non trouvées');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
      res.status(500).send('Erreur serveur');
    }
  });
module.exports = router;