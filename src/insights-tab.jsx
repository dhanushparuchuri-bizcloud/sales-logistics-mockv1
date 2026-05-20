// Insights tab — full-width AI Insights content for the dashboard

const IMPACT_ASPECTS = [
  { name: 'Pricing',             mentions: 42, neg: 62, trend: { dir: 'up',   text: '↑ from 45%' }, customers: '12 of 34', driver: 'market' },
  { name: 'Communication',       mentions: 18, neg: 55, trend: { dir: 'up',   text: '↑ from 30%' }, customers: '5 of 34',  driver: 'agent' },
  { name: 'Carrier reliability', mentions: 12, neg: 45, trend: { dir: 'flat', text: '→ stable' },   customers: '4 of 34',  driver: 'carrier' },
  { name: 'Cargo handling',      mentions: 8,  neg: 50, trend: { dir: 'flat', text: '→ stable' },   customers: '3 of 34',  driver: 'carrier' },
  { name: 'Timing',              mentions: 24, neg: 25, trend: { dir: 'flat', text: '→ stable' },   customers: '8 of 34' },
  { name: 'Flexibility',         mentions: 10, neg: 15, trend: { dir: 'flat', text: '→ stable' },   customers: '6 of 34' },
  { name: 'Service quality',     mentions: 16, neg: 12, trend: { dir: 'flat', text: '→ stable' },   customers: '10 of 34' },
  { name: 'Customs/compliance',  mentions: 4,  neg: 25, trend: { dir: 'flat', text: '→ stable' },   customers: '2 of 34' },
  { name: 'Billing',             mentions: 6,  neg: 30, trend: { dir: 'flat', text: '→ stable' },   customers: '3 of 34' },
];

const IMPACT_ATTRIBUTIONS = [
  {
    aspect: 'Pricing', neg: 62, customers: 12, label: 'MARKET-DRIVEN', driver: 'market',
    rows: [
      'Market: 8 of 12 accounts mention competitor pricing',
      'Agent: 0 accounts (pricing not concentrated on any agent)',
      'Lane: ORD→LAX accounts for 40% of pricing complaints',
    ],
    action: 'Pricing review needed on ORD→LAX. Competitor consistently 12-15% cheaper on this lane.',
  },
  {
    aspect: 'Communication', neg: 55, customers: 5, label: 'AGENT-DRIVEN (BALTIMORE STATION)', driver: 'agent',
    rows: [
      'Agent C: 3 of 5 accounts (Westfield, Crestline, Pacific)',
      'Diana S.: 1 of 5 accounts (Meridian)',
      'James R.: 1 of 5 accounts (Encore) — NEW this quarter',
      'Pattern: Agent C + Diana S. (both Baltimore) = 80% of communication complaints. Station-level issue.',
    ],
    action: 'Escalate to Baltimore station manager.',
  },
  {
    aspect: 'Cargo handling', neg: 50, customers: 3, label: 'CARRIER-DRIVEN', driver: 'carrier',
    rows: [
      'XYZ Trucking: 4 of 5 negative mentions across 3 customers',
      'ABC Freight: 0 negative mentions',
      'Lanes: ORD→LAX and ORD→SEA most affected',
    ],
    action: 'Review XYZ Trucking on affected lanes. Consider ABC Freight as alternative.',
  },
  {
    aspect: 'Carrier reliability', neg: 45, customers: 4, label: 'CARRIER-DRIVEN', driver: 'carrier',
    rows: [
      'XYZ Trucking: 5 of 6 negative mentions',
      'Repeated late-pickup complaints on ORD→LAX',
    ],
    action: 'Audit XYZ Trucking pickup performance.',
  },
];

const SYSTEMIC_PATTERNS = [
  { tone: 'red',   text: "Baltimore station (Agent C + Diana S.) appears in 80% of communication complaints and 60% of timing complaints across your portfolio. This suggests a station-level operational issue, not isolated agent performance." },
  { tone: 'amber', text: "XYZ Trucking appears in 80% of cargo handling and reliability complaints. This carrier is used on 4 of your accounts. Switching to an alternative carrier on affected lanes would likely reduce complaints." },
  { tone: 'amber', text: "James R.'s communication complaints are new this quarter (previously zero). His quote volume increased from 16 to 22. The complaints may be capacity-driven rather than behavioral." },
];

const QUOTE_AGING = [
  { bracket: '0-24h',     quotes: 12, value: '$180K', conv: '72%', tone: 'green' },
  { bracket: '1-3 days',  quotes: 8,  value: '$95K',  conv: '45%', tone: ''      },
  { bracket: '3-7 days',  quotes: 5,  value: '$64K',  conv: '22%', tone: 'amber' },
  { bracket: '7-14 days', quotes: 3,  value: '$38K',  conv: '8%',  tone: 'red'   },
  { bracket: '14d+',      quotes: 2,  value: '$22K',  conv: '3%',  tone: 'red'   },
];

const WIN_LOSS = {
  losses: {
    total: 12,
    rows: [
      { reason: 'Price',           count: 5, pct: 42, value: '$48K', tag: 'stated'   },
      { reason: 'Slow response',   count: 3, pct: 25, value: '$28K', tag: 'inferred' },
      { reason: 'Competitor',      count: 2, pct: 17, value: '$15K', tag: 'stated'   },
      { reason: 'No follow-up',    count: 2, pct: 17, value: '$12K', tag: 'inferred' },
    ],
  },
  wins: {
    total: 22,
    rows: [
      { reason: 'Relationship',    count: 8, pct: 36, tag: 'stated'   },
      { reason: 'Fast response',   count: 6, pct: 27, tag: 'inferred' },
      { reason: 'Service quality', count: 5, pct: 23, tag: 'stated'   },
      { reason: 'Price accepted',  count: 3, pct: 14, tag: 'stated'   },
    ],
  },
  summary: '$28K lost this quarter due to slow Ops response. This is the most fixable loss category. $48K lost to price, which is partly market-driven. Competitor losses ($15K) concentrated on ORD→LAX lane.',
};

function InsightsTab({ onOpenAccount, onViewAllAgents }) {
  const [sub, setSub] = React.useState('actions');

  return (
    <>
      <AiBriefing
        title="AI Briefing"
        date="MAY 19, 2026"
        condensed="8 items across 6 accounts · Baltimore at 41%"
        actions={[
          { tone: 'red', text: "Encore Global: Mike's price counter unanswered 3 days ($18K at risk)" },
          { tone: 'red', text: 'Westfield Inc: Quote stalled 6 days, no Ops response ($22K)' },
          { tone: 'red', text: "Encore Global: Sarah's insurance question asked twice, never answered" },
        ]}
        summary="Portfolio at 58% win rate (down from 64%). Baltimore station converting at 41%. Agent C has 3 unanswered emails."
      />

      <div className="insights-head">
        <div className="subtabs">
          <button className={`subtab ${sub === 'actions'     ? 'active' : ''}`} onClick={() => setSub('actions')}>Actions <span className="tc">{GLOBAL_INTEL.actions.length}</span></button>
          <button className={`subtab ${sub === 'performance' ? 'active' : ''}`} onClick={() => setSub('performance')}>Performance</button>
          <button className={`subtab ${sub === 'risk'        ? 'active' : ''}`} onClick={() => setSub('risk')}>Risk</button>
          <button className={`subtab ${sub === 'opportunity' ? 'active' : ''}`} onClick={() => setSub('opportunity')}>Opportunity</button>
          <button className={`subtab ${sub === 'impact'      ? 'active' : ''}`} onClick={() => setSub('impact')}>Impact</button>
          <button className={`subtab ${sub === 'agents'      ? 'active' : ''}`} onClick={() => setSub('agents')}>Agents</button>
        </div>
      </div>

      <div className="insights-body">
        {sub === 'actions'     && <InsActions     onOpenAccount={onOpenAccount} />}
        {sub === 'performance' && <InsPerformance />}
        {sub === 'risk'        && <InsRisk />}
        {sub === 'opportunity' && <InsOpportunity />}
        {sub === 'impact'      && <InsImpact />}
        {sub === 'agents'      && <InsAgents onViewAllAgents={onViewAllAgents} />}
      </div>
    </>
  );
}

function InsTimeFilter({ value, onChange, options }) {
  return (
    <div className="insights-filters">
      {options.map(o => (
        <button
          key={o.id}
          className={`insights-filt ${value === o.id ? 'active' : ''}`}
          onClick={() => onChange(o.id)}
        >{o.label}</button>
      ))}
    </div>
  );
}

function InsSparkline({ months, values, height = 70 }) {
  const W = 360, padL = 4, padR = 4, padT = 6, padB = 16;
  const H = height;
  const min = Math.min(...values) - (Math.max(...values) - Math.min(...values)) * 0.2;
  const max = Math.max(...values) + (Math.max(...values) - Math.min(...values)) * 0.1;
  const sx = (i) => padL + (i / (values.length - 1)) * (W - padL - padR);
  const sy = (v) => padT + (1 - (v - min) / (max - min)) * (H - padT - padB);
  const line  = values.map((v, i) => `${i === 0 ? 'M' : 'L'} ${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`).join(' ');
  const area  = `${line} L ${sx(values.length - 1).toFixed(1)} ${H - padB} L ${sx(0).toFixed(1)} ${H - padB} Z`;
  return (
    <svg className="spark" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: '100%', height }}>
      <line className="axis" x1="0" x2={W} y1={H - padB} y2={H - padB} />
      <path className="area" d={area} />
      <path className="line" d={line} />
      {values.map((v, i) => (
        <circle key={i} className={`dot ${i === values.length - 1 ? 'now' : ''}`} cx={sx(i)} cy={sy(v)} r={i === values.length - 1 ? 3.2 : 2.4} />
      ))}
      {months.map((m, i) => (
        <text key={i} className="lbl" x={sx(i)} y={H - 3} textAnchor="middle">{m}</text>
      ))}
    </svg>
  );
}

// ===== Actions =====

function InsActions({ onOpenAccount }) {
  const [period, setPeriod] = React.useState('today');
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
        <div className="copilot__sub" style={{ margin: 0 }}>{GLOBAL_INTEL.actionsSubtitle}</div>
        <InsTimeFilter
          value={period}
          onChange={setPeriod}
          options={[
            { id: 'today',   label: 'Today' },
            { id: 'week',    label: 'Week' },
            { id: 'month',   label: 'Month' },
            { id: 'quarter', label: 'Quarter' },
          ]}
        />
      </div>
      {GLOBAL_INTEL.actions.map(a => (
        <ActionRow key={a.id} action={a} showAccount={true} onOpenAccount={onOpenAccount} />
      ))}
    </>
  );
}

// ===== Performance =====

function InsPerformance() {
  const [period, setPeriod] = React.useState('quarter');
  const P = GLOBAL_INTEL.perf;
  const maxWin = Math.max(...P.responseBuckets.map(b => b.win));

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
      <div className="ins-ai-summary">{GLOBAL_INTEL.performanceSummary}</div>

      <div className="perf-grid">
        <div className="perf-card">
          <div className="lab">Revenue</div>
          <div className="big">
            <span className="v">{P.revenue.v}</span>
            <span className="vs">{P.revenue.vs}</span>
            <span className={`chg ${P.revenue.chgPos ? 'pos' : 'neg'}`}>
              {P.revenue.chgPos ? <Ico.ArrowUp /> : <Ico.ArrowDown />}
              {P.revenue.chg}
            </span>
          </div>
          <InsSparkline months={P.revenue.spark.months} values={P.revenue.spark.values} />
        </div>

        <div className="perf-card">
          <div className="lab">Customers</div>
          <div className="big">
            <span className="v">{P.customers.active}</span>
            <span className="lab-inline">active</span>
          </div>
          <div className="inline">
            <span><span className="pos">+{P.customers.newQ} new</span> <span className="lab-inline">this quarter</span></span>
            <span><span className="neg">{P.customers.lost} lost</span> <span className="lab-inline">this quarter</span></span>
          </div>
        </div>

        <div className="perf-card">
          <div className="lab">Quote Volume</div>
          <div className="big">
            <span className="v">{P.quoteVolume.v}</span>
            <span className="vs">{P.quoteVolume.vs}</span>
            <span className={`chg ${P.quoteVolume.chgPos ? 'pos' : 'neg'}`}>
              {P.quoteVolume.chgPos ? <Ico.ArrowUp /> : <Ico.ArrowDown />}
              {P.quoteVolume.chg}
            </span>
          </div>
          <InsSparkline months={P.quoteVolume.spark.months} values={P.quoteVolume.spark.values} />
        </div>

        <div className="perf-card">
          <div className="lab">Win Rate</div>
          <div className="big">
            <span className="v">{P.winRate.v}</span>
            <span className="vs">{P.winRate.vs}</span>
            <span className={`chg ${P.winRate.chgPos ? 'pos' : 'neg'}`}>
              {P.winRate.chgPos ? <Ico.ArrowUp /> : <Ico.ArrowDown />}
              {P.winRate.chg}
            </span>
          </div>
        </div>
      </div>

      <div className="ins-section">
        <div className="ins-section__title">Response Time vs Win Rate</div>
        <div className="ins-bar-v">
          {P.responseBuckets.map((b, i) => (
            <div className="ins-bar-v__col" key={i}>
              <div className="ins-bar-v__val">{b.win}%</div>
              <div className={`ins-bar-v__bar ${b.hl ? 'hl' : ''}`} style={{ height: `${(b.win / maxWin) * 100}%` }} />
            </div>
          ))}
        </div>
        <div className="ins-bar-v__axis">
          {P.responseBuckets.map((b, i) => (
            <div className="ins-bar-v__axis-cell" key={i}>
              <div className="x">{b.x}</div>
              <div className="n">n={b.count}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="ins-section">
        <div className="ins-section__title">Win / Loss Reasons (This Quarter)</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 14 }}>
          Why quotes were won or lost, aggregated from email analysis
        </div>
        <div className="wl-2col">
          <div className="wl-col">
            <div className="wl-col__title">Why quotes were lost</div>
            <div className="wl-col__total">{WIN_LOSS.losses.total} losses this quarter</div>
            {WIN_LOSS.losses.rows.map((r, i) => (
              <div className="wl-row" key={i}>
                <div className="wl-row__head">
                  <span className="lbl">{r.reason} <span className="tag">[{r.tag}]</span></span>
                  <span className="v">{r.count} ({r.pct}%) · {r.value}</span>
                </div>
                <div className="wl-bar"><div className="wl-bar__fill red" style={{ width: `${r.pct * 2}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="wl-col">
            <div className="wl-col__title">Why quotes were won</div>
            <div className="wl-col__total">{WIN_LOSS.wins.total} wins this quarter</div>
            {WIN_LOSS.wins.rows.map((r, i) => (
              <div className="wl-row" key={i}>
                <div className="wl-row__head">
                  <span className="lbl">{r.reason} <span className="tag">[{r.tag}]</span></span>
                  <span className="v">{r.count} ({r.pct}%)</span>
                </div>
                <div className="wl-bar"><div className="wl-bar__fill green" style={{ width: `${r.pct * 2}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="ins-ai-summary">{WIN_LOSS.summary}</div>
      </div>
    </>
  );
}

// ===== Impact =====

function InsImpact() {
  const [period, setPeriod] = React.useState('quarter');
  const trendCls = (dir) => dir === 'up' ? 'up' : dir === 'down' ? 'down' : 'flat';

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

      {/* Section 1 — Aspect Impact */}
      <div className="ins-section">
        <div className="ins-section__title">Aspect Impact Across Portfolio</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 14 }}>
          What your customers are talking about and how they feel about it
        </div>
        <table className="imp-table">
          <thead>
            <tr>
              <th>Aspect</th>
              <th className="r">Mentions</th>
              <th className="r">Negative %</th>
              <th>Trend</th>
              <th>Customers Affected</th>
            </tr>
          </thead>
          <tbody>
            {IMPACT_ASPECTS.map((a, i) => (
              <tr key={i}>
                <td><strong>{a.name}</strong></td>
                <td className="r">{a.mentions}</td>
                <td className={`r ${a.neg > 40 ? 'bad' : ''}`}>{a.neg}%</td>
                <td><span className={`trend ${trendCls(a.trend.dir)}`}>{a.trend.text}</span></td>
                <td style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12.5 }}>{a.customers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 2 — Who's Driving It */}
      <div className="ins-section">
        <div className="ins-section__title">Who's Driving It</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 14 }}>
          Attribution for the top negative aspects
        </div>
        {IMPACT_ATTRIBUTIONS.map((a, i) => (
          <div className={`attr-card ${a.driver}`} key={i}>
            <div className="attr-card__head">{a.aspect.toUpperCase()} ({a.neg}% negative across {a.customers} accounts)</div>
            <span className={`attr-card__label ${a.driver}`}>Attribution: {a.label}</span>
            <div className="attr-card__rows">
              {a.rows.map((r, j) => (
                <div className="attr-card__row" key={j}>{r}</div>
              ))}
            </div>
            <div className="attr-card__action">Action: {a.action}</div>
          </div>
        ))}
      </div>

      {/* Section 3 — Systemic Patterns */}
      <div className="ins-section">
        <div className="ins-section__title">Systemic Patterns</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 14 }}>
          Cross-cutting issues identified by AI
        </div>
        {SYSTEMIC_PATTERNS.map((p, i) => (
          <div className={`systemic-card ${p.tone}`} key={i}>{p.text}</div>
        ))}
      </div>
    </>
  );
}

// ===== Risk =====

function InsRisk() {
  const [period, setPeriod] = React.useState('quarter');
  const R = GLOBAL_INTEL;
  const sorted = [...R.revenueConcentration].sort((a, b) => b.v - a.v);
  const top3 = sorted.slice(0, 3).reduce((s, x) => s + x.v, 0);
  const all  = sorted.reduce((s, x) => s + x.v, 0);
  const pct  = Math.round((top3 / all) * 100);
  const max  = sorted[0].v;

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
      <div className="ins-ai-summary">{R.riskSummary}</div>

      <div className="risk-grid-top">
        <div className="risk-card">
          <div className="risk-card__title">Revenue Concentration</div>
          {sorted.map((c, i) => (
            <div className="hbar-row" key={i}>
              <div className="nm">{c.name}</div>
              <div className="track"><div className="fill" style={{ width: `${(c.v / max) * 100}%` }} /></div>
              <div className="v">${c.v}K</div>
            </div>
          ))}
          <div className="hbar-caption">Top 3 = {pct}% of portfolio revenue</div>
        </div>

        <div className="risk-card">
          <div className="risk-card__title">Customer Health</div>
          <div className="risk-health-3">
            {R.customerHealth.map((h, i) => (
              <div className="risk-health-3__cell" key={i}>
                <div className="lab"><span className={`sw ${h.tone}`} /> {h.lab}</div>
                <div className="v">{h.v}</div>
                <div className="ctx">{h.ctx}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="risk-card" style={{ marginBottom: 16 }}>
        <div className="risk-card__title">Declining Customers</div>
        {R.declining.map((c, i) => (
          <div className="trend-row down" key={i}>
            <div className="nm">{c.name}</div>
            <div className="q">{c.q} <span className="arrow"><Ico.ArrowDown /></span></div>
            <div className="r">{c.r} <span className="arrow"><Ico.ArrowDown /></span></div>
          </div>
        ))}
      </div>

      <div className="risk-card" style={{ marginBottom: 16 }}>
        <div className="risk-card__title">Quote Aging Pipeline</div>
        <div style={{ fontSize: 13, color: 'var(--muted)' }}>
          Open quotes by response age with historical conversion rates
        </div>
        <div className="aging-stack">
          {(() => {
            const total = QUOTE_AGING.reduce((s, a) => s + a.quotes, 0);
            const toneMap = { '0-24h': 'fresh', '1-3 days': 'recent', '3-7 days': 'aging', '7-14 days': 'stale', '14d+': 'dead' };
            return QUOTE_AGING.map((a, i) => (
              <div key={i} className={`aging-stack__seg ${toneMap[a.bracket]}`} style={{ flexBasis: `${(a.quotes / total) * 100}%`, flexGrow: a.quotes }}>
                {a.quotes}
              </div>
            ));
          })()}
        </div>
        <table className="aging-tbl">
          <thead>
            <tr>
              <th>Age Bracket</th>
              <th className="r">Quotes</th>
              <th className="r">Pipeline Value</th>
              <th className="r">Historical Conversion</th>
            </tr>
          </thead>
          <tbody>
            {QUOTE_AGING.map((a, i) => (
              <tr key={i} className={a.tone}>
                <td className="bracket"><strong>{a.bracket}</strong></td>
                <td className="r">{a.quotes}</td>
                <td className="r">{a.value}</td>
                <td className="r">{a.conv}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="aging-risk">
          <strong>Revenue at risk:</strong> $124K in pipeline is past the 24h response window where conversion drops below 72%. If responded to today, estimated recovery: $45K based on age-bracket conversion rates.
        </div>
      </div>

      <div className="risk-grid-bot">
        <div className="risk-card">
          <div className="risk-card__title">Unanswered Emails</div>
          <div className="risk-stat-big">
            <div className="v">{R.unanswered.count}<span className="un">unanswered</span></div>
            <div className="ctx">{R.unanswered.context}</div>
            <div className="breakdown">
              {R.unanswered.under24} · {R.unanswered.mid} · <span className="danger">{R.unanswered.over48}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ===== Opportunity =====

function InsOpportunity() {
  const [period, setPeriod] = React.useState('quarter');
  const O = GLOBAL_INTEL;
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
      <div className="ins-ai-summary">{O.opportunitySummary}</div>

      <div className="ins-section">
        <div className="ins-section__title">Growing Customers</div>
        {O.growing.map((c, i) => (
          <div className="insight-card good" key={i}>
            <div className="insight-card__name">{c.name}</div>
            <div className="insight-card__nums up">
              <span><span className="lab">Quotes</span> {c.q} <Ico.ArrowUp /></span>
              <span><span className="lab">Revenue</span> {c.r} <Ico.ArrowUp /></span>
            </div>
            <div className="insight-card__insight">{c.insight}</div>
          </div>
        ))}
      </div>

      <div className="ins-section">
        <div className="ins-section__title">Upsell Signals</div>
        {O.upsellSignals.map((u, i) => (
          <div className="insight-card upsell" key={i}>
            <div className="insight-card__name">{u.name}</div>
            <div className="upsell-row"><span className="lbl">Currently</span>{u.current}</div>
            <div className="upsell-row"><span className="lbl">Signal</span>{u.signal}</div>
            <div className="upsell-row"><span className="lbl">Opportunity</span>{u.opportunity}</div>
          </div>
        ))}
      </div>

      <div className="ins-section">
        <div className="ins-section__title">Lane Intelligence</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>
          Where you're winning and losing
        </div>

        <div className="cp-subheading">Strongest</div>
        {O.laneIntel.strong.map((l, i) => (
          <div className="lane-card good" key={`s${i}`}>
            <div className="lane-card__head">
              <span className="lane-card__name">{l.lane}</span>
              <span className="lane-card__win">{l.win}% win rate</span>
              <span className="lane-card__meta">· {l.quotes} quotes</span>
            </div>
            <div className="lane-card__insight">{l.insight}</div>
          </div>
        ))}

        <div className="cp-subheading">Weakest</div>
        {O.laneIntel.weak.map((l, i) => (
          <div className="lane-card weak" key={`w${i}`}>
            <div className="lane-card__head">
              <span className="lane-card__name">{l.lane}</span>
              <span className="lane-card__win">{l.win}% win rate</span>
              <span className="lane-card__meta">· {l.quotes} quotes</span>
            </div>
            <div className="lane-card__insight">{l.insight}</div>
          </div>
        ))}
      </div>
    </>
  );
}

// ===== Agents =====

function InsAgents({ onViewAllAgents }) {
  const [period, setPeriod] = React.useState('today');
  const G = GLOBAL_INTEL;
  const text = G.agentsNarratives[period];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
        <InsTimeFilter
          value={period}
          onChange={setPeriod}
          options={[
            { id: 'today',   label: 'Today' },
            { id: 'week',    label: 'This Week' },
            { id: 'month',   label: 'This Month' },
            { id: 'quarter', label: 'This Quarter' },
          ]}
        />
      </div>
      <div className="ins-ai-summary">{text}</div>

      <div className="agents-2col">
        <div>
          <div className="agents-col-title">Top Performers</div>
          {G.topPerformers.map((p, i) => (
            <div className="ins-agent-card good" key={i}>
              <div className="ins-agent-card__head">
                {p.name} <span className="station">· {p.station}</span>
              </div>
              <div className="ins-agent-card__stats">{p.stats}</div>
              <div className="ins-agent-card__note">{p.note}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="agents-col-title">Low Performers</div>
          {G.lowPerformers.map((p, i) => (
            <div className="ins-agent-card bad" key={i}>
              <div className="ins-agent-card__head">
                {p.name} <span className="station">· {p.station}</span>
              </div>
              <div className="ins-agent-card__stats">
                <span className="red">{p.resp} response</span> · <span className="red">{p.win} win rate</span> · {p.accounts} accounts · {p.issues} issues
              </div>
              <div className="ins-agent-card__insight">{p.insight}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="ins-section">
        <div className="ins-section__title">Station Performance</div>
        <table className="station-page-tbl">
          <thead>
            <tr>
              <th>Station</th>
              <th className="r">Agents</th>
              <th className="r">Avg Response</th>
              <th className="r">Win Rate</th>
            </tr>
          </thead>
          <tbody>
            {G.stations.map((s, i) => (
              <tr key={i} className={s.weak ? 'weak' : ''}>
                <td><span className="stn">{s.name}</span></td>
                <td className="r">{s.agents}</td>
                <td className={`r ${s.weak ? 'bad' : ''}`}>{s.resp}</td>
                <td className={`r ${s.weak ? 'bad' : ''}`}>{s.win}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="cp-view-all" onClick={onViewAllAgents}>View all agents →</button>
    </>
  );
}

window.InsightsTab = InsightsTab;
