import { useTranslation } from 'react-i18next';

import { i18Namespace, Landing } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';

import { HeaderNavDesktop } from './HeaderNavDesktop/HeaderNavDesktop';
import { HeaderNavMobile } from './HeaderNavMobile/HeaderNavMobile';

export const HeaderNav = () => {
	const { isLargeScreen } = useScreenSize();
	const { t } = useTranslation(i18Namespace.landing);

	return (
		<nav data-testid="HeaderNav" aria-label={t(Landing.HEADER_NAV_ARIA_LABEL)}>
			{isLargeScreen ? <HeaderNavDesktop /> : <HeaderNavMobile />}
		</nav>
	);
};
