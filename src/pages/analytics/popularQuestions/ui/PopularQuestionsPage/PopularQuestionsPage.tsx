import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';

import { PopularQuestionStat, useGetPopularQuestionsQuery } from '@/entities/question';

import { AnalyticPageTemplate, useAnalyticFilters } from '@/widgets/analytics/AnalyticPageTemplate';

import { PopularQuestionsList } from '../PopularQuestionsList/PopularQuestionsList';
import { PopularQuestionsPageTable } from '../PopularQuestionsPageTable/PopularQuestionsPageTable';

export const PopularQuestionsPage = () => {
	const { filters, hasFilters, onChangePage, onResetFilters, onChangeSpecialization } =
		useAnalyticFilters({
			page: 1,
		});

	const DATA_LIMIT_IN_PAGE = 10;
	const page = filters?.page || 1;
	const { t } = useTranslation(i18Namespace.analytics);
	const { data } = useGetPopularQuestionsQuery();

	const popularQuestionsByAllSpecializations = data?.reduce<PopularQuestionStat[]>(
		(accum, item) => [...accum, ...item.topStat],
		[],
	);
	const popularQuestionsBySpecialization = data?.find(
		(item) => item.specializationId === filters.specialization,
	);
	const popularQuestions = !filters.specialization
		? popularQuestionsByAllSpecializations
		: popularQuestionsBySpecialization?.topStat;

	const popularQuestionsInPage =
		popularQuestions?.slice(DATA_LIMIT_IN_PAGE * (page - 1), DATA_LIMIT_IN_PAGE * page) || [];

	return (
		<AnalyticPageTemplate
			title={t(Analytics.POPULAR_QUESTIONS_TITLE)}
			list={<PopularQuestionsList popularQuestions={popularQuestionsInPage} />}
			tooltip={t(Analytics.POPULAR_QUESTIONS_TOOLTIP)}
			table={<PopularQuestionsPageTable popularQuestions={popularQuestionsInPage} />}
			filters={{
				page,
				specialization: filters.specialization,
				limit: DATA_LIMIT_IN_PAGE,
				total: popularQuestions?.length || 0,
				onChangeSpecialization,
				onChangePage,
				onResetFilters,
				hasFilters,
			}}
		/>
	);
};
