import * as Sentry from '@sentry/browser';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

import LeftChevron from '@/shared/assets/icons/leftChevron.svg';
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
				>
					<LeftChevron className={styles.arrow} />
				</button>
			</div>
			<button
				onClick={() => {
					Sentry.captureException('hello');
					throw new Error('hello');
				}}
			>
				Не жми
			</button>
			<div className={styles.menu}>
				<SidebarMenuList fullWidth={isOpenNavSidebar} menuItems={menuItems} />
			</div>
		</aside>
	);
};
