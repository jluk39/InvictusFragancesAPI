const pool = require('../db.js');

const User = {
  async findByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  },

  async findAll() {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  },

  async create(username, password, role) {
    const [result] = await pool.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, password, role || 'user']
    );
    return result.insertId;
  },

  async update(id, username, password, role) {
    const fields = [];
    const values = [];

    if (username) {
      fields.push('username = ?');
      values.push(username);
    }
    if (password) {
      fields.push('password = ?');
      values.push(password);
    }
    if (role) {
      fields.push('role = ?');
      values.push(role);
    }

    values.push(id);

    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    await pool.query(query, values);
  },

  async delete(id) {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
  },
};

module.exports = User;

