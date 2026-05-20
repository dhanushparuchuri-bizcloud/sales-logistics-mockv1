// Accounts full page — renamed "My Customers" with KPI summary cards

function AccountsPage({ onBack, onOpen }) {
  const [period, setPeriod] = React.useState('This Quarter');
  const [health, setHealth] = React.useState('All');
  const [query, setQuery] = React.useState('');

  const matchesHealth = (a) => {
    if (health === 'All') return true;
    if (health === 'Needs Attention') return a.health.tone === 'red' || a.health.tone === 'amber';
    if (health === 'On Track') return a.health.tone === 'green';
    if (health === 'Quiet') return a.health.tone === 'grey';
    return true;
  };

  const filtered = ACCOUNTS.filter(a => {
    if (!matchesHealth(a)) return false;
    if (query) {
      const q = query.toLowerCase();
      return (
        a.name.toLowerCase().includes(q) ||
        a.station.toLowerCase().includes(q) ||
        a.agent.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const needsAttention = ACCOUNTS.filter(a => a.health.tone === 'red' || a.health.tone === 'amber' || a.health.tone === 'grey').length;
  const totalRevenue = ACCOUNTS.reduce((s, a) => s + parseInt(a.revenue.replace(/[^0-9]/g, ''), 10), 0);
  const totalOpen = ACCOUNTS.reduce((s, a) => s + a.active, 0);
  const avgWinRate = 58;

  return (
    <>
      <div className="crumbs" style={{ marginBottom: 18 }}>
        <button onClick={onBack}><Ico.ChevronLeft /> Back to Dashboard</button>
      </div>

      <div className="page-head">
        <div>
          <h1>My Customers</h1>
          <div className="sub">{ACCOUNTS.length} customers · {needsAttention} need attention</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <FilterDropdown
            label="Period"
            value={period}
            options={['This Quarter', 'This Month', 'This Year']}
            onChange={setPeriod}
          />
          <FilterDropdown
            label="Health"
            value={health}
            options={['All', 'Needs Attention', 'On Track', 'Quiet']}
            onChange={setHealth}
          />
        </div>
      </div>

      <div className="search search--full">
        <Ico.Search />
        <input
          placeholder="Search customers by name, station, or agent..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* KPI summary bar */}
      <div className="agents-summary" style={{ marginTop: 24 }}>
        <div className="agents-summary__cell">
          <div className="label">Total Revenue</div>
          <div className="value">${totalRevenue}K</div>
          <div className="sub">this quarter</div>
        </div>
        <div className="agents-summary__cell">
          <div className="label">Portfolio Win Rate</div>
          <div className="value">{avgWinRate}%</div>
          <div className="sub">this quarter</div>
        </div>
        <div className="agents-summary__cell">
          <div className="label">Active Pipeline</div>
          <div className="value blue">{totalOpen}</div>
          <div className="sub">open quotes</div>
        </div>
        <div className="agents-summary__cell">
          <div className="label">Customers Needing Attention</div>
          <div className={`value ${needsAttention > 0 ? 'red' : ''}`}>{needsAttention}</div>
          <div className="sub">need attention</div>
        </div>
      </div>

      <div className="table-wrap" style={{ marginTop: 24 }}>
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ width: '22%' }}>Customer</th>
              <th>Station</th>
              <th>Ops Agent</th>
              <th>Active / Closed</th>
              <th>Revenue</th>
              <th>Health</th>
              <th>Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => {
              const Trend = a.trend === 'up' ? Ico.ArrowUp : a.trend === 'down' ? Ico.ArrowDown : Ico.ArrowRight;
              const trendClass = a.trend === 'up' ? 'trend-up' : a.trend === 'down' ? 'trend-down' : 'trend-flat';
              return (
                <tr key={a.id} onClick={() => onOpen(a)}>
                  <td>
                    <div className="acct-name">{a.name}</div>
                  </td>
                  <td><span className="mono" style={{ fontSize: 13.5 }}>{a.station}</span></td>
                  <td style={{ fontSize: 14, color: 'var(--ink-soft)' }}>{a.agent}</td>
                  <td className="num-mono">
                    <span className="active">{a.active}</span>
                    <span className="closed"> / {a.closed}</span>
                  </td>
                  <td>
                    <span className="rev">{a.revenue}<span className={trendClass}><Trend /></span></span>
                  </td>
                  <td><span className={`pill pill--${a.health.tone}`}>{a.health.text}</span></td>
                  <td className="last">{a.last}</td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--muted)' }}>
                  <div className="label" style={{ marginBottom: 6 }}>No customers match</div>
                  Try clearing filters or the search query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

window.AccountsPage = AccountsPage;
