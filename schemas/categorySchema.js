const mongoose = require('mongoose');
const { Product } = require('./productSchema');

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

  return data;
}

async function createNewCategory({ title }) {
  const data = await Category.create({ title });

  return data;
}

async function deleteCategoryById(id) {
  const data = await Category.findByIdAndDelete(id);

  return data;
}

async function updateCategoryById(id, body) {
  const data = await Category.findByIdAndUpdate(id, { ...body }, { new: true });

  return data;
}

async function showAllProductsInCategory(
  categoryId,
  page = 1,
  limit = 10,
  filter = 'descendingDate',
  currency = 'UAH'
) {
  const skip = Number(page);

  const products = await Product.find({ categoryId })
    .skip((skip - 1) * Number(limit))
    .limit(Number(limit));
  const category = await Category.findById(categoryId);

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
    const sortedProducts = products.sort((a, b) => a.createDate - b.createDate);
    const trueData = {
      categoryInfo: category,
      products: sortedProducts,
    };

    return trueData;
  }

  if (filter === 'descendingDate') {
    const sortedProducts = products.sort((a, b) => b.createDate - a.createDate);
    const trueData = {
      categoryInfo: category,
      products: sortedProducts,
    };

    return trueData;
  }

  return trueData;
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createNewCategory,
  deleteCategoryById,
  updateCategoryById,
  showAllProductsInCategory,
};
