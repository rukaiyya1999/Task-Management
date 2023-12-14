import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "./Features/TaskSlice";
const Store = configureStore({
  reducer: TaskReducer,
});

export default Store;
