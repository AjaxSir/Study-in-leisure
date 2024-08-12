/*
 * @Date: 2024-05-28 09:39:58
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-05-28 09:45:00
 * @Description: 
 */
const http = require('http')

const server = http.createServer((req,res) => {
    const data = {
        name: "sxl",
        age: 27
    }
    const jsonData = JSON.stringify(data)
    res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8"
    })
    res.write(jsonData)
    res.end()
})

server.listen(3000, () => {
    console.log('🚀 服务已启动!')
});
