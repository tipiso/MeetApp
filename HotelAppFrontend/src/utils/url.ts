const queryKeys = {
  users: 'users',
  usersList: () => queryKeys.users,
};

const loginUrl = `/account/login`;
const registerUrl = `/account/register`;

const usersUrl = `/users`;

export { queryKeys, loginUrl, usersUrl, registerUrl };
