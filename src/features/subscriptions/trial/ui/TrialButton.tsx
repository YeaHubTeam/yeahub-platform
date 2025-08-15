import classNames from 'classnames';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { Subscription } from '@/shared/config/i18n/i18nTranslations';
import { EMAIL_VERIFY_SETTINGS_TAB } from '@/shared/constants/customRoutes';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';

import { getIsEmailVerified } from '@/entities/profile';

import { useLazyGetTrialQuery } from '../api/getTrial';

import styles from './TrialButton.module.css';

interface TrialButtonProps {
	className?: string;
}

export const TrialButton = ({ className }: TrialButtonProps) => {
	const { t } = useTranslation(i18Namespace.subscription);

	const navigate = useNavigate();

	const isEmailVerified = useAppSelector(getIsEmailVerified);

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
		<Button
			disabled={isLoading}
			size="large"
			variant="outline"
			className={classNames(styles.trial, className)}
			onClick={onGetTrial}
		>
			{t(Subscription.SUBSCRIPTION_BUTTON_TRIAL)}
		</Button>
	);
};
