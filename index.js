const http = require('http');
const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
    res.write("hello from backend server")
    res.end()
});
server.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})