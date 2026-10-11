import { createSlice } from '@reduxjs/toolkit';
import seed from '../data/dashboard.json';

export const STORAGE_KEY = 'cnapp-dashboard-v1';

function load() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    /* ignore corrupt storage */
  }
  return seed;
}

const initialState = { ...structuredClone(load()), query: '' };

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Cross icon on a widget: remove it from its category (it stays in the catalog).
    removeWidget(state, { payload: { categoryId, widgetId } }) {
      const widget = state.categories
        .find((c) => c.id === categoryId)
        ?.widgets.find((w) => w.id === widgetId);
      if (widget) widget.visible = false;
    },
    // "Confirm" in the Add Widget panel: apply checkbox state + newly created widgets.
    applyChanges(state, { payload: { selectedIds, created } }) {
      created.forEach((w) => {
        state.categories
          .find((c) => c.id === w.categoryId)
          ?.widgets.push({ id: w.id, name: w.name, text: w.text, type: 'text', visible: false });
      });
      const selected = new Set(selectedIds);
      state.categories.forEach((c) =>
        c.widgets.forEach((w) => {
          w.visible = selected.has(w.id);
        })
      );
    },
    setQuery(state, { payload }) {
      state.query = payload;
    },
    resetDashboard() {
      return { ...structuredClone(seed), query: '' };
    },
  },
});

export const { removeWidget, applyChanges, setQuery, resetDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
