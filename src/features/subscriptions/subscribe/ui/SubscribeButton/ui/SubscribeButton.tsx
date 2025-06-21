import classNames from 'classnames';
import toast from 'react-hot-toast';
import { useFormContext } from 'react-hook-form';

import i18n from '@/shared/config/i18n/i18n';
import { Button } from '@/shared/ui/Button';
import { useLazyGetPaymentUrlQuery } from '../api/getPaymentUrl';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

import styles from './SubscribeButton.module.css';

interface SubscribeButtonProps {
	className?: string;
}

export const SubscribeButton = ({ className }: SubscribeButtonProps) => {
	const { trigger } = useFormContext();
	const [getPaymentUrl] = useLazyGetPaymentUrlQuery();

	const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const isValid = await trigger();
		if (!isValid) return;
		try {
			const { data: paymentUrl } = await getPaymentUrl('3');
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
