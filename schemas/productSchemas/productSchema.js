const mongoose = require('mongoose');
const errorsEnum = require('../../helpers/errors/errorsEnum');
const CustomError = require('../../helpers/errors/customError');
const {
  products: productsOrdering,
  getOrdering,
} = require('../../constants/sort/index');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    price: {
      type: Number,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    mainPhoto: {
      type: String,
    },
    photos: {
      type: Array.of(String),
    },
    currency: {
      type: String,
    },
    createDate: {
      type: Date,
      default: Date.now,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'category',
    },
  },
  { versionKey: false }
);

const Product = mongoose.model('Product', productSchema);

async function getAllProducts(page, productLimit, filter, currency) {
  const skip = Number(page);
  const limit = Number(productLimit);
  const data = await Product.find()
    .skip((skip - 1) * limit)
    .limit(limit)
    .sort(getOrdering(productsOrdering, filter));

  return data.map(data => {
    data.price = (Number(data.price) / Number(currency.sell)).toFixed(2);
    data.currency = currency.currency;
    return data;
  });
}

async function getOneProductById(id, currency) {
  const data = await Product.findById(`${id}`);

  if (!data) {
    throw new CustomError(errorsEnum.PRODUCT_NOT_FOUND, id);
  }

  data.price = (Number(data.price) / Number(currency.sell)).toFixed(2);
  data.currency = currency.currency;

  return data;
}

async function deleteProductById(id) {
  try {
    const data = await Product.findByIdAndDelete(id);
    console.log(data);

    if (!data) {
      throw new CustomError(errorsEnum.PRODUCT_NOT_FOUND, id);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function createNewProduct({
  price,
  title,
  description,
  mainPhoto,
  photos,
  currency,
  categoryId,
}) {
  const product = await Product.create({
    price,
    title,
    description,
    mainPhoto,
    photos,
    currency,
    categoryId,
  });

  return product;
}

async function updateProductById(id, data) {
  const product = await Product.findByIdAndUpdate(
    id,
    { ...data },
    { new: true }
  );

  if (!product) {
    throw new CustomError(errorsEnum.PRODUCT_NOT_FOUND, id);
  }

  return product;
}

module.exports = {
  getAllProducts,
  getOneProductById,
  deleteProductById,
  createNewProduct,
  updateProductById,
  Product,
};
