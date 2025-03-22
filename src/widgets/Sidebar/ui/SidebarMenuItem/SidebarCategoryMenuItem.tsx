import classNames from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';

import ArrowIcon from '@/shared/assets/icons/arrowShortDown.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { isPathMatch } from '@/shared/utils/isPathMatch';

import { CategoryMenuItem } from '../../model/types/sidebar';

import styles from './SidebarMenuItem.module.css';

interface SidebarMenuCategoryItemProps {
	menuItem: CategoryMenuItem;
	fullWidth: boolean;
}

const SidebarCategoryMenuItem = ({ menuItem, fullWidth }: SidebarMenuCategoryItemProps) => {
	const location = useLocation();

	const [expanded, setExpanded] = useState(location.pathname.includes(menuItem.elements[0].route));

	const handleExpand = () => {
		setExpanded((prev) => !prev);
	};

	const { t } = useTranslation(i18Namespace.translation);

	const ImageComponent = menuItem.icon;

	return (
		<div
			className={classNames(styles.category, {
				[styles.expanded]: expanded,
				[styles.fullwidth]: fullWidth,
			})}
		>
			<button className={styles.container} onClick={handleExpand}>
				<div className={styles.wrap}>
					<ImageComponent className={styles.icon} />
					<span className={classNames(styles.title)}>{t(menuItem.title)}</span>
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
					const isActiveItem = isPathMatch(item.route, location.pathname);
					return (
						<NavLink
							key={index}
							to={item.route}
							end
							className={classNames(styles.item, styles.nested, { [styles.active]: isActiveItem })}
						>
							<div className={styles.wrap}>
								<ImageComponent className={styles.icon} />
								<span className={classNames(styles.title)}>{t(item.title)}</span>
							</div>
						</NavLink>
					);
				})}
			</div>
		</div>
	);
};

export default SidebarCategoryMenuItem;
