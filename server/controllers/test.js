const fs = require('fs');
const redis = require('redis');
const { generateMoney } = require('../services/money');
const { bubbleSort } = require('../services/util');

const Player = require('../models/Player');

// set redis credentials
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);

exports.testPipe = async (req, res, next) => {
    const src = fs.createReadStream('./data/1.json');
    let result = await streamToJSON(src);
    bubbleSort(result, 'money');
    let prizePool = 0;
    result = result.map((data, index) => {
        prizePool += data.money * 2 / 100;
        return {
            ...data,
            index: index + 1
        }
    })
    res.json({ prizePool: prizePool, players: result });
}

exports.testCreatePlayer = async (req, res, next) => {
    // await client.connect();
    // const players = JSON.parse(await client.get('players'))

    // for (pl of players) {
    //     const player = await Player.create({
    //         "_id": pl._id,
    //         "userName": pl.userName,
    //         "totalMoney": 0
    //     });
    // }
    // res.json(players);
}

exports.testCreateDummyData = async (req, res, next) => {


    const src = fs.createReadStream('./data/1.json');
    let result = await streamToJSON(src);
    result = result.map(res => ({
        ...res,
        money: generateMoney()
    }));

    fs.writeFile('./data/7.json', JSON.stringify(result), 'utf8', () => {

    })

    res.json(result);
}

function streamToJSON(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))));
    })
}