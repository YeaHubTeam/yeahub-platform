import { ButtonSkeleton } from '@/shared/ui/Button';

interface CreateProfileButtonSkeletonProps {
	className?: string;
}

export const CreateProfileButtonSkeleton = ({ className }: CreateProfileButtonSkeletonProps) => {
	return <ButtonSkeleton className={className} width={180} />;
};
