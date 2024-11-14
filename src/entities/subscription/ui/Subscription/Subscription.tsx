import IconCheck from '@/shared/assets/icons/iconCheck.svg';
import { Flex } from '@/shared/ui/Flex';

import { Subscribe } from '@/features/subscription/subscribe/ui/Subcribe';

import styles from './Subscription.module.css';

interface SubscriptionPlan {
	id: number;
	image: string;
	name: string;
	description: string;
	price: number | string;
	advantage: string[];
}

interface SubscriptionPlansProps {
	list: SubscriptionPlan[];
}

export const Subscription = ({ list }: SubscriptionPlansProps) => {
	return (
		<div className={styles['subscriptions']}>
			{list.map((item) => (
				<div key={item.id} className={styles['subscription']}>
					<Flex gap="8" className={styles['subscription-wrapper']}>
						<img src={item.image} alt="Тариф" />
						<p className={styles['subscription-name']}>{item.name}</p>
					</Flex>
					<p className={styles['subscription-description']}>{item.description}</p>
					<p className={styles['subscription-price']}>
						{typeof item.price === 'number' ? `${item.price}₽/месяц` : `${item.price}/месяц`}
					</p>
					<Subscribe className={styles['subscription-button']} />
					<ul className={styles['subscription-items']}>
						{item.advantage.map((advantage) => (
							<li key={advantage} className={styles['subscription-item']}>
								<IconCheck className={styles['subscription-check']} />
								{advantage}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};
