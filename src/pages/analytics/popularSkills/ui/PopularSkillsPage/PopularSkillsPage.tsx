import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Analytics } from '@/shared/config';
import { EMAIL_VERIFY_SETTINGS_TAB } from '@/shared/libs';

import { useGetPopularSkillsQuery } from '@/entities/skill';

import { AnalyticPageTemplate, useAnalyticFilters } from '@/widgets/analytics/AnalyticPageTemplate';
import { PageWrapper } from '@/widgets/PageWrapper';

import { PopularSkillsList } from '../PopularSkillsList/PopularSkillsList';
import { PopularSkillsPageTable } from '../PopularSkillsPageTable/PopularSkillsPageTable';

export const PopularSkillsPage = () => {
	const { filters, hasFilters, onChangePage, onResetFilters, onChangeSpecialization } =
		useAnalyticFilters({
			page: 1,
		});
	const { t } = useTranslation(i18Namespace.analytics);
	const navigate = useNavigate();

	const {
		data: popularSkills,
		isLoading,
		error,
		refetch,
	} = useGetPopularSkillsQuery({
		limit: 10,
		page: filters.page,
		specializationId: filters.specialization,
	});

	const specializationTitle = filters.specialization
		? popularSkills?.data[0].specialization.title
		: '';
	const hasData = (popularSkills?.data?.length ?? 0) > 0;

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={!!error}
			hasData={hasData}
			hasFilters={hasFilters}
			shouldVerify={true}
			stubs={{
				error: { onClick: () => refetch() },
				'filter-empty': { onClick: onResetFilters },
				'access-denied-verify': { onClick: () => navigate(EMAIL_VERIFY_SETTINGS_TAB) },
			}}
			content={
				<AnalyticPageTemplate
					title={
						filters.specialization
							? t(Analytics.POPULAR_SKILLS_TITLE, { specialization: specializationTitle })
							: t(Analytics.POPULAR_SKILLS_TITLE_ALL)
					}
					list={<PopularSkillsList skills={popularSkills?.data || []} />}
					tooltip={t(Analytics.POPULAR_SKILLS_TOOLTIP)}
					table={<PopularSkillsPageTable popularSkills={popularSkills?.data} />}
					filters={{
						page: filters.page,
						specialization: filters.specialization,
						limit: popularSkills?.limit || 0,
						total: popularSkills?.total || 0,
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
