import { Skeleton } from '@/shared/ui/Skeleton';

interface ProgrammingLanguageSelectSkeletonProps {
	size?: 'medium' | 'large';
}

export const ProgrammingLanguageSelectSkeleton = ({
	size,
}: ProgrammingLanguageSelectSkeletonProps) => {
	return <Skeleton width={200} height={size === 'medium' ? 40 : 48} />;
};
