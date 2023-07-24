module.exports = {
  getOrdering: (sortConfig, filter) => {
    const result = sortConfig[filter] || sortConfig.DEFAULT;
    return result;
  },
  products: require('./products'),
};
