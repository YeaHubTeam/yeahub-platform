import { ButtonSkeleton } from '@/shared/ui/Button';

import { DeleteButtonProps } from './DeleteButton';

export const DeleteButtonSkeleton = ({ isDetailPage }: Partial<DeleteButtonProps>) => {
	return (
		<ButtonSkeleton
			width={120}
			aria-label="Large"
			style={{ width: 'auto', justifyContent: isDetailPage ? 'center' : 'flex-start' }}
			variant={isDetailPage ? 'destructive' : 'tertiary'}
		/>
	);
};
