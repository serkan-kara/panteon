exports.generateMoney = () => {
    return Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
}