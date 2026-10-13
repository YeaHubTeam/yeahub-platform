import { DeleteButtonSkeleton } from '@/shared/ui/DeleteButton';

import { DeleteFeatureFlagButtonProps } from './DeleteFeatureFlagButton';

export const DeleteFeatureFlagButtonSkeleton = ({
	isDetailPage = false,
}: Partial<DeleteFeatureFlagButtonProps>) => {
	return <DeleteButtonSkeleton isDetailPage={isDetailPage} />;
};
