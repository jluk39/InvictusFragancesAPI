const express = require('express');
const {
  getAllPerfumes,
  getPerfumeById,
  createPerfume,
  updatePerfume,
  deletePerfume,
  uploadImage,
} = require('../controllers/perfumeController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Rutas públicas
router.get('/', getAllPerfumes); // Obtener todos los perfumes (público)
router.get('/:id', getPerfumeById); // Obtener un perfume por ID (público)

// Rutas protegidas para el panel de administración
router.post('/', verifyToken, createPerfume);
router.put('/:id', verifyToken, updatePerfume);
router.delete('/:id', verifyToken, deletePerfume);

// Subir imagen (protegido)
router.post('/upload', verifyToken, (req, res) => {
  req.app.locals.upload.single('imagen')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    uploadImage(req, res);
  });
});

module.exports = router;

