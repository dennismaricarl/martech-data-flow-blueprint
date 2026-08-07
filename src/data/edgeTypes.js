export const EDGE_TYPES = {
  'webhook-push': {
    label: 'Webhook Push',
    color: '#a8461f',
    dash: null,
    width: 2,
    description: 'One system fires an event the moment something happens, and pushes it to the other system immediately.',
  },
  'api-pull': {
    label: 'API Pull',
    color: '#3b5a7a',
    dash: '7 5',
    width: 2,
    description: 'A system reaches out on a schedule (or on demand) and pulls the data it needs.',
  },
  'native-sync': {
    label: 'Native Sync',
    color: '#2f6b4f',
    dash: null,
    width: 3,
    description: 'Two systems are natively connected (a built-in or managed integration) and stay in sync automatically.',
  },
  'manual': {
    label: 'Manual Step',
    color: 'rgba(17,17,17,0.55)',
    dash: '1 5',
    width: 2,
    description: 'A person does this by hand, no system-to-system handoff.',
  },
};
