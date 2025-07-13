import { createSlice } from "@reduxjs/toolkit";
import { saveTasks } from "../utils/storage";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    setTasks: (state, action) => {
      return action.payload;
    },
    addTask: (state, action) => {
      state.push(action.payload);
      saveTasks(state);
    },
    updateTask: (state, action) => {
      const { id, title, desc } = action.payload;
      const task = state.find((t) => t.id === id);
      if (task) {
        task.title = title;
        task.desc = desc;
        saveTasks(state);
      }
    },
    deleteTask: (state, action) => {
      const updated = state.filter((t) => t.id !== action.payload);
      saveTasks(updated);
      return updated;
    },
    toggleComplete: (state, action) => {
      const task = state.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasks(state);
      }
    },
    toggleImportant: (state, action) => {
      const task = state.find((t) => t.id === action.payload);
      if (task) {
        task.important = !task.important;
        saveTasks(state);
      }
    },
    clearCompletedTasks: (state) => {
      const filtered = state.filter((task) => !task.completed);
      saveTasks(filtered);
      return filtered;
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  toggleComplete,
  toggleImportant,
  clearCompletedTasks, 
} = tasksSlice.actions;

export default tasksSlice.reducer;
