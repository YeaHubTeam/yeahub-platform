import { State } from '@/shared/config';

export const getSelectedReferralLinks = (state: State) =>
	state.referralLinksPage?.selectedReferralLinks || [];
