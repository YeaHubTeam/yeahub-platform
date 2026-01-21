import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';
import { TableSkeleton } from '@/shared/ui/Table';

import { AnalyticPageTemplateSkeleton } from '@/widgets/analytics/AnalyticPageTemplate';
import { AnalyticPageTemplateMobileListSkeleton } from '@/widgets/analytics/AnalyticPageTemplate/ui/AnalyticPageTemplateMobileList/AnalyticPageTemplateMobileList.skeleton';

export const PopularQuestionsPageSkeleton = () => {
	const { t } = useTranslation(i18Namespace.analytics);

	return (
		<AnalyticPageTemplateSkeleton
			title={t(Analytics.POPULAR_QUESTIONS_TITLE)}
			list={<AnalyticPageTemplateMobileListSkeleton />}
			table={
				<TableSkeleton
					hasSelectors={true}
					rowCount={10}
					columnCount={2}
					hasCopyButton={false}
					hasIcon={false}
				/>
			}
			filters={{
				specialization: undefined,
				skill: undefined,
				page: 1,
				total: 100,
				limit: 10,
				hasFilters: false,

				onChangeSpecialization: () => {},
				onChangeSkill: () => {},
				onChangePage: () => {},
				onResetFilters: () => {},
			}}
			showSkillFilter={false}
		/>
	);
};
