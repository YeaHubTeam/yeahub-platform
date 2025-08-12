import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { TextVariant } from '@/shared/ui/Text/types';

import styles from './GradeChip.module.css';

export type GradeChipSize = 'small' | 'medium';

export const labelVariants: Record<GradeChipSize, TextVariant> = {
	small: 'body1',
	medium: 'body2-accent',
} as const;

export const valueVariants: Record<GradeChipSize, TextVariant> = {
	small: 'body1',
	medium: 'body2-strong',
} as const;

export interface GradeChipProps {
	label: string;
	value: number;
	size?: GradeChipSize;
	dataTestId?: string;
}

export const GradeChip = ({
	label,
	value,
	size = 'medium',
	dataTestId = 'GradeChip',
}: GradeChipProps) => {
	return (
		<Flex
			align="center"
			gap="12"
			componentType="li"
			className={classNames(styles[`size-${size}`], styles.params)}
			dataTestId={dataTestId}
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
