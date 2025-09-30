import classNames from 'classnames';

import { Text } from '@/shared/ui/Text';

import styles from './ProgressBar.module.css';

export interface ProgressBarProps {
	currentCount: number;
	totalCount: number;
	className?: string;
	label?: string;
	variant?: 'small' | 'large' | 'medium';
	direction?: 'row' | 'column';
}

export const ProgressBar = ({
	className = '',
	currentCount,
	totalCount,
	label,
	variant = 'small',
	direction = 'row',
}: ProgressBarProps) => {
	return (
		<div className={classNames(styles['progress-bar'], className, styles[direction])}>
			<progress
				className={styles[`progress-bar-${variant}`]}
				value={currentCount}
				max={totalCount}
			/>
			{label && (
				<Text variant="body2-accent" color="black-500" className={styles[`label-${variant}`]}>
					{label}
				</Text>
			)}
		</div>
	);
};
