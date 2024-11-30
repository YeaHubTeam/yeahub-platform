import { i18Namespace } from '@/shared/config/i18n';
import { Subscription } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';

export const UnsubscribeButton = () => {
	const { t } = useI18nHelpers(i18Namespace.subscription);
	return (
		<Button variant="tertiary" aria-label="Cancel subscription">
			{t(Subscription.CANCEL_SUBSCRIPTION)}
		</Button>
	);
};
