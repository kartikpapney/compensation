const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');

module.exports = {
  connect: async function () {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    try {
      await mongoose.connect(MONGO_URI, options);
      console.log('connected to mongodb');
    } catch (error) {
      throw error;
    }
  },
};
