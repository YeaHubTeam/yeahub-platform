import { DeleteButton } from '@/shared/ui/DeleteButton';

import { Specialization } from '@/entities/specialization';

import { useDeleteSpecializationMutation } from '../../api/deleteSpecializationApi';

interface DeleteSpecializationButtonProps {
	specializationId: Specialization['id'];
	isDetailPage?: boolean;
}

export const DeleteSpecializationButton = ({
	specializationId,
	isDetailPage = false,
}: DeleteSpecializationButtonProps) => {
	const [deleteSpecializationMutation] = useDeleteSpecializationMutation();

	const onDeleteSpecialization = () => {
		deleteSpecializationMutation(specializationId);
	};

	return (
		<DeleteButton
			onDelete={onDeleteSpecialization}
			isDetailPage={isDetailPage}
			showTooltip={false}
		/>
	);
};
