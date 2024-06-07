const pool = require('./db');

async function initializeDatabase() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS commandes (
            id SERIAL PRIMARY KEY,
            client VARCHAR(255) NOT NULL,
            items JSON NOT NULL,
            total NUMERIC(10, 2) NOT NULL,
            date TIMESTAMP NOT NULL,
            status VARCHAR(50) NOT NULL
        )
    `;

    try {
        await pool.query(createTableQuery);
        console.log("Table 'commandes' créée ou existe déjà.");
    } catch (error) {
        console.error('Erreur lors de la création de la table:', error);
    }
}

module.exports = initializeDatabase;
