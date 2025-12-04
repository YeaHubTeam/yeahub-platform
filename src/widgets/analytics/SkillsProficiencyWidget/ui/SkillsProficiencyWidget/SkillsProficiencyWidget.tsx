import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics, ROUTES } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { getSpecializationId } from '@/entities/profile';
import { useGetLearnedQuestionsQuery } from '@/entities/question';

import { useItemsSizeCalculation } from '../../model/hooks/useItemsSizeCalculation';
import { SkillProficiencyItem } from '../SkillProficiencyItem/SkillProficiencyItem';

import styles from './SkillsProficiencyWidget.module.css';

export const SkillsProficiencyWidget = () => {
	const specializationId = useAppSelector(getSpecializationId);
	const { data: response } = useGetLearnedQuestionsQuery({
		page: 1,
		limit: 6,
		specializationId,
	});

	const learnedQuestions = response?.data ?? [];

	const { itemsCount, maxItemHeight, calculateItemHeight } = useItemsSizeCalculation({
		learnedQuestions,
	});

	const { t } = useTranslation(i18Namespace.analytics);

	return (
		<Card
			title={t(Analytics.SKILL_PROFICIENCY_TITLE)}
			actionRoute={ROUTES.analytics['skills-proficiency'].route}
			isActionPositionBottom
			className={styles.card}
		>
			<Flex align="end" justify="between" className={styles.container}>
				{learnedQuestions.slice(0, itemsCount).map((question) => (
					<SkillProficiencyItem
						key={question.id}
						title={question.skill.title}
						learnedPercentage={question.learnedPercentage}
						calculateBarHeight={calculateItemHeight}
						maxHeight={maxItemHeight}
					/>
				))}
			</Flex>
		</Card>
	);
};
