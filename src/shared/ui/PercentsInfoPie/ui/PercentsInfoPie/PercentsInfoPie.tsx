import { Card } from '@/shared/ui/Card';
import { PieChart } from '@/shared/ui/charts/PieChart';
import { Flex } from '@/shared/ui/Flex';
import { AttemptInfo } from '@/shared/ui/PercentsInfoPie/model/types/types';

import styles from './PercentsInfoPie.module.css';

export interface PercentsInfoPieProps {
	className?: string;
	title: string;
	attemptStats: AttemptInfo[];
	totalAttempt: number;
}

export const PercentsInfoPie = ({
	className,
	title,
	attemptStats,
	totalAttempt,
}: PercentsInfoPieProps) => {
	return (
		<Card className={className} isTitleCenter title={title}>
			<Flex justify="center" align="center" gap="48" className={styles.wrapper}>
				<PieChart totalAttempt={totalAttempt} pieData={attemptStats} />
			</Flex>
		</Card>
	);
};
