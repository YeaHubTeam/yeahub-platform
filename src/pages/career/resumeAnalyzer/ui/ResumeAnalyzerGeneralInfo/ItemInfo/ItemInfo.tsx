import type { ReactNode } from 'react';

import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './ItemInfo.module.css';

interface ItemInfoProps {
	icon: ReactNode;
	title?: string;
	value: ReactNode;
	description: string;
}

export const ItemInfo = ({ icon, title, value, description }: ItemInfoProps) => {
	return (
		<Flex gap="12" className={styles.item}>
			<div className={styles.wrapper}>{icon}</div>
			<Flex direction="column" gap="8" justify="between">
				{title && <Text variant="body2">{title}</Text>}
				<Text variant="body3-accent" className={styles.value}>
					{value}
				</Text>
				<Text variant="body3" color="black-500">
					{description}
				</Text>
			</Flex>
		</Flex>
	);
};
