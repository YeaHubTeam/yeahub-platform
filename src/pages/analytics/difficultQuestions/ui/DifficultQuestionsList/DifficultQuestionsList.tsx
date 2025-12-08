import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';

import { MostDifficultQuestion } from '@/entities/question';

import {
	AnalyticPageTemplateMobileList,
	AnalyticPageTemplateMobileListItem,
} from '@/widgets/analytics/AnalyticPageTemplate';

interface MostDifficultQuestionsMobileProps {
	difficultQuestions: MostDifficultQuestion[];
}
export const DifficultQuestionsList = ({
	difficultQuestions,
}: MostDifficultQuestionsMobileProps) => {
	const { t } = useTranslation([i18Namespace.analytics]);

	const difficultQuestionsFields: AnalyticPageTemplateMobileListItem[] = difficultQuestions.map(
		(question) => {
			return {
				title: question.title,
				fields: [
					{
						label: t(Analytics.MOST_DIFFICULT_QUESTIONS_TABLE_STAT),
						value: `${Math.round(question.stat)}%`,
					},
					{
						label: t(Analytics.MOST_DIFFICULT_QUESTIONS_TABLE_ANSWERS_COUNT),
						value: question.answersCount,
					},
				],
			};
		},
	);

	return <AnalyticPageTemplateMobileList items={difficultQuestionsFields} />;
};
