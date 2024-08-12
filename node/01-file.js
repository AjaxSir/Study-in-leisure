/*
 * @Date: 2024-04-29 14:26:56
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-05-28 17:54:31
 * @Description:
 */
const { log } = require('console');
const { readFile } = require('fs/promises');
const fs = require('fs');

// const result = fs.readFileSync('./demo1/wd.txt')
// console.log(result.toString())
// const result = fs.readFileSync('./demo1/wd.txt', { encoding: "utf-8" })
// console.log(result, 'utf-8')

// fs.readFile("./demo1/wd.txt", { encoding: "utf-8" }, (err, data) => {
//     console.log(data, 'readFile')
// })

// const rStream = fs.createReadStream('./demo1/wd.txt', { encoding: "utf-8" })
// rStream.on('data', (chunk) => {
//     console.log(chunk + '----------------------')
// })
// rStream.on('end', () => {
//     console.log('读取完毕')
// })

// readFile('./demo1/wd.txt', { encoding: "utf-8" }).then((data) => {
//     console.log(data, '111')
// })
// -------------------------------------- 写入文件
const pathDir = './demo2/aaa';
const fileName = './wd.txt';
// ------------ 同步写入
// if (!fs.existsSync(pathDir)) {
//     fs.mkdirSync(pathDir, { recursive: true })
//     fs.writeFileSync(pathDir + fileName, 'hello world')
// } else {
//     fs.writeFileSync(pathDir + fileName, 'hello world2', { flag: 'a' })
// }

// const wStream = fs.createWriteStream('./demo2/aaa/wd.txt', { flags: 'a' })
// wStream.on('open', () => {
//     Array(10000).fill().forEach((_, idx) => {
//         wStream.write(idx + ':文件流写入\n')
//     })

//     wStream.end()
// })
// wStream.on('finish', () => {
//     log('写入完毕121')
// })

fs.writeFileSync(fileName, '1');

