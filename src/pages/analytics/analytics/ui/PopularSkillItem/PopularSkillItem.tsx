import { Card } from '@/shared/ui/Card';
import { GraphProgressBar } from '@/shared/ui/GraphProgressBar';

import styles from './PopularSkillItem.module.css';

interface PopularSkillItemProps {
	currentCount: number;
	totalCount: number;
	title: string;
}

export const PopularSkillItem = ({ currentCount, totalCount, title }: PopularSkillItemProps) => {
	return (
		<Card className={styles[`progress-item-card`]} withOutsideShadow size="small">
			<GraphProgressBar
				title={title}
				variant="medium"
				totalCount={totalCount}
				currentCount={currentCount}
				label={`${currentCount}%`}
			/>
		</Card>
	);
};
