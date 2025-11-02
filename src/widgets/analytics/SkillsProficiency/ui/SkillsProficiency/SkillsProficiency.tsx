import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { getSpecializationId } from '@/entities/profile';
import { useGetLearnedQuestionsQuery } from '@/entities/question';

import { useItemsSizeCalculation } from '../../model/hooks/useItemsSizeCalculation';
import { SkillProficiencyItem } from '../SkillProficiencyItem/SkillProficiencyItem';

import styles from './SkillsProficiency.module.css';

export const SkillsProficiency = () => {
	const specializationId = useAppSelector(getSpecializationId);
	const { data: response } = useGetLearnedQuestionsQuery({
		page: 1,
		limit: 6,
		specializationId,
	});

	const learnedQuestions = response?.data ?? [];

	const { itemsGap, itemsCount, maxItemHeight, calculateItemHeight } = useItemsSizeCalculation({
		learnedQuestions,
	});

	const { t } = useTranslation(i18Namespace.analytics);

	return (
		<Card
			title={t(Analytics.SKILL_PROFICIENCY_TITLE)}
			actionRoute={ROUTES.analytics['skills-proficiency'].route}
			actionTitle={t(Analytics.SKILL_PROFICIENCY_LINK_DETAIL)}
			isActionPositionBottom
			className={styles.card}
		>
			<Flex align="end" gap={itemsGap} className={styles.container}>
				{learnedQuestions.slice(0, itemsCount).map((question, i) => (
					<SkillProficiencyItem
						key={question.id}
						title={question.skill.title}
						learnedPercentage={question.learnedPercentage}
						calculateBarHeight={calculateItemHeight}
						maxHeight={maxItemHeight}
						isFirstItem={i === 0}
					/>
				))}
			</Flex>
		</Card>
	);
};
