import { ButtonSkeleton } from '@/shared/ui/Button';

import { DeleteTaskButtonProps } from './DeleteTaskButton';

export const DeleteTaskButtonSkeleton = ({
	isDetailPage = false,
}: Partial<DeleteTaskButtonProps>) => {
	return (
		<ButtonSkeleton
			width={120}
			aria-label="Large"
			style={{ width: 'auto', justifyContent: isDetailPage ? 'center' : 'flex-start' }}
			variant={isDetailPage ? 'destructive' : 'tertiary'}
		/>
	);
};
