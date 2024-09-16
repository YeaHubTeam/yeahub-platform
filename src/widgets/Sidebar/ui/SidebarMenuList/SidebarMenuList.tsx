import { MenuItem } from '../../model/types/sidebar';
import { SidebarMenuItem } from '../SidebarMenuItem/SidebarMenuItem';

import styles from './SidebarMenuList.module.css';

interface SidebarMenuListProps {
	/**
	 * If set to true, the size of the menu item is full width, if set to false, the text is hidden and only the icon remains
	 */
	fullWidth: boolean;
	/**
	 * Sidebar menu items
	 */
	menuItems: MenuItem[];
}

/**
 * List of items for the sidebar menu
 * @param fullWidth
 * @param menuItems
 * @constructor
 */
export const SidebarMenuList = ({ fullWidth, menuItems }: SidebarMenuListProps) => {
	return (
		<nav className={styles.nav} data-testid="SidebarMenuList">
			{menuItems.map((menuItem) => {
				return <SidebarMenuItem key={menuItem.title} menuItem={menuItem} fullWidth={fullWidth} />;
			})}
		</nav>
	);
};
