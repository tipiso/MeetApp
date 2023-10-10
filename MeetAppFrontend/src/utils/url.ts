const loginUrl = `/account/login`;
const registerUrl = `/account/register`;
const usersUrl = `/users`;
const likesUrl = '/likes';
const userUrl = (userName: string) => `/users/${userName}`;

export { loginUrl, usersUrl, registerUrl, userUrl, likesUrl };
