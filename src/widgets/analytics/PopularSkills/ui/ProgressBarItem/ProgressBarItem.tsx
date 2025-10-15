import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { GraphProgressBar } from '@/shared/ui/GraphProgressBar';
import { Text } from '@/shared/ui/Text';

import styles from './ProgressBarItem.module.css';

interface SkillProgressProps {
	currentCount: number;
	totalCount: number;
	title: string;
}

export const ProgressBarItem = ({ currentCount, totalCount, title }: SkillProgressProps) => {
	return (
		<Card className={styles[`progress-item-card`]} withOutsideShadow size="small">
			<Flex direction="column" align="start" gap="12" className={styles[`flex-card`]}>
				<Text variant="body3-accent">{title}</Text>
				<GraphProgressBar
					className={styles[`progress-bar`]}
					currentCount={currentCount}
					totalCount={totalCount}
					variant="medium"
					label={`${currentCount}%`}
				/>
			</Flex>
		</Card>
	);
};
