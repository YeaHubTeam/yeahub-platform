import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import { ProgressBarProps } from './ProgressBar';
import styles from './ProgressBar.module.css';

export const ProgressBarSkeleton = ({ label, className }: ProgressBarProps) => {
	return (
		<div className={className}>
			<Skeleton className={styles['progress-bar']} />
			{label && <TextSkeleton variant="body2-accent" width={180} className={styles.label} />}
		</div>
	);
};
