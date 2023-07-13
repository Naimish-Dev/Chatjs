const express = require("express");
const ChatRouter = express();
const { messagesend, deletemessage } = require("../Controllers/Chatcontroller");
const Authmiddleware=require("../middleware/Authmiddleware")

ChatRouter.post("/user/:id", Authmiddleware , messagesend);
ChatRouter.post("/user/message/:id", Authmiddleware, deletemessage);

module.exports = ChatRouter