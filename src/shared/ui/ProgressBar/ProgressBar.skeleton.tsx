import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import { ProgressBarProps } from './ProgressBar';
import styles from './ProgressBar.module.css';

export const ProgressBarSkeleton = ({ label, className, variant = 'small' }: ProgressBarProps) => {
	return (
		<div className={className}>
			<Skeleton className={(styles['progress-bar'], styles[`progress-bar-${variant}`])} />
			{label && <TextSkeleton variant="body2-accent" width={180} className={styles.label} />}
		</div>
	);
};
