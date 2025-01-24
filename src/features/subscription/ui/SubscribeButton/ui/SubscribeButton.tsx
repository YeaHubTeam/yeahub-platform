import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Subscription as SubscriptionI18 } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';

import { SubscriptionAgreeFormValues } from '../../../model/types/subscriptionAgreeTypes';

interface SubscribeProps {
	className?: string;
	id: number;
}

export const SubscribeButton = ({ className, id }: SubscribeProps) => {
	const { t } = useTranslation(i18Namespace.subscription);

	const { handleSubmit, reset } = useFormContext<SubscriptionAgreeFormValues>();

	const onSubscribe = async () => {
		console.log(`subscribe ${id}`);
		reset({});
	};

	return (
		<Button onClick={handleSubmit(onSubscribe)} className={className}>
			{t(SubscriptionI18.SUBSCRIBE_ACTION)}
		</Button>
	);
};
