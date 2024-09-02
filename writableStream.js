const { Writable } = require('node:stream');
const fs = require('node:fs');

const file = fs.createWriteStream('./captureStdIn.txt');

const writableStream = new Writable({
    write(chunk, encoding, callback) {
        file.write(chunk.toString());
        file.end();
        this.end();
        callback();
    }
})

writableStream.on('pipe', () => {
    console.log('piping to the writable stream')
})

writableStream.on('finish', () => {
    console.log('input captured successfully')
})

process.stdin.pipe(writableStream);