// Reusable action-row with inline draft email composer + "+" capture into personal Actions pane.

function ActionRow({ action, compact, showAccount, onOpenAccount }) {
  const [draftOpen, setDraftOpen] = React.useState(false);
  const [subject, setSubject]     = React.useState(action.draft ? action.draft.subject : '');
  const [body, setBody]           = React.useState(action.draft ? action.draft.body : '');
  const [copied, setCopied]       = React.useState(false);

  useActions();
  const added = ActionsStore.hasSource(action.id);

  const handleAdd = () => {
    if (added) return;
    ActionsStore.add({
      sourceId: action.id,
      text: action.title,
      account: action.account,
      sourceRef: action.ref,
      priority: action.tone,
      dueLabel: action.tone === 'red' ? 'Today' : action.tone === 'amber' ? 'This week' : 'No due date',
    });
  };

  const copyDraft = () => {
    const text = `To: ${action.draft.to}\nSubject: ${subject}\n\n${body}`;
    if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`ins-action-row ${action.kind === 'proactive' ? 'proactive' : ''} ${compact ? 'compact' : ''}`}>
      <div className="ins-action-row__main">
        <span className={`pdot ${action.tone}`} />
        {showAccount && <span className="acct">{action.account}</span>}
        <div className="body">
          <div className="title">{action.title}</div>
          <div className="ctx">{action.detail}</div>
        </div>
        {action.draft ? (
          <button
            className={`ins-action-row__draft-btn ${draftOpen ? 'active' : ''}`}
            onClick={() => setDraftOpen(o => !o)}
          >
            ✉ Draft email
          </button>
        ) : (
          <span />
        )}
        {action.ref ? (
          <button className="link" onClick={() => onOpenAccount && onOpenAccount(action.account)}>
            View {action.ref} →
          </button>
        ) : (
          <span />
        )}
        <button
          className={`add-to-actions-btn ${added ? 'added' : ''}`}
          onClick={handleAdd}
          aria-label={added ? 'Added' : 'Add to your actions'}
          title={added ? 'Added to your actions' : 'Add to your actions'}
        >
          {added ? '✓' : '+'}
        </button>
      </div>

      {draftOpen && action.draft && (
        <div className="draft-compose">
          <div className="draft-compose__meta">
            <strong>To:</strong> {action.draft.to}
          </div>
          <input
            className="draft-compose__subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
          />
          <textarea
            className="draft-compose__body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <div className="draft-compose__actions">
            <button className="q-btn" onClick={copyDraft}>Copy to clipboard</button>
            <button className="q-btn primary" onClick={() => setDraftOpen(false)}>Save draft</button>
            {copied && <span className="draft-compose__copied">Copied ✓</span>}
          </div>
        </div>
      )}
    </div>
  );
}

window.ActionRow = ActionRow;
