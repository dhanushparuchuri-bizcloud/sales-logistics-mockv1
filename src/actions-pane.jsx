// Actions Pane — slide-out from right (push pattern).
// State + add API in actions-store.jsx.

function ActionsPane({ onJumpToSource }) {
  const state = useActions();
  const [filter, setFilter] = React.useState('all');
  const [showCompleted, setShowCompleted] = React.useState(false);
  const [draft, setDraft] = React.useState('');

  // Keyboard shortcut: ⌘. or A
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && state.open) ActionsStore.close();
      else if ((e.metaKey || e.ctrlKey) && e.key === '.') {
        e.preventDefault();
        ActionsStore.toggle();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state.open]);

  const items = state.items.filter(i => !i.done);
  const completed = state.items.filter(i => i.done);

  const filtered = items.filter(i => {
    if (filter === 'today') return i.dueLabel === 'Today';
    return true;
  });

  // Group by due
  const groups = {
    'Today':       filtered.filter(i => i.dueLabel === 'Today'),
    'This Week':   filtered.filter(i => i.dueLabel && i.dueLabel !== 'Today' && i.dueLabel !== 'No due date'),
    'No due date': filtered.filter(i => !i.dueLabel || i.dueLabel === 'No due date'),
  };

  const submitDraft = (e) => {
    if (e.key === 'Enter' && draft.trim()) {
      ActionsStore.addManual(draft);
      setDraft('');
    }
  };

  const openCount = items.length;

  return (
    <aside className={`actions-pane ${state.open ? 'open' : ''}`} aria-hidden={!state.open}>
      <div className="actions-pane__head">
        <span className="actions-pane__title">
          My Actions
          <span className="actions-pane__count">{openCount}</span>
        </span>
        <button className="actions-pane__close" onClick={() => ActionsStore.close()} aria-label="Close">
          <Ico.Close />
        </button>
      </div>

      <div className="actions-pane__add">
        <input
          className="actions-pane__add-input"
          placeholder="Add an action..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={submitDraft}
        />
      </div>

      <div className="actions-pane__filters">
        <button className={`actions-pane__filt ${filter === 'all'   ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`actions-pane__filt ${filter === 'today' ? 'active' : ''}`} onClick={() => setFilter('today')}>Today</button>
      </div>

      <div className="actions-pane__body">
        {filtered.length === 0 ? (
          <div className="actions-pane__empty">
            No actions yet. Tap <strong>+</strong> on any AI recommendation to add it here, or type one above.
          </div>
        ) : (
          Object.entries(groups).map(([label, list]) => (
            list.length > 0 && (
              <React.Fragment key={label}>
                <div className="actions-pane__section-title">{label}</div>
                {list.map(it => <ActionItem key={it.id} item={it} onJumpToSource={onJumpToSource} />)}
              </React.Fragment>
            )
          ))
        )}

        {completed.length > 0 && (
          <>
            <button className="actions-pane__completed-toggle" onClick={() => setShowCompleted(s => !s)}>
              Completed ({completed.length}) {showCompleted ? '↑' : '↓'}
            </button>
            {showCompleted && completed.map(it => (
              <ActionItem key={it.id} item={it} onJumpToSource={onJumpToSource} />
            ))}
          </>
        )}
      </div>
    </aside>
  );
}

function ActionItem({ item, onJumpToSource }) {
  return (
    <div className={`actions-pane__item ${item.done ? 'done' : ''}`}>
      <button
        className={`actions-pane__check ${item.done ? 'done' : ''}`}
        onClick={() => ActionsStore.toggleDone(item.id)}
        aria-label="Toggle done"
      >
        {item.done && <Ico.Check style={{ color: '#fff', width: 11, height: 11 }} />}
      </button>
      <div className="actions-pane__item-body">
        <div className="actions-pane__item-title">
          {item.priority && <span className={`pdot ${item.priority === 'red' ? 'red' : item.priority === 'amber' ? 'amber' : 'blue'}`}
            style={{ background: item.priority === 'red' ? 'var(--red)' : item.priority === 'amber' ? 'var(--amber)' : 'var(--blue)' }} />}
          <span>{item.text}</span>
        </div>
        <div className="actions-pane__item-meta">
          {item.account && (
            <button className="actions-pane__source-link" onClick={() => onJumpToSource && onJumpToSource(item)}>
              {item.account}{item.sourceRef ? ` · ${item.sourceRef}` : ''} →
            </button>
          )}
          {item.dueLabel && (
            <span className={`actions-pane__due ${item.dueLabel === 'Overdue' ? 'red' : ''}`}>{item.dueLabel}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// Header button that shows count + toggles the pane (used as a fixed/sticky element)
function ActionsHeaderButton({ fixed }) {
  const state = useActions();
  const open = state.items.filter(i => !i.done).length;
  const hasUrgent = state.items.some(i => !i.done && i.priority === 'red');
  return (
    <button
      className={fixed ? 'fixed-actions-btn' : 'header__actions-btn'}
      onClick={() => ActionsStore.toggle()}
      aria-label="Open my actions"
    >
      <span className="ic">✦</span>
      Actions
      <span className={`ct ${hasUrgent ? 'red' : ''}`}>{open}</span>
    </button>
  );
}

// Toast — bottom-center confirmation when an action is captured
function ActionToast() {
  const state = useActions();
  const t = state.toast;
  const [out, setOut] = React.useState(false);

  React.useEffect(() => {
    if (!t) { setOut(false); return; }
    setOut(false);
    const fadeAt = setTimeout(() => setOut(true), 4200);
    const dismissAt = setTimeout(() => ActionsStore.dismissToast(), 4500);
    return () => { clearTimeout(fadeAt); clearTimeout(dismissAt); };
  }, [t?.stamp]);

  if (!t) return null;
  return (
    <div className="toast-stack">
      <div className={`toast ${out ? 'out' : ''}`}>
        <span className="check">✓</span>
        <span>Added to your Actions</span>
        <button onClick={() => { ActionsStore.dismissToast(); ActionsStore.open(); }}>Open pane</button>
      </div>
    </div>
  );
}

window.ActionsPane = ActionsPane;
window.ActionsHeaderButton = ActionsHeaderButton;
window.ActionToast = ActionToast;
