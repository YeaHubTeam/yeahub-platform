import { Flex } from '@/shared/ui/Flex';

import { skillsList } from '../../model/constants';
import { Badge } from '../Badge/Badge';

import styles from './List.module.css';

export const List = () => {
	return (
		<Flex gap={'16'} className={styles.list}>
			{skillsList.map(({ src, badgeText }, index) => (
				<Badge
					key={index}
					variant={index === 0 ? 'secondary' : 'primary'}
					src={src}
					badgeText={badgeText}
					showBadgeText
				/>
			))}
		</Flex>
	);
};
