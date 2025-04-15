import React, { ReactNode } from 'react';

export interface ChipProps {
	theme?: 'primary' | 'outlined';
	label?: string;
	onDelete?: () => void;
	disabled?: boolean;
	active?: boolean;
	prefix?: ReactNode;
	onClick?: () => void;
	className?: string;
	style?: React.CSSProperties;
}
