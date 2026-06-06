import { DeleteButton } from '@/shared/ui/DeleteButton';

import { Question } from '@/entities/question';

import { useDeleteQuestionMutation } from '../../api/deleteQuestionApi';

export interface DeleteQuestionButtonProps {
	questionId: Question['id'];
	isDetailPage?: boolean;
	disabled?: boolean;
}

export const DeleteQuestionButton = ({
	questionId,
	isDetailPage = false,
	disabled,
}: DeleteQuestionButtonProps) => {
	const [deleteQuestionMutation] = useDeleteQuestionMutation();

	const onDeleteQuestion = async (id: Question['id']) => {
		await deleteQuestionMutation(id).unwrap();
	};

	return (
		<DeleteButton
			id={questionId}
			onDelete={onDeleteQuestion}
			isDetailPage={isDetailPage}
			disabled={disabled}
		/>
	);
};
