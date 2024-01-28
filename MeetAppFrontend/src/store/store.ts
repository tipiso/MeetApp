import { Gender, User } from '@/features/users/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type AppStore = {
  user: User;
  likedUsers: User[];
};

type AppStoreActions = {
  setUser: (loggedUser: User) => void;
  setLikedUsers: (friends: User[]) => void;
  reset: () => void;
};

const initialState = {
  user: {
    id: -1,
    token: '',
    userName: '',
    age: 0,
    photoUrl: '',
    knownAs: '',
    created: new Date(),
    lastActive: new Date(),
    gender: '' as Gender,
    isLikedByCurrentUser: false,
    introduction: '',
    lookingFor: '',
    interests: '',
    city: '',
    country: '',
    photos: [],
    hobbys: [],
  },
  likedUsers: [],
};

const useStore = create<AppStore & AppStoreActions>()(
  devtools(
    persist(
      (set) => ({
        // States
        ...initialState,
        // Setters
        setUser: (loggedUser) => set(() => ({ user: loggedUser })),
        setLikedUsers: (likedUsers) => set(() => ({ likedUsers })),
        reset: () => {
          set(initialState);
        },
      }),
      {
        name: 'app-storage',
      },
    ),
  ),
);

export default useStore;
