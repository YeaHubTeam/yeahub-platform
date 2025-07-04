import { State } from '@/shared/config/store/State';

export const getActiveSubscription = (state: State) => {
	return state.activeSubscription.subscription;
};
