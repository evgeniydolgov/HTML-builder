const fs = require('fs');
const path = require('path');




// читаем файл
// fs.readFile(path.join(__dirname, "./template.html"), (e, file) => {
//     if (e) throw new Error(e);
//     file = file.toString(); // конвектируем в строку
//     file = file.replace('{{header}}', fileText('articles.html'));

//     fs.writeFile(path.join(__dirname, "./template.html"), file, () => {}); // записываем обратно
// })




//    fs.readFile(path.join(__dirname, 'components', 'articles.html'), 'utf-8', (err, data ) => {
//         let answer = data.toString();
//         console.log(answer);
//         return answer;
//     })
   

    // fs.readdir(path.join(__dirname, './files-copy'), (err, data) => {
    //     data.forEach((el) => {
    //         const a = path.join(__dirname, './files-copy', el.toString())
    //         fs.unlink(a, (err) => {
    //         });
    //     })
    //     copyFiles();
    // })


const createdDirectory = async () => {
    return new Promise((resolve, reject) => {
        fs.mkdir((__dirname, './06-build-page/project-dist'), () => {
            resolve();
        })
    })
}

const cleaningDirectory = async () => {
    return new Promise((resolve, reject) => {
        fs.readdir (path.join(__dirname, './project-dist'), (err, data) => {
           if(data.length > 0){
            data.forEach((el) => {
                fs.unlink(path.join(__dirname, './project-dist', el.toString()), (err) => {
                    resolve();
                });
            })}
            fs.copyFile(path.join(__dirname, "template.html"), path.join(__dirname, "./project-dist/index.html"),()=>{})
        })
    })
}

const createdIndexHtml = async () => { // тести без нее
    return new Promise((resolve, reject) => {
        fs.copyFile(path.join(__dirname, "template.html"), path.join(__dirname, "./project-dist/index.html"),()=>{})
        resolve ();
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











function copyFiles() {
    fs.copyFile(path.join(__dirname,'./files', elem), path.join(__dirname, './files-copy', elem),() => {})
}


createdDirectory()
    .then(cleaningDirectory())
    .then(writeIndexHtml())
    .then(createdStyles())


    
   


    

// пример записи промисов    

// const writeFileAsync = async (path,data) => {
//     return new Promise((resolve, reject) => fs.writeFile(
//         path,
//         data,
//         (err, data ) => {
//             if (err) {
//                 return reject(err.message)
//             }
//             resolve()
//     }))
// }
// writeFileAsync(path.join(__dirname, 'components', 'aaa.html'),'data')
//     .then(() => writeFileAsync(path.join(__dirname, 'components', 'aaa.html'), 'тексвыва'))
