import classNames from 'classnames';
import { useEffect, useState } from 'react';

import LeftChevron from '@/shared/assets/icons/leftChevron.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { A11y } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { AppLogo } from '@/shared/ui/AppLogo';

import { MenuItem } from '../../model/types/sidebar';
import { SidebarMenuList } from '../SidebarMenuList/SidebarMenuList';

import styles from './Sidebar.module.css';

interface SidebarProps {
	/**
	 * Sidebar menu items list
	 */
	menuItems: MenuItem[];
}

/**
 * Component that contains links to the main sections
 * @param props
 */

export const Sidebar = ({ menuItems }: SidebarProps) => {
	const { isMobile } = useScreenSize();
	const { t } = useI18nHelpers(i18Namespace.a11y);
	const [isOpenNavSidebar, setIsOpenNavSidebar] = useState<boolean>(false);

	useEffect(() => {
		isMobile && setIsOpenNavSidebar(true);
	}, [isMobile]);

	const handleToggleSidebar = () => {
		setIsOpenNavSidebar((prev) => !prev);
	};

	return (
		<aside
			className={classNames(styles.sidebar, { [styles.closing]: isOpenNavSidebar })}
			data-testid="Sidebar"
		>
			<div className={styles.header}>
				<AppLogo isOpen={isOpenNavSidebar} />
				<button
					className={classNames(styles['close-icon'], {
						[styles.left]: isOpenNavSidebar,
					})}
					onClick={handleToggleSidebar}
					data-testid="Sidebar_CloseButton"
					aria-label={t(!isOpenNavSidebar ? A11y.CLOSE_SIDEBAR : A11y.OPEN_SIDEBAR)}
				>
					<LeftChevron className={styles.arrow} />
				</button>
			</div>
			<div className={styles.menu}>
				<SidebarMenuList fullWidth={isOpenNavSidebar} menuItems={menuItems} />
			</div>
		</aside>
	);
};
