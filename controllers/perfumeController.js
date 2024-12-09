const Perfume = require('../models/Perfume');

exports.getAllPerfumes = async (req, res) => {
  try {
    const perfumes = await Perfume.getAll();
    res.json(perfumes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los perfumes' });
  }
};

// Obtener un perfume por su ID
exports.getPerfumeById = async (req, res) => {
  const { id } = req.params;
  try {
    const perfume = await Perfume.getById(id);
    if (!perfume) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(perfume);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el perfume' });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const imagePath = `/uploads/${req.file.filename}`;
    res.status(201).json({ message: 'Imagen subida con éxito', imagePath });
  } catch (error) {
    res.status(500).json({ error: 'Error al subir la imagen' });
  }
};
