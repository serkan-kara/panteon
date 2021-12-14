const express = require('express');
const { testPipe, testCreatePlayer, testCreateDummyData } = require('../controllers/test');

const router = express.Router();

router.route('/pipe')
    .get(testPipe)
    .post(testCreatePlayer);

module.exports = router;