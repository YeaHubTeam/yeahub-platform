import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
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
