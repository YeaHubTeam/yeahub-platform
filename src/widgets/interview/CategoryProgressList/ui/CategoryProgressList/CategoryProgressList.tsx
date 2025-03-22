import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewStatistics } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { ProfileSkillsStat } from '@/entities/quiz';

import { transformSkillsArray } from '../../model/helpers/transformSkillsArray';
import { CategoryProgressItem } from '../CategoryProgressItem/CategoryProgressItem';

import styles from './CategoryProgressList.module.css';

export interface CategoryProgressListProps {
	className?: string;
	skillsStat?: ProfileSkillsStat;
}

export const CategoryProgressList = ({ className, skillsStat }: CategoryProgressListProps) => {
	const { t } = useTranslation(i18Namespace.interviewStatistics);
	const { isMobile } = useScreenSize();

	const transformSkillsStat = skillsStat ? transformSkillsArray(skillsStat) : [];

	return (
		<Card
			className={className}
			title={t(InterviewStatistics.PROGRESS_TITLE)}
			isTitleCenter={isMobile}
		>
			<Flex direction="column" gap="12" className={styles.list}>
				{transformSkillsStat.map((skillStat) => (
					<CategoryProgressItem key={skillStat.category} progressData={skillStat} />
				))}
			</Flex>
		</Card>
	);
};
