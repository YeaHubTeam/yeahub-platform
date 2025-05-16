import { useScreenSize } from '@/shared/hooks';

import { HeaderAuthDesktopSkeleton } from './HeaderAuthDesktop/HeaderAuthDesktop.skeketon';
import { HeaderAuthMobileSkeleton } from './HeaderAuthMobile/HeaderAuthMobile.skeleton';

export const HeaderAuthSkeleton = () => {
	const { isLargeScreen } = useScreenSize();

	return isLargeScreen ? <HeaderAuthDesktopSkeleton /> : <HeaderAuthMobileSkeleton />;
};
