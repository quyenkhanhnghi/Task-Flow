"use client";
import React from "react";
import { Todo, TypeCol } from "../type";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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
  return (
    <div
      className="bg-white rounded-md space-y-10 drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button className="text-red-500 hover:text-red-700">
          <AddCircleIcon className="ml-50 w-90 h-90" />
        </button>
      </div>
    </div>
  );
}

export default ToDoCard;
