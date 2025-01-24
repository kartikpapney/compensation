const cron = require('node-cron');
const { SCRAP_TIMING, ENV } = require('./config');
const { scrap: leetcodeScrapper } = require('./scrapper/leetcode');
const { leetcodeParser: leetcodeParser } = require('./parser');

module.exports = {
  schedule: async function () {
    try {
      if (ENV === 'local') {
        // leetcodeScrapper().then(() => leetcodeParser().then(() => console.log("---- parsed ----")))
      } else {
        cron.schedule(SCRAP_TIMING, async () => {
          await leetcodeScrapper().then(() => leetcodeParser().then(() => console.log("---- parsed ----")))
        });
        console.log('cron scheduled');
      }
    } catch (e) {
      throw e;
    }
  },
};
