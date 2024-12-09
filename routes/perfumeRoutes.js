const express = require('express');
const { getAllPerfumes, getPerfumeById } = require('../controllers/perfumeController');
const { verifyToken } = require('../middleware/authMiddleware');
const { uploadImage } = require('../controllers/perfumeController');

const router = express.Router();

router.get('/', getAllPerfumes);
// Obtener un perfume por ID
router.get('/:id', getPerfumeById);

router.post('/upload', (req, res) => {
    req.app.locals.upload.single('imagen')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      uploadImage(req, res);
    });
  });
  
  module.exports = router;
