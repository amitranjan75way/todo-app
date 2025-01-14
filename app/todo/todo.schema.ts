import mongoose from "mongoose";
import { ITodo } from "./todo.dto";

const todoSchema: mongoose.Schema<ITodo> = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["INCOMPLETE", "COMPLETE"],
      required: true,
      default: "INCOMPLETE",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true });


export default mongoose.model<ITodo>("Todo", todoSchema);