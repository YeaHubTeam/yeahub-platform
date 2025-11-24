import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { EMAIL_VERIFY_SETTINGS_TAB } from '@/shared/constants/customRoutes';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';

import { getIsVerified } from '@/entities/profile';

import { useLazyGetPaymentUrlQuery } from '@/features/subscriptions/subscribe/api/getPaymentUrl';

import styles from './SubscribeButton.module.css';

interface SubscribeButtonProps {
	className?: string;
	email: string;
}

export const SubscribeButton = ({ className, email }: SubscribeButtonProps) => {
	const { trigger } = useFormContext();
	const [getPaymentUrl] = useLazyGetPaymentUrlQuery();
	const navigate = useNavigate();

	const isEmailVerified = useAppSelector(getIsVerified);

	const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const isValid = await trigger();
		if (!isEmailVerified) {
			navigate(EMAIL_VERIFY_SETTINGS_TAB);
			return;
		}
		if (!isValid) return;
		try {
			const { data: paymentUrl } = await getPaymentUrl({ subscriptionId: '3', email });
			if (paymentUrl) {
				window.location.href = paymentUrl;
			}
		} catch (error) {
			toast.error(i18n.t(Translation.TOAST_SUBSCRIPTIONS_SUBSCRIBE_FAILED));
			console.error('Payment error:', error);
		}
	};

	return (
		<Button size="large" className={classNames(styles.subscribe, className)} onClick={handleSubmit}>
			Подписаться
		</Button>
	);
};
