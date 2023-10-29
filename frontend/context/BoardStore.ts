import { getTodobyCols } from "@/utils/getToDobyCols";
import { Board, TypeCol, Col, Todo } from "../type";
import { create } from "zustand";
import Image from "next/image";

interface BoardStore {
  board: Board;
  getBoard: () => void;
  setBoard: (board: Board) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
  newTaskInput: string;
  setNewTaskInput: (newTaskInput: string) => void;
  newTaskType: TypeCol;
  setNewTaskType: (newTaskType: TypeCol) => void;
  image: File | null;
  setImage: (image: File | null) => void;
  addTask: (title: string, columnID: TypeCol, image?: File | null) => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
  board: {
    columns: new Array<Col>(),
  },
  getBoard: async () => {
    const board = await getTodobyCols();
    set({ board });
  },
  setBoard: (board: Board) => set({ board }),
  searchString: "",
  setSearchString: (searchString: string) => set({ searchString }),
  newTaskInput: "",
  setNewTaskInput: (newTaskInput: string) => set({ newTaskInput }),
  newTaskType: "todo",
  setNewTaskType: (newTaskType: TypeCol) => set({ newTaskType }),
  image: null,
  setImage: (image: File | null) => set({ image }),
  addTask: (title: string, columnID: TypeCol, image?: File | null) => {
    let file: typeof Image | undefined;
    // TODO: upload the image into s3
    // if (image) {
    //   const fileUpload = await upLoadfiletoS3();
    // }
    // TODO: await database to create docucments

    set((state) => {
      const newCols = [...state.board.columns];
      const newTodo: Todo = {
        createdAt: new Date().toISOString(),
        title: state.newTaskInput,
        image: image,
      };
      const columnHasNewTask = newCols.find(
        (column) => column.title === state.newTaskType
      );

      // if (!ColumnHasNewTask) {
      //   newCols.push({ title: state.newTaskInput, image: state.newTaskInput});
      // }
      columnHasNewTask?.todos.push(newTodo);
      return { ...state, board: { ...state.board, columns: newCols } };
    });
    set({ newTaskInput: "" });
  },
}));
