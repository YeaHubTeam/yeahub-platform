import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { SubscriptionCard as SubscriptionCardI18 } from '@/shared/config/i18n/i18nTranslations';

import styles from './SubscriptionTooltip.module.css';

export const SubscriptionTooltip = () => {
	const { t } = useTranslation(i18Namespace.subscriptionCard);

	return (
		<Flex direction="column" gap="6">
			<Text variant="body2-strong" color="black-800">
				{t(SubscriptionCardI18.SUBSCRIPTION_CARD_PREMIUM_TOOLTIP_TITLE)}
			</Text>
			<Text variant="body2" color="black-700">
				{t(SubscriptionCardI18.SUBSCRIPTION_CARD_PREMIUM_TOOLTIP_LIST_TITLE)}
			</Text>
			<ul className={styles['tooltip-list']}>
				<li>
					<Text variant="body2" color="black-700">
						{t(SubscriptionCardI18.SUBSCRIPTION_CARD_PREMIUM_TOOLTIP_LIST_FIRST)}
					</Text>
				</li>
				<li>
					<Text variant="body2" color="black-700">
						{t(SubscriptionCardI18.SUBSCRIPTION_CARD_PREMIUM_TOOLTIP_LIST_SECOND)}
					</Text>
				</li>
				<li>
					<Text variant="body2" color="black-700">
						{t(SubscriptionCardI18.SUBSCRIPTION_CARD_PREMIUM_TOOLTIP_LIST_THIRD)}
					</Text>
				</li>
				<li>
					<Text variant="body2" color="black-700">
						{t(SubscriptionCardI18.SUBSCRIPTION_CARD_PREMIUM_TOOLTIP_LIST_FOURTH)}
					</Text>
				</li>
				<li>
					<Text variant="body2" color="black-700">
						{t(SubscriptionCardI18.SUBSCRIPTION_CARD_PREMIUM_TOOLTIP_LIST_FIFTH)}
					</Text>
				</li>
			</ul>
			<Text variant="body2" color="black-700">
				{t(SubscriptionCardI18.SUBSCRIPTION_CARD_PREMIUM_TOOLTIP_LIST_THANKS)}
			</Text>
		</Flex>
	);
};
