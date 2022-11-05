const fs = require('fs');
const path = require('path');

fs.readdir('03-files-in-folder/secret-folder', {withFileTypes: true}, (error, data) => {
    data.forEach((file)=>{
        if(!file.isDirectory()){
            fs.stat(path.join(__dirname,'secret-folder', file.name.toString()), (err,dat) => {
                console.log(file.name.slice(0, - path.extname(file.name).length) + "  ---  " + path.extname(file.name) + "  ---  " + dat.size + " B");
            })
        }
    })
})

