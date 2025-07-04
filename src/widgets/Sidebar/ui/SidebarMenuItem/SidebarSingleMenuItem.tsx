import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { ROUTES } from '@/shared/config/router/routes';
import { useScreenSize } from '@/shared/hooks';
import { Tooltip } from '@/shared/ui/Tooltip';
import { isPathMatch } from '@/shared/utils/isPathMatch';

import { SingleMenuItem } from '../../model/types/sidebar';

import styles from './SidebarMenuItem.module.css';

interface SidebarSingleMenuItemProps {
	menuItem: SingleMenuItem;
	fullWidth: boolean;
	isShowTooltip?: boolean;
}

const SidebarSingleMenuItem = ({
	fullWidth,
	menuItem,
	isShowTooltip,
}: SidebarSingleMenuItemProps) => {
	const ImageComponent = menuItem.icon;
	const { isMobile, isTablet } = useScreenSize();
	const location = useLocation();
	const { t } = useTranslation(i18Namespace.translation);
	const isProfileItem = menuItem.route === ROUTES.profile.route;
	const isSettingItem = menuItem.route === ROUTES.settings.route;
	const isActiveItem = isPathMatch(menuItem.route, location.pathname);

	if ((isProfileItem || isSettingItem) && !(isMobile || isTablet)) {
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

export default SidebarSingleMenuItem;
