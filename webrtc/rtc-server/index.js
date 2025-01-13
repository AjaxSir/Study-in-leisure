/*
 * @Date: 2025-01-09 17:49:21
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2025-01-13 18:15:05
 * @Description: 
 */
import  { Server } from 'socket.io'
import * as http from 'http'
import * as fs from 'fs'
const server = http.createServer()

const io = new Server(server, {
    cors: {
    origin: "*",
    maxAge: 1000 * 24 * 60 * 60
   }
})
const ROOMID = '001'
io.on('connection', (socket) => {
    console.log('connection successful')
    socket.emit('connectionSuccess', ROOMID)
    socket.on('join', (id) => {
        console.log(id)
    })
    socket.on('joinRoom', (roomId) => {
        console.log(`User joined room ${roomId}`)
        socket.join(ROOMID)
        socket.emit('someOneJoinRoom', () => {
            socket.to(ROOMID).emit('someOneJoinRoom')
        })
    })
    
    socket.on('callRemote', (roomId) => {
        console.log(`User called remote in room ${roomId}`)
        socket.to(roomId).emit('callRemote')
    })
    socket.on('accept', (roomId) => {
        console.log(`用户同意接受视频`)
        socket.to(roomId).emit('accept')
    })

    socket.on('sendOffer', ({ offer }) => {
        console.log('server get offer')
        socket.to(ROOMID).emit('sendOffer', offer)
    })
    socket.on('sendAnswer', (answer) => {
        socket.to(ROOMID).emit('sendAnswer', answer)
    })
    socket.on('iceCandidate', (candidate) => {
        socket.to(ROOMID).emit('iceCandidate', candidate)
    })
     socket.on('handleDown',() => {
        socket.to(ROOMID).emit('handleDown')
     })
})

server.listen(3000, () => {
    console.log('Server is running on port 3000')
})