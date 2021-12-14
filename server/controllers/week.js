const { startFreshWeek, moveToNextDay, endWeek } = require('../services/tasks');

const client = require('../config/redis');

exports.startFreshWeekController = async (req, res, next) => {
    const week = await startFreshWeek();
    res.json(week);
}

exports.moveToNextDayController = async (req, res, next) => {
    const nextDay = await moveToNextDay();
    res.json(nextDay);
}

exports.endWeekController = async (req, res, next) => {
    const endWeekData = await endWeek();
    res.json(endWeekData);
}