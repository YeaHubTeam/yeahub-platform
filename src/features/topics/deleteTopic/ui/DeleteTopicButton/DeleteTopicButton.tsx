import { Placement } from '@floating-ui/react';

import { DeleteButton } from '@/shared/ui/DeleteButton';

import { Topic } from '@/entities/topic';

import { useDeleteTopicMutation } from '../../api/deleteTopicApi';

interface DeleteCollectionButtonProps {
	topicId: Topic['id'];
	isDetailPage?: boolean;
	disabled?: boolean;
	placementTooltip?: Placement;
	offsetTooltip?: number;
	onSuccess?: () => void;
}

export const DeleteTopicButton = ({
	topicId,
	isDetailPage = false,
	disabled = false,
	onSuccess,
}: DeleteCollectionButtonProps) => {
	const [deleteTopicMutation] = useDeleteTopicMutation();

	const onDeleteTopic = async (id: Topic['id']) => {
		await deleteTopicMutation(id).unwrap();
	};

	return (
		<DeleteButton
			id={topicId}
			onDelete={onDeleteTopic}
			isDetailPage={isDetailPage}
			disabled={disabled}
			onSuccess={onSuccess}
		/>
	);
};
