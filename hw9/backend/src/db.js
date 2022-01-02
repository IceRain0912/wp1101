import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  sender: {type: mongoose.Types.ObjectId, ref: "User"},
  body: {type: String, required: true}
});

const ChatboxSchema = new Schema({
  name: {type: String, required: true},
  messages: [{type: mongoose.Types.ObjectId, ref: "Message"}]
});

const UserSchema = new Schema({
  name: {type: String, required: true}
});


const UserModel = mongoose.model("User", UserSchema);
const ChatboxModel = mongoose.model("Chatbox", ChatboxSchema);
const MessageModel = mongoose.model("Message", MessageSchema);

export { UserModel, ChatboxModel, MessageModel };
