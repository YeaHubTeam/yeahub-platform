import { State } from '@/shared/config/store/State';

export const getAutProfile = (state: State) => state.auth.profile?.id;
