import { Card } from '@/shared/ui/Card';

import { ProgressCircle } from '../ProgressCircle/ProgressCircle';

import styles from './MetricCard.module.css';

interface MetricCardProps {
	percent?: number;
	matched?: number;
	total?: number;
	priority?: number;
	title: string;
}

export const MetricCard = ({ percent, matched, total, priority, title }: MetricCardProps) => {
	return (
		<Card withOutsideShadow className={styles.container} title={title}>
			<ProgressCircle percent={percent} matched={matched} total={total} priority={priority} />
		</Card>
	);
};
