import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './VacancyStatItem.module.css';

interface VacancyStatItemProps {
	value: number;
	label: string;
}
export const VacancyStatItem = ({ value, label }: VacancyStatItemProps) => {
	return (
		<Flex gap="4" direction="column" align="center" flex={1} className={styles['stat-item']}>
			<Text variant="body5-accent" color="purple-700">
				{value}
			</Text>
			<Text variant="body2-accent" color="black-900" isNoWrap>
				{label}
			</Text>
		</Flex>
	);
};
