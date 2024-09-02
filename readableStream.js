const { Readable } = require('node:stream');

const inStream = new Readable({
    read() {}
})

inStream.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data: ${chunk}`);
});

inStream.push('Hola mundo');
inStream.push('Hello World');
