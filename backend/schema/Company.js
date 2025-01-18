const mongoose = require('mongoose');
const { Schema } = mongoose;

const CompanySchema = new Schema({
  name: { type: String, required: true, index: true, unique: true },
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;
