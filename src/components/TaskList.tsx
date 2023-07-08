import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/taskStore";
import TaskItem from "./TaskItem";

const TaskList: React.FC = observer(() => {
  const taskStore = useStore();

  return (
    <div className="">
      <div className="flex flex-row flex-wrap">
        {taskStore.tasks.map((task) => (
          <div className="flex" key={task.id}>
            <TaskItem task={task} />
          </div>
        ))}
      </div>
    </div>
  );
});

export default TaskList;
