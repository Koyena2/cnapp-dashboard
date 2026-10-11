import WidgetCard from './WidgetCard';

export default function Category({ category, query, onAdd }) {
  const q = query.trim().toLowerCase();
  const widgets = category.widgets.filter(
    (w) =>
      w.visible &&
      (!q || w.name.toLowerCase().includes(q) || (w.text || '').toLowerCase().includes(q))
  );

  // While searching, hide categories that have no matching widgets.
  if (q && widgets.length === 0) return null;

  return (
    <section className="category">
      <h2>{category.name}</h2>
      <div className="grid">
        {widgets.map((w) => (
          <WidgetCard key={w.id} widget={w} categoryId={category.id} />
        ))}
        {!q && (
          <div className="card card-add">
            <button className="btn-outline" onClick={onAdd}>
              <span aria-hidden="true">+</span> Add Widget
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
