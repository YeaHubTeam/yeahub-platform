import React, { ReactNode } from 'react';

export interface ChipProps {
	theme?: 'primary' | 'outlined';
	label?: string;
	labelClassName?: string;
	onDelete?: () => void;
	disabled?: boolean;
	active?: boolean;
	prefix?: ReactNode;
	prefixWrapperClassName?: string;
	onClick?: () => void;
	className?: string;
	style?: React.CSSProperties;
}
