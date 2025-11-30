import { User } from '@/features/api/model';
import { create } from 'zustand';

export interface UserInfoState {
  userInfo?: User;
  setUserInfo: (userInfo: User) => void;
}

export const useUserInfoStore = create<UserInfoState>()((set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo: User) => set({ userInfo }),
}));