const { Duplex } = require('node:stream');


const duplexStream = new Duplex({
    write(chunk, encoding, callback) {
        console.log('something is being write');
        console.log(chunk.toString()); 
        callback
    },
    read() {
        console.log('something is being read');
    }
})

duplexStream.pipe(duplexStream);
duplexStream.on('data', function() {
    this.destroy();
})

process.stdin.on('data', (chunk) => {
    duplexStream.push(chunk)
    process.stdin.destroy();
})