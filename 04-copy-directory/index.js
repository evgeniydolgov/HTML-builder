const fs = require('fs');
const path = require('path');

(function copyDir(){
        fs.mkdir(path.join(__dirname, './files-copy'), () => {
        });
   
        fs.readdir(path.join(__dirname, './files-copy'), (err, data) => {
            data.forEach((el) => {
                const a = path.join(__dirname, './files-copy', el.toString())
                fs.unlink(a, (err) => {
                });
            })
            copyFiles();
        })
} ())

function copyFiles() {
    fs.readdir(path.join(__dirname, './files'), (err,data) => {
        data.forEach((elem) => {
            fs.copyFile(path.join(__dirname,'./files', elem), path.join(__dirname, './files-copy', elem),() => {
            })
        })
    })
}


