import React from "react";

import { StoreContext, taskStoreInstance } from "../store/taskStore";
import dynamic from "next/dynamic";

const NoSSRTaskForm = dynamic(() => import("./TaskForm"), { ssr: false });
const NoSSRTaskList = dynamic(() => import("./TaskList"), { ssr: false });

const App: React.FC = () => {
  return (
    <div className="">
      <h1 className="text-4xl font-bold mb-4 text-center">Task Manager App</h1>
      <div>
        <StoreContext.Provider value={taskStoreInstance}>
          <NoSSRTaskForm />
          <NoSSRTaskList />
        </StoreContext.Provider>
      </div>
    </div>
  );
};

export default App;
