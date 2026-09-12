import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

import { i18Namespace, ROUTES, Specializations, Translation } from '@/shared/config';
import { route } from '@/shared/libs';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useGetSpecializationByIdQuery, SpecializationCard } from '@/entities/specialization';

import { DeleteSpecializationButton } from '@/features/specialization/deleteSpecialization';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

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

	const renderContent = () => {
		if (!specialization) {
			return null;
		}
		return (
			<>
				<Flex align="center" gap="8" style={{ marginBottom: 24 }}>
					<BackHeader>
						<DeleteSpecializationButton specializationId={specialization.id} isDetailPage />
						<NavLink
							style={{ marginLeft: 'auto' }}
							to={route(ROUTES.admin.specializations.edit.page, specialization.id)}
						>
							<Button>{t(Translation.EDIT)}</Button>
						</NavLink>
					</BackHeader>
				</Flex>
				<SpecializationCard specialization={specialization} />
			</>
		);
	};
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
