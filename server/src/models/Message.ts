import { Schema, model, Document } from 'mongoose';

export interface IMessage extends Document {
  sender_name: string;
  email: string;
  message_body: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  sender_name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  message_body: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
});

export const Message = model<IMessage>('Message', MessageSchema);