// Bottom peek + Pinned floating card variants

function BottomPeek({ open, onToggle }) {
  const [tab, setTab] = React.useState('today');
  const [done, setDone] = React.useState({});
  const toggle = (id) => setDone(d => ({ ...d, [id]: !d[id] }));

  const urgent = TASKS.find(t => t.tone === 'overdue') || TASKS.find(t => t.tone === 'today') || TASKS[0];
  const filtered = tab === 'today'
    ? TASKS.filter(t => t.tone === 'today' || t.tone === 'overdue')
    : tab === 'upcoming'
      ? TASKS.filter(t => !t.tone)
      : TASKS;

  return (
    <div className={`peek ${open ? 'open' : 'closed'}`}>
      <div className="peek__bar" onClick={onToggle}>
        <div className="peek__count">
          <span className="dot" />
          Tasks · 6
          <span className="peek__pill">2 due</span>
        </div>
        <div className="peek__urgent">
          <span className={`due ${urgent.tone === 'today' ? 'today' : ''}`}>{urgent.due}</span>
          <span className="title">{urgent.title}</span>
          <span className="meta">· {urgent.meta.replace(/^[^·]+·\s*/, '')}</span>
        </div>
        <div className="peek__expand">
          <span>{open ? 'Collapse' : 'Expand'}</span>
          <span className="peek__chev"><Ico.ChevronUp /></span>
        </div>
      </div>

      <div className="peek__body" style={{ display: open ? 'block' : 'none' }}>
        <div className="peek__head-row">
          <h4>My Tasks</h4>
          <div className="peek__tabs">
            <button className={`peek__tab ${tab === 'today' ? 'active' : ''}`} onClick={() => setTab('today')}>Today · {TASKS.filter(t => t.tone).length}</button>
            <button className={`peek__tab ${tab === 'upcoming' ? 'active' : ''}`} onClick={() => setTab('upcoming')}>Upcoming · {TASKS.filter(t => !t.tone).length}</button>
            <button className={`peek__tab ${tab === 'all' ? 'active' : ''}`} onClick={() => setTab('all')}>All · {TASKS.length}</button>
          </div>
        </div>
        {filtered.map(t => {
          const isDone = !!done[t.id];
          return (
            <div className="task" key={t.id}>
              <button className={`task__check ${isDone ? 'done' : ''}`} onClick={() => toggle(t.id)}>
                {isDone && <Ico.Check style={{ color: '#fff' }} />}
              </button>
              <div>
                <div className={`task__title ${isDone ? 'done' : ''}`}>{t.title}</div>
                <div className="task__meta">{t.meta}</div>
              </div>
              <div className={`task__due ${t.tone}`}>{t.due}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PinnedCard({ open, onToggle }) {
  const [tab, setTab] = React.useState('today');
  const [done, setDone] = React.useState({});
  const toggleDone = (id) => setDone(d => ({ ...d, [id]: !d[id] }));

  // top 3 for collapsed preview
  const sorted = [
    ...TASKS.filter(t => t.tone === 'overdue'),
    ...TASKS.filter(t => t.tone === 'today'),
    ...TASKS.filter(t => !t.tone),
  ];
  const top = sorted.slice(0, 3);

  const filtered = tab === 'today'
    ? TASKS.filter(t => t.tone === 'today' || t.tone === 'overdue')
    : tab === 'upcoming'
      ? TASKS.filter(t => !t.tone)
      : TASKS;

  return (
    <div className={`card-pin ${open ? 'expanded' : 'collapsed'}`}>
      <div className="card-pin__head" onClick={onToggle}>
        <div className="card-pin__title">
          Tasks
          <span className="count alert">2</span>
          {!open && <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: 12.5, marginLeft: 2 }}>· 6 open</span>}
        </div>
        <span className="card-pin__chev"><Ico.ChevronUp /></span>
      </div>

      {!open && (
        <div className="card-pin__preview">
          {top.map(t => (
            <div className="preview-task" key={t.id}>
              <span className={`marker ${t.tone || ''}`} />
              <div>
                <div className="ttl">{t.title}</div>
                <div className={`due ${t.tone || ''}`}>{t.due} · {t.meta.replace(/^[^·]+·\s*/, '')}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <>
          <div className="card-pin__tabs">
            <button className={`peek__tab ${tab === 'today' ? 'active' : ''}`} onClick={() => setTab('today')}>Today</button>
            <button className={`peek__tab ${tab === 'upcoming' ? 'active' : ''}`} onClick={() => setTab('upcoming')}>Upcoming</button>
            <button className={`peek__tab ${tab === 'all' ? 'active' : ''}`} onClick={() => setTab('all')}>All</button>
          </div>
          <div className="card-pin__body">
            {filtered.map(t => {
              const isDone = !!done[t.id];
              return (
                <div className="task" key={t.id}>
                  <button className={`task__check ${isDone ? 'done' : ''}`} onClick={() => toggleDone(t.id)}>
                    {isDone && <Ico.Check style={{ color: '#fff' }} />}
                  </button>
                  <div>
                    <div className={`task__title ${isDone ? 'done' : ''}`}>{t.title}</div>
                    <div className="task__meta">{t.meta}</div>
                  </div>
                  <div className={`task__due ${t.tone}`}>{t.due}</div>
                </div>
              );
            })}
          </div>
          <div className="card-pin__foot">
            <button className="btn" style={{ width: '100%', justifyContent: 'center' }}>
              <Ico.Plus /> Add Task
            </button>
          </div>
        </>
      )}
    </div>
  );
}

window.BottomPeek = BottomPeek;
window.PinnedCard = PinnedCard;
