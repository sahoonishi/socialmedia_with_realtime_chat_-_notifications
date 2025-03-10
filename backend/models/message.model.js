import { mongoose } from "mongoose";
const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reciever: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
export const Message = mongoose.model("Message", messageSchema);
