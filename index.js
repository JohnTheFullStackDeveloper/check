const express = require("express")
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http,{
    cors:{
        origin: "*",
        method:"GET",
        allowHeaders:true,
        credentials:true
    }
});

const port = process.env.PORT || 3000

io.on("connection", (socket) => {
    socket.emit("onConnect",socket.id)
})

io.listen(port, () => {})
