"use client";
import { useBoardStore } from "@/context/BoardStore";
import { useSocketStore } from "@/context/SocketStore";
import { SocketEvents } from "@/types/sockenevent.interface";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import { useSnackbar } from "../context/SnackbarStore";
import { Todo, TypeCol } from "../type";
import "./todo.css";

type CardProps = {
  id: TypeCol;
  todo: Todo;
  index: number;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};
function ToDoCard({
  id,
  todo,
  index,
  innerRef,
  draggableProps,
  dragHandleProps,
}: CardProps) {
  const [board, getBoard, setBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoard,
  ]);
  const { socket } = useSocketStore();
  const { snackbarContent, setSnackbarContent } = useSnackbar();

  /** Handle delete button */
  const handleClick = () => {
    const newCols = board.columns.map((col) => {
      const todoIndex = col.todos.findIndex(
        (todoDelete) => todoDelete._id === todo._id
      );
      console.log(todoIndex);
      // If not found, return the column
      if (todoIndex === -1) {
        setSnackbarContent({
          title: "Fail deleted",
          message: "The task was not deleted. Please try again",
          type: "error",
        });
        return col;
      }
      // If found, return a new column with that todo removed
      return {
        ...col,
        todos: [
          ...col.todos.slice(0, todoIndex),
          ...col.todos.slice(todoIndex + 1),
        ],
      };
    });
    // appear snack bar column
    setSnackbarContent({
      title: "Sucessfully deleted",
      message: "The task was deleted",
      type: "success",
    });
    setBoard({ ...board, columns: newCols });
    socket?.emit(SocketEvents.columnsDelete, newCols);
  };
  return (
    <div {...draggableProps} {...dragHandleProps} ref={innerRef}>
      <div className="flex justify-between items-center p-5 todo-card">
        <p>{todo.title}</p>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={handleClick}
        >
          <AddCircleIcon className="ml-50 w-90 h-90" />
        </button>
      </div>
    </div>
  );
}

export default ToDoCard;
