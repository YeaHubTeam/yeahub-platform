import { ApiTags, baseApi, i18n, Translation } from '@/shared/config';
import { toast } from '@/shared/ui/Toast';

import { trialApiUrl } from '../model/constants/trialConstants';

export const trialApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getTrial: build.query<void, void>({
			query: () => ({ url: trialApiUrl.getTrial }),
			async onQueryStarted(_, { dispatch }) {
				try {
					toast.success(i18n.t(Translation.TOAST_SUBSCRIPTIONS_TRIAL_SUCCESS));
					dispatch(baseApi.util.invalidateTags([ApiTags.PROFILE, ApiTags.SUBSCRIPTIONS]));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_SUBSCRIPTIONS_TRIAL_FAILED));
					console.log(error);
				}
			},
		}),
	}),
});

export const { useLazyGetTrialQuery } = trialApi;
