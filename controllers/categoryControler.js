const {
  getAllCategories,
  getCategoryById,
  createNewCategory,
  deleteCategoryById,
  updateCategoryById,
  showAllProductsInCategory,
} = require('../schemas/categorySchemas/categorySchema');
const { getCurrency } = require('../helpers/currency/currency');
const joiCategorySchema = require('../schemas/categorySchemas/categoryJoiSchema');
const CustomError = require('../helpers/errors/customError');
const errorsEnum = require('../helpers/errors/errorsEnum');

async function allCategories(req, res, next) {
  try {
    const result = await getAllCategories();

    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function categoryById(req, res, next) {
  try {
    const result = await getCategoryById(req.params.id, req.body);

    return res.json(result);
  } catch (error) {
    next(error);
  }
}

async function createCategory(req, res, next) {
  try {
    const { error } = joiCategorySchema.validate(req.body);

    if (error) {
      throw new CustomError(errorsEnum.VALIDATION_ERROR);
    }

    const result = await createNewCategory(req.body);

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const result = await deleteCategoryById(req.params.id);

    return res.json(result);
  } catch (error) {
    next(error);
  }
}

async function updateCategory(req, res, next) {
  try {
    const result = await updateCategoryById(req.params.id, req.body);

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function getAllProductsInCategory(req, res, next) {
  try {
    const { limit, page, filter, currency = 'UAH' } = req.query;

    const monoCurrency = await getCurrency(currency);

    const result = await showAllProductsInCategory(
      req.params.id,
      page,
      limit,
      filter,
      monoCurrency
    );

    return res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  allCategories,
  categoryById,
  createCategory,
  deleteCategory,
  updateCategory,
  getAllProductsInCategory,
};
