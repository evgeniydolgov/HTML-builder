const fs = require('fs');
const path = require ('path');

fs.readdir(path.join(__dirname, './styles'),(err,data) => {
    fs.unlink(path.join(__dirname, './project-dist/bundle.css'), (err) => {
    })
    data.forEach((elem) => {
        if(path.extname(elem) === '.css'){
            fs.readFile(path.join(__dirname, './styles',elem), (err,data) => {
                fs.appendFile(path.join(__dirname, './project-dist/bundle.css'), data, () => {} )
            })
        };
    })
})

