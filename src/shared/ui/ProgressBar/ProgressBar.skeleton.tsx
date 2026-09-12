import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import { progressBarTestIds } from './constants';
import { ProgressBarProps } from './ProgressBar';
import styles from './ProgressBar.module.css';

export const ProgressBarSkeleton = ({ label, className, variant = 'small' }: ProgressBarProps) => {
	return (
		<div className={className} data-testid={progressBarTestIds.skeleton}>
			<Skeleton className={(styles['progress-bar'], styles[`progress-bar-${variant}`])} />
			{label && (
				<TextSkeleton
					variant="body2-accent"
					width={180}
					className={styles.label}
					dataTestId={progressBarTestIds.textSkeleton}
				/>
			)}
		</div>
	);
};
