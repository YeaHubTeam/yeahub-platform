import { Placement } from '@floating-ui/react';
import React, { ReactNode } from 'react';

export interface PopoverChildrenProps {
	onToggle: () => void;
	isOpen: boolean;
}

export type PopoverChildren = ReactNode | ((props: PopoverChildrenProps) => ReactNode);

export interface PopoverProps {
	body?: ReactNode;
	menuItems?: PopoverMenuItem[];
	header?: ReactNode | PopoverHeaderConfig;
	footer?: ReactNode | PopoverFooterConfig;
	ariaLabel?: string;
	className?: string;
	placement?: Placement;
	children: PopoverChildren;
	isOpen?: boolean;
	onClickOutside?: () => void;
	isMobile?: boolean;
	isTablet?: boolean;
}

export interface PopoverMenuItem {
	title?: string;
	onClick?: () => void;
	icon?: ReactNode;
	disabled?: boolean;
	renderComponent?: (onToggleOpenPopover: () => void) => ReactNode;
}

export interface PopoverHeaderConfig {
	titleText: string;
	dismissible?: boolean;
	onDismiss?: () => void;
}

export interface PopoverFooterConfig {
	primaryAction: React.ButtonHTMLAttributes<HTMLButtonElement>;
	secondaryAction?: React.ButtonHTMLAttributes<HTMLButtonElement>;
	footerContent?: string;
}
