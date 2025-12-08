import { CSSProperties, ReactNode } from 'react';

import { TextVariant } from '../Text/types';

export interface ChipProps {
	variant?: 'small' | 'big';
	theme?: 'primary' | 'outlined';
	label?: string | ReactNode;
	labelVariant?: TextVariant;
	onDelete?: () => void;
	disabled?: boolean;
	active?: boolean;
	prefix?: ReactNode;
	onClick?: () => void;
	className?: string;
	style?: CSSProperties;
	withText?: number | string;
	dataTestId?: string;
}

export type ChipVariant = NonNullable<ChipProps['variant']>;
export type ChipTheme = NonNullable<ChipProps['theme']>;
