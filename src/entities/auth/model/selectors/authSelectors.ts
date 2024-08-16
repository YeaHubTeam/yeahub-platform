import { State } from '@/shared/config/store/State';

export const getAuthProfile = (state: State) => state.auth.profile?.id;
