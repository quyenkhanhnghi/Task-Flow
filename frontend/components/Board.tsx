"use client";
import { useBoardStore } from "@/context/BoardStore";
import React, { useEffect } from "react";
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import Column from "./Column";
import { useSocketStore } from "@/context/SocketStore";
import { SocketEvents } from "@/types/sockenevent.interface";

function Board() {
  const [board, getBoard, setBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoard,
  ]);
  const { socket } = useSocketStore();

  // Get Board from backend
  useEffect(() => {
    getBoard();
  }, [getBoard]);

  /** Handle Drag Column */
  const handleDragColumn = (
    source: DraggableLocation,
    destination: DraggableLocation
  ) => {
    const newCols = [...board.columns];
    const [removed] = newCols.splice(source.index, 1);
    newCols.splice(destination.index, 0, removed);
    setBoard({ ...board, columns: newCols });

    if (socket) {
      socket.emit(SocketEvents.columnsUpdate, newCols);
    }
    return;
  };

  const handleDragCard = (
    source: DraggableLocation,
    destination: DraggableLocation
  ) => {
    const newCols = [...board.columns];
    const startCol = { ...newCols[Number(source.droppableId)] };
    console.log(startCol);
    const endCol = { ...newCols[Number(destination.droppableId)] };
    console.log(endCol);

    // drop card outside the boundaries
    if (!startCol || !endCol) return;

    // drop card in same postion
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const newTodos = [...startCol.todos];
    const [todoRemoved] = newTodos.splice(source.index, 1);

    // drop card in the same column
    if (startCol._id === endCol._id) {
      newTodos.splice(destination.index, 0, todoRemoved);
      const updatedStartCol = { ...startCol, todos: newTodos };
      newCols[Number(source.droppableId)] = updatedStartCol;

      // Drop card in different col
    } else {
      const endTodos = [...endCol.todos];
      endTodos.splice(destination.index, 0, todoRemoved);
      const updatedStartCol = { ...startCol, todos: newTodos };
      const updatedEndCol = { ...endCol, todos: endTodos };
      newCols[Number(source.droppableId)] = updatedStartCol;
      newCols[Number(destination.droppableId)] = updatedEndCol;
    }

    setBoard({ ...board, columns: newCols });
    socket?.emit(SocketEvents.columnsUpdate, newCols);
  };

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    // Drop outside of the destination
    if (!destination) return;

    /** Handle drag column **/
    if (type === "column") {
      handleDragColumn(source, destination);
      return;
    }
    handleDragCard(source, destination);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto pt-5
          "
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.isArray(board.columns) &&
              board.columns.map((column, index) => (
                <Column
                  key={column.title}
                  id={column.title}
                  todos={column.todos}
                  index={index}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
