const { connect: dbConnect } = require('./db');
const { schedule: cronSchedule } = require('./cronServer');

module.exports = {
  init: async function () {
    try {
      await dbConnect();
      await cronSchedule();
    } catch (e) {
      console.log(e);
    }
  },
};
