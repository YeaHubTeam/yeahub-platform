import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import ArrowIcon from '@/shared/assets/icons/arrow.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { CategoryMenuItem } from '../../model/types/sidebar';

import styles from './SidebarMenuItem.module.css';

interface SidebarMenuCategoryItemProps {
	menuItem: CategoryMenuItem;
	fullWidth: boolean;
}

const SidebarCategoryMenuItem = ({ menuItem, fullWidth }: SidebarMenuCategoryItemProps) => {
	const [expanded, setExpanded] = useState(false);

	const { t } = useI18nHelpers(i18Namespace.translation);

	const location = useLocation();

	const handleExpand = () => {
		setExpanded(!expanded);
	};

	const ImageComponent = menuItem.icon;

	useEffect(() => {
		for (const el of menuItem.elements) {
			if (location.pathname.endsWith(el.route)) {
				setExpanded(true);
			}
			break;
		}
	}, [location.pathname]);

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
									{t(item.title)}
								</span>
							</div>
						</NavLink>
					);
				})}
			</div>
		</div>
	);
};

export default SidebarCategoryMenuItem;
