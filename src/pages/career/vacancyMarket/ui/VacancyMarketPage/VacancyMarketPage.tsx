import { useTranslation } from 'react-i18next';

import { i18Namespace, VacanciesMarket } from '@/shared/config';

import { useGetVacancyMarketOverviewQuery } from '@/entities/vacancy';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { VacancyMarketPageContent } from '../VacancyMarketPageContent/VacancyMarketPageContent';

const VacancyMarketPage = () => {
	const { t } = useTranslation(i18Namespace.vacanciesMarket);
	const { data, isLoading, isError, refetch } = useGetVacancyMarketOverviewQuery();

	const hasData = (data?.specializations.length ?? 0) > 0;

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(VacanciesMarket.STUB_EMPTY_TITLE),
			subtitle: t(VacanciesMarket.STUB_EMPTY_SUBTITLE),
		},
		error: {
			onClick: refetch,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={hasData}
			shouldVerify
			stubs={stubs}
			content={data ? <VacancyMarketPageContent vacancyMarket={data} /> : null}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default VacancyMarketPage;
