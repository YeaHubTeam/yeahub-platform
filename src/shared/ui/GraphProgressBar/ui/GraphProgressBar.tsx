import classNames from 'classnames';

import { Text } from '@/shared/ui/Text';

import styles from './GraphProgressBar.module.css';

export interface GraphProgressBarProps {
	currentCount: number;
	totalCount: number;
	className?: string;
	label?: string;
	variant?: 'small' | 'large' | 'medium';
	direction?: 'row' | 'column';
}

export const GraphProgressBar = ({
	className = '',
	currentCount,
	totalCount,
	label,
	variant = 'small',
	direction = 'row',
}: GraphProgressBarProps) => {
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
