import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { TextVariant } from '@/shared/ui/Text/types';

import styles from './GradeChip.module.css';

type GradeChipSize = 'small' | 'medium' | 'large';

const labelVariants: Record<GradeChipSize, TextVariant> = {
	small: 'body1',
	medium: 'body2-accent',
	large: 'body2-accent',
} as const;

const valueVariants: Record<GradeChipSize, TextVariant> = {
	small: 'body1',
	medium: 'body2-strong',
	large: 'body2-strong',
} as const;

interface GradeChipProps {
	label: string;
	value: number;
	size?: GradeChipSize;
}

export const GradeChip = ({ label, value, size = 'medium' }: GradeChipProps) => {
	return (
		<Flex
			align="center"
			gap="12"
			componentType="li"
			className={`${styles['size-' + size]} ${styles.params}`}
		>
			<Text variant={labelVariants[size]} color="black-800">
				{label}:
			</Text>
			<Text variant={valueVariants[size]} color="white-900" className={styles.value}>
				{value}
			</Text>
		</Flex>
	);
};
