// Leads full page

function LeadsPage({ onBack, onOpenLead }) {
  const [stage, setStage] = React.useState('All');
  const [query, setQuery] = React.useState('');

  const filtered = LEADS.filter(l => {
    if (stage !== 'All' && l.stage !== stage) return false;
    if (query) {
      const q = query.toLowerCase();
      return (
        l.company.toLowerCase().includes(q) ||
        l.contact.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalPipeline = LEADS.reduce((sum, l) => sum + parseInt(l.value.replace(/[^0-9]/g, ''), 10), 0);

  return (
    <>
      <div className="crumbs" style={{ marginBottom: 18 }}>
        <button onClick={onBack}><Ico.ChevronLeft /> Back to Dashboard</button>
      </div>

      <div className="page-head">
        <div>
          <h1>My Leads</h1>
          <div className="sub">{LEADS.length} active leads · ${totalPipeline}K total pipeline</div>
        </div>
        <FilterDropdown
          label="Stage"
          value={stage}
          options={['All', 'Negotiating', 'Proposal Sent', 'Qualified', 'Contacted']}
          onChange={setStage}
        />
      </div>

      <div className="search search--full">
        <Ico.Search />
        <input
          placeholder="Search leads by company, contact, or email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="table-wrap" style={{ marginTop: 24 }}>
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ width: '24%' }}>Company</th>
              <th style={{ width: '26%' }}>Contact</th>
              <th>Stage</th>
              <th>Value</th>
              <th>Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id} onClick={() => onOpenLead && onOpenLead(l)}>
                <td>
                  <div className="acct-name">{l.company}</div>
                </td>
                <td>
                  <div style={{ fontWeight: 500, fontSize: 14.5 }}>{l.contact}</div>
                  <div className="acct-loc" style={{ textTransform: 'none', letterSpacing: 0 }}>{l.email}</div>
                </td>
                <td><span className={`pill pill--${l.stageTone}`}>{l.stage}</span></td>
                <td><span className="num-mono"><strong className="active">{l.value}</strong></span></td>
                <td className="last">{l.last}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--muted)' }}>
                  <div className="label" style={{ marginBottom: 6 }}>No leads match</div>
                  Try clearing the filter or search query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

window.LeadsPage = LeadsPage;
