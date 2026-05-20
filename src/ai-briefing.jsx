// AI Briefing card — used at the top of Insights/Intelligence tabs.

function AiBriefing({ title, date, actions, summary, condensed }) {
  const [collapsed, setCollapsed] = React.useState(false);

  // Auto-derive a condensed line if one wasn't passed in
  const auto = condensed || (() => {
    const redCount = (actions || []).filter(a => a.tone === 'red').length;
    const total = (actions || []).length;
    if (total === 0) return 'No issues';
    return `${total} ${total === 1 ? 'item' : 'items'} need attention${redCount ? ` · ${redCount} urgent` : ''}`;
  })();

  if (collapsed) {
    return (
      <div className="ai-briefing collapsed">
        <div className="ai-briefing__head">
          <span className="ai-briefing__title">
            <span className="spark">✦</span>
            AI Briefing
          </span>
          <span className="ai-briefing__condensed">· {auto}</span>
        </div>
        <button className="ai-briefing__toggle" onClick={() => setCollapsed(false)} aria-label="Expand briefing">▼</button>
      </div>
    );
  }

  return (
    <div className="ai-briefing">
      <div className="ai-briefing__head">
        <span className="ai-briefing__title">
          <span className="spark">✦</span>
          {title}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <span className="ai-briefing__date">{date}</span>
          <button className="ai-briefing__toggle" onClick={() => setCollapsed(true)} aria-label="Minimize briefing">▲</button>
        </span>
      </div>
      <div className="ai-briefing__actions">
        {actions.map((a, i) => (
          <div className="ai-briefing__action" key={i}>
            <span className={`ai-briefing__dot ${a.tone}`} />
            <span>{a.text}</span>
          </div>
        ))}
      </div>
      {summary && <div className="ai-briefing__summary">{summary}</div>}
    </div>
  );
}

// Insights tab label helper (✦ + text + count badge or signal)
function InsightsTabLabel({ count, signal, label = 'Insights' }) {
  return (
    <>
      <span className="ins-spark">✦</span>
      {label}
      {count > 0 && <span className="ins-badge">{count}</span>}
      {!count && signal && (
        <span className={`ins-signal ${signal.tone}`}>{signal.text}</span>
      )}
    </>
  );
}

window.AiBriefing = AiBriefing;
window.InsightsTabLabel = InsightsTabLabel;

