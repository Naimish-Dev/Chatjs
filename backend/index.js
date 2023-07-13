const express=require("express")
const app = express()
const DBconnect =require("./db")
const http=require("http").Server(app)
require("dotenv").config();
const cors = require("cors")
const socket = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});
DBconnect();
const {OnlineUpdate,OfflineUpdate}=require("./Controllers/usercontroller")

// configration // 
const bodyparser=require("body-parser");
app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

// Routers //
const userRouter = require("./routers/userrouter");
const ChatRouter = require("./routers/chatrouter");
const { getmessage } = require("./Controllers/Chatcontroller");
app.use("/Public", express.static("Public"));

// SET ROUTERS  //
app.use("/api", userRouter);
app.use("/api", ChatRouter);

// socket.io 
const personal = socket.of("/PersonalCahtNamespace");

personal.on("connection",  (socket) => {
  const userId = socket.handshake.auth.token;
 userId && OnlineUpdate(userId);
      socket.broadcast.emit("getonlineuser",  userId );

      socket.on("disconnect", async () => {
        userId && OfflineUpdate(userId);
        socket.broadcast.emit("getofflineuser", userId );

  });
  socket.on("new_chat", (data)=>{
socket.broadcast.emit("loadnewchat", data)
  }); 

  socket.on("loadoldmessage",async(data)=>{
    const oldmessage =await  getmessage(data)
    socket.emit("oldmessages", oldmessage);
  });

  socket.on("mdrequest", (Mdi) => {
    socket.broadcast.emit("mdsucess", Mdi);
  });

});





// server //
const Port =process.env.PORT || 1000
http.listen(Port, () => {
  console.log("Server Runing on " + Port);
});