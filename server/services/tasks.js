const fs = require('fs');
const Player = require('../models/Player');
const { streamToJSON, bubbleSort } = require('../services/util');
const client = require('../config/redis');

const resetRedisDatabase = async () => {
    // set new week stats
    await client.hSet('season', 'prizePool', '0');
    await client.hSet('season', 'day', '0');

    // get all users that will be on the rankings
    // set money 0 to all of them ( no money logic on mongodb to make it simpler )
    // give them default index ( rank )
    let players = await Player.find().lean();
    players = players.map((player, index) => ({
        ...player,
        money: 0,
        index: index + 1
    }))


    // set players to redis
    await client.set('players', JSON.stringify(players))
}

exports.startFreshWeek = async () => {
    try {

        await client.connect();
        await resetRedisDatabase();
        await client.quit();

        return {
            success: true,
            message: 'Week started'
        }

    } catch (err) {
        return {
            success: false,
            error: err
        }
    }
}

exports.moveToNextDay = async () => {
    try {
        await client.connect();
        // get previous day
        const day = parseInt(await client.hGet('season', 'day'));
        // current day
        let currentDay = day + 1;

        // if currentDay > 7 week is ended
        // we have to endWeek and give money to players
        // but I decided not to auto end week so we won't operate on MONGODB that much 
        // for demo purpose
        // now it only resets the weekly data on REDIS and starts fresh over
        if (currentDay > 7) {
            //await this.endWeek();
            await resetRedisDatabase();
            currentDay = 1;
        }

        // get previous prize pool
        let prizePool = parseInt(await client.hGet('season', 'prizePool'));

        // get previous player values
        let players = await client.get('players');

        // get fresh data from stream for a current day
        const streamSrc = fs.createReadStream(`./data/${currentDay}.json`);
        let currentPlayers = await streamToJSON(streamSrc);

        // assign current values to players
        players = JSON.parse(players).map(player => {

            // find current player with _id
            const currentPlayer = currentPlayers.find(currentPlayer => currentPlayer._id === player._id);
            if (currentPlayer) {
                // add new money to players current money
                player.money += currentPlayer.money;

                // give %2 of players new earned money to prizePool
                prizePool += (currentPlayer.money * 2 / 100);
            }
            return player;
        });

        // sort all results by money
        bubbleSort(players, 'money');

        // compare ranks
        players = players.map((player, index) => {
            if ((index + 1) < player.index) {
                // rank increased
                player.diff = 1;
            } else if ((index + 1) > player.index) {
                // rank decreased
                player.diff = -1;
            } else {
                // rank same
                player.diff = 0;
            }
            player.index = index + 1;

            return player;
        });

        // set new data to redis
        // players
        await client.set('players', JSON.stringify(players));
        // current day
        await client.hSet('season', 'day', (currentDay).toString());
        // prize pool
        await client.hSet('season', 'prizePool', prizePool.toString());

        // close connection to redis client
        await client.quit();

        return {
            success: true,
            prize: prizePool,
            message: `Day ${currentDay} data recieved.`
        }
    } catch (err) {
        return {
            success: false,
            error: err
        }
    }
}

exports.endWeek = async () => {
    try {
        await client.connect();

        // get total prize pool at the end of the week
        const prizePool = parseFloat(await client.hGet('season', 'prizePool'));

        // get players for prize distrubition
        const players = JSON.parse(await client.get('players')).slice(0, 100);

        // %20 - %15 - %10 for first 3 rank and rest for other top 97 ranks
        const firstRankPrize = prizePool * 20 / 100;
        const secondRankPrize = prizePool * 15 / 100;
        const thirdRankPrize = prizePool * 10 / 100;
        const restRanksPrize = (prizePool - (firstRankPrize + secondRankPrize + thirdRankPrize)) / 97;

        for (i = 0; i < players.length; i++) {
            // get player document to update with money
            const player = await Player.findById(players[i]._id)

            // player list is already sorted before
            // we can directly get first 3 ranks
            if (player) {
                if (i === 0) {
                    // first rank
                    player.totalMoney = firstRankPrize;
                } else if (i === 1) {
                    // second rank
                    player.totalMoney = secondRankPrize;
                } else if (i === 2) {
                    // third rank
                    player.totalMoney = thirdRankPrize;
                } else {
                    // rest of the top 100 players
                    player.totalMoney = restRanksPrize;
                }

                await player.save();
            }
        }

        await client.quit();

        return {
            success: true,
            prize: prizePool,
            message: 'Week ended'
        }
    } catch (err) {
        return {
            success: false,
            error: err
        }
    }
}