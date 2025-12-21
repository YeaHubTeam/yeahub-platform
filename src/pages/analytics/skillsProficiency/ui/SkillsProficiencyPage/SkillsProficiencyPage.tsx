import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { AnalyticsPageSkeleton } from '@/shared/ui/AnalyticsPageSkeleton';

import { useGetLearnedQuestionsQuery } from '@/entities/question';

import { AnalyticPageTemplate, useAnalyticFilters } from '@/widgets/analytics/AnalyticPageTemplate';

import { SkillsProficiencyList } from '../SkillsProficiencyList/SkillsProficiencyList';
import { SkillsProficiencyPageTable } from '../SkillsProficiencyPageTable/SkillsProficiencyPageTable';

export const SkillsProficiencyPage = () => {
	const { t } = useTranslation(i18Namespace.analytics);
	const { isMobile } = useScreenSize();

	const filters = useAnalyticFilters({
		page: 1,
	});

	const {
		data: response,
		isLoading,
		isFetching,
	} = useGetLearnedQuestionsQuery({
		page: filters.filters.page,
		specializationId: filters.filters.specialization,
		skillId: filters.filters.skill,
	});

	if (isLoading || isFetching) {
		return (
			<AnalyticsPageSkeleton
				showTitle={true}
				showTooltip={true}
				showFilters={true}
				showSkillFilter={true}
				showPagination={true}
				displayMode={isMobile ? 'mobile' : 'table'}
				tableRowsCount={10}
				mobileItemsCount={3}
			/>
		);
	}

	const learnedQuestions = response?.data ?? [];

	return (
		<AnalyticPageTemplate
			title={t(Analytics.SKILL_PROFICIENCY_TITLE)}
			list={<SkillsProficiencyList learnedQuestions={learnedQuestions} />}
			tooltip={t(Analytics.SKILL_PROFICIENCY_TOOLTIP)}
			table={<SkillsProficiencyPageTable learnedQuestions={learnedQuestions} />}
			filters={{
				...filters,
				...filters.filters,
				limit: response?.limit || 0,
				total: response?.total || 0,
			}}
		/>
	);
};
