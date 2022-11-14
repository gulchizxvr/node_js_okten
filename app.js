const fs = require('node:fs')


// fs.mkdir('./students', (err) => {
//     if (err) {
//         console.log(err);
//     }
// })
// fs.mkdir('./students/boys', (err) => {
//     if (err) {
//         console.log(err);
//     }
// })
// fs.mkdir('./students/girls', (err) => {
//     if (err) {
//         console.log(err);
//     }
// })
//
// const girls = ['Anya', 'Veronika', "Olya", "Katya", "Vasyl"]
//
// for (const name  of girls) {
//     fs.appendFile(`./students/girls/${name}.json`, JSON.stringify({'name':name,gender:"female"}),(err)=> {
//     })}
//
// fs.writeFile('./students/girls/Vasyl.json', JSON.stringify({"name": "Vasyl", gender: "male"}), (err) => {
// })
//
// const boys = ["Kolya", "Andriy", "Danylo", 'Marta', 'Kyrylo']
//
//
// for (const name  of boys) {
//
//     fs.appendFile(`./students/boys/${name}.json`, JSON.stringify({'name':name,gender:"male"}),(err)=> {
//     })}
//
// fs.writeFile('./students/boys/Marta.json', JSON.stringify({"name": "Marta", gender: "female"}), (err) => {
// })

// fs.readdir('./students/boys', {withFileTypes: true}, (err, files) => {
//     console.log(files);
//     for (const file of files) {
//         if (file.isFile()) {
//             fs.readFile(`./students/boys/${file.name}`, (err, data) => {
//                 const all = data.toString().includes("female")
//
//                 if (all){
//                     fs.appendFile(`./students/girls/${file.name}`,'',()=>{})
//                     fs.copyFile(`./students/boys/${file.name}`, `./students/girls/${file.name}`, (err)=> {
//                         console.log(err);})
//                     fs.unlink(`./students/boys/${file.name}`,(err)=> {
//                         console.log(err);})
//                 console.log(all);
//             }})
//         }
//     }
// })




fs.readdir('./students/girls', {withFileTypes: true}, (err, files) => {
    console.log(files);
    for (const file of files) {

        if (file.isFile()) {
            fs.readFile(`./students/girls/${file.name}`, (err, data) => {
                const people = JSON.parse(data)
                if (people.gender === 'male') {
                    fs.appendFile(`./students/boys/${file.name}`,'',()=>{})
                    fs.copyFile(`./students/girls/${file.name}`, `./students/boys/${file.name}`, (err)=> {
                        console.log(err);})
                    fs.unlink(`./students/girls/${file.name}`,(err)=> {
                        console.log(err);})
                    console.log(all);
                }})
        }
    }
})