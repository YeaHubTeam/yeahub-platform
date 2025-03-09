import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './GradeChip.module.css';

interface GradeChipProps {
	label: string;
	value: number;
}

export const GradeChip = ({ label, value }: GradeChipProps) => {
	return (
		<Flex align="center" gap="12" componentType="li" className={styles.param}>
			<Text variant="body2-accent" color="black-800">
				{label}:
			</Text>
			<Text variant="body2-strong" color="white-900" className={styles.value}>
				{value}
			</Text>
		</Flex>
	);
};
