const pool = require('../service/db');

class Commande {
    constructor(id, client, items, total, date, status) {
        this.id = id;
        this.client = client;
        this.items = items;
        this.total = total;
        this.date = date;
        this.status = status;
    }

  
    addItem(item) {
        this.items.push(item);
        this.calculateTotal();
    }


    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.calculateTotal();
    }


    calculateTotal() {
        this.total = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }

  
    updateStatus(newStatus) {
        this.status = newStatus;
    }

    static async create(client, items, status) {
        const date = new Date().toISOString();
        const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        const result = await pool.query(
            'INSERT INTO commandes (client, items, total, date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [client, JSON.stringify(items), total, date, status]
        );

        console.log("insered into table =====");

        return result.rows[0];
    }

// Méthode pour récupérer une commande par ID
static async findById(id) {
    const result = await pool.query('SELECT * FROM commandes WHERE id = $1', [id]);
    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
}


    printDetails() {
        console.log(`Commande ID: ${this.id}`);
        console.log(`Client: ${this.client}`);
        console.log(`Date: ${this.date}`);
        console.log(`Statut: ${this.status}`);
        console.log(`Articles:`);
        this.items.forEach(item => {
            console.log(`- ${item.name}: ${item.quantity} x ${item.price} = ${item.quantity * item.price}`);
        });
        console.log(`Total: ${this.total}`);
    }
}


const commande = new Commande(
    1,
    'John Doe',
    [
        { id: 1, name: 'Article A', price: 10, quantity: 2 },
        { id: 2, name: 'Article B', price: 20, quantity: 1 }
    ],
    0,
    new Date().toISOString(),
    'En attente'
);


// commande.calculateTotal();


// commande.printDetails();

// commande.addItem({ id: 3, name: 'Article C', price: 15, quantity: 3 });


// commande.removeItem(1);


// commande.updateStatus('Expédiée');


// commande.printDetails();

module.exports = Commande;
