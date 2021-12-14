const redis = require('redis');

// set redis credentials
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);

exports.getLeaderboard = async (req, res, next) => {
    try {
        await client.connect();

        const myUser = req.params.id;

        const allPlayers = JSON.parse(await client.get('players'));
        let prizePool = parseInt(await client.hGet('season', 'prizePool'));

        // get my user
        const filtered = allPlayers.filter(function (player) {
            return player._id == myUser;
        })[0];

        const me = allPlayers.filter(function (player) {
            return player.index > parseInt(filtered.index) - 4;
        }).slice(0, 6);

        // get top 100 players from sorted list
        const players = allPlayers.slice(0, 100);

        await client.quit();

        res.json({
            success: true,
            top: players,
            me: me,
            prize: {
                no1: prizePool * 20 / 100,
                no2: prizePool * 15 / 100,
                no3: prizePool * 10 / 100
            }
        });
    } catch (err) {
        res.json({
            success: false,
            error: err
        })
    }

}