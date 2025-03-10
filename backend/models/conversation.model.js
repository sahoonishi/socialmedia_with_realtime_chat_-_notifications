import { mongoose } from "mongoose";
const chatwindowSchema = new mongoose.Schema({
  message: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
export const Chatwindow = mongoose.model("Chatwindow", chatwindowSchema);
