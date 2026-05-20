// Global task drawer (v2) — opens from the FAB on the home page only.

const AI_RECS = [
  { id: 'r1', tone: 'red',   account: 'Encore Global',     text: 'Mike mentioned competing offer. No counter sent. $18K.', when: '2h ago' },
  { id: 'r2', tone: 'red',   account: 'Westfield Inc',     text: '$22K quote stalled 6 days. No Ops response.',           when: 'Yesterday' },
  { id: 'r3', tone: 'amber', account: 'Pacific Logistics', text: 'Quote frequency down 35%.',                              when: '3 days' },
  { id: 'r4', tone: 'amber', account: 'Acme Corp',         text: 'CSAT dropped to 2.8. No follow-up.',                     when: '3 days' },
  { id: 'r5', tone: 'blue',  account: 'Encore Global',     text: 'New contact: Linda Park entered Q-1042.',                when: '4 days' },
  { id: 'r6', tone: 'blue',  account: 'SGK Industries',    text: 'QBR scheduled May 28.',                                  when: '5 days' },
];

const MY_TASKS_SEED = [
  { id: 'mt1', text: 'DataCo: Call John re: contract renewal', due: 'Today' },
  { id: 'mt2', text: 'Send case study to trade show lead',     due: 'Wed' },
  { id: 'mt3', text: 'Apex: Prepare pricing proposal',         due: 'Thu' },
];

function TaskDrawer({ open, onClose }) {
  const [period, setPeriod] = React.useState('today');   // today | week | month
  const [tab, setTab]       = React.useState('ai');      // ai | mine
  const [done, setDone]     = React.useState({});

  const toggleDone = (id) => setDone(d => ({ ...d, [id]: !d[id] }));

  const openCount   = MY_TASKS_SEED.filter(t => !done[t.id]).length;
  const doneCount   = MY_TASKS_SEED.length - openCount;
  const urgentCount = AI_RECS.filter(r => r.tone === 'red').length;

  return (
    <>
      <div className={`tdrawer-backdrop ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`tdrawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="tdrawer__head">
          <div className="tdrawer__title-row">
            <div className="tdrawer__title">
              Tasks
              <span className="tdrawer__urgent">{urgentCount} urgent</span>
            </div>
            <button className="tdrawer__close" onClick={onClose} aria-label="Close"><Ico.Close /></button>
          </div>
          <div className="tdrawer__filters">
            <button className={`tdrawer__filt ${period === 'today' ? 'active' : ''}`} onClick={() => setPeriod('today')}>Today</button>
            <button className={`tdrawer__filt ${period === 'week'  ? 'active' : ''}`} onClick={() => setPeriod('week')}>Week</button>
            <button className={`tdrawer__filt ${period === 'month' ? 'active' : ''}`} onClick={() => setPeriod('month')}>Month</button>
          </div>
        </div>

        <div className="tdrawer__tabs">
          <button className={`tdrawer__tab ${tab === 'ai' ? 'active' : ''}`} onClick={() => setTab('ai')}>
            <span className="ai">AI</span>
            <span>Recommendations</span>
            <span className="count">({AI_RECS.length})</span>
          </button>
          <button className={`tdrawer__tab ${tab === 'mine' ? 'active' : ''}`} onClick={() => setTab('mine')}>
            <span>My Tasks</span>
            <span className="count">({MY_TASKS_SEED.length})</span>
          </button>
        </div>

        <div className="tdrawer__body">
          {tab === 'ai' ? (
            <>
              <div className="tdrawer__sub">Based on email analysis across your accounts</div>
              {AI_RECS.map(r => (
                <div className="rec-row" key={r.id}>
                  <span className={`pdot ${r.tone}`} />
                  <div>
                    <div className="acct">{r.account}</div>
                    <div className="desc">{r.text}</div>
                  </div>
                  <div className="when">{r.when}</div>
                </div>
              ))}
              <div className="tdrawer__foot-hint">Click any recommendation to view details</div>
            </>
          ) : (
            <>
              <div className="tdrawer__sub">{openCount} open · {doneCount} completed</div>
              {MY_TASKS_SEED.map(t => {
                const isDone = !!done[t.id];
                return (
                  <div className={`mt-row ${isDone ? 'done' : ''}`} key={t.id}>
                    <button
                      className={`mt-check ${isDone ? 'done' : ''}`}
                      onClick={() => toggleDone(t.id)}
                      aria-label="Toggle complete"
                    >
                      {isDone && <Ico.Check style={{ color: '#fff' }} />}
                    </button>
                    <div className="ttl">{t.text}</div>
                    <div className="due">Due: {t.due}</div>
                  </div>
                );
              })}
              <button className="tdrawer__add">
                <Ico.Plus /> Add Task
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

window.TaskDrawer = TaskDrawer;
