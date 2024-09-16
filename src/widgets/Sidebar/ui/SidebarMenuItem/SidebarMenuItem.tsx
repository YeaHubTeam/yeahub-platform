import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { MenuItem } from '../../model/types/sidebar';

import styles from './SidebarMenuItem.module.css';

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
	const ImageComponent = menuItem.icon;

	return (
		<NavLink
			to={menuItem.route}
			className={({ isActive }) => classNames(styles.link, { [styles.active]: isActive })}
			data-testid="SidebarMenuItem_Link"
		>
			<div className={styles.wrap}>
				<ImageComponent className={styles['link-icon']} />
				<span
					className={classNames(styles['link-title'], { [styles.closing]: fullWidth })}
					data-testid="SidebarMenuItem_Link_Text"
				>
					{menuItem.title}
				</span>
			</div>
		</NavLink>
	);
};
