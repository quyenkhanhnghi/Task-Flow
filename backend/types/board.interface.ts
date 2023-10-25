import { Document, Schema } from 'mongoose';
type TypeCol = 'todo' | 'inprogress' | 'done';
export interface Board {
  title: string;
  status: TypeCol;
  image?: string;
  userId: Schema.Types.ObjectId;
}

export interface BoardDoc extends Document, Board {}
