import { StatusChipSize, StatusChipSkeleton } from '@/shared/ui/StatusChip';

interface TaskStatusChipSkeletonProps {
	size?: StatusChipSize;
}

export const TaskStatusChipSkeleton = ({ size = 'small' }: TaskStatusChipSkeletonProps) => {
	return <StatusChipSkeleton size={size} />;
};
