// Root app + routing

function App() {
  const [route, setRoute] = React.useState('sales');
  const [activeAccount, setActiveAccount] = React.useState(null);
  const [activeQuote, setActiveQuote]     = React.useState(null);
  const [activeAgent, setActiveAgent]     = React.useState(null);

  const openAccount = (a) => { setActiveAccount(a); setRoute('detail'); };
  const openQuote   = (q) => { setActiveQuote(q); setRoute('quote'); };
  const openAgent   = (a) => { setActiveAgent(a); setRoute('agentDetail'); };
  const openCustomerByName = (name) => {
    const a = (window.ACCOUNTS || []).find(x => x.name === name) || (window.ACCOUNTS || [])[0];
    if (a) openAccount(a);
  };

  // Subscribe so we re-render when pane opens/closes (drives the push class on .app)
  const actions = useActions();
  const paneOpen = actions.open;

  const handleJumpToSource = (item) => {
    if (item.account) openCustomerByName(item.account);
  };

  return (
    <div className={`app ${paneOpen ? 'actions-open' : ''}`}>
      <Sidebar active={route} onNavigate={(id) => setRoute(id)} />
      <div className="main">
        <Header />
        <main className="content">
          {route === 'sales' && (
            <SalesHome onNavigate={setRoute} onOpenAccount={openAccount} onOpenAgent={openAgent} />
          )}
          {route === 'leads' && (
            <LeadsPage onBack={() => setRoute('sales')} onOpenLead={() => {}} />
          )}
          {route === 'accounts' && (
            <AccountsPage onBack={() => setRoute('sales')} onOpen={openAccount} />
          )}
          {route === 'agents' && (
            <AgentsPage onBack={() => setRoute('sales')} onOpenAgent={openAgent} />
          )}
          {route === 'agentDetail' && activeAgent && (
            <AgentDetail
              agent={activeAgent}
              onBack={() => setRoute('agents')}
              onOpenCustomer={openCustomerByName}
            />
          )}
          {route === 'detail' && activeAccount && (
            <AccountDetail
              account={activeAccount}
              onBack={() => setRoute('accounts')}
              onOpenQuote={openQuote}
            />
          )}
          {route === 'quote' && (
            <QuoteDetail quote={activeQuote} onBack={() => setRoute('detail')} />
          )}
        </main>
      </div>
      <ActionsHeaderButton fixed={true} />
      <ActionToast />
      <ActionsPane onJumpToSource={handleJumpToSource} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
