import express from "express";
import path from "path";
import { Server } from "socket.io";
import http from "http";


const app=  express();
const server = http.createServer(app);
const io = new Server(server);  

app.use(express.static(path.resolve("./Public")))

io.on("connection", (socket) => {
  console.log("new user connected", socket.id);
  socket.on("userMessage",(msg)=>{
    console.log(msg)
    io.emit("recieverMessage",msg)
  })
});




app.get("/",(req,res)=>{
    return res.sendFile("/public/index.html")
})

server.listen(3000,()=>{
    console.log("server is running on port 3000")
    
})
