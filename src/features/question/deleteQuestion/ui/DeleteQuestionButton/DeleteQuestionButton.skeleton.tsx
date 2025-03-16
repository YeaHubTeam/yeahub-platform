import { ButtonSkeleton } from '@/shared/ui/Button';

import { DeleteQuestionButtonProps } from './DeleteQuestionButton';

export const DeleteQuestionButtonSkeleton = ({
	isDetailPage = false,
}: Partial<DeleteQuestionButtonProps>) => {
	return (
		<ButtonSkeleton
			width={120}
			aria-label="Large"
			style={{ width: 'auto', justifyContent: isDetailPage ? 'center' : 'flex-start' }}
			variant={isDetailPage ? 'destructive' : 'tertiary'}
		/>
	);
};
