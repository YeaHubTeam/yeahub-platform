import { ReactNode } from 'react';

export interface PopoverMenuItem {
	title?: string;
	onClick?: () => void;
	icon?: ReactNode;
	renderComponent?: (onToggleOpenPopover: () => void) => ReactNode;
}
