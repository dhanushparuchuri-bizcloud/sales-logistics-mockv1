// Activity feed — chronological event timeline for the rep's portfolio

const ACTIVITY_EVENTS = [
  // ─── TODAY ───
  { id: 'e1', day: 'today', time: '2:14 PM', type: 'quote', account: 'Encore Global',
    title: 'New quote request received', ctx: 'DFW→ATL Expedited, $7.8K · Q-1061', link: 'View quote →' },
  { id: 'e2', day: 'today', time: '1:45 PM', type: 'email', account: 'Acme Corp',
    title: 'Ops responded to customer question on Q-1089', ctx: 'Previously flagged as unanswered', link: 'View quote →' },
  { id: 'e3', day: 'today', time: '12:30 PM', type: 'alert', account: 'Encore Global',
    title: 'AI recommendation generated', ctx: "Respond to Mike's price counter on Q-1042 · High priority", link: null },
  { id: 'e4', day: 'today', time: '11:30 AM', type: 'quote', account: 'SGK Industries',
    title: { pre: 'Quote ', em: 'won', emTone: 'won', post: '' },
    ctx: 'SFO→JFK Ground, $4,800 · Q-1044', link: 'View quote →' },
  { id: 'e5', day: 'today', time: '10:15 AM', type: 'email', account: 'Encore Global',
    title: 'Customer email from Mike Rivera on Q-1042', ctx: 'Price counter-offer received · No Ops response yet', link: 'View quote →' },
  { id: 'e6', day: 'today', time: '9:02 AM',  type: 'quote', account: 'Pacific Logistics',
    title: 'New quote request received', ctx: 'LAX→ORD Ground, $2,100 · Q-1063', link: null },
  { id: 'e7', day: 'today', time: '8:45 AM',  type: 'email', account: 'Nova Dynamics',
    title: 'Ops sent quote to customer', ctx: 'ORD→SFO White Glove, $14,200 · Q-1058', link: 'View quote →' },

  // ─── YESTERDAY ───
  { id: 'e8', day: 'yesterday', time: '4:30 PM', type: 'alert', account: 'Westfield Inc',
    title: 'Account status changed to Needs Attention', ctx: 'No activity for 18 days', link: null },
  { id: 'e9', day: 'yesterday', time: '3:15 PM', type: 'quote', account: 'Encore Global',
    title: 'Quote sent to customer', ctx: 'ORD→SFO White Glove, $22,400 · Q-1038', link: null },
  { id: 'e10', day: 'yesterday', time: '2:00 PM', type: 'email', account: 'SGK Industries',
    title: 'New contact appeared in email thread', ctx: 'Julie Pham (Procurement) on Q-1044', link: null },
  { id: 'e11', day: 'yesterday', time: '1:20 PM', type: 'quote', account: 'Meridian Events',
    title: { pre: 'Quote ', em: 'expired', emTone: 'expired', post: '' },
    ctx: 'NYC→LAX Ground, $3,200 · Q-1029 · No follow-up was sent', link: null },
  { id: 'e12', day: 'yesterday', time: '11:45 AM', type: 'email', account: 'Pacific Logistics',
    title: 'Customer email from David Lim on Q-1031', ctx: 'Asking about delivery timeline for expedited option', link: null },
  { id: 'e13', day: 'yesterday', time: '10:00 AM', type: 'quote', account: 'Acme Corp',
    title: { pre: 'Quote ', em: 'lost', emTone: 'lost', post: '' },
    ctx: 'DFW→MIA Expedited, $6,100 · Q-1025 · Customer cited pricing', link: null },
  { id: 'e14', day: 'yesterday', time: '9:30 AM', type: 'alert', account: 'Pacific Logistics',
    title: 'AI recommendation generated', ctx: 'Quote frequency down 35% · Medium priority', link: null },

  // ─── MONDAY, MAY 12 ───
  { id: 'e15', day: 'mon', time: '5:15 PM', type: 'quote', account: 'Encore Global',
    title: { pre: 'Quote ', em: 'won', emTone: 'won', post: '' },
    ctx: 'LAX→ORD Ground, $4,200 · Q-0987', link: null },
  { id: 'e16', day: 'mon', time: '3:45 PM', type: 'email', account: 'Encore Global',
    title: 'Ops responded to Sarah Chen on Q-1042', ctx: 'Initial quote sent for ORD→LAX White Glove', link: null },
];

function ActivityFeed({ onOpenAccount }) {
  const [period, setPeriod]   = React.useState('today');
  const [customer, setCustomer] = React.useState('All Customers');
  const [evType, setEvType]   = React.useState('All Events');

  const customers = ['All Customers', ...Array.from(new Set(ACTIVITY_EVENTS.map(e => e.account)))];
  const evTypes   = ['All Events', 'Quotes', 'Emails', 'Alerts'];

  const typeMap = { 'Quotes': 'quote', 'Emails': 'email', 'Alerts': 'alert' };

  const visibleDays = period === 'today'     ? ['today']
                    : period === 'yesterday' ? ['yesterday']
                    : period === 'week'      ? ['today', 'yesterday', 'mon']
                    : ['today', 'yesterday', 'mon'];

  const filtered = ACTIVITY_EVENTS.filter(e => {
    if (!visibleDays.includes(e.day)) return false;
    if (customer !== 'All Customers' && e.account !== customer) return false;
    if (evType !== 'All Events' && typeMap[evType] !== e.type) return false;
    return true;
  });

  // Group by day in display order
  const dayOrder = ['today', 'yesterday', 'mon'];
  const dayLabels = { today: 'Today', yesterday: 'Yesterday', mon: 'Monday, May 12' };
  const grouped = dayOrder
    .filter(d => visibleDays.includes(d))
    .map(d => ({ day: d, label: dayLabels[d], events: filtered.filter(e => e.day === d) }))
    .filter(g => g.events.length > 0);

  return (
    <>
      <div className="act-filters">
        <div className="act-filters__pills">
          <button className={`act-pill ${period === 'today'     ? 'active' : ''}`} onClick={() => setPeriod('today')}>Today</button>
          <button className={`act-pill ${period === 'yesterday' ? 'active' : ''}`} onClick={() => setPeriod('yesterday')}>Yesterday</button>
          <button className={`act-pill ${period === 'week'      ? 'active' : ''}`} onClick={() => setPeriod('week')}>This Week</button>
          <button className={`act-pill ${period === 'custom'    ? 'active' : ''}`} onClick={() => setPeriod('custom')}>Custom</button>
        </div>
        <FilterDropdown
          label="Customer"
          value={customer}
          options={customers}
          onChange={setCustomer}
        />
        <FilterDropdown
          label="Event Type"
          value={evType}
          options={evTypes}
          onChange={setEvType}
        />
      </div>

      {grouped.length === 0 ? (
        <div className="act-empty">No activity yet today. Events will appear as they happen.</div>
      ) : (
        grouped.map(g => (
          <React.Fragment key={g.day}>
            <div className="act-day">
              <span className="act-day__lab">{g.label}</span>
              <span className="act-day__rule" />
            </div>
            {g.events.map(e => (
              <div className="act-event" key={e.id}>
                <span className={`act-event__dot ${e.type}`} />
                <span className="act-event__time">{e.time}</span>
                <div className="act-event__body">
                  <div className="act-event__acct" style={{ cursor: 'pointer' }} onClick={() => onOpenAccount && onOpenAccount(e.account)}>
                    {e.account.toUpperCase()}
                  </div>
                  <div className="act-event__title">
                    {typeof e.title === 'string' ? e.title : (
                      <>
                        {e.title.pre}<span className={e.title.emTone}>{e.title.em}</span>{e.title.post}
                      </>
                    )}
                  </div>
                  <div className="act-event__ctx">
                    {e.ctx}
                    {e.link && (
                      <button className="act-event__link" onClick={() => onOpenAccount && onOpenAccount(e.account)}>
                        {' '}· {e.link}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))
      )}

      {grouped.length > 0 && <button className="act-loadmore">Load older events</button>}
    </>
  );
}

window.ActivityFeed = ActivityFeed;
