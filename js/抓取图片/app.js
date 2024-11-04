/*
 * @Date: 2024-10-12 16:02:53
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-10-14 10:17:30
 * @Description: 
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const generateImgUrl = (idx = 1) => {
    return `https://assets.catizen.ai/website/pic/Catizen_2k_${idx}.jpg`
}
if (!fs.existsSync('./images')) {
    fs.mkdirSync('./images')
}
const downImg = (imageUrl, name) => {
    return new Promise((resolve, reject) => {
        https.get(imageUrl, (response) => {
            const file = fs.createWriteStream(path.join(__dirname, 'images', name));
          
            response.pipe(file).on('close', () => {
              console.log('Image has been downloaded and saved as:', name);
              resolve()
            });
          }).on('error', (err) => {
            console.error('Error downloading image:', err.message);
            reject()
          });
    })
   
}
const maxCounts = 568
let current = 500;
const fn = async () => {
    for(let k = current;k <= maxCounts; k++) {
        const url = generateImgUrl(k)
        const name = `catizen-image-${k}.jpg`
        await downImg(url, name)
    }
}
fn()