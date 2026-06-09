import { DeleteButton } from '@/shared/ui/DeleteButton';

import { Resource } from '@/entities/resource';

import { useDeleteResourceMutation } from '../../api/deleteResourceApi';

interface DeleteResourceButtonProps {
	resourceId: Resource['id'];
	isDetailPage?: boolean;
	disabled?: boolean;
}

export const DeleteResourceButton = ({
	resourceId,
	isDetailPage = false,
	disabled = false,
}: DeleteResourceButtonProps) => {
	const [deleteResourceMutation] = useDeleteResourceMutation();

	const onDeleteResource = () => {
		deleteResourceMutation(resourceId);
	};

	return (
		<DeleteButton onDelete={onDeleteResource} isDetailPage={isDetailPage} disabled={disabled} />
	);
};
