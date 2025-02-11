import classNames from 'classnames';

import { Text } from '@/shared/ui/Text';

import styles from './ProgressBar.module.css';

export interface ProgressBarProps {
	currentCount: number;
	totalCount: number;
	className?: string;
	label?: string;
	variant?: 'small' | 'large';
}

export const ProgressBar = ({
	className = '',
	currentCount,
	totalCount,
	label,
	variant = 'small',
}: ProgressBarProps) => {
	return (
		<div className={classNames(styles['progress-bar'], className)}>
			<progress
				className={styles[`progress-bar-${variant}`]}
				value={currentCount}
				max={totalCount}
			/>
			{label && (
				<Text variant="body1-accent" className={styles[`label-${variant}`]}>
					{label}
				</Text>
			)}
		</div>
	);
};
