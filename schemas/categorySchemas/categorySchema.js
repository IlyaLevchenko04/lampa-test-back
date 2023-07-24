const mongoose = require('mongoose');
const { Product } = require('../productSchemas/productSchema');
const errorsEnum = require('../../helpers/errors/errorsEnum');
const CustomError = require('../../helpers/errors/customError');
const {
  getOrdering,
  products: productsOrdering,
} = require('../../constants/sort');

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    title: {
      type: String,
    },

    createDate: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const Category = mongoose.model('Category', categorySchema);

async function getAllCategories() {
  const data = await Category.find();

  return data;
}

async function getCategoryById(id) {
  const data = await Category.findById(id);

  if (!data) {
    throw new CustomError(errorsEnum.CATEGORY_NOT_FOUND, id);
  }

  return data;
}

async function createNewCategory({ title }) {
  const data = await Category.create({ title });

  return data;
}

async function deleteCategoryById(id) {
  const data = await Category.findByIdAndDelete(id);

  if (!data) {
    throw new CustomError(errorsEnum.CATEGORY_NOT_FOUND, id);
  }

  return data;
}

async function updateCategoryById(id, body) {
  const data = await Category.findByIdAndUpdate(id, { ...body }, { new: true });

  if (!data) {
    throw new CustomError(errorsEnum.CATEGORY_NOT_FOUND, id);
  }

  return data;
}

async function showAllProductsInCategory(
  categoryId,
  page = 1,
  limit = 10,
  filter,
  currency = 'UAH'
) {
  const skip = Number(page);

  const products = await Product.find({ categoryId })
    .skip((skip - 1) * Number(limit))
    .limit(Number(limit))
    .sort(getOrdering(productsOrdering, filter));
  const category = await Category.findById(categoryId);

  if (!category) {
    throw new CustomError(errorsEnum.CATEGORY_NOT_FOUND, id);
  }

  return products.map(data => {
    data.price = (Number(data.price) / Number(currency.sell)).toFixed(2);
    data.currency = currency.currency;
    return data;
  });
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createNewCategory,
  deleteCategoryById,
  updateCategoryById,
  showAllProductsInCategory,
};
