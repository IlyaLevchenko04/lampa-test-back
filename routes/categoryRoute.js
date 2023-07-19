const express = require('express');
const router = express.Router();
const {
  allCategories,
  categoryById,
  createCategory,
  deleteCategory,
  updateCategory,
  getAllProductsInCategory,
} = require('../controllers/categoryControler');
const { auth } = require('../middlewares/authMiddlware');

router.get('/', allCategories);

router.get('/:id', categoryById);

router.post('/', auth, createCategory);

router.delete('/:id', auth, deleteCategory);

router.put('/:id', auth, updateCategory);

router.get('/:id/product', getAllProductsInCategory);

module.exports = router;
