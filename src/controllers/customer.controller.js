const { createCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer } = require('../services/customer.service');

const createCustomerHandler = async (req, res, next) => {
  try {
    const customer = await createCustomer(req.body);
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
};

const getCustomersHandler = async (req, res, next) => {
  try {
    const customers = await getCustomers();
    res.json(customers);
  } catch (error) {
    next(error);
  }
};

const getCustomerByIdHandler = async (req, res, next) => {
  try {
    const customer = await getCustomerById(req.params.id);
    res.json(customer);
  } catch (error) {
    next(error);
  }
};

const updateCustomerHandler = async (req, res, next) => {
  try {
    const customer = await updateCustomer(req.params.id, req.body);
    res.json(customer);
  } catch (error) {
    next(error);
  }
};


const deleteCustomerHandler = async (req, res, next) => {
  try {
    await deleteCustomer(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = { createCustomerHandler, getCustomersHandler, getCustomerByIdHandler, updateCustomerHandler, deleteCustomerHandler };
