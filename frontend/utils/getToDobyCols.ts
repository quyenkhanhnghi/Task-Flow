// call data from backend
import { type } from "os";
import { Board, TypeCol, Col, Todo, TodoBackEnd } from "../type";
import axios from "axios";

export const getTodobyCols = async () => {
  const data = await axios.get("http://localhost:4000/boards");
  // console.log(data);
  const columns = data.data.data[0].columns;

  // const todos = data.data.data;
  // console.log(todos);

  // const columns = todos.reduce((acc: Array<Col>, todo: TodoBackEnd) => {
  //   // if (!acc.get(todo.status)) {
  //   //   acc.set(todo.status, {
  //   //     id: todo.status,
  //   //     todos: [],
  //   //   });
  //   // }
  //   // if (!acc[todo.status]) {
  //   //   acc[todo.status] = {
  //   //     id: todo.status,
  //   //     todos: [],
  //   //   };
  //   // }
  //   acc.get(todo.status)!.todos.push({
  //     id: todo._id,
  //     status: todo.status,
  //     title: todo.title,
  //     createdAt: new Date().toISOString(),
  //     position: todo.position,
  //   });
  //   return acc;
  // }, new Map<TypeCol, Col>());

  // const columnTypes: TypeCol[] = ["todo", "inprogress", "done"];
  // // Does not have TypeCol => empty column
  // for (const columnType of columnTypes) {
  //   if (!columns[columnType]) {
  //     columns[columnType] = {
  //       id: columnType,
  //       todos: [],
  //     };
  //   }
  // }
  // const sortedColumns = new Map<TypeCol, Col>(
  //   Array.from(columns.entries() as [TypeCol, Col][]).sort(
  //     (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
  //   )
  // );

  // const board: Board = {
  //   columns: sortedColumns,
  // };
  const board: Board = {
    columns,
  };
  return board;
};
