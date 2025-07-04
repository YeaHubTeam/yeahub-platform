import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { ROUTES } from '@/shared/config/router/routes';
import { useScreenSize } from '@/shared/hooks';
import { Tooltip } from '@/shared/ui/Tooltip';
import { isPathMatch } from '@/shared/utils/isPathMatch';

import { SettingsMenuItem } from '../../model/types/sidebar';

import styles from './SidebarMenuItem.module.css';

interface SidebarMenuCategoryItemProps {
	menuItem: SettingsMenuItem;
	fullWidth: boolean;
	isShowTooltip?: boolean;
}

const SidebarSettingsMenuItem = ({
	menuItem,
	fullWidth,
	isShowTooltip,
}: SidebarMenuCategoryItemProps) => {
	const ImageComponent = menuItem.icon;
	const { isMobile, isTablet } = useScreenSize();
	const location = useLocation();
	const { t } = useTranslation(i18Namespace.translation);
	const isSettingsItem = menuItem.route === ROUTES.settings.route;

	const isActiveItem = isPathMatch(menuItem.route, location.pathname);

	if (isSettingsItem && !(isMobile || isTablet)) {
		return null;
	}
	return (
		<Tooltip
			title={t(menuItem.title)}
			placement="right"
			color="violet"
			tooltipDelay={{ open: 0, close: 50 }}
			shouldShowTooltip={isShowTooltip}
		>
			<NavLink
				end
				className={({ isActive }) =>
					classNames(styles.item, {
						[styles['admin-active']]: menuItem?.isAdmin,
						[styles.active]: isActive || isActiveItem,
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
		</Tooltip>
	);
};

export default SidebarSettingsMenuItem;
