const express = require('express');

const { getLeaderboard } = require('../controllers/board');

const router = express.Router();

router.route('/:id')
    .get(getLeaderboard);

module.exports = router;