import { Card } from '@/shared/ui/Card';
import { PieChart } from '@/shared/ui/charts';
import { Flex } from '@/shared/ui/Flex';
import { AttemptInfo } from '@/shared/ui/PercentsInfoPie/model/types/types';

import { AttemptInfoItem } from '../AttemptInfoItem/AttemptInfoItem';

import styles from './PercentsInfoPie.module.css';

export interface PercentsInfoPieProps {
	className?: string;
	title: string;
	attemptStats: AttemptInfo[];
	totalAttempt: number;
	isLoading?: boolean;
}

export const PercentsInfoPie = ({
	className,
	title,
	attemptStats,
	totalAttempt,
	isLoading,
}: PercentsInfoPieProps) => {
	return (
		<Card className={className} isTitleCenter title={title}>
			<Flex justify="center" align="center" gap="48" className={styles.wrapper}>
				<PieChart isLoading={isLoading} totalAttempt={totalAttempt} attemptData={attemptStats} />
				<Flex componentType="ul" direction="column" gap="24" className={styles.list}>
					{attemptStats.map((attemptStat) => (
						<AttemptInfoItem key={attemptStat.name} attemptItem={attemptStat} />
					))}
				</Flex>
			</Flex>
		</Card>
	);
};
