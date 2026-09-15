import { useTranslation } from 'react-i18next';

import { i18Namespace, VacanciesMarket } from '@/shared/config';

import {
	useGetVacancyMarketOverviewQuery,
	useGetVacancyMarketSpecializationsQuery,
} from '@/entities/vacancy';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { VacancyMarketPageContent } from '../VacancyMarketPageContent/VacancyMarketPageContent';

const VacancyMarketPage = () => {
	const { t } = useTranslation(i18Namespace.vacanciesMarket);
	const { data, isLoading, isError, refetch } = useGetVacancyMarketOverviewQuery();
	const {
		data: specializations,
		isLoading: isSpecializationsLoading,
		isError: isSpecializationsError,
		refetch: refetchSpecializations,
	} = useGetVacancyMarketSpecializationsQuery();

	const hasData = (data?.specializations.length ?? 0) > 0 && (specializations?.length ?? 0) > 0;

	const isPageLoading = isLoading || isSpecializationsLoading;
	const isPageError = isError || isSpecializationsError;

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(VacanciesMarket.STUB_EMPTY_TITLE),
			subtitle: t(VacanciesMarket.STUB_EMPTY_SUBTITLE),
		},
		error: {
			onClick: () => {
				refetch();
				refetchSpecializations();
			},
		},
	};

	return (
		<PageWrapper
			isLoading={isPageLoading}
			hasError={isPageError}
			hasData={hasData}
			shouldVerify
			stubs={stubs}
			content={
				data && specializations ? (
					<VacancyMarketPageContent specializations={specializations} vacancyMarket={data} />
				) : null
			}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default VacancyMarketPage;
