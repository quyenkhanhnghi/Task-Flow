import { Schema, model } from "mongoose";
import { BoardDoc } from "../types/board.interface";

const BoardSchema = new Schema<BoardDoc>({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["todo", "inprogress", "done"],
  },
  image: String,
});

export default model<BoardDoc>("Board", BoardSchema);
