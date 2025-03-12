import { Chatwindow } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

export const sendMessage=async(req,res)=>{
  try {
    const sender=req.id;
    const reciever=req.params.id;
    const {message}=req.body;
    let conversation = await Chatwindow.findOne({
      members:{$all:[sender,reciever]}
    });
    if(!conversation){
      conversation=await Chatwindow.create({
        members:[sender,reciever]
      })
    };
    const newMessage=await Message.create({
      sender,reciever,message
    })
    if(newMessage){
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(),newMessage.save()]);

    // implement socketio for realtime data transfer

    return res.status(201).json({success:true,newMessage})
  } catch (error) {
    console.log(error);
  }
}