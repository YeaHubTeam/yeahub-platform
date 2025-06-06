import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './GradeChip.module.css';

interface GradeChipProps {
	label: string;
	value: number;
	size?: 'small' | 'medium';
	className?: string;
}

export const GradeChip = ({ label, value, size, className }: GradeChipProps) => {
	return (
		<Flex align="center" gap="12" componentType="li" className={`${styles.param} ${className}`}>
			<Text variant={`${size === 'small' ? 'body1' : 'body2-accent'}`} color="black-800">
				{label}:
			</Text>
			<Text
				variant={`${size === 'small' ? 'body1' : 'body2-strong'}`}
				color="white-900"
				className={styles.value}
			>
				{value}
			</Text>
		</Flex>
	);
};
