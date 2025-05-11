import { useScreenSize } from '@/shared/hooks';
import { Skeleton } from '@/shared/ui/Skeleton';

export const FooterCopyrightSkeleton = () => {
	const { isMobileS } = useScreenSize();

	return <Skeleton width={isMobileS ? 80 : 100} height={20} borderRadius="4px" />;
};
