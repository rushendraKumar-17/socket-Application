const express = require("express");
const http = require("http");
const { loadEnvFile } = require("process");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.sendFile("index.html");
})

io.on("connect",(socket)=>{
    console.log("user connected");
    socket.on("send-location",({latitude,longitude})=>{
        console.log(latitude,longitude);
        io.emit("receive-location",{id:socket.id,latitude,longitude});
    })
})
server.listen(8000,()=>{
    console.log("Server running at 8000");
})