import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../store/taskStore";

const TaskForm: React.FC = observer(() => {
  const taskStore = useContext(StoreContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    taskStore.addTask(title, description, status);
    setTitle("");
    setDescription("");
    setStatus("To Do");
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row justify-center "
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 px-2 py-1 rounded mb-2 md:mr-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 px-2 py-1 rounded mb-2 md:mr-2 md:mb-0 "
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 px-2 py-1 rounded mb-2 md:mr-2 "
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-6 rounded"
        >
          Add
        </button>
      </form>
    </div>
  );
});

export default TaskForm;
