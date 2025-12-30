import { State } from '@/shared/config';

export const getActiveSubscription = (state: State) => {
	return state.activeSubscription.subscription;
};
