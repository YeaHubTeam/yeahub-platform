import { MenuItem } from '../../model/types/sidebar';

import SidebarCategoryMenuItem from './SidebarCategoryMenuItem';
import SidebarSingleMenuItem from './SidebarSingleMenuItem';

interface SidebarMenuItemProps {
	/**
	 * Menu item
	 */
	menuItem: MenuItem;
	/**
	 * If set to true, the size of the menu item is full width, if set to false, the text is hidden and only the icon remains
	 */
	fullWidth: boolean;
}

/**
 * Element of sidebar menu list
 * @param menuItem
 * @param fullWidth
 * @constructor
 */

export const SidebarMenuItem = ({ menuItem, fullWidth }: SidebarMenuItemProps) => {
	switch (menuItem.type) {
		case 'category':
			return <SidebarCategoryMenuItem fullWidth={fullWidth} menuItem={menuItem} />;
		case 'single':
			return <SidebarSingleMenuItem fullWidth={fullWidth} menuItem={menuItem} />;
	}
};
