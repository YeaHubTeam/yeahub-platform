import React, { ReactNode } from 'react';

export interface ChipProps {
	variant?: 'small' | 'big';
	theme?: 'primary' | 'outlined';
	label?: string | ReactNode;
	onDelete?: () => void;
	disabled?: boolean;
	active?: boolean;
	prefix?: ReactNode;
	onClick?: () => void;
	className?: string;
	style?: React.CSSProperties;
	withText?: number | string;
	dataTestId?: string;
}
