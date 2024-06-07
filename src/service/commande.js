const pool = require('./db');

class CommandeRepository{
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

static async findById(id) {
    const result = await pool.query('SELECT * FROM commandes WHERE id = $1', [id]);
    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
}

static async findAll() {
    try {
      const result = await pool.query('SELECT * FROM commandes');
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows; 
    } catch (err) {
      console.error('Erreur lors de la récupération des commandes:', err);
      throw err;
    }
  }
}

module.exports = CommandeRepository;