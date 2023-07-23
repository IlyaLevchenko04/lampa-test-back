const mongoose = require('mongoose');
const { Product } = require('../productSchemas/productSchema');
const { errorHandler } = require('../../helpers/errors/errorHandler');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title: {
    type: String,
  },

  createDate: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model('Category', categorySchema);

async function getAllCategories() {
  const data = await Category.find();

  return data;
}

async function getCategoryById(id) {
  const data = await Category.findById(id);

  if (!data) {
    throw errorHandler(`Category with id(${id}) is not found`, 404);
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
    throw errorHandler(`Category with id(${id}) is not found`, 404);
  }

  return data;
}

async function updateCategoryById(id, body) {
  const data = await Category.findByIdAndUpdate(id, { ...body }, { new: true });

  if (!data) {
    throw errorHandler(`Category with id(${id}) is not found`, 404);
  }

  return data;
}

async function showAllProductsInCategory(
  categoryId,
  page = 1,
  limit = 10,
  filter = 'descendingDate',
  currency = 'UAH'
) {
  try {
    const skip = Number(page);

    const products = await Product.find({ categoryId })
      .skip((skip - 1) * Number(limit))
      .limit(Number(limit));
    const category = await Category.findById(categoryId);

    if (!category) {
      throw new Error();
    }

    const trueData = products.map(data => {
      data.price = (Number(data.price) / Number(currency.sell)).toFixed(2);
      data.currency = currency.currency;
      return data;
    });

    if (filter === 'descendingPrice') {
      const sortedProducts = products.sort((a, b) => b.price - a.price);
      const trueData = {
        categoryInfo: category,
        products: sortedProducts,
      };

      return trueData;
    }

    if (filter === 'ascendingPrice') {
      const sortedProducts = products.sort((a, b) => a.price - b.price);
      const trueData = {
        categoryInfo: category,
        products: sortedProducts,
      };

      return trueData;
    }

    if (filter === 'ascendingDate') {
      const sortedProducts = products.sort(
        (a, b) => a.createDate - b.createDate
      );
      const trueData = {
        categoryInfo: category,
        products: sortedProducts,
      };

      return trueData;
    }

    if (filter === 'descendingDate') {
      const sortedProducts = products.sort(
        (a, b) => b.createDate - a.createDate
      );
      const trueData = {
        categoryInfo: category,
        products: sortedProducts,
      };

      return trueData;
    }

    return trueData;
  } catch (error) {
    return null;
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createNewCategory,
  deleteCategoryById,
  updateCategoryById,
  showAllProductsInCategory,
};
