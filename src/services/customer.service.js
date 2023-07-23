const { CustomerModel } = require('../models/customer.model');

const createCustomer = async (customerData) => {
  const customer = new CustomerModel(customerData);
  await customer.save();
  return customer;
};

const getCustomers = async () => {
  const customers = await CustomerModel.find();
  return customers;
};

const getCustomerById = async (customerId) => {
  const customer = await CustomerModel.findById(customerId);
  return customer;
};

const updateCustomer = async (customerId, updateData) => {
  const customer = await CustomerModel.findByIdAndUpdate(customerId, updateData, { new: true });
  return customer;
};

const deleteCustomer = async (customerId) => {
  await CustomerModel.findByIdAndDelete(customerId);
};

module.exports = { createCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer };
