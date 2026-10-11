import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer, { STORAGE_KEY } from './dashboardSlice';

export const store = configureStore({ reducer: { dashboard: dashboardReducer } });

// Persist dashboard layout locally so it survives a page refresh.
store.subscribe(() => {
  const { name, categories } = store.getState().dashboard;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, categories }));
  } catch {
    /* storage unavailable */
  }
});
