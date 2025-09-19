import { api } from '../lib/api.ts';

export type AuthUser = { id: string; telegram_id: number; };

export const AuthService = {
  async signIn(initData: string): Promise<AuthUser> {
    const { data } = await api.post('/auth/sign-in', { initData });
    return data.user as AuthUser;
  },

  async me(): Promise<AuthUser> {
    const { data } = await api.get('/auth/me');

    return data as AuthUser;
  },
};
