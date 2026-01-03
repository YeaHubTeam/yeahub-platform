import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';

import {
	SpecializationProgressTable,
	useGetSpecializationsGeneralProgressQuery,
} from '@/entities/specialization';

import { AnalyticPageTemplate, useAnalyticFilters } from '@/widgets/analytics/AnalyticPageTemplate';

import { ProgressSpecializationsList } from '../ProgressSpecializationsList/ProgressSpecializationsList';

import { ProgressSpecializationsPageSkeleton } from './ProgressSpecializationsPage.skeleton';

export const ProgressSpecializationsPage = () => {
	const { t } = useTranslation(i18Namespace.analytics);

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
		return <ProgressSpecializationsPageSkeleton />;
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
