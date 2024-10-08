import classNames from 'classnames';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import ArrowIcon from '@/shared/assets/icons/arrow.svg';

import { CategoryMenuItem } from '../../model/types/sidebar';

import styles from './SidebarCategoryMenuItem.module.css';

interface SidebarCategoryMenuItemProps {
	menuItem: CategoryMenuItem;
	fullWidth: boolean;
}

/**
 * Element of sidebar menu list
 * @param menuItem
 * @param fullWidth
 * @constructor
 */

export const SidebarCategoryMenuItem = ({ menuItem, fullWidth }: SidebarCategoryMenuItemProps) => {
	const [expanded, setExpanded] = useState(false);
	const ImageComponent = menuItem.icon;

	return (
		<div
			className={classNames(styles.category, {
				[styles['category-expanded']]: expanded,
				[styles['category-fullwidth']]: fullWidth,
			})}
		>
			<button
				className={styles['category-title']}
				onClick={() => {
					setExpanded(!expanded);
				}}
				data-testid="SidebarMenuItem_Link"
			>
				<div className={styles.wrap}>
					<ImageComponent className={styles['link-icon']} />
					<span
						className={classNames(styles['link-title'])}
						data-testid="SidebarMenuItem_Link_Text"
					>
						{menuItem.title}
					</span>
				</div>
				<div className={styles.aside}>
					{!fullWidth && <ArrowIcon className={styles['category-expand-icon']} />}
					{menuItem.notifications && (
						<div className={styles.notifications}>{menuItem.notifications}</div>
					)}
				</div>
			</button>
			<div className={styles.links}>
				{menuItem.elements.map((item, index) => {
					const ImageComponent = item.icon;
					return (
						<NavLink
							key={index}
							to={item.route}
							className={({ isActive }) =>
								classNames(styles.link, { [styles.active]: isActive }, styles.nested)
							}
							data-testid="SidebarMenuItem_Link"
						>
							<div className={styles.wrap}>
								<ImageComponent className={styles['link-icon']} />
								<span
									className={classNames(styles['link-title'], { [styles.closing]: fullWidth })}
									data-testid="SidebarMenuItem_Link_Text"
								>
									{item.title}
								</span>
							</div>
						</NavLink>
					);
				})}
			</div>
		</div>
	);
};
