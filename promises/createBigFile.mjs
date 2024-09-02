import fs from 'node:fs';


const file = fs.createWriteStream('bigfile.txt')
for (let i= 0; i <= 100000; i++) {
    file.write('hola mundo\n');
}
file.end();