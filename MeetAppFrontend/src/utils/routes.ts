const routes = {
  home: '/',
  signin: '/auth/signIn',
  register: '/auth/register',
  users: '/users',
  user: '/users/:username',

  messages: '/messages',

  matches: '/matches',

  search: '/search',
  advancedSearch: '/search/advanced',
};

const navRoutes = [
  { href: 'users', text: 'Users' },
  { href: 'matches', text: 'Matches' },
  { href: 'messages', text: 'Messages' },
];

export { routes, navRoutes };
