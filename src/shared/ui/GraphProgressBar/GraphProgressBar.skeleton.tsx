import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { Skeleton } from '../Skeleton';

import styles from './GraphProgressBar.module.css';

export interface GraphProgressBarSkeletonProps {
	currentSize: number;
	barWidth: number;
	direction: 'row' | 'column';
	className?: string;
	labelWidth?: number;
	titleWidth?: number;
	variant?: 'medium';
}

export const GraphProgressBarSkeleton = ({
	className = '',
	currentSize,
	barWidth,
	direction = 'row',
	labelWidth,
	titleWidth,
	variant = 'medium',
}: GraphProgressBarSkeletonProps) => {
	return (
		<Flex
			direction="column"
			align={direction === 'row' ? 'start' : 'center'}
			className={classNames(styles['progress-bar'], className)}
			gap="10"
		>
			{titleWidth && (
				<TextSkeleton width={titleWidth} variant={direction === 'row' ? 'body3-accent' : 'body1'} />
			)}
			<Flex
				direction={direction}
				gap="10"
				justify={direction === 'column' ? 'end' : 'between'}
				align="center"
				maxWidth
				maxHeight
			>
				<Skeleton
					style={
						direction === 'row'
							? { width: currentSize, height: barWidth }
							: { height: currentSize, width: barWidth }
					}
					className={styles[`progress-bar-${variant}`]}
				/>
				{labelWidth && (
					<TextSkeleton
						width={labelWidth}
						variant="body2-accent"
						color="black-500"
						className={styles[`label-${variant}`]}
					/>
				)}
			</Flex>
		</Flex>
	);
};
