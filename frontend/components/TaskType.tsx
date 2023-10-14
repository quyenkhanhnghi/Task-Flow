"use client";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useBoardStore } from "@/context/BoardStore";
import { CheckCircleOutline } from "@mui/icons-material";

function TaskType() {
  const typesTask = [
    {
      id: "todo",
      name: "To do",
      description: "A new task to be completed",
      color: "bg-red-500",
    },
    {
      id: "inprogress",
      name: "In Progress",
      description: "A task that is already in progress",
      color: "bg-yellow-500",
    },
    {
      id: "done",
      name: "Done",
      description: "A task has been completed",
      color: "bg-green-500",
    },
  ];

  const [newTaskType, setNewTaskType] = useBoardStore((state) => [
    state.newTaskType,
    state.setNewTaskType,
  ]);

  return (
    <div className="w-full py-5">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={newTaskType} onChange={(e) => setNewTaskType(e)}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {typesTask.map((type) => (
              <RadioGroup.Option
                key={type.name}
                value={type.id}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
                  ${
                    checked
                      ? `text-white bg-opacity-75 ${type.color}`
                      : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {type.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-gray-500"
                            }`}
                          >
                            <span>{type.description}</span>{" "}
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckCircleOutline className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

export default TaskType;
