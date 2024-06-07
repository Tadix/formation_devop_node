const express = require('express');
const router = express.Router();
const Commande = require('../entity/commande');

// Liste des commandes en mémoire (pour l'exemple)
const commandes = [
    new Commande(1, 'John Doe', [{ id: 1, name: 'Article A', price: 10, quantity: 2 }], 20, new Date().toISOString(), 'En attente'),
    new Commande(2, 'Jane Smith', [{ id: 2, name: 'Article B', price: 20, quantity: 1 }], 20, new Date().toISOString(), 'Expédiée')
];
// Endpoint pour récupérer une commande par ID
router.get('/:id',async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const commande = await Commande.findById(id);

    if (commande) {
        res.json(commande);
    } else {
        res.status(404).send('Commande non trouvée');
    }
});


router.post('/', async (req, res) => {
    const { client, items, status } = req.body;
    try {
        const newCommande = await Commande.create(client, items, status);
        res.status(201).json(newCommande);
    } catch (error) {
        res.status(500).send('Erreur du serveur');
    }
});
module.exports = router;