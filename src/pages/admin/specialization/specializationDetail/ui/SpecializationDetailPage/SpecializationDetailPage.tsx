import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

import { i18Namespace, ROUTES, Specializations, Translation } from '@/shared/config';
import { route } from '@/shared/libs';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useGetSpecializationByIdQuery, SpecializationCard } from '@/entities/specialization';

import { DeleteSpecializationButton } from '@/features/specialization/deleteSpecialization';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

const SpecializationDetailPage = () => {
	const { t } = useTranslation(i18Namespace.translation);
	const { specializationId } = useParams<{ specializationId: string }>();
	const {
		data: specialization,
		isLoading,
		isError,
		refetch,
	} = useGetSpecializationByIdQuery(String(specializationId));

	if (!specialization) {
		return null;
	}

	const renderContent = () => (
		<>
			<Flex align="center" gap="8" style={{ marginBottom: 24 }}>
				<BackButton />
				<Flex style={{ marginLeft: 'auto', gap: '16px' }}>
					<DeleteSpecializationButton specializationId={specialization!.id} isDetailPage />
					<NavLink
						style={{ marginLeft: 'auto' }}
						to={route(ROUTES.admin.specializations.edit.page, specialization!.id)}
					>
						<Button>{t(Translation.EDIT)}</Button>
					</NavLink>
				</Flex>
			</Flex>
			<SpecializationCard specialization={specialization!} />
		</>
	);

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
	return (
		<main>
			<PageWrapper
				isLoading={isLoading}
				skeleton={<SpecializationDetailPage />}
				hasError={isError}
				hasData={!!specialization}
				stubs={stubs}
				roles={['admin', 'author']}
				content={renderContent()}
			>
				{({ content }) => <>{content}</>}
			</PageWrapper>
		</main>
	);
};

export default SpecializationDetailPage;
