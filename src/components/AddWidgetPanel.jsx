import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyChanges } from '../store/dashboardSlice';

export default function AddWidgetPanel({ initialCategoryId, onClose }) {
  const dispatch = useDispatch();
  const categories = useSelector((s) => s.dashboard.categories);

  const [tab, setTab] = useState(initialCategoryId);
  const [search, setSearch] = useState('');
  const [created, setCreated] = useState([]); // widgets created in this session
  const [selected, setSelected] = useState(
    () => new Set(categories.flatMap((c) => c.widgets.filter((w) => w.visible).map((w) => w.id)))
  );
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  // Catalog = every widget in the JSON + the ones created in this panel.
  const catalog = useMemo(
    () =>
      categories.map((c) => ({
        ...c,
        widgets: [...c.widgets, ...created.filter((w) => w.categoryId === c.id)],
      })),
    [categories, created]
  );

  const q = search.trim().toLowerCase();
  const results = q
    ? catalog.flatMap((c) =>
        c.widgets
          .filter((w) => w.name.toLowerCase().includes(q))
          .map((w) => ({ ...w, categoryTab: c.tab }))
      )
    : catalog.find((c) => c.id === tab)?.widgets ?? [];

  const toggle = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const createWidget = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const widget = {
      id: `custom-${Date.now()}`,
      categoryId: tab,
      name: name.trim(),
      text: text.trim(),
    };
    setCreated((c) => [...c, widget]);
    setSelected((s) => new Set(s).add(widget.id));
    setName('');
    setText('');
    setSearch('');
  };

  const confirm = () => {
    dispatch(applyChanges({ selectedIds: [...selected], created }));
    onClose();
  };

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <aside className="panel" role="dialog" aria-modal="true" aria-label="Add Widget">
        <header className="panel-head">
          <span>Add Widget</span>
          <button onClick={onClose} aria-label="Close">×</button>
        </header>

        <div className="panel-body">
          <p className="panel-sub">Personalise your dashboard by adding the following widget</p>

          <input
            className="panel-search"
            type="search"
            placeholder="Search all widgets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search all widgets"
          />

          <div className="tabs" role="tablist">
            {categories.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={!q && tab === c.id}
                className={!q && tab === c.id ? 'tab active' : 'tab'}
                onClick={() => {
                  setTab(c.id);
                  setSearch('');
                }}
              >
                {c.tab}
              </button>
            ))}
          </div>

          <ul className="widget-list">
            {results.map((w) => (
              <li key={w.id}>
                <label>
                  <input type="checkbox" checked={selected.has(w.id)} onChange={() => toggle(w.id)} />
                  <span>{w.name}</span>
                  {q && <em>{w.categoryTab}</em>}
                </label>
              </li>
            ))}
            {results.length === 0 && <li className="none">No widgets found.</li>}
          </ul>

          {!q && (
            <form className="create" onSubmit={createWidget}>
              <h4>Create a new widget in {catalog.find((c) => c.id === tab)?.tab}</h4>
              <input
                placeholder="Widget name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-label="Widget name"
              />
              <textarea
                placeholder="Widget text"
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
                aria-label="Widget text"
              />
              <button type="submit" className="btn-outline" disabled={!name.trim()}>
                Add to {catalog.find((c) => c.id === tab)?.tab}
              </button>
            </form>
          )}
        </div>

        <footer className="panel-foot">
          <button className="btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn-solid" onClick={confirm}>Confirm</button>
        </footer>
      </aside>
    </div>
  );
}
