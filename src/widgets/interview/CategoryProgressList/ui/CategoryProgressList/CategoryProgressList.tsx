import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { ProfileSkillsStat } from '@/entities/quiz';

import { transformSkillsArray } from '../../model/helpers/transformSkillsArray';
import { CategoryProgressItem } from '../CategoryProgressItem/CategoryProgressItem';

import styles from './CategoryProgressList.module.css';

export interface CategoryProgressListProps {
	className?: string;
	skillsStat?: ProfileSkillsStat;
	title?: string;
}

export const CategoryProgressList = ({
	className,
	skillsStat,
	title,
}: CategoryProgressListProps) => {
	const { isMobile } = useScreenSize();

	const transformSkillsStat = skillsStat ? transformSkillsArray(skillsStat) : [];

	return (
		<Card className={className} title={title} isTitleCenter={isMobile} withOutsideShadow>
			<Flex direction="column" gap="12" className={styles.list}>
				{transformSkillsStat.map((skillStat) => (
					<CategoryProgressItem key={skillStat.category} progressData={skillStat} />
				))}
			</Flex>
		</Card>
	);
};
