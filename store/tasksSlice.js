import { createSlice } from "@reduxjs/toolkit";
import { saveTasks } from "../utils/storage";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    setTasks: (state, action) => action.payload,

    addTask: (state, action) => {
      const newState = [...state, action.payload];
      saveTasks(newState);
      return newState;
    },

    deleteTask: (state, action) => {
      const newState = state.filter(task => task.id !== action.payload);
      saveTasks(newState);
      return newState;
    },

    toggleComplete: (state, action) => {
      const newState = state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
      saveTasks(newState);
      return newState;
    },

    toggleImportant: (state, action) => {
      const newState = state.map(task =>
        task.id === action.payload ? { ...task, important: !task.important } : task
      );
      saveTasks(newState);
      return newState;
    },

    updateTask: (state, action) => {
      const newState = state.map(task =>
        task.id === action.payload.id ? action.payload : task
      );
      saveTasks(newState);
      return newState;
    },
  },
});

export const {
  setTasks,
  addTask,
  deleteTask,
  toggleComplete,
  toggleImportant,
  updateTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
