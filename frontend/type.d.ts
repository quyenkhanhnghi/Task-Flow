export type TypeCol = "todo" | "inprogress" | "done";

interface Board {
  columns: Array<Col>;
}

interface Col {
  title: string;
  _id: TypeCol;
  todos: Todo[];
  color: string;
  description: string;
}

interface Todo {
  _id: string;
  // id: string;
  createdAt: string;
  title: string;
  // status: TypeCol;
  image?: Image;
}

interface TodoBackEnd {
  _id: string;
  createdAt: string;
  title: string;
  status: TypeCol;
  image?: Image;
}

interface Image {
  bucketId: string;
  fieldId: string;
}
