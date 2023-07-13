const mongoose = require("mongoose")

const DBconnect = async()=>{
   try {
        mongoose.set("strictQuery", true)
     const data=await  mongoose.connect(process.env.MONGODB_KEY);
     data && console.log("Db Connect");
     } catch (error) {
        console.log(error);
     }
};

module.exports = DBconnect