import { Chatwindow } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getRecieverSocketID, io } from "../socket/socket.js";
// SEND MESSAGE
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
      conversation.message.push(newMessage._id);
    }
    await Promise.all([conversation.save(),newMessage.save()]);

    // implement socketio for realtime data transfer
    const recieverSocketID = getRecieverSocketID(reciever);
    if(recieverSocketID){
      io.to(recieverSocketID).emit('newMessage',newMessage);
    }

    return res.status(201).json({success:true,newMessage})
  } catch (error) {
    console.log(error);
  }
}
// GET MESSAGE
export const getMessage=async(req,res)=>{
  try {
    const sender = req.id;
    const reciever = req.params.id;
    const conversation = await Chatwindow.findOne({
      members:{$all:[sender,reciever]}
    }).populate('message');
    if(!conversation) return res.status(200).json({
      success:true,
      messages:[]
    });
    return res.status(200).json({success:true,messages:conversation?.message})
  } catch (error) {
    console.log(error);
  }
}