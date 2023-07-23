const { OrderModel } = require('../models/order.model');

const createOrder = async (orderData) => {
  const order = new OrderModel(orderData);
  await order.save();
  return order;
};

const getOrders = async () => {
  const orders = await OrderModel.find();
  return orders;
};

const getOrderById = async (orderId) => {
  const order = await OrderModel.findById(orderId);
  return order;
};

const updateOrder = async (orderId, updateData) => {
  const order = await OrderModel.findByIdAndUpdate(orderId, updateData, { new: true });
  return order;
};

const deleteOrder = async (orderId) => {
  await OrderModel.findByIdAndDelete(orderId);
};

module.exports = { createOrder, getOrders, getOrderById, updateOrder, deleteOrder };
