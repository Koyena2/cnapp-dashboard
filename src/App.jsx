import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetDashboard, setQuery } from './store/dashboardSlice';
import Category from './components/Category';
import AddWidgetPanel from './components/AddWidgetPanel';

export default function App() {
  const dispatch = useDispatch();
  const { name, categories, query } = useSelector((s) => s.dashboard);
  const [panel, setPanel] = useState({ open: false, categoryId: categories[0]?.id });
  const [menuOpen, setMenuOpen] = useState(false);
  const [spin, setSpin] = useState(false);

  const openPanel = (categoryId) =>
    setPanel({ open: true, categoryId: categoryId ?? categories[0]?.id });

  const refresh = () => {
    setSpin(true);
    setTimeout(() => setSpin(false), 600);
  };

  return (
    <div className="page">
      <header className="topbar">
        <nav className="crumbs">
          <span>Home</span>
          <span className="sep">&gt;</span>
          <strong>Dashboard V2</strong>
        </nav>
        <label className="search">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            placeholder="Search anything..."
            value={query}
            onChange={(e) => dispatch(setQuery(e.target.value))}
            aria-label="Search widgets on the dashboard"
          />
        </label>
        <div className="topbar-right" aria-hidden="true">
          <span className="pill-blur" />
          <span className="avatar" />
        </div>
      </header>

      <main className="content">
        <div className="title-row">
          <h1>{name}</h1>
          <div className="actions">
            <button className="btn-outline" onClick={() => openPanel()}>
              Add Widget <span aria-hidden="true">+</span>
            </button>
            <button className="icon-btn" onClick={refresh} aria-label="Refresh">
              <svg className={spin ? 'spin' : ''} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5" />
              </svg>
            </button>
            <div className="menu-wrap">
              <button className="icon-btn" onClick={() => setMenuOpen((o) => !o)} aria-label="More options">
                ⋮
              </button>
              {menuOpen && (
                <div className="menu">
                  <button
                    onClick={() => {
                      dispatch(resetDashboard());
                      setMenuOpen(false);
                    }}
                  >
                    Reset dashboard
                  </button>
                </div>
              )}
            </div>
            <label className="time">
              <span className="clock" aria-hidden="true" />
              <select defaultValue="2d" aria-label="Time range">
                <option value="2d">Last 2 days</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
              </select>
            </label>
          </div>
        </div>

        {categories.map((c) => (
          <Category key={c.id} category={c} query={query} onAdd={() => openPanel(c.id)} />
        ))}
      </main>

      {panel.open && (
        <AddWidgetPanel
          initialCategoryId={panel.categoryId}
          onClose={() => setPanel((p) => ({ ...p, open: false }))}
        />
      )}
    </div>
  );
}
