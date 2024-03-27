const routes = {
  home: '/',
  signin: '/auth/signIn',
  register: '/auth/register',
  users: '/users',
  user: '/users/:username',
  userProfile: '/users/:username/profile',
  editCurrentUserProfile: '/users/:username/edit',
  currentUserProfile: '/users/me',

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
