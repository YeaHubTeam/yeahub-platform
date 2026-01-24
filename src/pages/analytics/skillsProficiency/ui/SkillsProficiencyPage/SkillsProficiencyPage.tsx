import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';

import { useGetLearnedQuestionsQuery } from '@/entities/question';

import { AnalyticPageTemplate, useAnalyticFilters } from '@/widgets/analytics/AnalyticPageTemplate';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { SkillsProficiencyList } from '../SkillsProficiencyList/SkillsProficiencyList';
import { SkillsProficiencyPageTable } from '../SkillsProficiencyPageTable/SkillsProficiencyPageTable';

export const SkillsProficiencyPage = () => {
	const { t } = useTranslation(i18Namespace.analytics);

	const {
		filters,
		hasFilters,
		onResetFilters,
		onChangeSpecialization,
		onChangeSkill,
		onChangePage,
	} = useAnalyticFilters({
		page: 1,
	});

	const {
		data: response,
		isLoading,
		isError,
		refetch,
	} = useGetLearnedQuestionsQuery({
		page: filters.page,
		specializationId: filters.specialization,
		skillId: filters.skill,
	});

	const learnedQuestions = response?.data ?? [];
	const hasData = learnedQuestions.length > 0;
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
					title={t(Analytics.SKILL_PROFICIENCY_TITLE)}
					list={<SkillsProficiencyList learnedQuestions={learnedQuestions} />}
					tooltip={t(Analytics.SKILL_PROFICIENCY_TOOLTIP)}
					table={<SkillsProficiencyPageTable learnedQuestions={learnedQuestions} />}
					filters={{
						specialization: filters.specialization,
						skill: filters.skill,
						page: filters.page,
						limit: response?.limit || 0,
						total: response?.total || 0,
						onChangeSpecialization,
						onChangeSkill,
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
