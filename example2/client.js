import {get} from 'node:http';
import { Transform, Writable } from 'node:stream';
import fs from 'fs';

const url = 'http://localhost:3000'

const getHttpStream = () => new Promise(resolve => get(url, response => resolve(response)))

const stream = await getHttpStream();

// stream.pipe(process.stdout)

stream.pipe(Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
        // console.log("chunk", JSON.parse(chunk))
        const item = JSON.parse(chunk)
        const myNumber = /\d+/.exec(item.name)[0]
        const isEven = myNumber % 2 === 0
        item.name = item.name.concat(isEven ? ' is even'  : ' is odd')
        callback(null, JSON.stringify(item))
    }
}))
.filter(chunk => chunk.includes('is even'))
.map(chuck => chuck += "\n")
.pipe(fs.createWriteStream('response.log', {flag: 'a'}))
// .pipe(
//     Writable({
//         objectMode: true,
//         write(chunk, encoding, callback) {
            
//             callback();
//         }
//     })
// )