import { State } from '@/shared/config/store/State';

export const getProfile = (state: State) => state.auth.profile || null;
export const getAccessToken = (state: State) => state.auth.accessToken || null;
