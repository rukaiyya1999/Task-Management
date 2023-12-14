import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  tasks: [
    {
      id: 1,
      title: "title",
      description: "this is desc",
      date: 12 - 12 - 2023,
      status: "pending",
    },
  ],
};

const TaskSlice = createSlice({
  name: "taks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const task = {
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        date: action.payload.date,
        status: action.payload.status,
      };
      state.tasks.push(task);
    },

    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },

    updateTask: (state, action) => {
      const { id, title, description, date, status } = action.payload;
      const existingTask = state.tasks.find((task) => task.id === id);
      if (existingTask) {
        existingTask.title = title;
        existingTask.description = description;
        existingTask.date = date;
        existingTask.status = status;
      }
    },
  },
});

export const { addTask, removeTask, updateTask } = TaskSlice.actions;
export default TaskSlice.reducer;
