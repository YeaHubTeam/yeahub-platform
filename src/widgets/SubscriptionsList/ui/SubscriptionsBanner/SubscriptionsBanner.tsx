import { useTranslation } from 'react-i18next';

import { i18Namespace, Subscription } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './SubscriptionsBanner.module.css';

export const SubscriptionsBanner = () => {
	const { t } = useTranslation(i18Namespace.subscription);

	const listItems = [
		t(Subscription.BANNER_LIST_FIRST),
		t(Subscription.BANNER_LIST_FOURTH),
		t(Subscription.BANNER_LIST_SECOND),
		t(Subscription.BANNER_LIST_FIFTH),
		t(Subscription.BANNER_LIST_THIRD),
	];

	return (
		<Card withOutsideShadow withBorder>
			<Flex direction="column" gap="6">
				<Text variant="body3-strong" color="black-800">
					{t(Subscription.BANNER_TITLE)}
				</Text>
				<Text variant="body2" color="black-700">
					{t(Subscription.BANNER_LIST_TITLE)}
				</Text>
				<Flex componentType="ul" className={styles.list}>
					{listItems.map((item, index) => {
						return (
							<li key={index}>
								<Text variant="body2" color="black-700">
									{item}
								</Text>
							</li>
						);
					})}
					<Text
						key={listItems.length}
						variant="body2-accent"
						color="black-700"
						className={styles.thanks}
					>
						{t(Subscription.BANNER_LIST_THANKS)}
					</Text>
				</Flex>
			</Flex>
		</Card>
	);
};
