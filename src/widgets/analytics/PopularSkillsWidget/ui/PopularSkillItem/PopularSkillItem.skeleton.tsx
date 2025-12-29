import { CardSkeleton } from '@/shared/ui/Card';
import { GraphProgressBarSkeleton } from '@/shared/ui/GraphProgressBar';

import styles from './PopularSkillItem.module.css';

interface PopularSkillItemSkeletonProps {
	currentSize: number;
}

export const PopularSkillItemSkeleton = ({ currentSize }: PopularSkillItemSkeletonProps) => {
	return (
		<CardSkeleton className={styles[`progress-item-card`]} withOutsideShadow size="small">
			<GraphProgressBarSkeleton
				direction="row"
				barWidth={24}
				labelWidth={40}
				titleWidth={80}
				currentSize={currentSize}
			/>
		</CardSkeleton>
	);
};
