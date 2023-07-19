const express = require('express');
const router = express.Router();
const {
  allProducts,
  getById,
  deleteProduct,
  createProduct,
  updateProduct,
} = require('../controllers/productsController');
const { auth } = require('../middlewares/authMiddlware');

router.get('/', allProducts);

router.get('/:id', getById);

router.delete('/:id', auth, deleteProduct);

router.post('/', auth, createProduct);

router.put('/:id', auth, updateProduct);

module.exports = router;
