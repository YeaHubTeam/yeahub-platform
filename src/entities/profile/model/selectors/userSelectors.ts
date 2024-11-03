import { State } from '@/shared/config/store/State';

export const getUserIsEmailSent = (state: State) => {
	return state.userVerify.isEmailSent;
};
