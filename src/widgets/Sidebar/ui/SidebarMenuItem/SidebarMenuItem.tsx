import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Tooltip } from '@/shared/ui/Tooltip';

import { MenuItem } from '../../model/types/sidebar';

import SidebarCategoryMenuItem from './SidebarCategoryMenuItem';
import SidebarSingleMenuItem from './SidebarSingleMenuItem';

interface SidebarMenuItemProps {
	/**
	 * Menu item
	 */
	menuItem: MenuItem;
	/**
	 * If set to true, the size of the menu item is full width, if set to false, the text is hidden and only the icon remains
	 */
	fullWidth: boolean;
	isShowTooltip?: boolean;
}

/**
 * Element of sidebar menu list
 * @param menuItem
 * @param fullWidth
 * @param isShowTooltip
 * @constructor
 */

export const SidebarMenuItem = ({ menuItem, fullWidth, isShowTooltip }: SidebarMenuItemProps) => {
	const { t } = useTranslation(i18Namespace.translation);

	const item = (() => {
		switch (menuItem.type) {
			case 'category':
				return <SidebarCategoryMenuItem fullWidth={fullWidth} menuItem={menuItem} />;
			case 'single':
				return <SidebarSingleMenuItem fullWidth={fullWidth} menuItem={menuItem} />;
		}
	})();

	return isShowTooltip ? (
		<Tooltip
			title={t(menuItem.title)}
			placement="right"
			color="violet"
			tooltipDelay={{ open: 0, close: 50 }}
		>
			{item}
		</Tooltip>
	) : (
		item
	);
};
