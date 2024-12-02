import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import ChatIcon from '@/shared/assets/icons/chat.svg';
import LeftChevron from '@/shared/assets/icons/leftChevron.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { A11y } from '@/shared/config/i18n/i18nTranslations';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
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
	const { isMobile } = useScreenSize();
	const { t } = useI18nHelpers([i18Namespace.translation, i18Namespace.a11y]);
	const [isOpenNavSidebar, setIsOpenNavSidebar] = useState<boolean>(false);
	const [logout] = useLazyLogoutQuery();

	useEffect(() => {
		if (!isMobileSidebar) {
			isMobile && setIsOpenNavSidebar(true);
		}
	}, [isMobile, isMobileSidebar]);

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
						aria-label={t(!isOpenNavSidebar ? A11y.CLOSE_SIDEBAR : A11y.OPEN_SIDEBAR, {
							ns: i18Namespace.a11y,
						})}
					>
						<LeftChevron className={styles.arrow} />
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
						<span>{t(Translation.USERPREFERENCES_LOGOUT, { ns: i18Namespace.translation })}</span>
					</Button>
				</Flex>
			</Flex>
		</aside>
	);
};
