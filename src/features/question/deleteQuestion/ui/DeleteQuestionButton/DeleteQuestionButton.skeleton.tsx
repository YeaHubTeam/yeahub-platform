import { DeleteButtonSkeleton } from '@/shared/ui/DeleteButton';

import { DeleteQuestionButtonProps } from './DeleteQuestionButton';

export const DeleteQuestionButtonSkeleton = ({
	isDetailPage = false,
}: Partial<DeleteQuestionButtonProps>) => {
	return <DeleteButtonSkeleton isDetailPage={isDetailPage} />;
};
