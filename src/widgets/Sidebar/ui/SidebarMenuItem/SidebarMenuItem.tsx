import classNames from 'classnames';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import ArrowIcon from '@/shared/assets/icons/arrow.svg';

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
	const [expanded, setExpanded] = useState(false);
	const ImageComponent = menuItem.icon;

	const handleExpand = () => {
		setExpanded(!expanded);
	};

	return menuItem.type == 'category' ? (
		<div
			className={classNames(styles.category, {
				[styles.expanded]: expanded,
				[styles.fullwidth]: fullWidth,
			})}
		>
			<button className={styles.container} onClick={handleExpand}>
				<div className={styles.wrap}>
					<ImageComponent className={styles.icon} />
					<span className={classNames(styles.title)}>{menuItem.title}</span>
				</div>
				<div className={styles.side}>
					{!fullWidth && <ArrowIcon className={styles['category-expand-icon']} />}
					{menuItem.notifications && (
						<div className={styles.notifications}>{menuItem.notifications}</div>
					)}
				</div>
			</button>
			<div className={styles.items}>
				{menuItem.elements.map((item, index) => {
					const ImageComponent = item.icon;
					return (
						<NavLink
							key={index}
							to={item.route}
							className={({ isActive }) =>
								classNames(styles.item, styles.nested, { [styles.active]: isActive })
							}
						>
							<div className={styles.wrap}>
								<ImageComponent className={styles.icon} />
								<span className={classNames(styles.title, { [styles.closing]: fullWidth })}>
									{item.title}
								</span>
							</div>
						</NavLink>
					);
				})}
			</div>
		</div>
	) : (
		<NavLink
			className={({ isActive }) =>
				classNames(styles.item, {
					[styles.active]: isActive,
					[styles.fullwidth]: fullWidth,
				})
			}
			to={menuItem.route}
		>
			<div className={styles.container}>
				<div className={styles.wrap}>
					<ImageComponent className={styles.icon} />
					<span className={classNames(styles.title)}>{menuItem.title}</span>
				</div>
				<div className={styles.side}>
					{menuItem.notifications && (
						<div className={styles.notifications}>{menuItem.notifications}</div>
					)}
				</div>
			</div>
		</NavLink>
	);
};
