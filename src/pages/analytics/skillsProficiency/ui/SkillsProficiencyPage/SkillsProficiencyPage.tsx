import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Analytics } from '@/shared/config';
import { EMAIL_VERIFY_SETTINGS_TAB } from '@/shared/libs';

import { useGetLearnedQuestionsQuery } from '@/entities/question';

import { AnalyticPageTemplate, useAnalyticFilters } from '@/widgets/analytics/AnalyticPageTemplate';
import { PageWrapper } from '@/widgets/PageWrapper';

import { SkillsProficiencyList } from '../SkillsProficiencyList/SkillsProficiencyList';
import { SkillsProficiencyPageTable } from '../SkillsProficiencyPageTable/SkillsProficiencyPageTable';

export const SkillsProficiencyPage = () => {
	const { t } = useTranslation(i18Namespace.analytics);
	const navigate = useNavigate();

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
		error,
		refetch,
	} = useGetLearnedQuestionsQuery({
		page: filters.page,
		specializationId: filters.specialization,
		skillId: filters.skill,
	});

	const learnedQuestions = response?.data ?? [];
	const hasData = learnedQuestions.length > 0;

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
