import { State } from '@/shared/config';

export const getSelectedReferrals = (state: State) => state.referralsPage?.selectedReferrals || [];
