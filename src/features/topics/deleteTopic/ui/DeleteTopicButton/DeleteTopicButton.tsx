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
}

export const DeleteTopicButton = ({
	topicId,
	isDetailPage = false,
	disabled = false,
}: DeleteCollectionButtonProps) => {
	const [deleteTopicMutation] = useDeleteTopicMutation();

	const onDeleteTopic = () => {
		return deleteTopicMutation(topicId);
	};

	return <DeleteButton onDelete={onDeleteTopic} isDetailPage={isDetailPage} disabled={disabled} />;
};
