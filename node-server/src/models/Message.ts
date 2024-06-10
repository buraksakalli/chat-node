import { Schema, model, Document } from "mongoose";

interface IMessage extends Document {
  userId: string;
  username: string;
  message: string;
  timestamp: Date;
}

const messageSchema = new Schema<IMessage>({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = model<IMessage>("Message", messageSchema);

export default Message;
