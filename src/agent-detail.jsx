// Agent Detail page — opens when clicking an agent row

// Per-agent customer roster (mock data — scoped to this Sales rep)
const AGENT_CUSTOMERS = {
  'a-j': [ // James R.
    { id: 'c1', name: 'Encore Global',    quotes: 4, winRate: 71, respH: 4.1, sent: { dot: 'green', word: 'Warm'         }, last: '2 days ago',
      comparable: { lane: 'ORD→LAX White Glove', peers: [{ name: 'James', win: 71, self: true }, { name: 'Maria T.', win: 65 }, { name: 'Agent C', win: 0 }], note: 'James outperforms peers on this customer\'s primary lane.', noteTone: 'pos' } },
    { id: 'c2', name: 'Acme Corp',        quotes: 3, winRate: 65, respH: 3.8, sent: { dot: 'green', word: 'Professional' }, last: '3 days ago',
      comparable: { lane: 'DFW→MIA Expedited', peers: [{ name: 'James', win: 65, self: true }, { name: 'Sam P.', win: 71 }, { name: 'Kevin L.', win: 60 }], note: 'Sam P. outperforms James on this lane by 6 points.', noteTone: 'neu' } },
    { id: 'c3', name: 'Nova Dynamics',    quotes: 3, winRate: 78, respH: 3.5, sent: { dot: 'green', word: 'Collaborative'}, last: 'Today',
      comparable: { lane: 'ORD→SFO White Glove', peers: [{ name: 'James', win: 78, self: true }, { name: 'Maria T.', win: 70 }], note: 'James leads on this lane.', noteTone: 'pos' } },
    { id: 'c4', name: 'SGK Industries',   quotes: 1, winRate: 82, respH: 2.9, sent: { dot: 'green', word: 'Warm'         }, last: '1 day ago',
      comparable: { lane: 'SFO→JFK Ground', peers: [{ name: 'James', win: 82, self: true }, { name: 'Rachel W.', win: 74 }], note: 'James is the top performer on this lane.', noteTone: 'pos' } },
    { id: 'c5', name: 'Meridian Events',  quotes: 2, winRate: 70, respH: 4.5, sent: { dot: 'grey',  word: 'Neutral'      }, last: '2 days ago',
      comparable: { lane: 'NYC→LAX Ground', peers: [{ name: 'James', win: 70, self: true }, { name: 'Maria T.', win: 78 }], note: 'Maria T. outperforms James on this lane by 8 points.', noteTone: 'neu' } },
  ],
  'a-c': [ // Agent C
    { id: 'c8',  name: 'Westfield Inc',    quotes: 2, winRate: 33, respH: 16.1, sent: { dot: 'red', word: 'Transactional' }, last: '18 days ago', flag: true,
      comparable: { lane: 'ORD→LAX Ground', peers: [{ name: 'Agent C', win: 33, self: true }, { name: 'James R.', win: 55 }, { name: 'Maria T.', win: 52 }], note: 'Agent C is 19-22 points below peers on this lane.', noteTone: 'neg' } },
    { id: 'c9',  name: 'Crestline Supply', quotes: 1, winRate: 50, respH: 12.8, sent: { dot: 'red', word: 'Curt'          }, last: '12 days ago', flag: true,
      comparable: { lane: 'ORD→DFW Ground', peers: [{ name: 'Agent C', win: 50, self: true }, { name: 'Kevin L.', win: 68 }, { name: 'Sam P.', win: 65 }], note: 'Agent C is 15-18 points below peers on this lane.', noteTone: 'neg' } },
    { id: 'c10', name: 'Pacific Logistics',quotes: 1, winRate: 40, respH: 11.2, sent: { dot: 'amber', word: 'Neutral'     }, last: '5 days ago',
      comparable: { lane: 'LAX→ORD Ground', peers: [{ name: 'Agent C', win: 40, self: true }, { name: 'James R.', win: 55 }], note: 'Agent C is 15 points below peers on this lane.', noteTone: 'neg' } },
  ],
};

// Trend data per agent
const AGENT_TRENDS = {
  'a-j': {
    winRate:     { months: ['Dec','Jan','Feb','Mar','Apr','May'], values: [72, 70, 68, 66, 70, 68],       dir: 'amber', current: '68%' },
    quoteVolume: { months: ['Dec','Jan','Feb','Mar','Apr','May'], values: [14, 16, 18, 16, 20, 22],       current: '22 quotes' },
  },
  'a-c': {
    winRate:     { months: ['Dec','Jan','Feb','Mar','Apr','May'], values: [45, 42, 40, 38, 35, 38],       dir: 'red',   current: '38%' },
    quoteVolume: { months: ['Dec','Jan','Feb','Mar','Apr','May'], values: [4, 5, 3, 4, 4, 4],             current: '4 quotes' },
  },
};

const AGENT_SERVICES = {
  'a-j': [
    { name: 'White Glove', quotes: 8, win: 78 },
    { name: 'Expedited',   quotes: 6, win: 72 },
    { name: 'Ground',      quotes: 8, win: 55 },
  ],
  'a-c': [
    { name: 'Ground', quotes: 4, win: 38 },
  ],
};

const AGENT_LANES = {
  'a-j': [
    { name: 'ORD→LAX', quotes: 4, win: 50,  respH: 4.2 },
    { name: 'MKE→ORD', quotes: 3, win: 67,  respH: 3.8 },
    { name: 'SFO→JFK', quotes: 2, win: 100, respH: 3.1 },
    { name: 'DFW→ATL', quotes: 3, win: 83,  respH: 3.5 },
    { name: 'LAX→ORD', quotes: 2, win: 50,  respH: 5.1 },
  ],
  'a-c': [
    { name: 'ORD→LAX', quotes: 2, win: 0, respH: 14.5 },
    { name: 'ORD→DFW', quotes: 1, win: 0, respH: 16.1 },
    { name: 'DFW→MIA', quotes: 1, win: 0, respH: 11.2 },
  ],
};

// Aspects per agent (agent-attributable only)
const AGENT_ASPECTS = {
  'a-j': [
    { id: 'comm', name: 'Communication', mentions: 28, pctNeg: 18, sentiment: 'pos', vsPortfolio: '+12pts above avg', vsTone: 'pos',
      mentions_list: [
        { quote: 'Q-1042', cust: 'Encore Global', who: 'Sarah Chen', tone: 'green', text: 'Always responsive and clear in his replies.' },
        { quote: 'Q-1055', cust: 'Encore Global', who: 'Sarah Chen', tone: 'green', text: "James handles requests promptly and thoroughly." },
      ] },
    { id: 'timing', name: 'Timing', mentions: 18, pctNeg: 26, sentiment: 'pos', vsPortfolio: '+4pts above avg', vsTone: 'pos',
      mentions_list: [
        { quote: 'Q-1042', cust: 'Encore Global', who: 'Sarah Chen', tone: 'green', text: 'Quote arrived same day as requested.' },
      ] },
    { id: 'flex', name: 'Flexibility', mentions: 8, pctNeg: 30, sentiment: 'pos', vsPortfolio: '+10pts above avg', vsTone: 'pos',
      mentions_list: [
        { quote: 'Q-0987', cust: 'Encore Global', who: 'Sarah Chen', tone: 'green', text: 'Thanks for accommodating the pickup change.' },
      ] },
    { id: 'pricing', name: 'Pricing', mentions: 22, pctNeg: 45, sentiment: 'neu', vsPortfolio: 'same as avg', vsTone: 'neu',
      mentions_list: [
        { quote: 'Q-1042', cust: 'Encore Global', who: 'Mike Rivera', tone: 'red', text: 'Rate is higher than what we are seeing.' },
      ] },
  ],
  'a-c': [
    { id: 'comm', name: 'Communication', mentions: 8, pctNeg: 72, sentiment: 'neg', vsPortfolio: '-42pts below avg', vsTone: 'neg',
      mentions_list: [
        { quote: 'Q-0841', cust: 'Westfield Inc',    who: 'Tom Reid',     tone: 'red',   text: "We've been waiting 3 days for a response" },
        { quote: 'Q-0910', cust: 'Encore Global',    who: 'Mike Rivera',  tone: 'red',   text: 'Can you confirm you received our request?' },
        { quote: 'Q-0841', cust: 'Westfield Inc',    who: 'Tom Reid',     tone: 'red',   text: "Your response didn't address our question about insurance" },
        { quote: 'Q-1067', cust: 'Crestline Supply', who: 'Anna Walsh',   tone: 'red',   text: 'Still waiting for an update on our shipment status' },
        { quote: 'Q-0910', cust: 'Encore Global',    who: 'Sarah Chen',   tone: 'green', text: 'Thanks for getting back to us on this' },
        { quote: 'Q-0841', cust: 'Westfield Inc',    who: 'Tom Reid',     tone: 'red',   text: 'The lack of communication is making this difficult' },
      ] },
    { id: 'timing', name: 'Timing', mentions: 6, pctNeg: 65, sentiment: 'neg', vsPortfolio: '-35pts below avg', vsTone: 'neg',
      mentions_list: [
        { quote: 'Q-0910', cust: 'Encore Global',    who: 'Mike Rivera', tone: 'red', text: '2-day delay gave us no time to evaluate before the competing bid expired.' },
      ] },
    { id: 'flex', name: 'Flexibility', mentions: 2, pctNeg: 50, sentiment: 'neu', vsPortfolio: 'insufficient data', vsTone: 'neu', insufficient: true,
      mentions_list: [] },
    { id: 'pricing', name: 'Pricing', mentions: 6, pctNeg: 50, sentiment: 'neu', vsPortfolio: '-5pts below avg', vsTone: 'neu',
      mentions_list: [
        { quote: 'Q-0910', cust: 'Encore Global', who: 'Mike Rivera', tone: 'red', text: 'Pricing is close but not competitive.' },
      ] },
  ],
};

const AGENT_ASPECT_NOTE = {
  'a-j': "James performs above portfolio average on all agent-attributable aspects. Strongest on communication (+12pts) and flexibility (+10pts). Pricing is at portfolio average, which is expected since pricing is largely market-driven.",
  'a-c': "Agent C's primary weakness is communication (72% negative, 42 points below portfolio average). Customers cite slow responses and incomplete replies. Secondary weakness: timing (65% negative). Pricing is close to portfolio average, suggesting the issue is HOW Agent C communicates, not WHAT they quote. The problem is behavioral, not market-driven.",
};

const AGENT_BRIEFINGS = {
  'a-j': {
    title: 'AI Briefing for James R.',
    actions: [],
    summary: "No urgent issues. James handles 53% of your portfolio (18 of 34 accounts). Response time trending slightly up: 4.1h now vs 3.2h last quarter. All accounts current. Zero unanswered emails. Watch for capacity: 22 active quotes is the highest in your portfolio. If response time continues to increase, escalate workload with station manager.",
  },
  'a-c': {
    title: 'AI Briefing for Agent C',
    actions: [
      { tone: 'red', text: '3 unanswered customer emails across 2 accounts.' },
      { tone: 'red', text: 'Westfield Inc: no activity 18 days. Customer going silent.' },
      { tone: 'red', text: 'Crestline Supply: no activity 12 days.' },
    ],
    summary: '14.2h avg response (3.5x your portfolio average). 38% win rate. 2 of 3 accounts flagged Needs Attention. On Q-0841, customer explicitly cited slow response as reason for choosing competitor.',
  },
};

const AGENT_SERVICE_NOTE = {
  'a-j': "James performs best on White Glove (78%) and Expedited (72%). Ground conversion is lower at 55%. Consider routing high-value White Glove quotes to James.",
  'a-c': "Agent C only handles Ground service. Win rate of 38% is well below portfolio average of 52% for Ground. The issue is response time, not service type.",
};

const AGENT_LANE_NOTE = {
  'a-j': "Strongest on DFW→ATL (83%) and SFO→JFK (100%). Weakest on ORD→LAX (50%) where competitor pressure is strongest. Response time consistent across lanes.",
  'a-c': "Zero wins across all lanes. Response time exceeds 11h on every lane. The problem is not lane-specific. It's systemic agent performance.",
};

// Conversion bracket lookup
function convBracket(h) {
  if (h <= 4)  return { label: '72% conv. bracket', tone: 'green' };
  if (h <= 8)  return { label: '55% conv. bracket', tone: 'green' };
  if (h <= 12) return { label: '32% conv. bracket', tone: 'amber' };
  if (h <= 24) return { label: '14% conv. bracket', tone: 'red' };
  return { label: '8% conv. bracket', tone: 'red' };
}

// ===== Page =====

function AgentDetail({ agent, onBack, onOpenCustomer }) {
  const [tab, setTab] = React.useState('overview');
  const id = agent.id;

  const customers = AGENT_CUSTOMERS[id] || [];
  const issuesCount = customers.filter(c => c.flag).length + (agent.unanswered > 0 ? 1 : 0);
  const kpiBad = {
    resp:     agent.avgResponseH > 10,
    win:      agent.winRate < 40,
    followUp: agent.followUpRate < 70,
    unans:    agent.unanswered > 0,
  };
  const bracket = convBracket(agent.avgResponseH);

  return (
    <>
      <div className="acct-hero">
        <div className="acct-hero__top">
          <button className="acct-hero__back" onClick={onBack}>
            <Ico.ChevronLeft /> Back
          </button>
          <span className="acct-hero__name">{agent.name}</span>
          <span className="acct-hero__loc">{agent.station} Station</span>
        </div>
        <div className="agents-summary" style={{ borderTop: 'none', marginBottom: 0 }}>
          <div className="agents-summary__cell">
            <div className="label">Avg Response</div>
            <div className={`value ${kpiBad.resp ? 'red' : ''}`}>{agent.avgResponseH}h</div>
            <div className="sub">on your accounts</div>
            <div className={`sub conv ${bracket.tone}`}>{bracket.label}</div>
          </div>
          <div className="agents-summary__cell">
            <div className="label">Win Rate</div>
            <div className={`value ${kpiBad.win ? 'red' : ''}`}>{agent.winRate}%</div>
            <div className="sub">on your accounts</div>
          </div>
          <div className="agents-summary__cell">
            <div className="label">Follow-up Rate</div>
            <div className={`value ${kpiBad.followUp ? 'red' : ''}`}>{agent.followUpRate}%</div>
            <div className="sub">within 48h</div>
          </div>
          <div className="agents-summary__cell">
            <div className="label">Unanswered</div>
            <div className={`value ${kpiBad.unans ? 'red' : ''}`}>{agent.unanswered}</div>
            <div className="sub">customer emails</div>
          </div>
        </div>
      </div>

      <div className="cd-tabs">
        <button className={`cd-tab ${tab === 'overview' ? 'active' : ''}`} onClick={() => setTab('overview')}>Overview</button>
        <button className={`cd-tab insights-tab ${tab === 'insights' ? 'active' : ''}`} onClick={() => setTab('insights')}>
          <InsightsTabLabel
            count={issuesCount}
            signal={issuesCount === 0 ? { tone: 'pos', text: '✓' } : null}
          />
        </button>
      </div>

      {tab === 'overview' && <AgentOverview agent={agent} customers={customers} onOpenCustomer={onOpenCustomer} />}
      {tab === 'insights' && <AgentInsights agent={agent} />}
    </>
  );
}

function AgentOverview({ agent, customers, onOpenCustomer }) {
  const [query, setQuery] = React.useState('');
  const [period, setPeriod] = React.useState('This Quarter');

  const filtered = customers.filter(c => !query || c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="copilot__sub" style={{ marginBottom: 14, textTransform: 'uppercase', fontFamily: "'Geist Mono', monospace", fontSize: 11 }}>
        Your accounts handled by {agent.name}
      </div>

      <div className="toolbar" style={{ marginBottom: 18 }}>
        <div className="search">
          <Ico.Search />
          <input
            placeholder="Search by customer name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <FilterDropdown
          label="Period"
          value={period}
          options={['This Quarter', 'This Year', 'All Time']}
          onChange={setPeriod}
        />
      </div>

      <div className="table-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ width: '28%' }}>Customer</th>
              <th>Active Quotes</th>
              <th>Win Rate</th>
              <th>Avg Response</th>
              <th>Sentiment</th>
              <th>Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => {
              const winBad  = c.winRate < 40;
              const winGood = c.winRate > 70;
              const respBad = c.respH > 10;
              return (
                <tr key={c.id} onClick={() => onOpenCustomer && onOpenCustomer(c.name)}>
                  <td>
                    <div className="acct-name">{c.name}</div>
                    <div className="acct-loc">{agent.station} Station</div>
                    {c.flag && (
                      <div style={{ marginTop: 6 }}>
                        <span className="pill pill--red-bold" style={{ fontSize: 10 }}>⚠ Needs Attention</span>
                      </div>
                    )}
                  </td>
                  <td className="num-mono">{c.quotes} {c.quotes === 1 ? 'quote' : 'quotes'}</td>
                  <td className="num-mono" style={winBad ? { color: 'var(--red)', fontWeight: 700 } : winGood ? { color: 'var(--green)', fontWeight: 700 } : null}>
                    {c.winRate}%
                  </td>
                  <td className="num-mono" style={respBad ? { color: 'var(--red)', fontWeight: 700 } : null}>
                    {c.respH}h
                  </td>
                  <td>
                    <span className={`sent-pill ${c.sent.dot}`}>
                      <span className="sdot" />
                      {c.sent.word}
                    </span>
                  </td>
                  <td className="last">{c.last}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function AgentInsights({ agent }) {
  const [sub, setSub] = React.useState('performance');
  const id = agent.id;
  const briefing = AGENT_BRIEFINGS[id];

  return (
    <>
      <AiBriefing
        title={briefing.title}
        date="MAY 18, 2026"
        condensed={(briefing.actions || []).length === 0 ? 'No issues' : `${(briefing.actions || []).length} unanswered · 2 accounts at risk`}
        actions={briefing.actions || []}
        summary={briefing.summary}
      />

      <div className="insights-head">
        <div className="subtabs">
          <button className={`subtab ${sub === 'performance' ? 'active' : ''}`} onClick={() => setSub('performance')}>Performance</button>
          <button className={`subtab ${sub === 'customers'   ? 'active' : ''}`} onClick={() => setSub('customers')}>Customers</button>
          <button className={`subtab ${sub === 'aspects'     ? 'active' : ''}`} onClick={() => setSub('aspects')}>Aspects</button>
          <button className={`subtab ${sub === 'services'    ? 'active' : ''}`} onClick={() => setSub('services')}>Services</button>
          <button className={`subtab ${sub === 'lanes'       ? 'active' : ''}`} onClick={() => setSub('lanes')}>Lanes</button>
        </div>
      </div>

      <div className="insights-body">
        {sub === 'performance' && <AgentPerformance agent={agent} />}
        {sub === 'customers'   && <AgentCustomersSub agent={agent} />}
        {sub === 'aspects'     && <AgentAspectsSub agent={agent} />}
        {sub === 'services'    && <AgentServicesSub agent={agent} />}
        {sub === 'lanes'       && <AgentLanesSub agent={agent} />}
      </div>
    </>
  );
}

function AgentPerformance({ agent }) {
  const [period, setPeriod] = React.useState('quarter');
  const t = AGENT_TRENDS[agent.id];
  const qv = t.quoteVolume;
  const maxQv = Math.max(...qv.values);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
        <InsTimeFilter
          value={period}
          onChange={setPeriod}
          options={[
            { id: 'month',   label: 'This Month' },
            { id: 'quarter', label: 'This Quarter' },
            { id: 'year',    label: 'This Year' },
          ]}
        />
      </div>

      <div className="cd-charts-2col">
        <div className="cd-chart-card">
          <div className="cd-chart-card__title">Win Rate Trend</div>
          <div className={`cd-chart-card__current ${t.winRate.dir === 'red' ? 'red' : ''}`}>{t.winRate.current}</div>
          <div className="cd-chart-card__sub">May · current</div>
          <CdLineChart trend={t.winRate} unit="%" />
        </div>
        <div className="cd-chart-card">
          <div className="cd-chart-card__title">Quote Volume Trend</div>
          <div className="cd-chart-card__current">{qv.current}</div>
          <div className="cd-chart-card__sub">May · current</div>
          <div className="ad-bar-chart">
            {qv.values.map((v, i) => (
              <div className="ad-bar-chart__col" key={i}>
                <div className="ad-bar-chart__val">{v}</div>
                <div className="ad-bar-chart__bar" style={{ height: `${(v / maxQv) * 100}%` }} />
              </div>
            ))}
          </div>
          <div className="ad-bar-chart__axis">
            {qv.months.map((m, i) => (
              <div className="ad-bar-chart__axis-cell" key={i}>{m}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, fontSize: 14, color: 'var(--ink-soft)' }}>
        <strong>{agent.activeQuotes} active quotes this quarter</strong>
        {agent.activeQuotes >= 20 && ' (highest in your portfolio)'}
      </div>
    </>
  );
}

function AgentCustomersSub({ agent }) {
  const customers = AGENT_CUSTOMERS[agent.id] || [];
  if (customers.length === 0) {
    return <div className="cp-empty-center">Limited data. Performance assessment requires more quote history.</div>;
  }
  return (
    <>
      <div className="copilot__sub" style={{ marginBottom: 18 }}>Performance per customer with peer comparison</div>
      {customers.map(c => {
        const winBad  = c.winRate < 40;
        const winGood = c.winRate > 70;
        const cls = c.flag || winBad ? 'weak' : winGood ? 'good' : 'upsell';
        const cmp = c.comparable;
        return (
          <div className={`insight-card ${cls}`} key={c.id} style={{ marginBottom: 12 }}>
            <div className="insight-card__name">{c.name}</div>
            <div className={`insight-card__nums ${winGood ? 'up' : winBad ? 'down' : ''}`}>
              <span><span className="lab">Win rate</span> {c.winRate}%</span>
              <span><span className="lab">Avg response</span> {c.respH}h</span>
              <span><span className="lab">Sentiment</span> <span className={`sent-pill ${c.sent.dot}`}><span className="sdot" />{c.sent.word}</span></span>
              {c.flag && <span style={{ color: 'var(--red)', fontWeight: 700, fontFamily: 'Geist, sans-serif' }}>⚠ Needs Attention</span>}
            </div>
            {cmp && (
              <div className="ad-comparable">
                <div className="ad-comparable__head">Comparable</div>
                <div className="ad-comparable__lane">{cmp.lane}</div>
                <div className="ad-comparable__row">
                  {cmp.peers.map((p, i) => {
                    const peerCls = p.self
                      ? (cmp.noteTone === 'neg' ? 'worst' : cmp.noteTone === 'pos' ? 'best' : '')
                      : '';
                    return (
                      <React.Fragment key={i}>
                        {i > 0 && <span style={{ color: 'var(--muted-2)' }}> | </span>}
                        <span className={peerCls}>{p.name} {p.win}%</span>
                      </React.Fragment>
                    );
                  })}
                </div>
                <div className={`ad-comparable__note ${cmp.noteTone}`}>{cmp.note}</div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

function AgentAspectsSub({ agent }) {
  const aspects = AGENT_ASPECTS[agent.id] || [];
  const note = AGENT_ASPECT_NOTE[agent.id];
  const [openId, setOpenId] = React.useState(null);

  return (
    <>
      <div className="ins-section">
        <div className="ins-section__title">Agent Communication & Behavior Analysis</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.5 }}>
          How customers experience this agent's communication, timing, flexibility, and pricing
        </div>

        {aspects.map(a => {
          const isOpen = openId === a.id;
          const fillPct = a.sentiment === 'neg' ? a.pctNeg : (100 - a.pctNeg);
          return (
            <div className={`aspect-row aspect-row-full ${a.sentiment} ${isOpen ? 'open' : ''}`} key={a.id}>
              <div className="aspect-row__head" onClick={() => !a.insufficient && setOpenId(o => o === a.id ? null : a.id)} style={a.insufficient ? { cursor: 'default' } : null}>
                <div>
                  <div className="aspect-row__name">{a.name}</div>
                </div>
                <span className={`ta-aspect__sent ${a.sentiment}`}>
                  <span className="sdot" />
                  {a.insufficient ? 'Insufficient' : a.sentiment === 'neg' ? `${a.pctNeg}% negative` : a.sentiment === 'pos' ? `${100 - a.pctNeg}% positive` : `${a.pctNeg}% negative`}
                </span>
                <span className="ta-aspect__count">{a.mentions} mentions</span>
                <div className={`aspect-delta-inline ${a.vsTone === 'pos' ? 'down' : a.vsTone === 'neg' ? 'up' : 'flat'}`}>
                  {a.vsPortfolio}
                </div>
                {!a.insufficient && <span className="ta-aspect__chev">{isOpen ? '▲' : '▼'}</span>}
              </div>
              {isOpen && (
                <div className="aspect-row__body">
                  {a.mentions_list.map((m, i) => (
                    <div className="ev-inline" key={i}>
                      <div className="qid">{m.quote}</div>
                      <div className="who">{m.cust}</div>
                      <div className="who">{m.who}</div>
                      <div className="quote">{m.text}</div>
                      <span className={`sd ${m.tone}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="ins-ai-summary" style={{ marginTop: 24 }}>{note}</div>
    </>
  );
}

function AgentServicesSub({ agent }) {
  const services = AGENT_SERVICES[agent.id] || [];
  const note = AGENT_SERVICE_NOTE[agent.id];
  return (
    <>
      <div className="ins-section">
        <div className="ins-section__title">Service Performance</div>
        <div className="cd-chart-card">
          <CdHBars rows={services.map(s => ({ name: s.name, q: s.quotes, win: s.win }))} />
        </div>
      </div>
      <div className="ins-ai-summary">{note}</div>
    </>
  );
}

function AgentLanesSub({ agent }) {
  const lanes = AGENT_LANES[agent.id] || [];
  const note = AGENT_LANE_NOTE[agent.id];
  return (
    <>
      <div className="ins-section">
        <div className="ins-section__title">Lane Performance</div>
        <div className="table-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>Lane</th>
                <th>Quotes</th>
                <th>Win Rate</th>
                <th>Avg Response</th>
              </tr>
            </thead>
            <tbody>
              {lanes.map((l, i) => {
                const winBad  = l.win < 40;
                const winGood = l.win > 70;
                const respBad = l.respH > 10;
                return (
                  <tr key={i}>
                    <td className="num-mono"><strong>{l.name}</strong></td>
                    <td className="num-mono">{l.quotes}</td>
                    <td className="num-mono" style={winBad ? { color: 'var(--red)', fontWeight: 700 } : winGood ? { color: 'var(--green)', fontWeight: 700 } : null}>
                      {l.win}%
                    </td>
                    <td className="num-mono" style={respBad ? { color: 'var(--red)', fontWeight: 700 } : null}>
                      {l.respH}h
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="ins-ai-summary">{note}</div>
    </>
  );
}

window.AgentDetail = AgentDetail;
