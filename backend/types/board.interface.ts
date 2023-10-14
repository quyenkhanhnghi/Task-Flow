import { Document } from "mongoose";
type TypeCol = "todo" | "inprogress" | "done";
export interface Board {
  title: string;
  status: TypeCol;
  image?: string;
}

export interface BoardDoc extends Document, Board {}
