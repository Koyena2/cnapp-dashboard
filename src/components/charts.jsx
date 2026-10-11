const sum = (segments) => segments.reduce((a, s) => a + s.value, 0);

export function Donut({ total, totalLabel, segments }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const all = sum(segments);
  let offset = 0;

  return (
    <div className="donut-wrap">
      <svg viewBox="0 0 140 140" className="donut" role="img" aria-label="Donut chart">
        <g transform="rotate(-90 70 70)">
          {segments.map((s) => {
            const len = (s.value / all) * c;
            const el = (
              <circle
                key={s.label}
                cx="70"
                cy="70"
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth="20"
                strokeDasharray={`${len} ${c - len}`}
                strokeDashoffset={-offset}
              />
            );
            offset += len;
            return el;
          })}
        </g>
        <text x="70" y="68" textAnchor="middle" className="donut-total">
          {total}
        </text>
        <text x="70" y="82" textAnchor="middle" className="donut-label">
          {totalLabel}
        </text>
      </svg>
      <ul className="legend">
        {segments.map((s) => (
          <li key={s.label}>
            <i style={{ background: s.color }} />
            {s.label} ({s.value})
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StackBar({ total, totalLabel, segments }) {
  const all = sum(segments);
  return (
    <div>
      <p className="bar-total">
        <strong>{total}</strong> {totalLabel}
      </p>
      <div className="stack">
        {segments.map((s) => (
          <span key={s.label} style={{ width: `${(s.value / all) * 100}%`, background: s.color }} />
        ))}
      </div>
      <ul className="legend legend-grid">
        {segments.map((s) => (
          <li key={s.label}>
            <i style={{ background: s.color }} />
            {s.label} ({s.value})
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EmptyChart() {
  return (
    <div className="empty">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#b8bfce" strokeWidth="1.6">
        <rect x="5" y="22" width="5" height="12" />
        <rect x="14" y="16" width="5" height="18" />
        <rect x="23" y="20" width="5" height="14" />
        <rect x="32" y="10" width="5" height="24" />
        <path d="m5 16 9-6 9 4 12-9" />
      </svg>
      <span>No Graph data available!</span>
    </div>
  );
}
