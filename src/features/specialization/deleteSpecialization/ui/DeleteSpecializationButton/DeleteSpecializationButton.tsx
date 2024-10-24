import { Icon } from 'yeahub-ui-kit';

import { Specialization } from '@/entities/specialization';

import { useDeleteSpecializationMutation } from '../../api/deleteSpecializationApi';

interface DeleteSpecializationButtonProps {
	specializationId: Specialization['id'];
}

export const DeleteSpecializationButton = ({
	specializationId,
}: DeleteSpecializationButtonProps) => {
	const [deleteSpecializationMutation] = useDeleteSpecializationMutation();

	const onDelete = async () => {
		await deleteSpecializationMutation(specializationId);
	};

	return <Icon onClick={onDelete} icon="trash" size={20} color="--palette-ui-red-600" />;
};
