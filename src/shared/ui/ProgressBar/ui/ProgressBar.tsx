import { Text } from '@/shared/ui/Text';

import styles from './ProgressBar.module.css';

export interface ProgressBarProps {
	currentCount: number;
	totalCount: number;
	className?: string;
	label?: string;
}

export const ProgressBar = ({
	className = '',
	currentCount,
	totalCount,
	label,
}: ProgressBarProps) => {
	return (
		<div className={className}>
			<progress className={styles['progress-bar']} value={currentCount} max={totalCount}></progress>
			{label && (
				<Text variant="body2-accent" color="black-500" className={styles.label}>
					{label}
				</Text>
			)}
		</div>
	);
};
