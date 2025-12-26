import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { AnalyticsPageSkeleton } from '@/shared/ui/AnalyticsPageSkeleton';

import {
	SpecializationProgressTable,
	useGetSpecializationsGeneralProgressQuery,
} from '@/entities/specialization';

import { AnalyticPageTemplate, useAnalyticFilters } from '@/widgets/analytics/AnalyticPageTemplate';

import { ProgressSpecializationsList } from '../ProgressSpecializationsList/ProgressSpecializationsList';

export const ProgressSpecializationsPage = () => {
	const { t } = useTranslation(i18Namespace.analytics);
	const { isMobile } = useScreenSize();

	const { filters, hasFilters, onChangePage, onResetFilters, onChangeSpecialization } =
		useAnalyticFilters({
			page: 1,
		});

	const {
		data: response,
		isLoading,
		isFetching,
	} = useGetSpecializationsGeneralProgressQuery({
		page: filters.page,
		specializationId: filters.specialization,
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
			/>
		);
	}

	const specializationsProgress = response?.data ?? [];

	return (
		<AnalyticPageTemplate
			title={t(Analytics.SPECIALIZATION_PROGRESS_TITLE)}
			list={<ProgressSpecializationsList specializationsProgress={specializationsProgress} />}
			tooltip={t(Analytics.SPECIALIZATION_PROGRESS_TOOLTIP)}
			table={<SpecializationProgressTable specializationsProgress={specializationsProgress} />}
			filters={{
				page: filters.page,
				specialization: filters.specialization,
				limit: response?.limit || 0,
				total: response?.total || 0,
				onChangeSpecialization,
				onChangePage,
				onResetFilters,
				hasFilters,
			}}
		/>
	);
};
