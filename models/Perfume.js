const pool = require('../db.js');

const Perfume = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM perfumes');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM perfumes WHERE id = ?', [id]);
    return rows[0];
  },

  async create({ nombre, precio, descripcion, imagen }) {
    const [result] = await pool.query(
      'INSERT INTO perfumes (nombre, precio, descripcion, imagen) VALUES (?, ?, ?, ?)',
      [nombre, precio, descripcion, imagen]
    );
    return { id: result.insertId, nombre, precio, descripcion, imagen };
  },

  async update(id, { nombre, precio, descripcion, imagen }) {
    await pool.query(
      'UPDATE perfumes SET nombre = ?, precio = ?, descripcion = ?, imagen = ? WHERE id = ?',
      [nombre, precio, descripcion, imagen, id]
    );
    return { id, nombre, precio, descripcion, imagen };
  },

  async delete(id) {
    await pool.query('DELETE FROM perfumes WHERE id = ?', [id]);
  },
};

module.exports = Perfume;
