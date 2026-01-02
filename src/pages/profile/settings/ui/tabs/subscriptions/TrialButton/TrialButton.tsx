import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Translation, Subscription, i18n } from '@/shared/config';
import { useAppSelector, EMAIL_VERIFY_SETTINGS_TAB } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';

import { getIsVerified } from '@/entities/profile';

import { useLazyGetTrialQuery } from '../../../../api/getTrial';

export const TrialButton = () => {
	const { t } = useTranslation(i18Namespace.subscription);

	const navigate = useNavigate();

	const isEmailVerified = useAppSelector(getIsVerified);

	const [getTrial, { isLoading }] = useLazyGetTrialQuery();

	const onGetTrial = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (!isEmailVerified) {
			navigate(EMAIL_VERIFY_SETTINGS_TAB);
			return;
		}
		try {
			await getTrial();
		} catch (err) {
			toast.error(i18n.t(Translation.TOAST_SUBSCRIPTIONS_TRIAL_FAILED));
			console.error('error:', err);
		}
	};

	return (
		<Button fullWidth disabled={isLoading} size="large" variant="outline" onClick={onGetTrial}>
			{t(Subscription.SUBSCRIPTION_BUTTON_TRIAL)}
		</Button>
	);
};
