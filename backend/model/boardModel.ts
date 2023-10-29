import { Schema, model } from 'mongoose';
import { BoardDoc } from '../types/board.interface';

const todoSchema = new Schema({
  title: String,
  image: String,
});

const columnSchema = new Schema({
  title: {
    type: String,
    enum: ['todo', 'inprogress', 'done'],
  },
  todos: [todoSchema],
  color: String,
  description: String,
});

const BoardSchema = new Schema({
  userId: Schema.Types.ObjectId,
  columns: [columnSchema],
});
export default model('Board', BoardSchema);
// const BoardSchema = new Schema<BoardDoc>({
//   title: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['todo', 'inprogress', 'done'],
//   },
//   image: String,
// });

// export default model<BoardDoc>('Board', BoardSchema);
