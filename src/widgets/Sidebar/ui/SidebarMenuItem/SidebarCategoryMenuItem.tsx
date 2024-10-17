import classNames from 'classnames';
import { useState } from 'react';
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
	const location = useLocation();

	const [expanded, setExpanded] = useState(() => {
		const savedValue = localStorage.getItem('savedExpanded');
		return savedValue
			? JSON.parse(savedValue)
			: menuItem.elements.some((el) => location.pathname.endsWith(el.route));
	});

	const handleExpand = () => {
		const newExpanded = !expanded;
		setExpanded(newExpanded);
		localStorage.setItem('savedExpanded', JSON.stringify(newExpanded));
	};

	const { t } = useI18nHelpers(i18Namespace.translation);

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
					return (
						<NavLink
							key={index}
							to={item.route}
							end
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
