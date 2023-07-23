const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
  totalAmount: { type: Number, required: true },
  
});

const OrderModel = model('Order', orderSchema);

module.exports = { OrderModel };
