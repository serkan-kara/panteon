exports.generateMoney = () => {
    // generates integer between 100.000 - 10.000
    return Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
}