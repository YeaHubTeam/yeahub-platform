import { State } from '@/shared/config/store/State';

export const getProfileIsEmailSent = (state: State) => {
	return state.profile.isEmailSent;
};
