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

	const onDeleteQuestion = () => {
		deleteQuestionMutation(questionId);
	};

	return (
		<DeleteButton onDelete={onDeleteQuestion} isDetailPage={isDetailPage} disabled={disabled} />
	);
};
