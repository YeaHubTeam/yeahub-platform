import { FC, SVGProps } from 'react';

import IconCheck from '@/shared/assets/icons/iconCheck.svg';
import { Flex } from '@/shared/ui/Flex';

import { Subscribe } from '@/features/subscription/subscribe/ui/Subcribe';

import styles from './Subscription.module.css';

interface SubscriptionPlan {
	id: number;
	image: string | FC<SVGProps<SVGSVGElement>>;
	name: string;
	description: string;
	price: number;
	advantages: string[];
}

interface SubscriptionPlanProps {
	item: SubscriptionPlan;
}

export const Subscription = ({ item }: SubscriptionPlanProps) => {
	return (
		<div className={styles['subscriptions']}>
			<div key={item.id} className={styles['subscription']}>
				<Flex gap="8" className={styles['subscription-wrapper']}>
					<item.image style={{ color: 'currentColor', width: '29px', height: '29px' }} />
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
		</div>
	);
};
