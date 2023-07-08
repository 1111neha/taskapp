import { ITask } from "./taskStore";

const STORAGE_KEY = "tasks";

export const getTasks = (): ITask[] => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedTasks = window.localStorage.getItem(STORAGE_KEY);
    if (storedTasks) {
      try {
        return JSON.parse(storedTasks);
      } catch (error) {
        console.error("Error parsing stored tasks:", error);
      }
    }
  }
  return [];
};

export const saveTasks = (tasks: ITask[]): void => {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const tasksString = JSON.stringify(tasks);
      window.localStorage.setItem(STORAGE_KEY, tasksString);
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  }
};
