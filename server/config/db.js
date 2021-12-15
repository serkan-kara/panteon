const mongoose = require('mongoose');
const client = require('./redis');
const Player = require('../models/Player');
const schedule = require('../services/scheduler');

const connectToDatabase = async () => {
    try {
        // create database connection
        const cnn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(` Connected to MONGODB on: ${cnn.connection.host} `.cyan.inverse);
        await initializeRedisDatabase();
    } catch (err) {
        console.log(`Database connection error`.red.inverse, err);
    }
}

const initializeRedisDatabase = async () => {
    console.log(' REDIS database initializating... '.yellow.inverse);
    await client.connect();

    // check if season or players key exists in REDIS database
    // it should be true if it initialized before
    const seasonKey = await client.exists('season');
    const playersKey = await client.exists('players');

    if (!seasonKey || !playersKey) {
        // season or players key missing
        // redis initialization required
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
        console.log('REDIS database initialized'.yellow.inverse);
    }

    console.log(` REDIS database working on ${process.env.REDIS_URL} `.yellow.inverse);
    await client.quit();

    // start schedule after MONGO and REDIS initialized
    await schedule();
}

module.exports = connectToDatabase;