import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace, ROUTES, Specializations } from '@/shared/config';

import { useGetSpecializationByIdQuery } from '@/entities/specialization';

import { SpecializationEditForm } from '@/features/specialization/editSpecialization';

import { EditAccessGuard } from '@/widgets/EditAccessGuard';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

const SpecializationEditPage = () => {
	const { t } = useTranslation(i18Namespace.specialization);
	const { specializationId } = useParams<{ specializationId: string }>();

	const {
		data: specialization,
		isLoading,
		isError,
		refetch,
	} = useGetSpecializationByIdQuery(String(specializationId));

	const hasData = specialization && Object.keys(specialization).length > 0;

	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
	};

	const content = hasData ? (
		<EditAccessGuard
			authorId={specialization.createdBy?.id}
			redirectTo={ROUTES.admin.specializations.page}
			titleStub={t(Specializations.STUB_EDIT_ACCESS_TITLE)}
			subtitleStub={t(Specializations.STUB_EDIT_ACCESS_SUBTITLE)}
			buttonTextStub={t(Specializations.STUB_EDIT_ACCESS_SUBMIT)}
		>
			<SpecializationEditForm specialization={specialization} />
		</EditAccessGuard>
	) : null;

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={hasData}
			stubs={stubs}
			roles={['admin', 'author']}
			content={content}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};
export default SpecializationEditPage;
