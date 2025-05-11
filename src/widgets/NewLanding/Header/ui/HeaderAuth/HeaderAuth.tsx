import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useScreenSize } from '@/shared/hooks';
import { ProfileIcon } from '@/shared/ui/Icons/ProfileIcon';
import { UserPlusIcon } from '@/shared/ui/Icons/UserPlusIcon';
import { PopoverMenuItem } from '@/shared/ui/Popover';

import { HeaderAuthDesktop } from '../HeaderAuth/HeaderAuthDesktop/HeaderAuthDesktop';
import { HeaderAuthMobile } from '../HeaderAuth/HeaderAuthMobile/HeaderAuthMobile';

export const HeaderAuth = () => {
	const navigate = useNavigate();
	const { isSmallScreen } = useScreenSize();
	const { t } = useTranslation(i18Namespace.landing);

	const authMenuItems: PopoverMenuItem[] = [
		{
			icon: <ProfileIcon isCurrentColor />,
			title: t(Landing.LOGIN),
			onClick: () => {
				navigate(ROUTES.auth.login.page);
			},
		},
		{
			icon: <UserPlusIcon isCurrentColor />,
			title: t(Landing.REGISTER),
			onClick: () => {
				navigate(ROUTES.auth.register.page);
			},
		},
	];

	return isSmallScreen ? <HeaderAuthMobile items={authMenuItems} /> : <HeaderAuthDesktop />;
};
