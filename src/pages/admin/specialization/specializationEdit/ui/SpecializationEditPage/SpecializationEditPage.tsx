import { useParams } from 'react-router-dom';

import { useGetSpecializationByIdQuery } from '@/entities/specialization';

import { SpecializationEditForm } from '../SpecializationEditForm/SpecializationEditForm';

const SpecializationEditPage = () => {
	const { specializationId } = useParams<{ specializationId: string }>();

	const { data: specialization } = useGetSpecializationByIdQuery(String(specializationId));

	if (!specialization) {
		return null;
	}

	return <SpecializationEditForm specialization={specialization} />;
};
export default SpecializationEditPage;
