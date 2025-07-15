import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { SubscriptionCard as SubscriptionCardI18 } from '@/shared/config/i18n/i18nTranslations';

import styles from './PremiumSubscriptionTooltipBody.module.css';

export const PremiumSubscriptionTooltipBody = () => {
	const { t } = useTranslation(i18Namespace.subscriptionCard);

	const listItems = [
		t(SubscriptionCardI18.SUBSCRIPTION_CARD_PREMIUM_TOOLTIP_LIST_FIRST),
		t(SubscriptionCardI18.SUBSCRIPTION_CARD_PREMIUM_TOOLTIP_LIST_SECOND),
		t(SubscriptionCardI18.SUBSCRIPTION_CARD_PREMIUM_TOOLTIP_LIST_THIRD),
		t(SubscriptionCardI18.SUBSCRIPTION_CARD_PREMIUM_TOOLTIP_LIST_FOURTH),
		t(SubscriptionCardI18.SUBSCRIPTION_CARD_PREMIUM_TOOLTIP_LIST_FIFTH),
	];

	return (
		<Flex direction="column" gap="6">
			<Text variant="body2-strong" color="black-800">
				{t(SubscriptionCardI18.SUBSCRIPTION_CARD_PREMIUM_TOOLTIP_TITLE)}
			</Text>
			<Text variant="body2" color="black-700">
				{t(SubscriptionCardI18.SUBSCRIPTION_CARD_PREMIUM_TOOLTIP_LIST_TITLE)}
			</Text>
			<Flex componentType="ul" className={styles['tooltip-list']}>
				{listItems.map((item) => {
					return (
						<li>
							<Text variant="body2" color="black-700">
								{item}
							</Text>
						</li>
					);
				})}
			</Flex>
			<Text variant="body2" color="black-700">
				{t(SubscriptionCardI18.SUBSCRIPTION_CARD_PREMIUM_TOOLTIP_LIST_THANKS)}
			</Text>
		</Flex>
	);
};
