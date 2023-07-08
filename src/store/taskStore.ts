import { types, Instance } from "mobx-state-tree";
import { v4 as uuidv4 } from "uuid";
import { createContext, useContext } from "react";
import { getTasks, saveTasks } from "./taskService";

export const TaskModel = types
  .model("Task", {
    id: types.identifier,
    title: types.string,
    description: types.string,
    status: types.enumeration(["To Do", "In Progress", "Completed"]),
  })
  .actions((self) => ({
    setTitle(title: string) {
      self.title = title;
    },
    setDescription(description: string) {
      self.description = description;
    },
    setStatus(status: "To Do" | "In Progress" | "Completed") {
      self.status = status;
    },
  }));

export interface ITask extends Instance<typeof TaskModel> {}

export const TaskStoreModel = types
  .model("TaskStore", {
    tasks: types.array(TaskModel),
  })
  .actions((self) => ({
    addTask(title: string, description: string, status: string) {
      // Add the `status` parameter
      const newTask = TaskModel.create({
        id: uuidv4(),
        title,
        description,
        status,
      });
      self.tasks.push(newTask);
      saveTasks(self.tasks);
    },
    deleteTask(id: string) {
      const index = self.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        self.tasks.splice(index, 1);
        saveTasks(self.tasks);
      }
    },
    updateTask(
      id: string,
      title: string,
      description: string,
      status: "To Do" | "In Progress" | "Completed"
    ) {
      const task = self.tasks.find((task) => task.id === id);
      if (task) {
        task.setTitle(title);
        task.setDescription(description);
        task.setStatus(status);
        saveTasks(self.tasks);
      }
    },
  }));

const taskStoreInstance = TaskStoreModel.create({
  tasks: getTasks(),
});

export type TaskStore = Instance<typeof TaskStoreModel>;

const StoreContext = createContext<TaskStore>(taskStoreInstance);

export const useStore = (): TaskStore => useContext(StoreContext);

export { StoreContext, taskStoreInstance };
