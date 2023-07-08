import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/taskStore";
import { ITask } from "../store/taskStore";

interface TaskItemProps {
  task: ITask;
}

const TaskItem: React.FC<TaskItemProps> = observer(({ task }) => {
  const taskStore = useStore();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleToggleStatus = () => {
    const newStatus =
      status === "To Do"
        ? "In Progress"
        : status === "In Progress"
        ? "Completed"
        : "To Do";
    setStatus(newStatus);
  };

  const handleEdit = () => {
    setEditing(true);
  };
  const getStatusColor = () => {
    if (status === "To Do") {
      return "bg-yellow-500 text-white border-black px-1 rounded";
    } else if (status === "In Progress") {
      return "bg-orange-500 text-white border-black px-1 rounded";
    } else if (status === "Completed") {
      return "bg-green-500  text-white border-black px-1 rounded";
    }
    return ""; // Default case, no additional styling
  };
  const handleSave = () => {
    if (
      status === "To Do" ||
      status === "In Progress" ||
      status === "Completed"
    ) {
      taskStore.updateTask(task.id, title, description, status);
      setEditing(false);
    } else {
      // Handle invalid status value
      console.error("Invalid status value");
    }
  };

  const handleDelete = () => {
    taskStore.deleteTask(task.id);
  };

  return (
    <div className="flex flex-col mr-4 ml-7 mb-4 mt-4">
      {/* Task Title, Description, Status */}
      <div className="flex items-center">
        <div className="mr-2 font-bold">Title:</div>
        <div>{title}</div>
      </div>
      <div className="flex items-center">
        <div className="mr-2 font-bold">Description:</div>
        <div>{description}</div>
      </div>
      <div className="flex items-center">
        <div className="mr-2 font-bold ">Status:</div>
        <div className={` ${getStatusColor()}`}>{status}</div>
      </div>

      {/* Edit and Delete Buttons */}
      <div className="flex mt-2">
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white py-1 px-4 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-1 px-4 rounded"
        >
          Delete
        </button>
      </div>

      {/* Edit Form */}
      {editing && (
        <div className="flex flex-col mt-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded mb-2"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded mb-2"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded mb-2"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={handleSave} className="text-blue-600">
            Save
          </button>
        </div>
      )}
    </div>
  );
});

export default TaskItem;
