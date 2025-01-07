import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ChatIcon from '@/shared/assets/icons/chat.svg';
import ToogleSidebar from '@/shared/assets/icons/toggleSidebar.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { AppLogo } from '@/shared/ui/AppLogo';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { SignOutIcon } from '@/shared/ui/Icons/SignOutIcon';

import { useLazyLogoutQuery } from '@/entities/auth';

import { MenuItem } from '../../model/types/sidebar';
import { SidebarMenuList } from '../SidebarMenuList/SidebarMenuList';

import styles from './Sidebar.module.css';

interface SidebarProps {
	/**
	 * Sidebar menu items list
	 */
	menuItems: MenuItem[];
	/**
	 * Is a mobile option
	 */
	isMobileSidebar?: boolean;
}

/**
 * Component that contains links to the main sections
 * @param props
 */

export const Sidebar = ({ menuItems, isMobileSidebar = false }: SidebarProps) => {
	const { isMobile, isTablet } = useScreenSize();
	const { t } = useTranslation(i18Namespace.translation);
	const [isOpenNavSidebar, setIsOpenNavSidebar] = useState<boolean>(false);
	const [logout] = useLazyLogoutQuery();

	useEffect(() => {
		if (!isMobileSidebar) {
			(isMobile || isTablet) && setIsOpenNavSidebar(true);
		}
	}, [isMobile, isTablet, isMobileSidebar]);

	const handleToggleSidebar = () => {
		setIsOpenNavSidebar((prev) => !prev);
	};

	const openSupportTab = () => window.open('https://t.me/yeahub_support', '_blank');

	const onLogout = () => logout();

	return (
		<aside
			className={classNames(styles.sidebar, {
				[styles.closing]: isOpenNavSidebar,
				[styles['desktop-sidebar']]: !isMobileSidebar,
			})}
			data-testid="Sidebar"
		>
			<Flex direction="column" maxHeight>
				<div className={styles.header}>
					<AppLogo isOpen={isOpenNavSidebar} />
					<button
						className={classNames(styles['close-icon'], {
							[styles.left]: isOpenNavSidebar,
						})}
						onClick={handleToggleSidebar}
						data-testid="Sidebar_CloseButton"
						aria-label={t(!isOpenNavSidebar ? Translation.SIDEBAR_CLOSE : Translation.SIDEBAR_OPEN)}
					>
						<ToogleSidebar className={styles.arrow} />
					</button>
				</div>
				<div className={styles.menu}>
					<SidebarMenuList fullWidth={isOpenNavSidebar} menuItems={menuItems} />
				</div>
				<Flex direction="column" gap="8" className={styles['bottom-actions']}>
					<Button
						className={classNames(styles['sidebar-bottom-button'], {
							[styles['sidebar-bottom-button-hide']]: isOpenNavSidebar,
						})}
						size="L"
						onClick={openSupportTab}
						preffix={<ChatIcon />}
					>
						<span>{t(Translation.SUPPORT, { ns: i18Namespace.translation })}</span>
					</Button>
					<Button
						className={classNames(styles['sidebar-bottom-button'], {
							[styles['sidebar-bottom-button-hide']]: isOpenNavSidebar,
						})}
						size="L"
						onClick={onLogout}
						preffix={<SignOutIcon isCurrentColor />}
						variant="destructive"
					>
						<span>{t(Translation.LOGOUT, { ns: i18Namespace.translation })}</span>
					</Button>
				</Flex>
			</Flex>
		</aside>
	);
};
