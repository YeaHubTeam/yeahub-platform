import classNames from 'classnames';

import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';

import { SkillBar } from '../SkillBar/SkillBar';

import styles from './SkillProficiencyItem.module.css';

interface SkillProficiencyItemProps {
	title: string;
	learnedPercentage: number;
	calculateBarHeight: (learnedPercentage: number) => number;
	maxHeight: number;
	isFirstItem: boolean;
}

export const SkillProficiencyItem = ({
	title,
	learnedPercentage,
	calculateBarHeight,
	maxHeight,
	isFirstItem,
}: SkillProficiencyItemProps) => {
	const titleClassNames = classNames(styles.title, { [styles['first-item']]: isFirstItem });

	const barHeight = calculateBarHeight(learnedPercentage);
	const barOffset = maxHeight - calculateBarHeight(learnedPercentage);

	return (
		<div className={styles['item-container']}>
			<Text variant="body1" className={titleClassNames}>
				{title}
			</Text>
			<SkillBar maxHeight={maxHeight} barHeight={barHeight} barOffset={barOffset} />
			<Card withShadow className={styles['percentage-card']}>
				<Text variant="body1" className={styles.percentage}>
					{learnedPercentage}%
				</Text>
			</Card>
		</div>
	);
};
