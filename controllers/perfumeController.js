const Perfume = require('../models/Perfume');
const path = require('path');


// Obtener todos los perfumes
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

// Crear un nuevo perfume
exports.createPerfume = async (req, res) => {
  const { nombre, precio, descripcion, imagen } = req.body;
  try {
    const newPerfume = await Perfume.create({ nombre, precio, descripcion, imagen });
    res.status(201).json(newPerfume);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// Actualizar un perfume existente
exports.updatePerfume = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, descripcion, imagen } = req.body;
  try {
    const updatedPerfume = await Perfume.update(id, { nombre, precio, descripcion, imagen });
    res.json(updatedPerfume);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

// Eliminar un perfume
exports.deletePerfume = async (req, res) => {
  const { id } = req.params;
  try {
    await Perfume.delete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

// Subir imagen
exports.uploadImage = (req, res) => {
  try {
    const imagePath = `/uploads/${req.file.filename}`; // Ruta de la imagen subida
    res.status(201).json({ message: 'Imagen subida con éxito', imagePath });
  } catch (error) {
    res.status(500).json({ error: 'Error al subir la imagen' });
  }
};

