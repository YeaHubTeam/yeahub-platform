import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Subscription as SubscriptionI18 } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';

interface SubscribeProps {
	className?: string;
}

export const SubscribeButton = ({ className }: SubscribeProps) => {
	const { t } = useTranslation(i18Namespace.subscription);

	return <Button className={className}>{t(SubscriptionI18.SUBSCRIBE_ACTION)}</Button>;
};
