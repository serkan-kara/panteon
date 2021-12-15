const express = require('express');
const { testPipe, testCreatePlayer, testCreateDummyData, testRecountryData } = require('../controllers/test');

const router = express.Router();

router.route('/pipe')
    .get(testPipe)
    .post(testCreatePlayer);

router.route('/country')
    .post(testRecountryData);

module.exports = router;