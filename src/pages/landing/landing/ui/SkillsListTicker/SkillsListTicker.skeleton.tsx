import { Flex } from '@/shared/ui/Flex';

import { SkillChipSkeleton } from '../SkillChip/SkillChip.skeleton';

import styles from './SkillsListTicker.module.css';

export const SkillsListTickerSkeleton = () => {
	const skills = 10;
	return (
		<div className={styles.list}>
			<Flex className={styles['slider-container']} gap="16">
				{[...Array(skills)].map((_, index) => (
					<SkillChipSkeleton key={index} showLabel label="true" />
				))}
			</Flex>
		</div>
	);
};
