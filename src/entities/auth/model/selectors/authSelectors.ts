import { State } from '@/shared/config/store/State';

export const getAuthData = (state: State) => state.auth.profile;
export const getAuthError = (state: State) => state.auth.error;
