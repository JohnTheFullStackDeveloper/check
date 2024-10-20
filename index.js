const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const http = require('http').Server(app)
const io = require('socket.io')(http,{
    cors:{
        origin:["https://johnthefullstackdeveloper.github.io/aviator/","https://localhost:3001"],
        method:"GET",
        allowedHeaders:true,
        credentials:true
    }
})
let now = [(Math.random()*100).toFixed(2)]
let send = [1.00]
console.log(now)
let Interval = setInterval(()=>{
    sendX()
},100)
function sendX() {
    io.emit("getX", send[0].toFixed(2))
    if(now[0] < send[0]){
        console.log("gone")
        io.emit("getX","gone")
        clearInterval(Interval)
        now[0] = (Math.random()*100).toFixed(2)
        send[0] = 1.0
        console.log(now)
        setTimeout(()=>{
            Interval = setInterval(()=>{
                sendX()
            },100)
        },10000)

    }
    if(send[0]<2) send[0] = send[0] + 0.01
    else if(send[0]<5) send[0] = send[0] + 0.09
    else if(send[0]<10) send[0] = send[0] + 0.12
    else if(send[0]<25) send[0] = send[0] + 0.24
    else if(send[0]<40) send[0] = send[0] + 0.36
    else if(send[0]<50) send[0] = send[0] + 0.48
    else if(send[0]<100) send[0] = send[0] + 0.59
    else send[0] = send[0] + 0.91

}
let all = []
io.on('connection', (socket) => {
    all.push(socket)
    console.log('Connected '+socket.id)
})
io.on('disconnect', (socket) => {
    let removeIndex = all.findIndex(e => e.id === socket.id)
    if (removeIndex === -1) {

    }
    else{
        all.splice(removeIndex, 1)
    }
})



http.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
