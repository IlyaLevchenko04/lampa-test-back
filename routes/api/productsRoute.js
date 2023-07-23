const express = require('express');
const router = express.Router();
const {
  allProducts,
  getById,
  deleteProduct,
  createProduct,
  updateProduct,
} = require('../../controllers/productsController');
const { auth } = require('../../middlewares/authMiddlware');
const { isValidObjId } = require('../../middlewares/isValidObjId');

/**
 * @openapi
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     summary: get all products.
 *     description: Method for getting all products.
 *     responses:
 *       201:
 *         description: Returns all products.
 *
 *       415:
 *         description: Returns 415 Validation error.
 *
 */

router.get('/', allProducts);

/**
 * @openapi
 * /products/:id:
 *   get:
 *     tags:
 *       - Products
 *     summary: get one product by id.
 *     description: Method for getting one product by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true

 *
 *     responses:
 *       200:
 *         description: Returns one product.
 *
 *       404:
 *         description: not found.
 *
 */

router.get('/:id', isValidObjId, getById);

/**
 * @openapi
 * /products/:id:
 *   delete:
 *     tags:
 *       - Products
 *     summary: delete one product by id.
 *     description: Method for deleting one product by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true

 *
 *     responses:
 *       200:
 *         description: Returns deleted product.
 *
 *       404:
 *         description: not found.
 *
 */

router.delete('/:id', auth, isValidObjId, deleteProduct);

/**
 * @openapi
 * /products:
 *   post:
 *     tags:
 *       - Products
 *     summary: create product.
 *     description: Method for creating product.
 *
 *     responses:
 *       201:
 *         description: Returns created product.
 */

router.post('/', auth, createProduct);

/**
 * @openapi
 * /products/:id:
 *   put:
 *     tags:
 *       - Products
 *     summary: update product by id.
 *     description: Method for updating product by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *
 *     responses:
 *       201:
 *         description: Returns updated product.
 */

router.put('/:id', auth, isValidObjId, updateProduct);

module.exports = router;
