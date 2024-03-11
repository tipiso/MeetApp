import { Gender, Photo, User } from '@/features/users/types';
import { stat } from 'fs';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type AppStore = {
  user: User;
  friends: User[];
};

type AppStoreActions = {
  setUser: (loggedUser: User) => void;
  setFriends: (friends: User[]) => void;
  updateFriends: (friends: User[] | User) => void;
  updatePhotos: (photos: Photo[]) => void;
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
  friends: [],
};

const useStore = create<AppStore & AppStoreActions>()(
  devtools(
    persist(
      (set) => ({
        // States
        ...initialState,
        // Setters
        setUser: (loggedUser) => set(() => ({ user: loggedUser })),
        updateFriends: (friends) =>
          set((state) => {
            return { friends: Array.isArray(friends) ? [...state.friends, ...friends] : [...state.friends, friends] };
          }),
        setFriends: (friends) => set(() => ({ friends })),
        updatePhotos: (photos) =>
          set((state) => ({ user: { ...state.user, photos: [...state.user.photos, ...photos] } })),
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
