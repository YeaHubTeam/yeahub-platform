import { FC } from 'react';

import IconCheck from '@/shared/assets/icons/iconCheck.svg';
import { Flex } from '@/shared/ui/Flex';

import { Subscribe } from '@/features/subscription/subscribe/ui/Subcribe';

import { SubscriptionProps } from '../../model/types/subscription';

import styles from './Subscription.module.css';

export const Subscription: FC<{ item: SubscriptionProps }> = ({ item }) => {
	return (
		<div className={styles['subscription']}>
			<Flex gap="8" className={styles['subscription-wrapper']}>
				<item.icon style={{ width: '39px', height: '39px' }} />
				<p className={styles['subscription-name']}>{item.name}</p>
			</Flex>
			<p className={styles['subscription-description']}>{item.description}</p>
			<p className={styles['subscription-price']}>
				{item.price === 0 ? `Free/месяц` : `${item.price}₽/месяц`}
			</p>
			<Subscribe className={styles['subscription-button']} />
			<ul className={styles['subscription-items']}>
				{item.advantages.map((advantage) => (
					<li key={advantage} className={styles['subscription-item']}>
						<IconCheck className={styles['subscription-check']} />
						{advantage}
					</li>
				))}
			</ul>
		</div>
	);
};
