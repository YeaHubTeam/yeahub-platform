import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';

import {
	SpecializationProgressTable,
	useGetSpecializationsGeneralProgressQuery,
} from '@/entities/specialization';

import { AnalyticPageTemplate, useAnalyticFilters } from '@/widgets/analytics/AnalyticPageTemplate';

import { ProgressSpecializationsList } from '../ProgressSpecializationsList/ProgressSpecializationsList';

export const ProgressSpecializationsPage = () => {
	const { filters, hasFilters, onChangePage, onResetFilters, onChangeSpecialization } =
		useAnalyticFilters({
			page: 1,
		});

	const { data: response } = useGetSpecializationsGeneralProgressQuery({
		page: filters.page,
		specializationId: filters.specialization,
	});

	const { t } = useTranslation(i18Namespace.analytics);

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
