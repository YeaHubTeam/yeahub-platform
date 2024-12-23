import ArrowDown from '@/shared/assets/icons/arrowDown.svg';
import ArrowUp from '@/shared/assets/icons/arrowUp.svg';
import { Flex } from '@/shared/ui/Flex';

import styles from './InterviewResults.module.css';

interface InterviewResultsProps {
	label: string;
	correctAnswersCount: number;
	incorrectAnswersCount: number;
}

export const InterviewResults = ({
	label,
	correctAnswersCount,
	incorrectAnswersCount,
}: InterviewResultsProps) => {
	return (
		<Flex align="center" gap="8" className={styles.param}>
			<span>{label}</span>
			<Flex align="center" gap="8">
				<Flex align="center" gap="4">
					<ArrowUp className={styles.icon} />
					<span className={styles.count}>{correctAnswersCount}</span>
				</Flex>
				<Flex align="center" gap="4">
					<ArrowDown className={styles.icon} />
					<span className={styles.count}>{incorrectAnswersCount}</span>
				</Flex>
			</Flex>
		</Flex>
	);
};
