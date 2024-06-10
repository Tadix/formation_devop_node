const { Commande } = require("../../models");

class CommandeRepository {
  static async create(client, items, status) {
    const date = new Date().toISOString();
    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    try {
      await Commande.create({
        client: client,
        items: items,
        total: total,
        date: date,
        status: status
      });
    } catch (err) {
      console.error('Error creating Commande:', err);
      throw err; // Rethrow the error so it can be caught by the route handler
    }

  }

  static async findById(id) {
    const result = await Commande.findByPk(id).catch((err) => {
      console.error('Erreur lors de la récupération des commandes:', err);
      throw err;
    });

    console.log(result);
    if (result === null) {
      return null;
    }
    return result;
  }

  static async findAll() {

    const commnades = await Commande.findAll()
      .catch((err) => {
        console.error('Erreur lors de la récupération des commandes:', err);
        throw err;
      });
    return commnades;
  }
}

module.exports = CommandeRepository;