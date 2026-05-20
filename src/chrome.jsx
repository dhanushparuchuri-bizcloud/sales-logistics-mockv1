// Sidebar + Header

function Sidebar({ active, onNavigate }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: Ico.Dashboard, enabled: false },
    { id: 'sales',     label: 'Sales',     icon: Ico.Sales,     enabled: true  },
    { id: 'shipments', label: 'Shipments', icon: Ico.Shipments, enabled: false },
    { id: 'booking',   label: 'Booking',   icon: Ico.Booking,   enabled: false },
    { id: 'admin',     label: 'Admin',     icon: Ico.Admin,     enabled: false },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">ICAT</div>
      <nav className="sidebar__nav">
        {items.map(it => {
          const Icon = it.icon;
          const isActive = active === it.id || (it.id === 'sales' && ['sales','leads','accounts','detail','quote','agents','agentDetail'].includes(active));
          return (
            <button
              key={it.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => it.enabled && onNavigate('sales')}
              style={!it.enabled ? { opacity: 0.55, cursor: 'default' } : null}
            >
              <Icon />
              <span>{it.label}</span>
            </button>
          );
        })}
      </nav>
      <button className="sidebar__logout">
        <Ico.Logout />
        <span>Log Out</span>
      </button>
    </aside>
  );
}

function Header({ name = 'Kiran V.', initial = 'K' }) {
  const now = new Date(2026, 4, 19);
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const dayName = days[now.getDay()];
  const dateStr = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  return (
    <header className="header">
      <div className="header__user">
        <div className="avatar">{initial}</div>
        <div className="header__welcome">
          Welcome back,
          <strong>{name}</strong>
        </div>
      </div>
      <div className="header__date">
        <div className="day">{dayName}</div>
        <div className="date">{dateStr}</div>
      </div>
    </header>
  );
}

window.Sidebar = Sidebar;
window.Header = Header;
