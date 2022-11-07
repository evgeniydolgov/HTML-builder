const fs = require('fs');
const path = require('path');

const cleaningDirectory = async () => {
    return new Promise((resolve, reject) => {
            fs.rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true }, ()=>{
                fs.mkdir(path.join(__dirname, 'project-dist'), () => {    
                    createdIndexHtml()                
                })                
            })
    })
}

const createdIndexHtml = async () => { // тести без нее
    return new Promise((resolve, reject) => {
        fs.copyFile(path.join(__dirname, "template.html"), path.join(__dirname, 'project-dist', "index.html"),()=>{
            writeIndexHtml();
        })
    })
}

const writeIndexHtml = async () => {
    return new Promise((resolve, reject) => {
        fs.readdir (path.join(__dirname, './components'), (err, data) => {
            function htmlConstructor() {
                if(data.length > 0){
                    fs.readFile(path.join(__dirname, "components", data[data.length-1]), "utf-8", (err, articl) => {

                    const tagName = data[data.length-1].slice(0,-5);
                    fs.readFile(path.join(__dirname, "./project-dist/index.html"),'utf-8', (err, file) => {
                        if(err){console.log(err)}
                        file = file.replace(`{{${tagName}}}`, articl);

                        fs.writeFile(path.join(__dirname, "./project-dist/index.html"), file, () => {
                            data.length-- 
                            htmlConstructor();
                        });
                    })

                })
                }
                createdImageDirectory()
            }
            htmlConstructor();
        })
    })}


const createdStyles = () => {
    return new Promise((resolve, reject) => {
        fs.readdir(path.join(__dirname, './styles'),(err,data) => {
            data.forEach((elem) => {
                if(path.extname(elem) === '.css'){
                    fs.readFile(path.join(__dirname, './styles',elem), (err,data) => {
                        fs.appendFile(path.join(__dirname, './project-dist/style.css'), data, () => {} )
                    })
                }
            })
        })
        
    })
}

const createdImageDirectory = () => {
    return new Promise((resolve, reject) => {
        fs.mkdir((__dirname, './06-build-page/project-dist/assets'), () => {
            copyImage();
        })
    })
}

const copyImage = () => {
    return new Promise((resolve, reject) => {
        fs.readdir(path.join(__dirname, "assets"),{withFileTypes: true}, (err, data) => {
            data.forEach((el) => {
                if(el.isDirectory()){
                    fs.mkdir(path.join(__dirname, "project-dist/assets", el.name), () => {
                    fs.readdir(path.join(__dirname, "assets", el.name), (err, file) => {
                        file.forEach((elem) => {
                            fs.copyFile(path.join(__dirname,'assets', el.name, elem), path.join(__dirname, 'project-dist/assets', el.name, elem),() => {})
                        })
                    })
                })
                } else {
                    fs.copyFile(path.join(__dirname,'assets', el.name), path.join(__dirname, 'project-dist/assets', el.name),() => {})
                }
            })
        })
    })
}

cleaningDirectory()
    .then(createdStyles())