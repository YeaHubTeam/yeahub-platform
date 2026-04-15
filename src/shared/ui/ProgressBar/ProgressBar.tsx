import classNames from 'classnames';

import { Text } from '@/shared/ui/Text';

import { progressBarTestIds } from './constants';
import styles from './ProgressBar.module.css';

export type ProgressBarVariant = 'small' | 'large' | 'medium';
export type ProgressBarColor = 'green' | 'yellow' | 'red';

export interface ProgressBarProps {
	currentCount: number;
	totalCount: number;
	className?: string;
	label?: string;
	variant?: ProgressBarVariant;
	color?: ProgressBarColor;
}

export const ProgressBar = ({
	className = '',
	currentCount,
	totalCount,
	label,
	variant = 'small',
	color,
}: ProgressBarProps) => {
	return (
		<div
			className={classNames(styles['progress-bar'], className)}
			data-testid={progressBarTestIds.wrapper}
		>
			<progress
				className={classNames(
					styles[`progress-bar-${variant}`],
					color && styles[`progress-bar-${color}`],
				)}
				value={currentCount}
				max={totalCount}
				data-testid={progressBarTestIds.progress}
			/>
			{label && (
				<Text
					variant="body2-accent"
					color="black-500"
					className={styles[`label-${variant}`]}
					dataTestId={progressBarTestIds.label}
				>
					{label}
				</Text>
			)}
		</div>
	);
};
