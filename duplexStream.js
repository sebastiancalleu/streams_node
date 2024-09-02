const { Duplex } = require('node:stream');
const { pipeline } = require('node:stream/promises')


const duplexStream = new Duplex({
    write(chunk, encoding, callback) {
        callback();
    },
    read() {
        console.log('something is being read');
    }
})

duplexStream.on('pipe', () => {
    console.log('writable stream is open')
})

duplexStream.on('end', () => {
    console.log('readable stream is closed')
})

pipeline(
    process.stdin,
    duplexStream,
    process.stdout
)

process.stdin.on('data', (chunk) => {
    duplexStream.push(chunk);
    process.stdin.push(null);  // this need to be done when stdin is inside the pipe.
    process.stdin.destroy();
    duplexStream.push(null);
})