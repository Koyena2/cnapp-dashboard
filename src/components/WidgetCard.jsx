import { useDispatch } from 'react-redux';
import { removeWidget } from '../store/dashboardSlice';
import { Donut, StackBar, EmptyChart } from './charts';

export default function WidgetCard({ widget, categoryId }) {
  const dispatch = useDispatch();

  let body;
  switch (widget.type) {
    case 'donut':
      body = <Donut {...widget.data} />;
      break;
    case 'stackbar':
      body = <StackBar {...widget.data} />;
      break;
    case 'empty':
      body = <EmptyChart />;
      break;
    default:
      body = <p className="widget-text">{widget.text}</p>;
  }

  return (
    <article className="card">
      <header className="card-head">
        <h3>{widget.name}</h3>
        <button
          className="remove"
          aria-label={`Remove ${widget.name}`}
          onClick={() => dispatch(removeWidget({ categoryId, widgetId: widget.id }))}
        >
          ×
        </button>
      </header>
      <div className="card-body">{body}</div>
    </article>
  );
}
