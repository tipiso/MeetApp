const loginUrl = `/account/login`;
const registerUrl = `/account/register`;

const usersUrl = `/users`;
const messagesUrl = '/messages';
const likesUrl = '/likes';
const hobbiesUrl = '/hobbies';

const userUrl = (userName: string) => `/users/${userName}`;
const addPhotoUrl = '/add-photo';
const setMainPhotoUrl = (photoId: number) => `/set-main-photo/${photoId}`;
const threadUrl = '/thread';
const conversationsUrl = '/conversations';

export {
  loginUrl,
  conversationsUrl,
  usersUrl,
  registerUrl,
  userUrl,
  setMainPhotoUrl,
  likesUrl,
  hobbiesUrl,
  addPhotoUrl,
  messagesUrl,
  threadUrl,
};
