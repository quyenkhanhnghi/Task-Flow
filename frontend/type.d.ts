export type TypeCol = "todo" | "inprogress" | "done";

interface Board {
  columns: Map<TypeCol, Col>;
}

interface Col {
  id: TypeCol;
  todos: Todo[];
}

interface Todo {
  id: string;
  createdAt: string;
  title: string;
  status: TypeCol;
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
