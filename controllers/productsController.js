const {
  getAllProducts,
  getOneProductById,
  deleteProductById,
  createNewProduct,
  updateProductById,
} = require('../schemas/productSchemas/productSchema');
const { getCurrency } = require('../helpers/currency/currency');
const joiProductSchema = require('../schemas/productSchemas/productJoiSchema');
const CustomError = require('../helpers/errors/customError');
const errorsEnum = require('../helpers/errors/errorsEnum');

async function allProducts(req, ress, next) {
  try {
    const {
      limit = 10,
      page = 1,
      filter = 'ascendingDate',
      currency = 'UAH',
    } = req.query;

    const monoCurrency = await getCurrency(currency);

    const result = await getAllProducts(page, limit, filter, monoCurrency);

    return ress.json(result);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const { currency = 'UAH' } = req.query;
    const monoCurrency = await getCurrency(currency);
    const result = await getOneProductById(req.params.id, monoCurrency);

    return res.json(result);
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  console.log(req);
  try {
    const result = await deleteProductById(req.params.id);

    return res.json(result);
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const { error } = joiProductSchema.validate(req.body);

    if (error) {
      throw new CustomError(errorsEnum.VALIDATION_ERROR);
    }

    const result = await createNewProduct(req.body);

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const { error } = joiProductSchema.validate(req.body);

    if (error) {
      throw new CustomError(errorsEnum.VALIDATION_ERROR);
    }

    const result = await updateProductById(req.params.id, req.body);

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  allProducts,
  getById,
  deleteProduct,
  createProduct,
  updateProduct,
};
