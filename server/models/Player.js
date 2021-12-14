const mongoose = require('mongoose');

//player model for MONGODB
const PlayerSchema = mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    userName: String,
    country: String,
    totalMoney: Number,
    seasonMoney: Number
}, {
    _id: false,
    timestamps: true
});

module.exports = mongoose.model('Player', PlayerSchema);