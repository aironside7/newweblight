const { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } = require('../services/order.service');

const createOrderHandler = async (req, res, next) => {
  try {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

const getOrdersHandler = async (req, res, next) => {
  try {
    const orders = await getOrders();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};


const getOrderByIdHandler = async (req, res, next) => {
  try {
    const order = await getOrderById(req.params.id);
    res.json(order);
  } catch (error) {
    next(error);
  }
};


const updateOrderHandler = async (req, res, next) => {
  try {
    const order = await updateOrder(req.params.id, req.body);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

const deleteOrderHandler = async (req, res, next) => {
  try {
    await deleteOrder(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrderHandler, getOrdersHandler, getOrderByIdHandler, updateOrderHandler, deleteOrderHandler };
