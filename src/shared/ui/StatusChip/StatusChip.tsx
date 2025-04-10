import classNames from 'classnames';

import { Pallete } from '@/shared/types/types';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './StatusChip.module.css';

export type StatusChipVariant = 'green' | 'yellow' | 'red';

export interface StatusChipItem {
	text: string;
	variant: StatusChipVariant;
}
interface StatusChipProps {
	status: StatusChipItem;
}

export const StatusChip = ({ status }: StatusChipProps) => {
	const { variant, text } = status;

	const textColor: Record<StatusChipVariant, Pallete> = {
		red: 'red-900',
		yellow: 'yellow-900',
		green: 'green-900',
	};

	return (
		<Flex
			justify="center"
			align="center"
			className={classNames(styles.wrapper, styles[`variant-${variant}`])}
		>
			<Text variant="body1-accent" color={textColor[variant]}>
				{text}
			</Text>
		</Flex>
	);
};
