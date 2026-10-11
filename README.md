# CNAPP Dashboard

A dynamic dashboard built with **React 18**, **Vite** and **Redux Toolkit**.
The dashboard is generated from a JSON file (categories → widgets), and users can add, remove and search widgets.

## Run locally

Requirements: **Node.js 18+** and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
# open the URL printed in the terminal (usually http://localhost:5173)

# Optional: production build
npm run build
npm run preview
```

## Project structure

```
src/
  data/dashboard.json        # Dashboard definition: categories, each with multiple widgets
  store/dashboardSlice.js    # Redux Toolkit slice (add / remove / search / reset)
  store/store.js             # Store + localStorage persistence
  components/
    Category.jsx             # One category section + its "Add Widget" placeholder
    WidgetCard.jsx           # Widget card with the cross (remove) icon
    AddWidgetPanel.jsx       # Right-side panel: tabs, checkboxes, search, create widget
    charts.jsx               # Donut, stacked bar, empty-state (plain SVG/CSS, no chart lib)
  App.jsx                    # Header, title row, layout
```

## JSON shape

```json
{
  "name": "CNAPP Dashboard",
  "categories": [
    {
      "id": "cspm",
      "tab": "CSPM",
      "name": "CSPM Executive Dashboard",
      "widgets": [
        { "id": "...", "name": "Cloud Accounts", "text": "...", "type": "donut", "visible": true, "data": { } }
      ]
    }
  ]
}
```

`visible: true` means the widget is on the dashboard. `visible: false` means it exists in the catalog
(shown unchecked in the Add Widget panel) but is not displayed.
Widget `type` is one of `donut`, `stackbar`, `empty` or `text`.

## Features (mapped to the assignment)

1. **JSON-driven** dashboard with categories and multiple widgets per category.
2. **Add / remove** widgets per category.
3. Widgets can show plain text (user-created widgets show their text).
4. **+ Add Widget** opens a panel (tabs: CSPM, CWPP, Image, Ticket) where users can tick/untick widgets
   and **create a new widget** with a name and text; it is added to the selected category. Cancel discards changes, Confirm applies them.
5. Each widget has a **× icon** to remove it; unticking it in the panel does the same.
6. **Search**: the panel's search box looks across all widgets in all categories; the header search filters widgets on the dashboard.

State is held in Redux Toolkit and saved to `localStorage`.
Use the **⋮ → Reset dashboard** menu to restore the original JSON.
