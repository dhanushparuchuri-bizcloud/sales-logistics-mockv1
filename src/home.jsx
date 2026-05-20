// Sales Home

function KpiSlider({ items }) {
  const trackRef = React.useRef(null);
  const [pos, setPos] = React.useState({ atStart: true, atEnd: false });

  const update = () => {
    const el = trackRef.current; if (!el) return;
    setPos({
      atStart: el.scrollLeft <= 1,
      atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
    });
  };
  React.useEffect(() => { update(); }, []);

  const step = (dir) => {
    const el = trackRef.current; if (!el) return;
    const cardW = el.firstChild?.getBoundingClientRect().width || 280;
    el.scrollBy({ left: dir * cardW, behavior: 'smooth' });
    setTimeout(update, 320);
  };

  return (
    <div className="kpi-wrap">
      <div className="kpi-nav">
        <button onClick={() => step(-1)} disabled={pos.atStart} aria-label="Scroll left"><Ico.ChevronLeft /></button>
        <button onClick={() => step(1)}  disabled={pos.atEnd}   aria-label="Scroll right"><Ico.ChevronRight /></button>
      </div>
      <div className="kpi-track" ref={trackRef} onScroll={update}>
        {items.map((k, i) => (
          <div className="kpi-card" key={i}>
            <div className="label">{k.label}</div>
            <div className={`value ${k.accent === 'blue' ? 'blue' : ''}`}>{k.value}</div>
            <div className="sub">{k.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeadsCompact({ leads, onExpand, onOpenLead }) {
  const top = leads.slice(0, 4);
  return (
    <section className="section">
      <div className="section__head">
        <div className="section__title">
          <h2>My Leads</h2>
          <span className="meta">6 active · $320K pipeline</span>
        </div>
        <button className="expand-btn" onClick={onExpand} aria-label="Expand leads"><Ico.Expand /></button>
      </div>
      <div className="leads-list">
        {top.map(l => (
          <button key={l.id} className="lead-row" onClick={() => onOpenLead && onOpenLead(l)}>
            <div className="lead-company">{l.company}</div>
            <div><span className={`pill pill--${l.stageTone}`}>{l.stage}</span></div>
            <div className="lead-value">{l.value}</div>
            <div className="lead-time">{l.last}</div>
          </button>
        ))}
      </div>
      <button className="more-link" onClick={onExpand}>+{leads.length - 4} more leads →</button>
    </section>
  );
}

function AccountsCompact({ accounts, onExpand, onOpen }) {
  const top = accounts.slice(0, 5);
  return (
    <section className="section">
      <div className="section__head">
        <div className="section__title">
          <h2>My Accounts</h2>
          <span className="meta">6 accounts · 4 need attention</span>
        </div>
        <button className="expand-btn" onClick={onExpand} aria-label="Expand accounts"><Ico.Expand /></button>
      </div>
      <div className="table-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ width: '30%' }}>Account</th>
              <th>Active / Closed</th>
              <th>Revenue</th>
              <th>Health</th>
              <th>Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {top.map(a => (
              <AccountRow key={a.id} a={a} onOpen={onOpen} />
            ))}
          </tbody>
        </table>
      </div>
      <button className="more-link" onClick={onExpand}>+{accounts.length - 5} more accounts →</button>
    </section>
  );
}

function AccountRow({ a, onOpen }) {
  const Trend = a.trend === 'up' ? Ico.ArrowUp : a.trend === 'down' ? Ico.ArrowDown : Ico.ArrowRight;
  const trendClass = a.trend === 'up' ? 'trend-up' : a.trend === 'down' ? 'trend-down' : 'trend-flat';
  return (
    <tr onClick={() => onOpen(a)}>
      <td>
        <div className="acct-name">{a.name}</div>
        <div className="acct-loc">{a.loc}</div>
      </td>
      <td className="num-mono">
        <span className="active">{a.active}</span>
        <span className="closed"> / {a.closed}</span>
      </td>
      <td>
        <span className="rev">
          {a.revenue}
          <span className={trendClass}><Trend /></span>
        </span>
      </td>
      <td>
        <span className={`pill pill--${a.health.tone}`}>{a.health.text}</span>
      </td>
      <td className="last">{a.last}</td>
    </tr>
  );
}

function Fab({ count, onClick }) {
  return (
    <button className="fab" onClick={onClick} aria-label="Open tasks">
      <Ico.Menu />
      {count > 0 && <span className="badge">{count}</span>}
    </button>
  );
}

function AgentsCompact({ agents, onExpand, onOpen }) {
  // Sort agents — problems first
  const sorted = [...agents].sort((a, b) => (b.unanswered - a.unanswered) || (a.winRate - b.winRate));
  const top = sorted.slice(0, 4);
  const needAttention = agents.filter(a => a.winRate < 45 || a.avgResponseH > 10 || a.unanswered > 0).length;
  return (
    <section className="section">
      <div className="section__head">
        <div className="section__title">
          <h2>My Agents</h2>
          <span className="meta">{agents.length} agents · {needAttention} need attention</span>
        </div>
        <button className="expand-btn" onClick={onExpand} aria-label="Expand agents"><Ico.Expand /></button>
      </div>
      <div className="table-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ width: '24%' }}>Agent</th>
              <th>Accounts / Quotes</th>
              <th>Avg Response</th>
              <th>Win Rate</th>
              <th>Top Account</th>
            </tr>
          </thead>
          <tbody>
            {top.map(a => {
              const winBad  = a.winRate < 45;
              const winGood = a.winRate > 70;
              const respBad = a.avgResponseH > 10;
              return (
                <tr key={a.id} style={{ cursor: 'pointer' }} onClick={() => onOpen && onOpen(a)}>
                  <td>
                    <div className="acct-name">{a.name}</div>
                    <div className="acct-loc">{a.station} Station</div>
                  </td>
                  <td className="num-mono">
                    <span className="active">{a.accounts}</span>
                    <span className="closed"> accts · </span>
                    <span className="active">{a.activeQuotes}</span>
                    <span className="closed"> quotes</span>
                  </td>
                  <td className={`num-mono ${respBad ? '' : ''}`} style={respBad ? { color: 'var(--red)', fontWeight: 700 } : null}>
                    {a.avgResponseH}h
                  </td>
                  <td className="num-mono" style={winBad ? { color: 'var(--red)', fontWeight: 700 } : winGood ? { color: 'var(--green)', fontWeight: 700 } : null}>
                    {a.winRate}%
                  </td>
                  <td style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>{a.topAccount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button className="more-link" onClick={onExpand}>+{agents.length - 4} more agents →</button>
    </section>
  );
}

function SalesHome({ onNavigate, onOpenAccount, onOpenAgent }) {
  const [tab, setTab] = React.useState('overview');
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Sales</h1>
          <div className="sub">Mon May 18, 2026 · Kiran V. · 3 stations</div>
        </div>
      </div>

      <div className="home-tabs">
        <button className={`home-tab ${tab === 'overview' ? 'active' : ''}`} onClick={() => setTab('overview')}>Overview</button>
        <button className={`home-tab insights-tab ${tab === 'insights' ? 'active' : ''}`} onClick={() => setTab('insights')}>
          <InsightsTabLabel count={GLOBAL_INTEL.actions.length} />
        </button>
        <button className={`home-tab ${tab === 'activity' ? 'active' : ''}`} onClick={() => setTab('activity')}>Activity</button>
      </div>

      {tab === 'overview' ? (
        <>
          <KpiSlider items={KPIS} />
          <LeadsCompact
            leads={LEADS}
            onExpand={() => onNavigate('leads')}
            onOpenLead={() => onNavigate('leads')}
          />
          <AccountsCompact
            accounts={ACCOUNTS}
            onExpand={() => onNavigate('accounts')}
            onOpen={(a) => onOpenAccount(a)}
          />
          <AgentsCompact
            agents={window.MY_AGENTS || []}
            onExpand={() => onNavigate('agents')}
            onOpen={(a) => onOpenAgent && onOpenAgent(a)}
          />
        </>
      ) : tab === 'activity' ? (
        <ActivityFeed onOpenAccount={(name) => {
          const a = (window.ACCOUNTS || []).find(x => x.name === name) || (window.ACCOUNTS || [])[0];
          if (a) onOpenAccount(a);
        }} />
      ) : (
        <InsightsTab
          onOpenAccount={(name) => {
            const a = (window.ACCOUNTS || []).find(x => x.name === name) || (window.ACCOUNTS || [])[0];
            if (a) onOpenAccount(a);
          }}
          onViewAllAgents={() => onNavigate('agents')}
        />
      )}
    </>
  );
}

Object.assign(window, { SalesHome, AccountRow, Fab });
