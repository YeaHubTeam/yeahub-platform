import { useScreenSize } from '@/shared/hooks';
import { TextSkeleton } from '@/shared/ui/Text';

export const FooterCopyrightSkeleton = () => {
	const { isMobileS } = useScreenSize();

	return <TextSkeleton width={isMobileS ? 80 : 100} variant={'body2'} />;
};
