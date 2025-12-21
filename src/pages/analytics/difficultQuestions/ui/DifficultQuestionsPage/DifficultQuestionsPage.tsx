import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';
import { useAppSelector, useScreenSize } from '@/shared/libs';
import { AnalyticsPageSkeleton } from '@/shared/ui/AnalyticsPageSkeleton';

import { getSpecializationId } from '@/entities/profile';
import { useGetMostDifficultQuestionsBySpecializationIdQuery } from '@/entities/question';

import { AnalyticPageTemplate, useAnalyticFilters } from '@/widgets/analytics/AnalyticPageTemplate';

import { DifficultQuestionsList } from '../DifficultQuestionsList/DifficultQuestionsList';
import { DifficultQuestionsTable } from '../DifficultQuestionsTable/DifficultQuestionsTable';

export const DifficultQuestionsPage = () => {
	const { t } = useTranslation(i18Namespace.analytics);
	const { isMobile } = useScreenSize();
	const specializationId = useAppSelector(getSpecializationId);

	const { filters, onChangeSpecialization, onChangePage } = useAnalyticFilters({
		specialization: specializationId,
		page: 1,
	});

	const {
		data: response,
		isLoading,
		isFetching,
	} = useGetMostDifficultQuestionsBySpecializationIdQuery({
		specId: filters.specialization || specializationId,
		page: filters.page || 1,
	});

	if (isLoading || isFetching) {
		return (
			<AnalyticsPageSkeleton
				showTitle={true}
				showTooltip={true}
				showFilters={true}
				showSkillFilter={false}
				showPagination={true}
				displayMode={isMobile ? 'mobile' : 'table'}
				tableRowsCount={8}
				mobileItemsCount={5}
			/>
		);
	}

	const difficultQuestions = response?.data.topStat ?? [];

	return (
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
			}}
		/>
	);
};
