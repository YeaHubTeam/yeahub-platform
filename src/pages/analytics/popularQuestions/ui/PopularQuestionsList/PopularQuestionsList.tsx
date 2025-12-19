import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';

import { PopularQuestionStat } from '@/entities/question';

import {
	AnalyticPageTemplateMobileList,
	AnalyticPageTemplateMobileListItem,
} from '@/widgets/analytics/AnalyticPageTemplate';

type PopularQuestionsListProps = {
	popularQuestions: PopularQuestionStat[];
};

export const PopularQuestionsList = ({ popularQuestions }: PopularQuestionsListProps) => {
	const { t } = useTranslation(i18Namespace.analytics);

	const popularQuestionsFields: AnalyticPageTemplateMobileListItem[] = popularQuestions.map(
		(popularQuestion) => {
			return {
				title: popularQuestion.title,
				imageSrc: popularQuestion.imageSrc,
				fields: [
					{
						label: t(Analytics.POPULAR_QUESTIONS_TABLE_ANSWER),
						value: `${popularQuestion.frequencyStat}%`,
					},
				],
			};
		},
	);

	return <AnalyticPageTemplateMobileList items={popularQuestionsFields} />;
};
