const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true }, // Store the image URL after multer upload

});

const ProductModel = model('Product', productSchema);

module.exports = { ProductModel };
