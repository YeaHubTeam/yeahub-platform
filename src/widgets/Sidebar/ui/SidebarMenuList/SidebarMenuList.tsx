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
	isShowTooltip?: boolean;
}

/**
 * List of items for the sidebar menu
 * @param fullWidth
 * @param menuItems
 * @param isShowTooltip
 * @constructor
 */
export const SidebarMenuList = ({ fullWidth, menuItems, isShowTooltip }: SidebarMenuListProps) => {
	return (
		<nav className={styles.nav} data-testid="SidebarMenuList">
			{menuItems.map((menuItem, index) => (
				<SidebarMenuItem
					key={index}
					fullWidth={fullWidth}
					menuItem={menuItem}
					isShowTooltip={isShowTooltip}
				/>
			))}
		</nav>
	);
};
