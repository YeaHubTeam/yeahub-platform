import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';

import { LearnedQuestion } from '@/entities/question';

import {
	AnalyticPageTemplateMobileList,
	AnalyticPageTemplateMobileListItem,
} from '@/widgets/analytics/AnalyticPageTemplate';

type SkillsProficiencyListProps = {
	learnedQuestions: LearnedQuestion[];
};

export const SkillsProficiencyList = ({ learnedQuestions }: SkillsProficiencyListProps) => {
	const { t } = useTranslation(i18Namespace.analytics);

	const skillsProficiencyFields: AnalyticPageTemplateMobileListItem[] = learnedQuestions.map(
		(question) => {
			return {
				title: `${question.specialization.title} - ${question.skill.title}`,
				badge: t(Analytics.SKILL_PROFICIENCY_BADGE, { count: question.total }),
				fields: [
					{
						label: t(Analytics.SKILL_PROFICIENCY_TABLE_LEARNED_PERCENTAGE),
						value: `${question.learnedPercentage}%`,
					},
				],
			};
		},
	);

	return <AnalyticPageTemplateMobileList items={skillsProficiencyFields} />;
};
