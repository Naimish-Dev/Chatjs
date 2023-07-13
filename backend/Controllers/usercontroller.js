const usermodule=require("../Modules/UserModule")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


const jwtgenerater =async (userdata) => {
const token = await jwt.sign({ user: userdata }, process.env.JWTPRIVET);
return token 
};

const userRegister = async(req,res)=>{
 
try {
    const password = await bcrypt.hash(req.body.password, 8);
    var fullUrl = req.protocol + "://" + req.get("host") + "/" + "Public"+"/" ; 
        const data = usermodule({
      ...req.body,
      password,
      img: `${fullUrl}${req.file.filename}`,
    });
    const responce = await data.save();
    const token = await jwtgenerater(responce._id);
    res.status(201).send({...responce._doc,token});
} catch (error) {
    res.status(400).send(error)
}
}

const userLogin = async(req,res)=>{
try {
  const {email,password}=req.body
  const responce= await usermodule.findOne({email:email})
  
  const isPasswordmatch = await bcrypt.compare(password, responce.password);
if (responce){
  if (isPasswordmatch) {
        const token = await jwtgenerater(responce._id);
      res.status(201).send({ ...responce._doc, token , password: null });
  } else {
    res.status(401).send("worang email or password");
  }
}else{
  res.status(401).send("worang email or password");
}

} catch (error) {
  console.log(error);
  res.status(401).send(error)
}
}

const getuser=async(req,res)=>{
try {
  const responce = await usermodule
    .find({ _id: { $nin: [req.user.user] } })
    .select({ password: 0 });
  res.status(201).send(responce)
} catch (error) {
  res.status(401).send(error)
}

}

const OnlineUpdate = async (user_id) => {
    try {
      await usermodule.findByIdAndUpdate(
        { _id: user_id },
        { $set: { is_online: true } }
      );
    } catch (error) {
            console.log(error);

    }
  };

  const OfflineUpdate = async (user_id) => {
    try {
      await usermodule.findByIdAndUpdate(
        { _id: user_id },
        { $set: { is_online: false } }
      );
    } catch (error) {
      console.log(error);
    }
  };


module.exports = {
  userRegister,
  userLogin,
  getuser,
 OnlineUpdate,
  OfflineUpdate,
};