import { Todo, TypeCol } from "../type";
import { Draggable, Droppable } from "react-beautiful-dnd";
import ToDoCard from "./ToDoCard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useBoardStore } from "@/context/BoardStore";
import { useDialogContext } from "@/context/DialogContext";

type ColumnProps = {
  id: TypeCol;
  todos: Todo[];
  index: number;
};

const idColumnType: { [key in TypeCol]: string } = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

function Column({ id, todos, index }: ColumnProps) {
  const [searchString] = useBoardStore((state) => [state.searchString]);
  const [openModal] = useDialogContext((state) => [state.openModal]);
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {/** render droppable todos in the column */}
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={` p-2 rounded-2xl shadow-sm border-[2px] border-black-950 ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-white"
                }`}
              >
                <h2 className="flex justify-between font-bold text-xl p-3">
                  {idColumnType[id]}
                  <span className="text-gray-500 rounded-full bg-gray-200 px-2 py-1 text-sm font-normal">
                    {!searchString
                      ? todos.length
                      : todos.filter((todo) =>
                          todo.title
                            .toLowerCase()
                            .includes(searchString.toLowerCase())
                        ).length}
                  </span>
                </h2>

                <div className="flex flex-col gap-4 pr-11">
                  {todos
                    .filter(
                      (todo) =>
                        !searchString ||
                        todo.title
                          .toLowerCase()
                          .includes(searchString.toLowerCase())
                    )
                    .map((todo, index) => (
                      <Draggable
                        key={todo._id}
                        draggableId={todo._id}
                        index={index}
                      >
                        {(provided) => (
                          <ToDoCard
                            todo={todo}
                            id={id}
                            index={index}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}
                </div>
                <div className="flex justify-end mt-8 p-3">
                  <button
                    onClick={openModal}
                    className="text-gray-400 hover:text-gray-700"
                  >
                    <AddCircleIcon className="w-90 h-90" />
                  </button>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
