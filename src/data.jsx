// ====== Mock data ======

const KPIS = [
  { label: 'Unanswered Emails', value: '4', sub: 'awaiting Ops response', accent: 'blue' },
  { label: 'Silent Accounts', value: '6', sub: 'no activity 7+ days', accent: 'blue' },
  { label: 'Stale Quotes', value: '9', sub: 'no activity 7+ days' },
  { label: 'Ops Avg Response', value: '6.2h', sub: 'this week' },
  { label: 'Follow-up Rate', value: '78%', sub: 'within 48h' },
  { label: 'Time to Quote', value: '4.2h', sub: 'avg this week' },
  { label: 'New Quotes', value: '18', sub: '$124K this month' },
  { label: 'Won / Lost', value: '12 / 5', sub: '$86K / $22K' },
];

const LEADS = [
  { id: 'l1', company: 'DataCo Industries',  contact: 'John Williams', email: 'john@dataco.com',   stage: 'Negotiating',   stageTone: 'blue',      value: '$45K',  last: '2 days ago' },
  { id: 'l2', company: 'Apex Manufacturing', contact: 'Maria Chen',    email: 'maria@apex.com',    stage: 'Proposal Sent', stageTone: 'indigo',    value: '$120K', last: '5 days ago' },
  { id: 'l3', company: 'TechFlow Systems',   contact: 'David Park',    email: 'david@techflow.com', stage: 'Qualified',    stageTone: 'grey',      value: '$30K',  last: '1 day ago'  },
  { id: 'l4', company: 'Global Meridian',    contact: 'Lisa Brown',    email: 'lisa@globalm.com',  stage: 'Contacted',     stageTone: 'grey-soft', value: '$80K',  last: '3 days ago' },
  { id: 'l5', company: 'Zenith Corp',        contact: 'Tom Reed',      email: 'tom@zenith.com',    stage: 'Qualified',     stageTone: 'grey',      value: '$25K',  last: '4 days ago' },
  { id: 'l6', company: 'Nexus Freight',      contact: 'Amy Sato',      email: 'amy@nexus.com',     stage: 'Negotiating',   stageTone: 'blue',      value: '$65K',  last: '1 day ago'  },
];

const ACCOUNTS = [
  {
    id: 'a1', name: 'Encore Global', station: 'DFW', agent: 'James R.', loc: 'DFW Station · James R.',
    active: 4, closed: 12, revenue: '$142K', trend: 'down',
    health: { tone: 'red', text: 'Competitor mentioned' },
    last: '2 days ago',
    contacts: 6, ytdShipments: 84, openQuotes: 3, mode: 'Air + Ground',
  },
  {
    id: 'a2', name: 'Westfield Inc', station: 'Baltimore', agent: 'Agent C', loc: 'Baltimore Station · Agent C',
    active: 0, closed: 3, revenue: '$31K', trend: 'down',
    health: { tone: 'grey', text: 'Quiet 18 days' },
    last: '18 days ago',
    contacts: 2, ytdShipments: 14, openQuotes: 0, mode: 'Ground',
  },
  {
    id: 'a3', name: 'Pacific Logistics', station: 'NYC', agent: 'Maria T.', loc: 'NYC Station · Maria T.',
    active: 2, closed: 8, revenue: '$88K', trend: 'flat',
    health: { tone: 'amber', text: 'Frequency down 35%' },
    last: '1 day ago',
    contacts: 4, ytdShipments: 62, openQuotes: 2, mode: 'Ocean + Air' ,
  },
  {
    id: 'a4', name: 'Acme Corp', station: 'DFW', agent: 'James R.', loc: 'DFW Station · James R.',
    active: 3, closed: 15, revenue: '$210K', trend: 'flat',
    health: { tone: 'amber', text: 'CSAT dropped to 2.8' },
    last: '3 days ago',
    contacts: 8, ytdShipments: 138, openQuotes: 5, mode: 'Ground + Air',
  },
  {
    id: 'a5', name: 'SGK Industries', station: 'Chicago', agent: 'Sam P.', loc: 'Chicago Station · Sam P.',
    active: 1, closed: 22, revenue: '$340K', trend: 'up',
    health: { tone: 'green', text: 'On Track' },
    last: '1 day ago',
    contacts: 11, ytdShipments: 204, openQuotes: 1, mode: 'Air',
  },
  {
    id: 'a6', name: 'Meridian Events', station: 'NYC', agent: 'Maria T.', loc: 'NYC Station · Maria T.',
    active: 2, closed: 6, revenue: '$94K', trend: 'flat',
    health: { tone: 'green', text: 'On Track' },
    last: '2 days ago',
    contacts: 5, ytdShipments: 47, openQuotes: 1, mode: 'Ground + Air',
  },
];

const TASKS = [
  { id: 't1', title: 'Reply to Pacific Logistics — quote follow-up', meta: 'Account · Pacific Logistics', due: 'Overdue · 2d', tone: 'overdue' },
  { id: 't2', title: 'Call J. Murata at Encore Global re: competitor', meta: 'Account · Encore Global', due: 'Today', tone: 'today' },
  { id: 't3', title: 'Send revised proposal to Apex Manufacturing', meta: 'Lead · Apex Manufacturing', due: 'Tomorrow', tone: '' },
  { id: 't4', title: 'Onboarding call — Halcyon Bio (ORD)', meta: 'Account · Halcyon Bio', due: 'Fri May 22', tone: '' },
  { id: 't5', title: 'Review CSAT escalation for Acme Corp', meta: 'Account · Acme Corp', due: 'Mon May 25', tone: '' },
  { id: 't6', title: 'Quarterly check-in with SGK Industries', meta: 'Account · SGK Industries', due: 'Wed May 27', tone: '' },
];

const ACTIVITY = [
  { when: 'Today · 09:14', what: 'Quote QT-44218 sent to Acme Corp', who: 'You · email', accent: true },
  { when: 'Yesterday · 16:42', what: 'Call logged — discussed competitor pricing', who: 'You · 22 min' },
  { when: 'Yesterday · 11:08', what: 'CSAT survey response received — score 2.8', who: 'System · automated' },
  { when: 'May 15 · 14:20', what: 'Booking BK-99812 confirmed (DTW → ATL)', who: 'Ops · L. Chen' },
  { when: 'May 13 · 10:55', what: 'Renewal contract draft uploaded', who: 'You · documents' },
  { when: 'May 09 · 09:30', what: 'Quarterly business review — meeting notes', who: 'You · note' },
];

Object.assign(window, { KPIS, LEADS, ACCOUNTS, TASKS, ACTIVITY });
