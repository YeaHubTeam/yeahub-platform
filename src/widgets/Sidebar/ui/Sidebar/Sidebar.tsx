import classNames from 'classnames';
import { useState } from 'react';

import LeftChevron from '@/shared/assets/icons/leftChevron.svg';
import { AppLogo } from '@/shared/ui/AppLogo';

import { useProfileQuery } from '@/entities/auth';

import { MenuItem } from '../../model/types/sidebar';
import { SidebarMenuList } from '../SidebarMenuList/SidebarMenuList';

import styles from './Sidebar.module.css';
import { SidebarSkeleton } from './Sidebar.skeleton';

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
	const [isOpenNavSidebar, setIsOpenNavSidebar] = useState<boolean>(false);
	const { isLoading } = useProfileQuery();

	const handleToggleSidebar = () => {
		setIsOpenNavSidebar((prev) => !prev);
	};

	if (isLoading)
		return <SidebarSkeleton isOpenNavSidebar={isOpenNavSidebar} menuLength={menuItems.length} />;

	return (
		<aside
			className={classNames(styles.sidebar, { [styles.closing]: isOpenNavSidebar })}
			data-testid="Sidebar"
		>
			<div className={styles.header}>
				<AppLogo isOpen={isOpenNavSidebar} />
				<button
					className={classNames(styles['close-icon'], { [styles['left']]: isOpenNavSidebar })}
					onClick={handleToggleSidebar}
					data-testid="Sidebar_CloseButton"
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
