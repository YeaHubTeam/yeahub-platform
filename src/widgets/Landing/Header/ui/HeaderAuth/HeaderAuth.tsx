import { useScreenSize } from '@/shared/libs';

import { HeaderAuthDesktop } from '../HeaderAuth/HeaderAuthDesktop/HeaderAuthDesktop';

import { HeaderAuthMobile } from './HeaderAuthMobile/HeaderAuthMobile';

export const HeaderAuth = () => {
	const { isLargeScreen } = useScreenSize();

	return isLargeScreen ? <HeaderAuthDesktop /> : <HeaderAuthMobile />;
};
