import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './GraphProgressBar.module.css';

export interface GraphProgressBarProps {
	currentCount: number;
	totalCount: number;
	className?: string;
	label?: string;
	height?: number;
	title?: string;
	variant?: 'medium';
	direction?: 'row' | 'column';
}

export const GraphProgressBar = ({
	className = '',
	currentCount,
	totalCount,
	label,
	height,
	title,
	variant = 'medium',
	direction = 'row',
}: GraphProgressBarProps) => {
	return (
		<Flex
			direction="column"
			align={direction === 'row' ? 'start' : 'center'}
			className={classNames(styles['progress-bar'], className)}
			gap="10"
		>
			{title && <Text variant={direction === 'row' ? 'body3-accent' : 'body1'}>{title}</Text>}
			<Flex direction={direction} className={styles[direction]} gap="10">
				<progress
					style={{ height }}
					className={styles[`progress-bar-${variant}`]}
					value={currentCount}
					max={totalCount}
				/>
				{label && (
					<Text variant="body2-accent" color="black-500" className={styles[`label-${variant}`]}>
						{label}
					</Text>
				)}
			</Flex>
		</Flex>
	);
};
