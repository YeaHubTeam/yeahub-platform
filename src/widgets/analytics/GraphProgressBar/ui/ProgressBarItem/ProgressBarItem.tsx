import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ProgressBar } from '@/shared/ui/ProgressBar';
import { Text } from '@/shared/ui/Text';

import styles from './ProgressBarItem.module.css';

interface SkillProgressProps {
	currentCount: number;
	totalCount: number;
	title: string;
	direction: 'row' | 'column';
}

export const ProgressBarItem = ({
	currentCount,
	totalCount,
	title,
	direction,
}: SkillProgressProps) => {
	return (
		<Card
			className={styles[`progress-item-card-${direction}`]}
			withOutsideShadow={direction === 'row'}
			size="small"
		>
			<Flex
				direction={'column'}
				align={direction === 'column' ? 'center' : 'start'}
				gap="12"
				className={styles[`flex-${direction}`]}
			>
				<Text variant="body3-accent" className={styles[direction]}>
					{title}
				</Text>
				<ProgressBar
					className={styles[`progress-bar-${direction}`]}
					direction={direction}
					currentCount={currentCount}
					totalCount={totalCount}
					variant="medium"
					label={`${currentCount}%`}
				/>
			</Flex>
		</Card>
	);
};
