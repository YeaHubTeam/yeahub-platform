import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Button } from '@/shared/ui/Button';
import { IconButton } from '@/shared/ui/IconButton';
import { ProfileIcon } from '@/shared/ui/Icons/ProfileIcon';
import { UserPlusIcon } from '@/shared/ui/Icons/UserPlusIcon';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';

import styles from './UnauthorizedBlock.module.css';

export const UnauthorizedBlock = () => {
	const { t } = useTranslation(i18Namespace.landing);
	const { isMobile } = useScreenSize();
	const navigate = useNavigate();

	const settingsMenuItems: PopoverMenuItem[] = [
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

	if (isMobile)
		return (
			<>
				<Popover menuItems={settingsMenuItems}>
					{({ onToggle }) => (
						<IconButton
							aria-label="go to preferences"
							form="square"
							icon={<Icon icon="list" size={32} />}
							size="L"
							variant="tertiary"
							onClick={onToggle}
						/>
					)}
				</Popover>
			</>
		);

	return (
		<nav className={styles.navigation}>
			<Link className={styles.login} to={ROUTES.auth.login.page}>
				{t(Landing.LOGIN)}
			</Link>
			<Link to={ROUTES.auth.register.page}>
				<Button className={styles['register-button']}>{t(Landing.REGISTER)}</Button>
			</Link>
		</nav>
	);
};
