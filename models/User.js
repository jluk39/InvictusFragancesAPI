const pool = require('../db.js');

const User = {
  async findByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  },

  async create(username, password, role) {
    const [result] = await pool.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [
      username,
      password,
      role || 'user',
    ]);
    return result.insertId;
  },
};

module.exports = User;
