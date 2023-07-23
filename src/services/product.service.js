const { ProductModel } = require('../models/product.model');

const createProduct = async (productData) => {
  const product = new ProductModel(productData);
  await product.save();
  return product;
};

const getProducts = async () => {
  const products = await ProductModel.find();
  return products;
};

const getProductById = async (productId) => {
  const product = await ProductModel.findById(productId);
  return product;
};

const updateProduct = async (productId, updateData) => {
  const product = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
  return product;
};

const deleteProduct = async (productId) => {
  await ProductModel.findByIdAndDelete(productId);
};

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
