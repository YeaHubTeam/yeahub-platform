import { Placement } from '@floating-ui/react';

import { DeleteButton } from '@/shared/ui/DeleteButton';

import { Collection } from '@/entities/collection';

import { useDeleteCollectionMutation } from '../../api/deleteCollectionApi';

interface DeleteCollectionButtonProps {
	collectionId: Collection['id'];
	isDetailPage?: boolean;
	disabled?: boolean;
	placementTooltip?: Placement;
	offsetTooltip?: number;
}

export const DeleteCollectionButton = ({
	collectionId,
	isDetailPage = false,
	disabled = false,
}: DeleteCollectionButtonProps) => {
	const [deleteCollectionMutation] = useDeleteCollectionMutation();

	const onDeleteCollection = async (id: Collection['id']) => {
		await deleteCollectionMutation(id).unwrap();
	};

	return (
		<DeleteButton
			id={collectionId}
			onDelete={onDeleteCollection}
			isDetailPage={isDetailPage}
			disabled={disabled}
		/>
	);
};
