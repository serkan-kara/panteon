exports.streamToJSON = (stream) => {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))));
    })
}

exports.bubbleSort = (data, filter) => {
    let swapped;
    do {
        swapped = false;
        for (var i = 0; i < data.length - 1; i++) {
            if (data[i][filter] < data[i + 1][filter]) {
                let temp = data[i];
                data[i] = data[i + 1];
                data[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped)
}