"use client";
import { useDialogContext } from "@/context/DialogContext";
import { FormEvent, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useBoardStore } from "@/context/BoardStore";
import TaskType from "./TaskType";
import Image from "next/image";
import { PhotoAlbum } from "@mui/icons-material";

function MyDialog() {
  const imageRef = useRef<HTMLInputElement>(null);
  let [isOpen, closeModal] = useDialogContext((state) => [
    state.isOpen,
    state.closeModal,
  ]);
  const {
    newTaskInput,
    setNewTaskInput,
    newTaskType,
    image,
    setImage,
    addTask,
  } = useBoardStore();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) return;
    // ask task to board
    addTask(newTaskInput, newTaskType, image);
    setImage(null);
    closeModal();
  };

  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        className="relative z-10"
        onClose={closeModal}
        onSubmit={(e) => handleSubmit(e)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>
        {/*
          Use one Transition.Child to apply one transition to the backdrop...
        */}
        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-600 pb-2"
                >
                  Ask a task
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => {
                      e.preventDefault();
                      setNewTaskInput(e.target.value);
                    }}
                    placeholder="Enter a task here..."
                    className="w-full border border-gray-300 rounded-md outline-none p-5"
                  />
                </div>
                <TaskType />
                <div className="text-center w-ful border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 mt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      imageRef.current?.click();
                    }}
                  >
                    <PhotoAlbum className="h-6 w-6 mr-2 inline-block" />
                    Upload Image
                  </button>
                  {image && (
                    <Image
                      alt="Upload Image"
                      width={300}
                      height={300}
                      className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowe"
                      src={URL.createObjectURL(image)}
                      onClick={() => setImage(null)}
                    />
                  )}
                  <input
                    type="file"
                    ref={imageRef}
                    hidden
                    onChange={(e) => {
                      e.preventDefault(); // Prevent the default behavior
                      if (!e.target.files![0].type.startsWith("image")) return;
                      setImage(e.target.files![0]);
                    }}
                  ></input>
                </div>
                <div className="mt-3">
                  <button
                    type="submit"
                    disabled={!newTaskInput}
                    className="incline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    Add Task
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
        {/*
          ...and another Transition.Child to apply a separate transition
          to the contents.
        */}
      </Dialog>
    </Transition>
  );
}

export default MyDialog;
