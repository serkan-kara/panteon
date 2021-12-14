const express = require('express');

const {
    startFreshWeekController,
    moveToNextDayController,
    endWeekController } = require('../controllers/week');

const router = express.Router();

router.route('/startWeek')
    .post(startFreshWeekController);

router.route('/nextDay')
    .post(moveToNextDayController);

router.route('/endWeek')
    .get(endWeekController);

module.exports = router;