const pool = require('../db.js');

const Perfume = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM perfumes');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM perfumes WHERE id = ?', [id]);
    return rows[0]; // Retorna el primer resultado si existe, de lo contrario, undefined
  },
};

module.exports = Perfume;