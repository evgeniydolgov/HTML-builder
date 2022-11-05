const {stdin, stdout} = require ('process');
const fs = require ('fs');
const path = require ('path');
const output = fs.createWriteStream(path.join( __dirname, "text.txt" ));

stdout.write('Что запишем?\n');
stdin.on("data", chunk => {
    if (chunk.toString().trim() === 'exit') {
        process.on('exit', () => stdout.write('Пока и удачи в изучении Node.js!\n'));
        process.exit();
    }else{
        output.write(chunk);
    }
});
process.on('SIGINT', () => {
    stdout.write('Пока и удачи в изучении Node.js!\n');
    process.exit();
});



