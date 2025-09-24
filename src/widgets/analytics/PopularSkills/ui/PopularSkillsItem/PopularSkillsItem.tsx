import { Card } from '@/shared/ui/Card';
import { ProgressBar } from '@/shared/ui/ProgressBar';

import styles from './PopularSkillsItem.module.css';

interface SkillProgressProps {
	currentCount: number;
	totalCount: number;
	title: string;
}

export const PopularSkillsItem = ({ currentCount, totalCount, title }: SkillProgressProps) => {
	return (
		<Card className={styles['progress-item-card']} withOutsideShadow size="small" title={title}>
			<ProgressBar
				className={styles['progress-bar']}
				currentCount={currentCount}
				totalCount={totalCount}
				variant="medium"
				label={`${currentCount}%`}
			/>
		</Card>
	);
};
