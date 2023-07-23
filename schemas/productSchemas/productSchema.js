const mongoose = require('mongoose');
const { errorHandler } = require('../../helpers/errors/errorHandler');
const Schema = mongoose.Schema;

const productSchema = new Schema({
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
});

const Product = mongoose.model('Product', productSchema);

async function getAllProducts(page, productLimit, filter, currency) {
  const skip = Number(page);
  const limit = Number(productLimit);
  const data = await Product.find()
    .skip((skip - 1) * limit)
    .limit(limit);

  const trueData = data.map(data => {
    data.price = (Number(data.price) / Number(currency.sell)).toFixed(2);
    data.currency = currency.currency;
    return data;
  });

  if (filter === 'ascendingPrice') {
    return trueData.sort((a, b) => b.price - a.price);
  }

  if (filter === 'descendingPrice') {
    return trueData.sort((a, b) => a.price - b.price);
  }

  if (filter === 'descendingDate') {
    return trueData.sort((a, b) => a.createDate - b.createDate);
  }

  if (filter === 'ascendingDate') {
    return trueData.sort((a, b) => b.createDate - a.createDate);
  }

  return trueData.sort((a, b) => b.createDate - a.createDate);
}

async function getOneProductById(id, currency) {
  const data = await Product.findById(`${id}`);

  if (!data) {
    throw errorHandler(`Product with id(${id}) is not found`, 404);
  }

  data.price = (Number(data.price) / Number(currency.sell)).toFixed(2);
  data.currency = currency.currency;

  return data;
}

async function deleteProductById(id) {
  const data = await Product.findByIdAndDelete(id);

  if (!data) {
    throw errorHandler(`Product with id(${id}) is not found`, 404);
  }

  return data;
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
    throw errorHandler(`Product with id(${id}) is not found`, 404);
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
