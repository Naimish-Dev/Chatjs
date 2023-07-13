const express = require("express");
const userRouter = express();
const path = require("path");
const multer = require("multer");
const user=require("../Controllers/usercontroller");
const { model } = require("mongoose");
const Authmiddleware = require("../middleware/Authmiddleware");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   cb(null, path.join(__dirname, "../Public"));
  },

  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({storage:storage});

userRouter.post("/register", upload.single("img"), user.userRegister);
userRouter.post("/login", user.userLogin);
userRouter.get("/users", Authmiddleware ,user.getuser);
module.exports = userRouter;
