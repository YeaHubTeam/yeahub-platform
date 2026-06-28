import { StatusChipSize, StatusChipSkeleton } from '@/shared/ui/StatusChip';

interface TaskCategoryChipSkeletonProps {
	size?: StatusChipSize;
}

export const TaskCategoryChipSkeleton = ({ size = 'small' }: TaskCategoryChipSkeletonProps) => {
	return <StatusChipSkeleton size={size} />;
};
