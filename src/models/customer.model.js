const { Schema, model } = require('mongoose');

const customerSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },

});

const CustomerModel = model('Customer', customerSchema);

module.exports = { CustomerModel };
