const express = require('express');
const { loginUser, registerUser } = require('../controllers/userController');

const router = express.Router();

// Ruta para registro
router.post('/register', registerUser);

// Ruta para login
router.post('/login', loginUser);

module.exports = router;
