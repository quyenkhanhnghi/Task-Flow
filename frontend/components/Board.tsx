"use client";
import { useBoardStore } from "@/context/BoardStore";
import { Col } from "../type";
import React, { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import { io } from "socket.io-client";

const socket_connection = io("http://localhost:4000");

function Board() {
  const [board, getBoard, setBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoard,
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    // drop outside of the destination
    if (!destination) return;
    // handle drag column
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rerangedCol = new Map(entries);
      setBoard({ ...board, columns: rerangedCol });
      return;
    }
    // handle drag card
    const columns = Array.from(board.columns.entries());
    const starColIndex = columns[Number(source.droppableId)];
    const endColIndex = columns[Number(destination.droppableId)];
    const startCol: Col = {
      id: starColIndex[0],
      todos: starColIndex[1].todos,
    };
    const endCol: Col = {
      id: endColIndex[0],
      todos: endColIndex[1].todos,
    };
    // drop outside the boundaries
    if (!startCol || !endCol) return;
    // drop in same postion
    if (
      source.droppableId === destination.droppableId &&
      startCol.id === endCol.id
    )
      return;
    const newTodos = startCol.todos;
    const [todoRemoved] = newTodos.splice(source.index, 1);

    // drop in same col
    if (startCol.id === endCol.id) {
      newTodos.splice(destination.index, 0, todoRemoved);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      const newCols = new Map(board.columns);
      newCols.set(startCol.id, newCol);
      // TODO: websocket connection

      // update TODO IN DATABASE also - use websocket
      setBoard({ ...board, columns: newCols });
      // drop in diff col
    } else {
      const endTodosArray = Array.from(endCol.todos);
      endTodosArray.splice(destination.index, 0, todoRemoved);
      const newCols = new Map(board.columns);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      newCols.set(startCol.id, newCol);
      newCols.set(endCol.id, {
        id: endCol.id,
        todos: endTodosArray,
      });
      setBoard({ ...board, columns: newCols });
    }
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
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
