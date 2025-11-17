import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';

import { useGetPopularSkillsQuery } from '@/entities/skill';

import { AnalyticPageTemplate, useAnalyticFilters } from '@/widgets/analytics/AnalyticPageTemplate';

import { PopularSkillsList } from '../PopularSkillsList/PopularSkillsList';
import { PopularSkillsPageTable } from '../PopularSkillsPageTable/PopularSkillsPageTable';

export const PopularSkillsPage = () => {
	const { filters, hasFilters, onChangePage, onResetFilters, onChangeSpecialization } =
		useAnalyticFilters({
			page: 1,
		});
	const { t } = useTranslation(i18Namespace.analytics);

	const { data: popularSkills } = useGetPopularSkillsQuery({
		limit: 10,
		page: filters.page,
		specializationId: filters.specialization,
	});

	const specializationTitle = filters.specialization
		? popularSkills?.data[0].specialization.title
		: '';

	return (
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
		// <Card className={styles.card}>
		// 	<Flex justify="between" align="start">
		// 		<Text variant={isMobile ? 'body5-accent' : 'body6'} className={styles.title}>
		// 			{t(Analytics.SKILLS_POPULARITY, { specialization })}
		// 		</Text>
		// 		<Tooltip
		// 			title={t(Analytics.POPULARITY_TOOLTIP)}
		// 			placement="bottom-start"
		// 			className={styles.tooltip}
		// 		>
		// 			<Icon icon="info" size={20} color="black-600" />
		// 		</Tooltip>
		// 	</Flex>
		// 	<SpecializationSelect
		// 		onChange={(value) => setSelectedSpecId(Array.isArray(value) ? value[0] : value)}
		// 		value={selectedSpecId}
		// 		className={styles.dropdown}
		// 		prefix
		// 	/>
		// 	{isMobile ? (
		// 		popularSkills?.data.map((skill) => <PopularSkillsMobileCard key={skill.id} skill={skill} />)
		// 	) : (
		// 		<PopularSkillsPageTable popularSkills={popularSkills?.data} />
		// 	)}
		// 	<Flex className={styles.pagination} justify="center">
		// 		<Pagination
		// 			onPrevPageClick={onPrevPageClick}
		// 			onNextPageClick={onNextPageClick}
		// 			onChangePage={onChangePage}
		// 			page={currentPage}
		// 			totalPages={totalPages}
		// 		/>
		// 	</Flex>
		// </Card>
	);
};
