// AI Copilot — persistent rail + 480px overlay panel.
// Global scope: 5 tabs (Actions / Performance / Risk / Opportunity / Agents).
// Account scope: original tabs (Actions / Signals / Contacts / Threads / Notes / Trends).

function Copilot({ defaultScope, accountAvailable, onOpenAccount, onViewAllAgents }) {
  const [open, setOpen]   = React.useState(false);
  const [scope, setScope] = React.useState(defaultScope);
  const [gTab, setGTab]   = React.useState('actions');
  const [aTab, setATab]   = React.useState('actions');

  React.useEffect(() => { setScope(defaultScope); setATab('actions'); setGTab('actions'); }, [defaultScope]);

  const data = scope === 'account' ? ACCOUNT_INTEL : GLOBAL_INTEL;
  const redCount   = data.actions.filter(a => a.tone === 'red').length;
  const totalCount = data.actions.length;

  return (
    <div className={`copilot ${open ? 'open' : ''}`} aria-label="AI Insights">
      <div className="copilot__rail" onClick={() => setOpen(true)} role="button" tabIndex={0}>
        <span className="ai-spark"><Ico.Sparkles /></span>
        <span className="badge">{redCount}</span>
        <span className="vlabel">AI Insights</span>
        <span className="pulse" aria-hidden="true" />
      </div>

      <div className="copilot__panel">
        <div className="copilot__head">
          <div className="copilot__title-row">
            <div className="copilot__title">
              <span className="ai-spark"><Ico.Sparkles /></span>
              AI Insights
              <span className="count">{totalCount}</span>
            </div>
            <button className="copilot__close" onClick={() => setOpen(false)} aria-label="Close"><Ico.Close /></button>
          </div>
          <div className="copilot__scope">
            <button
              className={scope === 'account' ? 'active' : ''}
              onClick={() => setScope('account')}
              disabled={!accountAvailable}
              style={!accountAvailable ? { opacity: 0.45, cursor: 'not-allowed' } : null}
            >This account</button>
            <button
              className={scope === 'global' ? 'active' : ''}
              onClick={() => setScope('global')}
            >All accounts</button>
          </div>
        </div>

        {scope === 'global' ? (
          <GlobalPanel tab={gTab} setTab={setGTab} onOpenAccount={onOpenAccount} onViewAllAgents={onViewAllAgents} />
        ) : (
          <AccountPanel tab={aTab} setTab={setATab} />
        )}
      </div>
    </div>
  );
}

// ===== Helpers =====

function TimeFilter({ value, onChange, options }) {
  return (
    <div className="cp-filters">
      {options.map(o => (
        <button
          key={o.id}
          className={`cp-filt ${value === o.id ? 'active' : ''}`}
          onClick={() => onChange(o.id)}
        >{o.label}</button>
      ))}
    </div>
  );
}

function Sparkline({ months, values, height = 70 }) {
  const W = 360, padL = 4, padR = 4, padT = 6, padB = 16;
  const H = height;
  const min = Math.min(...values) - (Math.max(...values) - Math.min(...values)) * 0.2;
  const max = Math.max(...values) + (Math.max(...values) - Math.min(...values)) * 0.1;
  const sx = (i) => padL + (i / (values.length - 1)) * (W - padL - padR);
  const sy = (v) => padT + (1 - (v - min) / (max - min)) * (H - padT - padB);
  const line  = values.map((v, i) => `${i === 0 ? 'M' : 'L'} ${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`).join(' ');
  const area  = `${line} L ${sx(values.length - 1).toFixed(1)} ${H - padB} L ${sx(0).toFixed(1)} ${H - padB} Z`;
  return (
    <svg className="spark" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <line className="axis" x1="0" x2={W} y1={H - padB} y2={H - padB} />
      <path className="area" d={area} />
      <path className="line" d={line} />
      {values.map((v, i) => (
        <circle key={i} className={`dot ${i === values.length - 1 ? 'now' : ''}`} cx={sx(i)} cy={sy(v)} r={i === values.length - 1 ? 3 : 2.2} />
      ))}
      {months.map((m, i) => (
        <text key={i} className="lbl" x={sx(i)} y={H - 3} textAnchor="middle">{m}</text>
      ))}
    </svg>
  );
}

// ===== GLOBAL panel =====

function GlobalPanel({ tab, setTab, onOpenAccount, onViewAllAgents }) {
  return (
    <>
      <div className="copilot__tabs">
        <button className={`copilot__tab ${tab === 'actions'     ? 'active' : ''}`} onClick={() => setTab('actions')}>Actions <span className="tc">{GLOBAL_INTEL.actions.length}</span></button>
        <button className={`copilot__tab ${tab === 'performance' ? 'active' : ''}`} onClick={() => setTab('performance')}>Performance</button>
        <button className={`copilot__tab ${tab === 'risk'        ? 'active' : ''}`} onClick={() => setTab('risk')}>Risk</button>
        <button className={`copilot__tab ${tab === 'opportunity' ? 'active' : ''}`} onClick={() => setTab('opportunity')}>Opportunity</button>
        <button className={`copilot__tab ${tab === 'agents'      ? 'active' : ''}`} onClick={() => setTab('agents')}>Agents</button>
      </div>
      <div className="copilot__body">
        {tab === 'actions'     && <GActions     onOpenAccount={onOpenAccount} />}
        {tab === 'performance' && <GPerformance />}
        {tab === 'risk'        && <GRisk />}
        {tab === 'opportunity' && <GOpportunity />}
        {tab === 'agents'      && <GAgents onViewAllAgents={onViewAllAgents} />}
      </div>
    </>
  );
}

// ===== Global / Actions =====

function GActions({ onOpenAccount }) {
  const [period, setPeriod] = React.useState('today');
  return (
    <>
      <div className="copilot__sub">{GLOBAL_INTEL.actionsSubtitle}</div>
      <TimeFilter
        value={period}
        onChange={setPeriod}
        options={[
          { id: 'today',   label: 'Today' },
          { id: 'week',    label: 'Week' },
          { id: 'month',   label: 'Month' },
          { id: 'quarter', label: 'Quarter' },
        ]}
      />
      {GLOBAL_INTEL.actions.map(a => (
        <div className="cp-action" key={a.id}>
          <span className={`dot ${a.tone}`} />
          <div>
            <div className="meta">{a.account}</div>
            <div className="ttl">{a.title}</div>
            <div className="det">{a.detail}</div>
            {a.ref && (
              <button className="link" onClick={() => onOpenAccount && onOpenAccount(a.account)}>
                View {a.ref} →
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

// ===== Global / Performance — rep's scorecard =====

function GPerformance() {
  const [period, setPeriod] = React.useState('quarter');
  const P = GLOBAL_INTEL.perf;
  const maxWin = Math.max(...P.responseBuckets.map(b => b.win));

  return (
    <>
      <div className="copilot__sub">Your portfolio scorecard</div>
      <TimeFilter
        value={period}
        onChange={setPeriod}
        options={[
          { id: 'month',   label: 'This Month' },
          { id: 'quarter', label: 'This Quarter' },
          { id: 'year',    label: 'This Year' },
        ]}
      />
      <div className="cp-ai-summary">{GLOBAL_INTEL.performanceSummary}</div>

      {/* SECTION 1: REVENUE */}
      <div className="perf-section">
        <div className="perf-section__head">Revenue</div>
        <div className="perf-big">
          <span className="perf-big__v">{P.revenue.v}</span>
          <span className="perf-big__vs">{P.revenue.vs}</span>
          <span className={`perf-chg ${P.revenue.chgPos ? 'pos' : 'neg'}`}>
            {P.revenue.chgPos ? <Ico.ArrowUp /> : <Ico.ArrowDown />}
            {P.revenue.chg}
          </span>
        </div>
        <Sparkline months={P.revenue.spark.months} values={P.revenue.spark.values} height={70} />
      </div>

      {/* SECTION 2: CUSTOMERS */}
      <div className="perf-section">
        <div className="perf-section__head">Customers</div>
        <div className="cust-inline">
          <span><span className="big">{P.customers.active}</span> active</span>
          <span className="dot" />
          <span className="pos">+{P.customers.newQ} new this quarter</span>
          <span className="dot" />
          <span className="neg">{P.customers.lost} lost</span>
        </div>
      </div>

      {/* SECTION 3: QUOTE VOLUME */}
      <div className="perf-section">
        <div className="perf-section__head">Quote Volume</div>
        <div className="perf-big">
          <span className="perf-big__v">{P.quoteVolume.v}</span>
          <span className="perf-big__vs">{P.quoteVolume.vs}</span>
          <span className={`perf-chg ${P.quoteVolume.chgPos ? 'pos' : 'neg'}`}>
            {P.quoteVolume.chgPos ? <Ico.ArrowUp /> : <Ico.ArrowDown />}
            {P.quoteVolume.chg}
          </span>
        </div>
        <Sparkline months={P.quoteVolume.spark.months} values={P.quoteVolume.spark.values} height={70} />
      </div>

      {/* SECTION 4: WIN RATE */}
      <div className="perf-section">
        <div className="perf-section__head">Win Rate</div>
        <div className="perf-big">
          <span className="perf-big__v">{P.winRate.v}</span>
          <span className="perf-big__vs">{P.winRate.vs}</span>
          <span className={`perf-chg ${P.winRate.chgPos ? 'pos' : 'neg'}`}>
            {P.winRate.chgPos ? <Ico.ArrowUp /> : <Ico.ArrowDown />}
            {P.winRate.chg}
          </span>
        </div>
        <div className="bar-v-wrap" style={{ marginTop: 16 }}>
          <div className="bar-v" style={{ height: 110 }}>
            {P.responseBuckets.map((b, i) => (
              <div className="bar-v__col" key={i}>
                <div className="bar-v__val">{b.win}%</div>
                <div className={`bar-v__bar ${b.hl ? 'hl' : ''}`} style={{ height: `${(b.win / maxWin) * 100}%` }} />
              </div>
            ))}
          </div>
          <div className="bar-v__axis">
            {P.responseBuckets.map((b, i) => (
              <div className="bar-v__axis-cell" key={i}>
                <div className="x">{b.x}</div>
                <div className="n">n={b.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ===== Global / Risk =====

function GRisk() {
  const [period, setPeriod] = React.useState('quarter');
  const R = GLOBAL_INTEL;
  const sorted = [...R.revenueConcentration].sort((a, b) => b.v - a.v);
  const top3 = sorted.slice(0, 3).reduce((s, x) => s + x.v, 0);
  const all  = sorted.reduce((s, x) => s + x.v, 0);
  const pct  = Math.round((top3 / all) * 100);
  const max  = sorted[0].v;

  return (
    <>
      <div className="copilot__sub">Risks across your portfolio</div>
      <TimeFilter
        value={period}
        onChange={setPeriod}
        options={[
          { id: 'month',   label: 'This Month' },
          { id: 'quarter', label: 'This Quarter' },
          { id: 'year',    label: 'This Year' },
        ]}
      />
      <div className="cp-ai-summary">{R.riskSummary}</div>

      <div className="cp-block">
        <div className="cp-block__title">Revenue Concentration</div>
        {sorted.map((c, i) => (
          <div className="hbar-row" key={i}>
            <div className="nm">{c.name}</div>
            <div className="track"><div className="fill" style={{ width: `${(c.v / max) * 100}%` }} /></div>
            <div className="v">${c.v}K</div>
          </div>
        ))}
        <div className="hbar-caption">Top 3 = {pct}% of portfolio revenue</div>
      </div>

      <div className="cp-block">
        <div className="cp-block__title">Declining Customers</div>
        {R.declining.length === 0 ? (
          <div className="trend-empty">No declining customers this period</div>
        ) : (
          R.declining.map((c, i) => (
            <div className="trend-row down" key={i}>
              <div className="nm">{c.name}</div>
              <div className="q">{c.q} <span className="arrow"><Ico.ArrowDown /></span></div>
              <div className="r">{c.r} <span className="arrow"><Ico.ArrowDown /></span></div>
            </div>
          ))
        )}
      </div>

      <div className="cp-block">
        <div className="cp-block__title">Customer Health</div>
        <div className="health-3">
          {R.customerHealth.map((h, i) => (
            <div className="health-3__cell" key={i}>
              <div className="lab"><span className={`sw ${h.tone}`} /> {h.lab}</div>
              <div className="v">{h.v}</div>
              <div className="ctx">{h.ctx}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="cp-block">
        <div className="cp-block__title">Stale Quotes</div>
        <div className="stat-big">
          <div className="v">{R.staleQuotes.count} <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--muted)' }}>quotes</span></div>
          <div className="ctx">{R.staleQuotes.context}</div>
          <div className="sub">{R.staleQuotes.total}</div>
          <div className="breakdown danger-tint">{R.staleQuotes.breakdown}</div>
        </div>
      </div>

      <div className="cp-block">
        <div className="cp-block__title">Unanswered Emails</div>
        <div className="stat-big">
          <div className="v">{R.unanswered.count} <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--muted)' }}>unanswered</span></div>
          <div className="ctx">{R.unanswered.context}</div>
          <div className="breakdown">
            {R.unanswered.under24} · {R.unanswered.mid} · <span className="danger">{R.unanswered.over48}</span>
          </div>
        </div>
      </div>
    </>
  );
}

// ===== Global / Opportunity =====

function GOpportunity() {
  const [period, setPeriod] = React.useState('quarter');
  const O = GLOBAL_INTEL;

  return (
    <>
      <div className="copilot__sub">Growth signals across your portfolio</div>
      <TimeFilter
        value={period}
        onChange={setPeriod}
        options={[
          { id: 'month',   label: 'This Month' },
          { id: 'quarter', label: 'This Quarter' },
          { id: 'year',    label: 'This Year' },
        ]}
      />
      <div className="cp-ai-summary">{O.opportunitySummary}</div>

      {/* SECTION 1: Growing Customers (with WHY) */}
      <div className="cp-block">
        <div className="cp-block__title">Growing Customers</div>
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

      {/* SECTION 2: Upsell Signals */}
      <div className="cp-block">
        <div className="cp-block__title">Upsell Signals</div>
        {O.upsellSignals.map((u, i) => (
          <div className="insight-card upsell" key={i}>
            <div className="insight-card__name">{u.name}</div>
            <div className="upsell-row">
              <span className="lbl">Currently</span>{u.current}
            </div>
            <div className="upsell-row">
              <span className="lbl">Signal</span>{u.signal}
            </div>
            <div className="upsell-row">
              <span className="lbl">Opportunity</span>{u.opportunity}
            </div>
          </div>
        ))}
      </div>

      {/* SECTION 3: Lane Intelligence */}
      <div className="cp-block">
        <div className="cp-block__title">Lane Intelligence</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>
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

// ===== Global / Agents =====

function GAgents({ onViewAllAgents }) {
  const [period, setPeriod] = React.useState('today');
  const G = GLOBAL_INTEL;
  const text = G.agentsNarratives[period];
  return (
    <>
      <div className="copilot__sub">Agent performance</div>
      <TimeFilter
        value={period}
        onChange={setPeriod}
        options={[
          { id: 'today',   label: 'Today' },
          { id: 'week',    label: 'This Week' },
          { id: 'month',   label: 'This Month' },
          { id: 'quarter', label: 'This Quarter' },
        ]}
      />
      <div className="cp-ai-summary">{text}</div>

      <div className="cp-block">
        <div className="cp-block__title">Top Performers</div>
        {G.topPerformers.map((p, i) => (
          <div className="agent-card good" key={i}>
            <div className="agent-card__head">
              {p.name} <span className="station">· {p.station}</span>
            </div>
            <div className="agent-card__stats">{p.stats}</div>
            <div className="agent-card__note">{p.note}</div>
          </div>
        ))}
      </div>

      <div className="cp-block">
        <div className="cp-block__title">Low Performers</div>
        {G.lowPerformers.map((p, i) => (
          <div className="agent-card bad" key={i}>
            <div className="agent-card__head">
              {p.name} <span className="station">· {p.station}</span>
            </div>
            <div className="agent-card__stats">
              <span className="red">{p.resp} response</span> · <span className="red">{p.win} win rate</span> · {p.accounts} accounts · {p.issues} issues
            </div>
            <div className="agent-card__insight">{p.insight}</div>
          </div>
        ))}
      </div>

      <div className="cp-block">
        <div className="cp-block__title">Station Performance</div>
        <table className="station-tbl">
          <thead>
            <tr>
              <th>Station</th>
              <th className="r">Agents</th>
              <th className="r">Avg Resp</th>
              <th className="r">Win Rate</th>
            </tr>
          </thead>
          <tbody>
            {G.stations.map((s, i) => (
              <tr key={i} className={s.weak ? 'weak' : ''}>
                <td><span className="stn">{s.name}</span></td>
                <td className="r">{s.agents}</td>
                <td className={`r ${s.weak ? 'weak' : ''}`}>{s.resp}</td>
                <td className={`r ${s.weak ? 'weak' : ''}`}>{s.win}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="cp-view-all" onClick={onViewAllAgents}>View all agents →</button>
    </>
  );
}

// ===== ACCOUNT scope =====

function AccountPanel({ tab, setTab }) {
  const data = ACCOUNT_INTEL;
  return (
    <>
      <div className="copilot__tabs">
        <button className={`copilot__tab ${tab === 'actions'  ? 'active' : ''}`} onClick={() => setTab('actions')}>Actions <span className="tc">{data.actions.length}</span></button>
        <button className={`copilot__tab ${tab === 'health'   ? 'active' : ''}`} onClick={() => setTab('health')}>Health</button>
        <button className={`copilot__tab ${tab === 'contacts' ? 'active' : ''}`} onClick={() => setTab('contacts')}>Contacts <span className="tc">{data.contacts.length}</span></button>
        <button className={`copilot__tab ${tab === 'analysis' ? 'active' : ''}`} onClick={() => setTab('analysis')}>Analysis</button>
        <button className={`copilot__tab ${tab === 'agents'   ? 'active' : ''}`} onClick={() => setTab('agents')}>Agents <span className="tc">{data.accountAgents.length}</span></button>
        <button className={`copilot__tab ${tab === 'notes'    ? 'active' : ''}`} onClick={() => setTab('notes')}>Notes <span className="tc">{data.notes.length}</span></button>
      </div>
      <div className="copilot__body">
        {tab === 'actions'  && <ACActions  data={data} />}
        {tab === 'health'   && <ACHealth   data={data} />}
        {tab === 'contacts' && <ACContacts data={data} />}
        {tab === 'analysis' && <ACAnalysis data={data} />}
        {tab === 'agents'   && <ACAgents   data={data} />}
        {tab === 'notes'    && <ACNotes    data={data} />}
      </div>
    </>
  );
}

function ACActions({ data }) {
  const [period, setPeriod] = React.useState('today');
  if (!data.actions.length) {
    return <div className="cp-empty-center pos">No actions needed. This account is on track.</div>;
  }
  return (
    <>
      <div className="copilot__sub">AI-recommended for Encore Global</div>
      <TimeFilter
        value={period}
        onChange={setPeriod}
        options={[
          { id: 'today',   label: 'Today' },
          { id: 'week',    label: 'Week' },
          { id: 'month',   label: 'Month' },
          { id: 'quarter', label: 'Quarter' },
        ]}
      />
      {data.actions.map(a => (
        <div className="cp-action" key={a.id}>
          <span className={`dot ${a.tone}`} />
          <div>
            <div className="ttl">{a.title}</div>
            <div className="det">{a.detail}</div>
            {a.ref && <button className="link">View {a.ref} →</button>}
          </div>
        </div>
      ))}
    </>
  );
}

function ACHealth({ data }) {
  const TrendIcon = ({ d }) => {
    if (d === 'down') return <span className="arrow down"><Ico.ArrowDown /></span>;
    if (d === 'up')   return <span className="arrow up"><Ico.ArrowUp /></span>;
    if (d === 'flat') return <span className="arrow flat"><Ico.ArrowRight /></span>;
    return null;
  };
  return (
    <>
      <div className="copilot__sub">Relationship health</div>
      <div className="cp-ai-summary">{data.healthSummary}</div>

      <div className="cp-block">
        <div className="cp-block__title">Behavioral Trends</div>
        {data.behavioral.map((b, i) => (
          <div className="kv-row" key={i}>
            <span className="lab">{b.lab}</span>
            <span className="v">{b.v} <TrendIcon d={b.trend} /></span>
          </div>
        ))}
      </div>

      <div className="cp-block">
        <div className="cp-block__title">Operational Metrics</div>
        {data.operational.map((o, i) => (
          <div className="kv-row" key={i}>
            <span className="lab">{o.lab}</span>
            <span className="v">{o.v} <TrendIcon d={o.trend} /></span>
          </div>
        ))}
      </div>

      {data.riskFlags && data.riskFlags.length > 0 && (
        <div className="cp-block">
          <div className="cp-block__title">Risk Flags</div>
          {data.riskFlags.map((f, i) => (
            <div className="risk-flag" key={i}>{f.text}</div>
          ))}
        </div>
      )}
    </>
  );
}

function ACContacts({ data }) {
  return (
    <>
      <div className="copilot__sub">Discovered from email patterns</div>
      {data.contacts.map(c => (
        <div className="contact-card-full" key={c.id}>
          <div className="contact-card-full__top">
            <span className={`sdot ${c.tone}`} />
            <div>
              <div className="nm">{c.name}</div>
              <div className="role">{c.role}</div>
              <div className="freq">{c.freq}</div>
            </div>
          </div>
          {c.pattern && <div className="pattern">{c.pattern}</div>}
        </div>
      ))}
    </>
  );
}

function ACAnalysis({ data }) {
  const [openId, setOpenId] = React.useState(null);
  const toggle = (id) => setOpenId(o => o === id ? null : id);

  const deltaToneClass = (dir, sentiment) => {
    if (dir === 'new')  return 'new';
    if (dir === 'flat') return 'flat';
    // 'up' on a negative-sentiment aspect = worsening (red), 'up' on positive = improving (green)
    if (dir === 'up')   return sentiment === 'neg' ? 'up' : 'down';
    if (dir === 'down') return sentiment === 'neg' ? 'down' : 'up';
    return 'flat';
  };
  const deltaText = (a) => {
    if (a.delta.dir === 'new')  return a.delta.text;
    if (a.delta.dir === 'flat') return '→ stable';
    if (a.delta.dir === 'up')   return `↑ ${a.delta.text}`;
    if (a.delta.dir === 'down') return `↓ ${a.delta.text}`;
    return a.delta.text;
  };

  return (
    <>
      <div className="copilot__sub">Based on email analysis across this account's quotes</div>

      {/* WHAT THEY'RE TALKING ABOUT */}
      <div className="cp-block">
        <div className="cp-block__title">What they're talking about</div>
        {data.aspects.map(a => {
          const isOpen = openId === a.id;
          const fillPct = a.sentiment === 'neg' ? a.pctNegative : (100 - a.pctNegative);
          return (
            <div className={`aspect-row ${isOpen ? 'open' : ''}`} key={a.id}>
              <div className="aspect-row__head" onClick={() => toggle(a.id)}>
                <div>
                  <div className="aspect-row__name">{a.name}</div>
                  <div className="aspect-row__pct">
                    {a.sentiment === 'neg' ? `${a.pctNegative}% negative` : `${100 - a.pctNegative}% positive`}
                  </div>
                </div>
                <div className="aspect-row__count">{a.mentions} mentions</div>
                <div className="aspect-bar"><div className={`aspect-bar__fill ${a.sentiment}`} style={{ width: `${fillPct}%` }} /></div>
                <div className={`aspect-row__delta ${deltaToneClass(a.delta.dir, a.sentiment)}`}>
                  {deltaText(a)}
                </div>
              </div>
              {isOpen && (
                <div className="aspect-row__body">
                  {(data.evidence[a.id] || []).map((e, i) => (
                    <div className="evidence" key={i}>
                      <div className="evidence__meta">{e.date} · {e.quote} · {e.person}</div>
                      <div className="evidence__quote">{e.quoteText}</div>
                      <button className="evidence__link">View email →</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* OPEN QUESTIONS */}
      <div className="cp-block">
        <div className="cp-block__title">Open Questions</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10 }}>
          Customer questions awaiting response
        </div>
        {data.openQuestions.length === 0 ? (
          <div className="cp-positive-empty">All customer questions have been addressed</div>
        ) : (
          data.openQuestions.map((q, i) => (
            <div className="qa-card" key={i}>
              <div className="qa-card__meta">{q.quote} · {q.person} · {q.date}</div>
              <div className="qa-card__quote">{q.text}</div>
              <div className="qa-card__pending">
                {q.pending}
                {q.repeat && <> · <span className="qa-card__repeat">{q.repeat}</span></>}
              </div>
              <button className="qa-card__link">View quote →</button>
            </div>
          ))
        )}
      </div>

      {/* OPEN PROMISES */}
      <div className="cp-block">
        <div className="cp-block__title">Open Promises</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10 }}>
          Ops commitments pending fulfillment
        </div>
        {data.openPromises.length === 0 ? (
          <div className="cp-positive-empty">No outstanding commitments</div>
        ) : (
          data.openPromises.map((p, i) => (
            <div className="qa-card" key={i}>
              <div className="qa-card__meta">{p.person} · {p.quote} · {p.date}</div>
              <div className="qa-card__quote">{p.text}</div>
              <div className="qa-card__pending">
                Due: {p.due} · <span className="qa-card__overdue">{p.overdue}</span>
              </div>
              <button className="qa-card__link">View quote →</button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

function AgentInfoCell({ title, body }) {
  const [open, setOpen] = React.useState(false);
  return (
    <td
      className={`info-cell agent-info center ${open ? 'open' : ''}`}
      onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
    >
      <button className="info-icon" aria-label="More info">i</button>
      <div className="info-tooltip" role="tooltip">
        <div className="ttl">{title}</div>
        <div className="det">{body}</div>
      </div>
    </td>
  );
}

function ACAgents({ data }) {
  const [period, setPeriod] = React.useState('quarter');
  const agents = [...data.accountAgents].sort((a, b) => b.quotes - a.quotes);

  // PRIMARY rule: assigned to top agent only if 2nd is more than 2 quotes behind
  const primaryId = agents.length >= 2 && (agents[0].quotes - agents[1].quotes) > 2
    ? agents[0].id
    : (agents.length === 1 ? agents[0].id : null);

  const winClass = (w) => w < 40 ? 'bad' : w > 70 ? 'good' : 'neu';
  const respClass = (r) => r > 10 ? 'bad' : 'neu';

  return (
    <>
      <div className="copilot__sub">Ops agents who have handled Encore Global's quotes</div>
      <TimeFilter
        value={period}
        onChange={setPeriod}
        options={[
          { id: 'quarter', label: 'This Quarter' },
          { id: 'year',    label: 'This Year' },
          { id: 'all',     label: 'All Time' },
        ]}
      />

      <table className="agents-tbl">
        <thead>
          <tr>
            <th>Agent</th>
            <th>Station</th>
            <th>Sentiment</th>
            <th className="r">Win Rate</th>
            <th className="r">Avg Response</th>
            <th className="center" aria-label=""></th>
          </tr>
        </thead>
        <tbody>
          {agents.map(ag => (
            <tr key={ag.id}>
              <td>
                <span className="agent-name">
                  {ag.name}
                  {ag.id === primaryId && <span className="pri">Primary</span>}
                </span>
              </td>
              <td><span className="agent-station">{ag.station}</span></td>
              <td>
                <span className={`sent-pill ${ag.sentimentDot}`}>
                  <span className="sdot" />
                  {ag.sentimentWord}
                </span>
              </td>
              <td className={`r ${winClass(ag.winRate)}`}>{ag.winRate}%</td>
              <td className={`r ${respClass(ag.avgResponseH)}`}>{ag.avgResponseH}h</td>
              <AgentInfoCell title={ag.tipTitle} body={ag.tipBody} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function ACNotes({ data }) {
  const [notes, setNotes] = React.useState(data.notes);
  const [draft, setDraft] = React.useState('');
  const save = () => {
    const text = draft.trim();
    if (!text) return;
    setNotes(n => [{ when: 'Today', txt: text }, ...n]);
    setDraft('');
  };
  return (
    <>
      <div className="copilot__sub">Your notes about Encore Global</div>
      <textarea className="cp-notes-input" placeholder="Add a note about this account..." value={draft} onChange={e => setDraft(e.target.value)} />
      <button className="cp-notes-save" onClick={save} disabled={!draft.trim()}>Save Note</button>
      {notes.map((n, i) => (
        <div className="cp-note" key={i}>
          <div className="when">{n.when}</div>
          <div className="txt">{n.txt}</div>
        </div>
      ))}
    </>
  );
}

window.Copilot = Copilot;
