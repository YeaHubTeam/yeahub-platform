import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace, Specializations } from '@/shared/config';

import { useGetSpecializationByIdQuery } from '@/entities/specialization';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { SpecializationPageContent } from '../SpecializationPageContent/SpecializationPageContent';

import { SpecializationDetailPageSkeleton } from './SpecializationDetailPage.skeleton';

const SpecializationDetailPage = () => {
	const { t } = useTranslation(i18Namespace.translation);
	const { specializationId } = useParams<{ specializationId: string }>();
	const {
		data: specialization,
		isLoading,
		isError,
		refetch,
	} = useGetSpecializationByIdQuery(String(specializationId));

	const renderContent = () =>
		specialization ? <SpecializationPageContent specialization={specialization} /> : null;

	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
		empty: {
			onClick: refetch,
			subtitle: t(Specializations.EMPTY_DETAIL_DESCRIPTION),
			title: t(Specializations.EMPTY_DETAIL_TITLE),
			buttonText: t(Specializations.EMPTY_DETAIL_BUTTON),
		},
	};

	const hasData = specialization && Object.keys(specialization).length > 0;
	return (
		<>
			<PageWrapper
				isLoading={isLoading}
				skeleton={<SpecializationDetailPageSkeleton />}
				hasError={isError}
				hasData={hasData}
				stubs={stubs}
				roles={['admin', 'author']}
				content={renderContent()}
			>
				{({ content }) => <>{content}</>}
			</PageWrapper>
		</>
	);
};

export default SpecializationDetailPage;
