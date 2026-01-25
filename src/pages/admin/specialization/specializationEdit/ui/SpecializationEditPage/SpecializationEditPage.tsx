import { useParams } from 'react-router-dom';

import { useGetSpecializationByIdQuery } from '@/entities/specialization';

import { SpecializationEditForm } from '@/features/specialization/editSpecialization';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

const SpecializationEditPage = () => {
	const { specializationId } = useParams<{ specializationId: string }>();

	const {
		data: specialization,
		isLoading,
		isError,
		refetch,
	} = useGetSpecializationByIdQuery(String(specializationId));

	const hasData = specialization && Object.keys(specialization).length > 0;

	if (!specialization) {
		return null;
	}

	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
	};

	const content = hasData ? <SpecializationEditForm specialization={specialization} /> : null;

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
