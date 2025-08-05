import classNames from 'classnames';

import { Pallete } from '@/shared/types/types';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './StatusChip.module.css';

export type StatusChipVariant = 'green' | 'yellow' | 'red' | 'purple';

export interface StatusChipItem {
	text: string;
	variant: StatusChipVariant;
}
interface StatusChipProps {
	status: StatusChipItem;
}

export const STATUS_CHIP_TEXT_COLORS: Record<StatusChipVariant, Pallete> = {
	red: 'red-900',
	yellow: 'yellow-900',
	green: 'green-900',
	purple: 'purple-800',
} as const;

export const StatusChip = ({ status }: StatusChipProps) => {
	const { variant, text } = status;

	return (
		<Flex
			justify="center"
			align="center"
			dataTestId="StatusChip"
			className={classNames(styles.wrapper, styles[`variant-${variant}`])}
		>
			<Text variant="body1-accent" color={STATUS_CHIP_TEXT_COLORS[variant]}>
				{text}
			</Text>
		</Flex>
	);
};
