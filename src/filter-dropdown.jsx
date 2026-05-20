// Shared filter dropdown — labeled trigger + check-marked menu

function FilterDropdown({ label, value, options, onChange, align = 'right' }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <div className="dropdown" ref={ref}>
      <button className="dropdown__trigger" onClick={() => setOpen(o => !o)}>
        <span className="dropdown__label">{label}</span>
        <span className="dropdown__value">{value}</span>
        <Ico.ChevronDown />
      </button>
      {open && (
        <div className="dropdown__menu" style={align === 'left' ? { right: 'auto', left: 0 } : null}>
          {options.map(o => (
            <button
              key={o}
              className={`dropdown__item ${value === o ? 'active' : ''}`}
              onClick={() => { onChange(o); setOpen(false); }}
            >
              <span>{o}</span>
              {value === o && <Ico.Check />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

window.FilterDropdown = FilterDropdown;
