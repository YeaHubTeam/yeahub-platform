import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { SingleMenuItem } from '../../model/types/sidebar';

import styles from './SidebarSingleMenuItem.module.css';

interface SidebarSingleMenuItemProps {
	/**
	 * Menu item
	 */
	menuItem: SingleMenuItem;
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

export const SidebarSingleMenuItem = ({ menuItem, fullWidth }: SidebarSingleMenuItemProps) => {
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

			{menuItem.notifications && (
				<div
					className={classNames(styles.notifications, {
						[styles['notifications-smaller']]: fullWidth,
					})}
				>
					{menuItem.notifications}
				</div>
			)}
		</NavLink>
	);
};
