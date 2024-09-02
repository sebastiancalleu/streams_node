const { Transform } = require('node:stream');
const fs = require('node:fs');

const file = fs.createWriteStream('./transformStdIn.txt');

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        file.write(chunk.toString().replaceAll(' ', '').toUpperCase());
        callback();
    }
})

transformStream.pipe(transformStream);

process.stdin.on('data', function(chunk) {
    if (chunk.toString() == 'exit\n') {
        this.destroy();
    } else {
        transformStream.push(chunk)
    }
})