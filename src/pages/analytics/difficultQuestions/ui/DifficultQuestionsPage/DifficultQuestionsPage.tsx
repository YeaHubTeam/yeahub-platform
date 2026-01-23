import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';

import { getSpecializationId } from '@/entities/profile';
import { useGetMostDifficultQuestionsBySpecializationIdQuery } from '@/entities/question';

import { AnalyticPageTemplate, useAnalyticFilters } from '@/widgets/analytics/AnalyticPageTemplate';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { DifficultQuestionsList } from '../DifficultQuestionsList/DifficultQuestionsList';
import { DifficultQuestionsTable } from '../DifficultQuestionsTable/DifficultQuestionsTable';

export const DifficultQuestionsPage = () => {
	const { t } = useTranslation(i18Namespace.analytics);
	const specializationId = useAppSelector(getSpecializationId);

	const { filters, hasFilters, onResetFilters, onChangeSpecialization, onChangePage } =
		useAnalyticFilters({
			specialization: specializationId,
			page: 1,
		});

	const {
		data: response,
		isLoading,
		isError,
		refetch,
	} = useGetMostDifficultQuestionsBySpecializationIdQuery({
		specId: filters.specialization || specializationId,
		page: filters.page || 1,
	});

	const difficultQuestions = response?.data?.topStat ?? [];
	const hasData = difficultQuestions.length > 0;
	const stubs: PageWrapperStubs = {
		error: { onClick: () => refetch() },
		'filter-empty': { onClick: onResetFilters },
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasFilters={hasFilters}
			hasData={hasData}
			shouldVerify
			stubs={stubs}
			content={
				<AnalyticPageTemplate
					title={
						filters.specialization
							? t(Analytics.MOST_DIFFICULT_QUESTIONS_TITLE_PAGE, {
									text: response?.data.specialization.title,
									count: 100,
								})
							: t(Analytics.MOST_DIFFICULT_QUESTIONS_TITLE_PAGE_ALL, { count: 100 })
					}
					list={<DifficultQuestionsList difficultQuestions={difficultQuestions} />}
					tooltip={t(Analytics.MOST_DIFFICULT_QUESTIONS_TOOLTIP)}
					table={<DifficultQuestionsTable difficultQuestions={difficultQuestions} />}
					filters={{
						specialization: filters.specialization,
						page: filters.page,
						total: response?.total,
						limit: response?.limit,
						onChangeSpecialization,
						onChangePage,
						hasFilters,
						onResetFilters,
					}}
				/>
			}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};
