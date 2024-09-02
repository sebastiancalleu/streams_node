import http from 'http';
import { Readable } from 'stream';
import { randomUUID } from 'node:crypto';

function * run() {
    for(let index=0; index<=99; index++) {
        const data = {
            id: randomUUID(),
            name: `sebastian-${index}`,
            at: Date.now()
        }
        yield data;
    }
}

function handler(request, response) {
    // const readableStream = new Readable({
    //     read() {
    //         this.push('hello');
    //         this.push('world');
    //         this.push(null);
    //     }
    // });

    const readableStream = new Readable({
        read() {
            for(const data of run()) {
                this.push(JSON.stringify(data).concat("\n"))
            }
            // string has finished
            this.push(null);
        }
    });

    readableStream.pipe(response);
}




http.createServer(handler)
.listen(3000)
.on('listening', () => console.log('server listening on 3000'))