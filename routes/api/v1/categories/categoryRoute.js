const express = require('express');
const router = express.Router();
const {
  allCategories,
  categoryById,
  createCategory,
  deleteCategory,
  updateCategory,
  getAllProductsInCategory,
} = require('../../../../controllers/categoryControler');
const { auth } = require('../../../../middlewares/authMiddlware');
const { isValidObjId } = require('../../../../middlewares/isValidObjId');

/**
 * @openapi
 * /category:
 *   get:
 *     tags:
 *       - Categories
 *     summary: get all categories.
 *     description: Method for getting all categories.
 *     responses:
 *       200:
 *         description: Returns all categories.
 *
 */

router.get('/', allCategories);

/**
 * @openapi
 * /category/:id:
 *   get:
 *     tags:
 *       - Categories
 *     summary: get one category by id.
 *     description: Method for getting one category by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true

 *
 *     responses:
 *       200:
 *         description: Returns one category.
 *
 *       404:
 *         description: not found.
 *
 */

router.get('/:id', isValidObjId, categoryById);

/**
 * @openapi
 * /category:
 *   post:
 *     tags:
 *       - Categories
 *     summary: create category.
 *     description: Method for creating category.
 *     responses:
 *       201:
 *         description: Returns created category.
 *
 */

router.post('/', auth, createCategory);

/**
 * @openapi
 * /category/:id:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: delete one category by id.
 *     description: Method for deleting one category by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true

 *
 *     responses:
 *       200:
 *         description: Returns deleted category.
 *
 *       404:
 *         description: not found.
 *
 */

router.delete('/:id', auth, isValidObjId, deleteCategory);

/**
 * @openapi
 * /category/:id:
 *   put:
 *     tags:
 *       - Category
 *     summary: update one category by id.
 *     description: Method for updating one category by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *
 *     responses:
 *       200:
 *         description: Returns updated category.
 *
 *       404:
 *         description: not found.
 *
 */

router.put('/:id', auth, isValidObjId, updateCategory);

/**
 * @openapi
 * /category/:id/product:
 *   get:
 *     tags:
 *       - Categories
 *     summary: get all products  in category by id of category.
 *     description: Method for getting all products in category by id of category.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true

 *
 *     responses:
 *       200:
 *         description: Returns all products in category.
 *
 *       404:
 *         description: not found.
 *
 */

router.get('/:id/product', isValidObjId, getAllProductsInCategory);

module.exports = router;
