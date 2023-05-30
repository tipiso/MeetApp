const routes = {
  home: '/',
  signin: '/auth/signIn',
  register: '/auth/register',
  users: '/users',
  user: '/users/:username',
};

const navRoutes = [{ href: 'users', text: 'Users' }];

export { routes, navRoutes };
