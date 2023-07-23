const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../services/product.service');

const createProductHandler = async (req, res, next) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

const getProductsHandler = async (req, res, next) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProductByIdHandler = async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
};


const updateProductHandler = async (req, res, next) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const deleteProductHandler = async (req, res, next) => {
  try {
    await deleteProduct(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = { createProductHandler, getProductsHandler, getProductByIdHandler, updateProductHandler, deleteProductHandler };
