import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Analytics } from '@/shared/config';
import { EMAIL_VERIFY_SETTINGS_TAB } from '@/shared/libs';

import {
	SpecializationProgressTable,
	useGetSpecializationsGeneralProgressQuery,
} from '@/entities/specialization';

import { AnalyticPageTemplate, useAnalyticFilters } from '@/widgets/analytics/AnalyticPageTemplate';
import { PageWrapper } from '@/widgets/PageWrapper';

import { ProgressSpecializationsList } from '../ProgressSpecializationsList/ProgressSpecializationsList';

export const ProgressSpecializationsPage = () => {
	const { filters, hasFilters, onChangePage, onResetFilters, onChangeSpecialization } =
		useAnalyticFilters({
			page: 1,
		});

	const {
		data: response,
		isLoading,
		error,
		refetch,
	} = useGetSpecializationsGeneralProgressQuery({
		page: filters.page,
		specializationId: filters.specialization,
	});

	const { t } = useTranslation(i18Namespace.analytics);
	const navigate = useNavigate();

	const specializationsProgress = response?.data ?? [];
	const hasData = specializationsProgress.length > 0;

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
