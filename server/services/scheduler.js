const cron = require('node-cron');
const { moveToNextDay } = require('./tasks');

const schedule = async () => {
    // * * * * * => this will run every minute
    // * (min) * (hour) * (day of month) * (month) * (day of week)
    // 59 23 * * * => this will run every day at 23:59
    cron.schedule('* * * * *', async () => {
        await moveToNextDay();
    });
}

module.exports = schedule;
