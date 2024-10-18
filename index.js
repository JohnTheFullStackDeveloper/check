const http = require("http")
const port = process.env.port || 3000
const server = http.createServer((res,req)=>{
    req.write("hello from backend")
    req.end()
})
server.listen(port,()=>{
    console.log("listening in "+port)
})