import { State } from '@/shared/config/store/State';

export const getUsersPageNum = (state: State) => state.usersPage?.page || 1;
