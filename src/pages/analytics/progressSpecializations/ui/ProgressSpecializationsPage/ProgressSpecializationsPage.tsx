import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';

import {
	SpecializationProgressTable,
	useGetSpecializationsGeneralProgressQuery,
} from '@/entities/specialization';

import { AnalyticPageTemplate, useAnalyticFilters } from '@/widgets/analytics/AnalyticPageTemplate';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { ProgressSpecializationsList } from '../ProgressSpecializationsList/ProgressSpecializationsList';

export const ProgressSpecializationsPage = () => {
	const { filters, hasFilters, onChangePage, onResetFilters, onChangeSpecialization } =
		useAnalyticFilters({
			page: 1,
		});

	const {
		data: response,
		isLoading,
		isError,
		refetch,
	} = useGetSpecializationsGeneralProgressQuery({
		page: filters.page,
		specializationId: filters.specialization,
	});

	const { t } = useTranslation(i18Namespace.analytics);

	const specializationsProgress = response?.data ?? [];
	const hasData = specializationsProgress.length > 0;
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
			}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};
