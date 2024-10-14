import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { SingleMenuItem } from '../../model/types/sidebar';

import styles from './SidebarMenuItem.module.css';

interface SidebarSingleMenuItemProps {
	menuItem: SingleMenuItem;
	fullWidth: boolean;
}

const SidebarSingleMenuItem = ({ fullWidth, menuItem }: SidebarSingleMenuItemProps) => {
	const ImageComponent = menuItem.icon;

	const { t } = useI18nHelpers(i18Namespace.translation);

	return (
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
					<span className={classNames(styles.title)}>{t(menuItem.title)}</span>
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

export default SidebarSingleMenuItem;
