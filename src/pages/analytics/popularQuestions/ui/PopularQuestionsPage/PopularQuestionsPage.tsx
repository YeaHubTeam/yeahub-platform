import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Analytics } from '@/shared/config';
import { EMAIL_VERIFY_SETTINGS_TAB } from '@/shared/libs';

import { PopularQuestionStat, useGetPopularQuestionsQuery } from '@/entities/question';

import { AnalyticPageTemplate, useAnalyticFilters } from '@/widgets/analytics/AnalyticPageTemplate';
import { PageWrapper } from '@/widgets/PageWrapper';

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
	const navigate = useNavigate();
	const { data, isLoading, error, refetch } = useGetPopularQuestionsQuery();

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

	const hasData = popularQuestionsInPage.length > 0;

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={!!error}
			hasFilters={hasFilters}
			hasData={hasData}
			shouldVerify={true}
			stubs={{
				error: { onClick: () => refetch() },
				'filter-empty': { onClick: onResetFilters },
				'access-denied-verify': { onClick: () => navigate(EMAIL_VERIFY_SETTINGS_TAB) },
			}}
			content={
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
			}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};
