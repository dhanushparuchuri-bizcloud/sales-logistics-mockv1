// Module-level Actions store with pub/sub.
// Used by ActionsPane, ActionRow, header button, etc.

const _state = {
  open: false,
  items: [],  // {id, sourceId, text, account, sourceRef, priority, dueLabel, done, createdAt}
  addedSourceIds: {},
  toast: null, // {text, account, sourceRef} | null
};
const _listeners = new Set();
const _notify = () => _listeners.forEach(fn => fn());

const ActionsStore = {
  open()   { _state.open = true;  _notify(); },
  close()  { _state.open = false; _notify(); },
  toggle() { _state.open = !_state.open; _notify(); },
  add(item) {
    if (item.sourceId && _state.addedSourceIds[item.sourceId]) return;
    const id = 'a' + Date.now() + Math.floor(Math.random() * 1000);
    _state.items = [..._state.items, { id, done: false, createdAt: Date.now(), ...item }];
    if (item.sourceId) _state.addedSourceIds = { ..._state.addedSourceIds, [item.sourceId]: id };
    // Fire a toast unless it's a seed item
    if (!item.silent) {
      _state.toast = { text: item.text, account: item.account, sourceRef: item.sourceRef, stamp: Date.now() };
    }
    _notify();
  },
  addManual(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    this.add({ text: trimmed, priority: 'amber', dueLabel: 'Today' });
  },
  toggleDone(id) {
    _state.items = _state.items.map(i => {
      if (i.id !== id) return i;
      const done = !i.done;
      if (done && i.sourceId) delete _state.addedSourceIds[i.sourceId];
      else if (!done && i.sourceId) _state.addedSourceIds[i.sourceId] = i.id;
      return { ...i, done };
    });
    _notify();
  },
  remove(id) {
    const it = _state.items.find(i => i.id === id);
    if (it && it.sourceId) delete _state.addedSourceIds[it.sourceId];
    _state.items = _state.items.filter(i => i.id !== id);
    _notify();
  },
  dismissToast() { _state.toast = null; _notify(); },
  hasSource(sourceId) { return !!_state.addedSourceIds[sourceId]; },
  getState() { return _state; },
  subscribe(fn) { _listeners.add(fn); return () => _listeners.delete(fn); },
};

// Hook for components to subscribe
function useActions() {
  const [, force] = React.useState(0);
  React.useEffect(() => ActionsStore.subscribe(() => force(x => x + 1)), []);
  return _state;
}

window.ActionsStore = ActionsStore;
window.useActions = useActions;

// Seed a few items so the pane isn't empty on first open (silent: no toast)
ActionsStore.add({ sourceId: 'seed-1', text: 'Call John re: contract renewal', account: 'DataCo Industries', priority: 'red', dueLabel: 'Today', silent: true });
ActionsStore.add({ sourceId: 'seed-2', text: 'Send case study to trade show lead', priority: 'amber', dueLabel: 'Wed', silent: true });
