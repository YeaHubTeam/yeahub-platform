import { useScreenSize } from '@/shared/libs';

import { HeaderNavDesktopSkeleton } from './HeaderNavDesktop/HeaderNavDesktop.skeleton';
import { HeaderNavMobileSkeleton } from './HeaderNavMobile/HeaderNavMobile.skeleton';

export const HeaderNavSkeleton = () => {
	const { isLargeScreen } = useScreenSize();

	return isLargeScreen ? <HeaderNavDesktopSkeleton /> : <HeaderNavMobileSkeleton />;
};
