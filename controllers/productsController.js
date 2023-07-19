const {
  getAllProducts,
  getOneProductById,
  deleteProductById,
  createNewProduct,
  updateProductById,
} = require('../schemas/productSchema');
const { getCurrency } = require('../helpers/currency');
const joiProductSchema = require('../schemas/productJoiSchema');

async function allProducts(req, ress, next) {
  try {
    const { limit, page, filter, currency = 'UAH' } = req.query;

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
      const err = new Error('missing fields');
      err.status = 400;
      throw err;
    }

    const result = await createNewProduct(req.body);

    return res.json(result);
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const { error } = joiProductSchema.validate(req.body);

    if (error) {
      const err = new Error('missing fields');
      err.status = 400;
      throw err;
    }

    const result = await updateProductById(req.params.id, req.body);

    return res.json(result);
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
