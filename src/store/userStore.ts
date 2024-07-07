import { create } from 'zustand';
import { User } from 'types/User';

type UserStore = {
  userData: User;
  addUser: (item: User) => void;
  removeUser: () => void;
  setAvatarUrl: (newUrl: string) => void;
};

export const useUserStore = create<UserStore>()((set) => ({
  userData: {
    id: '',
    createdAt: new Date(),
    userName: '',
    email: '',
    avatarUrl: null,
    isVerified: false,
  },
  addUser: (newUser: User) =>
    set(() => ({
      userData: newUser,
    })),

  removeUser: () =>
    set(() => ({
      userData: {
        id: '',
        createdAt: new Date(),
        userName: '',
        email: '',
        avatarUrl: null,
        isVerified: false,
      },
    })),

  setAvatarUrl: (newUrl: string) =>
    set((state: UserStore) => ({
      userData: {
        ...state.userData,
        avatarUrl: newUrl,
      },
    })),
}));
