// // terminal inputs

// const stdin = process.stdin

// const stdout = process.stdout.on('data', (msg) => process.stdout.write(msg.toString().toUpperCase()));

// stdin.pipe(stdout);


// // big file
// import crypto from 'node:crypto';
// process.stdout.write(crypto.randomBytes(1e9));

// serve
import http from 'http';
import { readFileSync, createReadStream } from 'node:fs';

http.createServer((request, response) => {
    // const file = readFileSync('big.file').toString()
    // response.write(file);
    // response.end();

    createReadStream('big.file').pipe(response);
}).listen(3000)
.on('listening', () => console.log('server is listening on 3000'))