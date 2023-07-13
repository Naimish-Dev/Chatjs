const chatmodul=require("../Modules/chatModule")

const messagesend=async(req,res)=>{
try {
    const data = await chatmodul({
      receiver_id: req.body.receiver_id,
      sender_id: req.body.sender_id,
      message: req.body.message,
    });
    const responce = await data.save();  
    res.status(201).send(responce);

} catch (error) {
    console.log(error);
   res.status(401).send(error) 
}
}


const getmessage=async(id)=>{
try{
  
    return await chatmodul.find({
      $or: [
        {
          sender_id: id.sender_id,
          receiver_id: id.receiver_id,
        },
        {
          receiver_id: id.sender_id,
          sender_id: id.receiver_id,
        },
      ],
    });

}catch(error){
    res.status(401).send(error)
}
}


const deletemessage=async(req,res)=>{
  try {
    const responce = await chatmodul.findByIdAndDelete(req.body.Mid);
    res.status(201).send({message:"Deleted."})
  } catch (error) {
    console.log(error);
    res.status(401).send({message:"failed"})
    
  }
}

module.exports = { messagesend, getmessage, deletemessage };