import { DeleteButtonSkeleton } from '@/shared/ui/DeleteButton';

import { DeleteSpecializationButtonProps } from './DeleteSpecializationButton';

export const DeleteSpecializationButtonSkeleton = ({
	isDetailPage,
}: Partial<DeleteSpecializationButtonProps>) => {
	return <DeleteButtonSkeleton isDetailPage={isDetailPage} />;
};
