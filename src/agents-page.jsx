// My Agents — global agent table data + page

const MY_AGENTS = [
  { id: 'a-c', name: 'Agent C',   station: 'Baltimore',
    accounts: 3, activeQuotes: 4, sentimentDot: 'red',   sentimentWord: 'Transactional',
    winRate: 38, avgResponseH: 14.2, followUpRate: 61, unanswered: 3,
    topAccount: 'Westfield Inc',
    tipTitle: 'Overall customer sentiment: Transactional',
    tipBody: 'Handles 3 of your accounts (Westfield, Crestline, Encore overflow). All metrics significantly below portfolio average. Customers respond with shorter emails and minimal context. On Westfield: 2 unanswered emails, oldest 48h. On Crestline: 1 unanswered, account has gone quiet. Encore Q-0910 and Q-0841 both lost with slow response cited. Pattern: delays first response 2-3 days, then sends incomplete replies.' },
  { id: 'a-d', name: 'Diana S.',  station: 'Baltimore',
    accounts: 2, activeQuotes: 3, sentimentDot: 'red',   sentimentWord: 'Curt',
    winRate: 52, avgResponseH: 7.8, followUpRate: 76, unanswered: 1,
    topAccount: 'Crestline Supply',
    tipTitle: 'Overall customer sentiment: Curt',
    tipBody: 'Handles 2 accounts. Response time is acceptable but follow-up rate is lowest in portfolio at 76%. Tends to send initial quote then doesn\'t follow up when customer goes quiet. Customers respond with minimal detail. 1 unanswered question on active quote.' },
  { id: 'a-j', name: 'James R.',  station: 'DFW',
    accounts: 18, activeQuotes: 22, sentimentDot: 'green', sentimentWord: 'Warm',
    winRate: 68, avgResponseH: 4.1, followUpRate: 92, unanswered: 0,
    topAccount: 'Encore Global',
    tipTitle: 'Overall customer sentiment: Warm',
    tipBody: 'Carries the largest book at 18 accounts. Customers consistently use casual greetings, add shipment context proactively, and direct requests to James by name. Strong across all metrics. One flag: response time trending up from 3.2h last quarter to 4.1h, suggesting approaching capacity. No current issues.' },
  { id: 'a-m', name: 'Maria T.',  station: 'NYC',
    accounts: 8, activeQuotes: 12, sentimentDot: 'green', sentimentWord: 'Professional',
    winRate: 71, avgResponseH: 5.3, followUpRate: 85, unanswered: 0,
    topAccount: 'Pacific Logistics',
    tipTitle: 'Overall customer sentiment: Professional',
    tipBody: 'Handles 8 accounts across NYC-origin lanes. Communication is business-appropriate and thorough. Customers respond promptly. Solid performer with no concerns.' },
  { id: 'a-s', name: 'Sam P.',    station: 'Chicago',
    accounts: 5, activeQuotes: 6, sentimentDot: 'green', sentimentWord: 'Collaborative',
    winRate: 78, avgResponseH: 3.8, followUpRate: 94, unanswered: 0,
    topAccount: 'SGK Industries',
    tipTitle: 'Overall customer sentiment: Collaborative',
    tipBody: 'Highest win rate and fastest response in your portfolio. Customers are proactive in sharing shipment details. Small book (5 accounts) with room for more. Strong candidate for additional account assignments.' },
  { id: 'a-k', name: 'Kevin L.',  station: 'DFW',
    accounts: 6, activeQuotes: 8, sentimentDot: 'grey',  sentimentWord: 'Neutral',
    winRate: 62, avgResponseH: 5.8, followUpRate: 88, unanswered: 0,
    topAccount: 'Acme Corp',
    tipTitle: 'Overall customer sentiment: Neutral',
    tipBody: 'Solid mid-tier performer. Handles 6 accounts at DFW. Standard business communication patterns. No issues, no standout strengths. Metrics are at portfolio average.' },
  { id: 'a-t', name: 'Tom K.',    station: 'Chicago',
    accounts: 3, activeQuotes: 3, sentimentDot: 'grey',  sentimentWord: 'Neutral',
    winRate: 65, avgResponseH: 6.1, followUpRate: 82, unanswered: 0,
    topAccount: 'Halcyon Bio',
    tipTitle: 'Overall customer sentiment: Neutral',
    tipBody: 'Small book, 3 accounts. Performance is within normal range. Limited email volume makes sentiment assessment less reliable.' },
  { id: 'a-r', name: 'Rachel W.', station: 'NYC',
    accounts: 4, activeQuotes: 5, sentimentDot: 'green', sentimentWord: 'Professional',
    winRate: 74, avgResponseH: 4.5, followUpRate: 90, unanswered: 0,
    topAccount: 'Meridian Events',
    tipTitle: 'Overall customer sentiment: Professional',
    tipBody: 'Handles 4 accounts. Strong follow-up discipline. Customers are responsive and communication flows smoothly. Good performer with capacity for more accounts.' },
];

const STATIONS = [
  { name: 'DFW',       agents: 3, accounts: 24, resp: 4.6,  win: 67, unanswered: 0, weak: false },
  { name: 'NYC',       agents: 2, accounts: 12, resp: 5.0,  win: 72, unanswered: 0, weak: false },
  { name: 'Chicago',   agents: 2, accounts: 8,  resp: 4.8,  win: 71, unanswered: 0, weak: false },
  { name: 'Baltimore', agents: 2, accounts: 5,  resp: 11.0, win: 41, unanswered: 4, weak: true  },
];

window.MY_AGENTS = MY_AGENTS;
window.STATIONS  = STATIONS;

// ===== Info-cell + tooltip (reuses agent-info pattern) =====

function AgentsPageInfoCell({ title, body }) {
  const [open, setOpen] = React.useState(false);
  return (
    <td
      className={`info-cell agent-info center ${open ? 'open' : ''}`}
      onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
    >
      <button className="info-icon" aria-label="More info">i</button>
      <div className="info-tooltip" role="tooltip" style={{ width: 300 }}>
        <div className="ttl">{title}</div>
        <div className="det">{body}</div>
      </div>
    </td>
  );
}

// ===== Page =====

function AgentsPage({ onBack, onOpenAgent }) {
  const [period, setPeriod]   = React.useState('This Quarter');
  const [station, setStation] = React.useState('All Stations');
  const [query, setQuery]     = React.useState('');
  const [sortBy, setSortBy]   = React.useState('default');
  const [sortDir, setSortDir] = React.useState('desc');

  const winClass  = (w) => w < 45 ? 'bad' : w > 70 ? 'good' : 'neu';
  const respClass = (r) => r > 10 ? 'bad' : 'neu';
  const followClass = (f) => f < 65 ? 'bad' : 'neu';

  const filtered = MY_AGENTS.filter(a => {
    if (station !== 'All Stations' && a.station !== station) return false;
    if (query) {
      const q = query.toLowerCase();
      if (!a.name.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const sorted = [...filtered];
  if (sortBy === 'default') {
    sorted.sort((a, b) => (b.unanswered - a.unanswered) || (a.winRate - b.winRate));
  } else {
    const cmp = (a, b) => {
      const va = a[sortBy], vb = b[sortBy];
      if (typeof va === 'string') return va.localeCompare(vb);
      return va - vb;
    };
    sorted.sort((a, b) => sortDir === 'asc' ? cmp(a, b) : cmp(b, a));
  }

  const setSort = (col) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('desc'); }
  };
  const sortArrow = (col) => sortBy === col ? (sortDir === 'asc' ? '▲' : '▼') : '';

  // Aggregate KPIs
  const totalAccounts   = MY_AGENTS.reduce((s, a) => s + a.accounts, 0);
  const portfolioResp   = (MY_AGENTS.reduce((s, a) => s + a.avgResponseH * a.accounts, 0) / totalAccounts).toFixed(1);
  const portfolioWin    = Math.round(MY_AGENTS.reduce((s, a) => s + a.winRate * a.accounts, 0) / totalAccounts);
  const totalUnanswered = MY_AGENTS.reduce((s, a) => s + a.unanswered, 0);
  const needAttention   = MY_AGENTS.filter(a => a.winRate < 45 || a.avgResponseH > 10 || a.unanswered > 0).length;

  return (
    <>
      <div className="crumbs" style={{ marginBottom: 18 }}>
        <button onClick={onBack}><Ico.ChevronLeft /> Dashboard</button>
      </div>

      <div className="page-head">
        <div>
          <h1>My Agents</h1>
          <div className="sub">{MY_AGENTS.length} agents handling your accounts across 4 stations</div>
        </div>
      </div>

      <div className="toolbar">
        <div className="search">
          <Ico.Search />
          <input
            placeholder="Search by agent name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <FilterDropdown
          label="Period"
          value={period}
          options={['This Month', 'This Quarter', 'This Year']}
          onChange={setPeriod}
        />
        <FilterDropdown
          label="Station"
          value={station}
          options={['All Stations', 'DFW', 'NYC', 'Chicago', 'Baltimore']}
          onChange={setStation}
        />
      </div>

      {/* Summary bar */}
      <div className="agents-summary">
        <div className="agents-summary__cell">
          <div className="label">Portfolio Avg Response</div>
          <div className="value">{portfolioResp}h</div>
          <div className="sub">across all agents</div>
        </div>
        <div className="agents-summary__cell">
          <div className="label">Portfolio Win Rate</div>
          <div className="value">{portfolioWin}%</div>
          <div className="sub">across all agents</div>
        </div>
        <div className="agents-summary__cell">
          <div className="label">Total Unanswered</div>
          <div className={`value ${totalUnanswered > 0 ? 'blue' : ''}`}>{totalUnanswered}</div>
          <div className="sub">customer emails</div>
        </div>
        <div className="agents-summary__cell">
          <div className="label">Agents Needing Attention</div>
          <div className={`value ${needAttention > 0 ? 'red' : ''}`}>{needAttention}</div>
          <div className="sub">below performance threshold</div>
        </div>
      </div>

      <div className="table-wrap">
        <table className="agents-page-tbl">
          <thead>
            <tr>
              <th onClick={() => setSort('name')}>Agent <span className="sort">{sortArrow('name')}</span></th>
              <th onClick={() => setSort('station')}>Station <span className="sort">{sortArrow('station')}</span></th>
              <th className="r" onClick={() => setSort('accounts')}>Accounts <span className="sort">{sortArrow('accounts')}</span></th>
              <th className="r" onClick={() => setSort('activeQuotes')}>Active Quotes <span className="sort">{sortArrow('activeQuotes')}</span></th>
              <th onClick={() => setSort('sentimentWord')}>Sentiment <span className="sort">{sortArrow('sentimentWord')}</span></th>
              <th className="r" onClick={() => setSort('winRate')}>Win Rate <span className="sort">{sortArrow('winRate')}</span></th>
              <th className="r" onClick={() => setSort('avgResponseH')}>Avg Response <span className="sort">{sortArrow('avgResponseH')}</span></th>
              <th className="r" onClick={() => setSort('followUpRate')}>Follow-up Rate <span className="sort">{sortArrow('followUpRate')}</span></th>
              <th className="r" onClick={() => setSort('unanswered')}>Unanswered <span className="sort">{sortArrow('unanswered')}</span></th>
              <th className="center" aria-label=""></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(ag => (
              <tr key={ag.id} style={{ cursor: 'pointer' }} onClick={() => onOpenAgent && onOpenAgent(ag)}>
                <td><span className="nm">{ag.name}</span></td>
                <td><span className="stn">{ag.station}</span></td>
                <td className="r">{ag.accounts}</td>
                <td className="r">{ag.activeQuotes}</td>
                <td>
                  <span className={`sent-pill ${ag.sentimentDot}`}>
                    <span className="sdot" />
                    {ag.sentimentWord}
                  </span>
                </td>
                <td className={`r ${winClass(ag.winRate)}`}>{ag.winRate}%</td>
                <td className={`r ${respClass(ag.avgResponseH)}`}>{ag.avgResponseH}h</td>
                <td className={`r ${followClass(ag.followUpRate)}`}>{ag.followUpRate}%</td>
                <td className={`r ${ag.unanswered > 0 ? 'bad' : 'neu'}`}>{ag.unanswered}</td>
                <AgentsPageInfoCell title={ag.tipTitle} body={ag.tipBody} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Station Performance */}
      <div className="station-section">
        <div className="station-section__title">Station Performance on Your Accounts</div>
        <table className="station-page-tbl">
          <thead>
            <tr>
              <th>Station</th>
              <th className="r">Agents</th>
              <th className="r">Accounts</th>
              <th className="r">Avg Response</th>
              <th className="r">Win Rate</th>
              <th className="r">Unanswered</th>
            </tr>
          </thead>
          <tbody>
            {STATIONS.map(s => (
              <tr key={s.name}>
                <td><span className="stn">{s.name}</span></td>
                <td className="r">{s.agents}</td>
                <td className="r">{s.accounts}</td>
                <td className={`r ${s.weak ? 'bad' : ''}`}>{s.resp.toFixed(1)}h</td>
                <td className={`r ${s.weak ? 'bad' : ''}`}>{s.win}%</td>
                <td className={`r ${s.unanswered > 0 ? 'bad' : ''}`}>{s.unanswered}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="station-ai-note">
          Baltimore station is handling 5 of your accounts with 11h avg response and 41% win rate, well below portfolio averages (6.2h, 62%). Both Baltimore agents (Agent C, Diana S.) are underperforming. Consider discussing account reallocation with the station manager.
        </div>
      </div>
    </>
  );
}

window.AgentsPage = AgentsPage;
